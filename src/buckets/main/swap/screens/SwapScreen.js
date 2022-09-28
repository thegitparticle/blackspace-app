import {useNavigation} from '@react-navigation/native';
import {Text, useSx, View} from 'dripsy';
import React, {useCallback, useState, useMemo, useRef, useEffect} from 'react';
import {Dimensions, Pressable, RefreshControl, TextInput} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SquircleView} from 'react-native-figma-squircle';
import Animated from 'react-native-reanimated';
import {ExpandableSection} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import {Bounceable} from 'rn-bounceable';
import SpacerVertical from '../../../../bits/SpacerVertical';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import {
  dripsytheme,
  StyledCircleFastImage25,
  StyledCircleFastImage50,
} from '../../../../theme/DripsyTheme';
import {SwapFAQs} from '../SwapData';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import list from '../../../../utils/tokenslist.json';
import useToken1FiatPrice from '../../../../helpers/useToken1FiatPrice';
import useToken2FiatPrice from '../../../../helpers/useToken2FiatPrice';
import SquircleButton from '../../../../bits/SquircleButton';
import {
  use0xSwapQuote,
  use0xSwapQuoteWithBalanceChecks,
} from '../../../../helpers/use0xSwapQuote';
import useEthFiatPrice from '../../../../helpers/useEthFiatPrice';
import {Modal, ModalContent, ScaleAnimation} from 'react-native-modals';
import useGetTokenBalance from '../../../../helpers/useGetTokenBalance';
import {ethers} from 'ethers';
import useGetETHBalance from '../../../../helpers/useGetETHBalance';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

let state_here = {};

function SwapScreen({route}) {
  const sxCustom = useSx();
  const navigation = useNavigation();
  const tokensList = list.tokens;

  const wallet_address = state_here.WDeetsReducer.wdeets.wallet_address;

  const {loadingTokenBalance, ethBalance} = useGetETHBalance(
    // wallet_address,
    '0x5b990C664aE7E759763ACfEC76E11c289c53Be77',
  );

  const {loadingPriceEth, priceEth} = useEthFiatPrice();

  const [token0PickerList, setToken0PickerList] = useState(tokensList);
  const [token1PickerList, setToken1PickerList] = useState(tokensList);

  const [token0Details, setToken0Details] = useState({
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    chainId: 1,
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
    name: 'Ethereum',
    symbol: 'ETH',
  });
  const [token1Details, setToken1Details] = useState({
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    chainId: 1,
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389',
    name: 'USD Coin',
    symbol: 'USDC',
  });

  // const {loadingToken1FiatPrice, token1FiatPrice} = useToken1FiatPrice(); // token0 / sellToken
  // const {loadingToken2FiatPrice, token2FiatPrice} = useToken2FiatPrice(); // token1 / buyToken

  const [token0FiatRate, setToken0FiatRate] = useState('2');
  const [token1FiatRate, setToken1FiatRate] = useState('3');

  // useEffect(() => {
  //   const {loadingToken1FiatPrice, token1FiatPrice} = useToken1FiatPrice(
  //     token0Details.symbol,
  //   );
  //   setToken0FiatRate(token1FiatPrice);
  // }, [token0Details]);

  // useEffect(() => {
  //   const {loadingToken2FiatPrice, token2FiatPrice} = useToken2FiatPrice(
  //     token1Details.symbol,
  //   );
  //   setToken1FiatRate(token2FiatPrice);
  // }, [token1Details]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function HeaderHere() {
    return (
      <View
        variant="layout.sub_view_20_margin"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'center',
          flexDirection: 'row',
          marginVertical: '$3',
        }}>
        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            variant="heading_thick"
            sx={{color: 'layout_1', marginHorizontal: '$2'}}>
            Swap
          </Text>
        </View>
        <Bounceable onPress={() => navigation.goBack()}>
          <Iconly
            name="CloseSquareBroken"
            color={dripsytheme.colors.layout_1}
            size={30}
          />
        </Bounceable>
      </View>
    );
  }

  function RenderDetail({title, value, highlight}) {
    // title - string, value - string, highlight - boolean
    return (
      <View
        sx={{
          width: windowWidth - 80,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: '$2',
          alignItems: 'center',
        }}>
        <Text
          variant="body"
          sx={{color: 'layout_2', marginVertical: '$1', opacity: 0.75}}>
          {title}
        </Text>
        <Text
          variant="body_thick"
          sx={{color: highlight ? 'success_2' : 'layout_2'}}>
          {value}
        </Text>
      </View>
    );
  }

  const modalizePickToken0CoinRef = useRef(null);
  const onOpenPickToken0 = () => {
    modalizePickToken0CoinRef.current?.open();
  };
  const onClosePickToken0 = () => {
    modalizePickToken0CoinRef.current?.close();
  };

  function Token0PickerHeader() {
    const [searchText, setSearchText] = useState('');

    const filter = e => {
      const keyword = e.nativeEvent.text;

      if (keyword !== '') {
        const results = tokensList.filter(token => {
          return token.name.toLowerCase().startsWith(keyword.toLowerCase());
          // Use the toLowerCase() method to make it case-insensitive
        });
        console.log(results);
        setToken0PickerList(results);
      } else {
        setToken0PickerList(tokensList);
        // If the text field is empty, show all users
      }

      setSearchText(keyword);
    };

    return (
      <View variant={'sub_view_20_margin'} sx={{alignSelf: 'center'}}>
        <Text
          variant={'heading_thick'}
          sx={{marginVertical: '$6', textAlign: 'center', color: 'layout_1'}}>
          search tokens
        </Text>
        <SquircleView
          style={sxCustom({
            width: windowWidth - 40,
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: '$3',
          })}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 15,
            fillColor: dripsytheme.colors.layout_3 + '25',
          }}>
          <TextInput
            numberOfLines={1}
            onChange={e => filter(e)}
            value={searchText}
            style={sxCustom({
              backgroundColor: 'transparent',
              ...dripsytheme.text.body_thick,
              color: dripsytheme.colors.layout_1,
              width: windowWidth - 40,
              height: 50,
              alignSelf: 'center',
              textAlign: 'center',
            })}
            placeholder={'search coins'}
            placeholderTextColor={dripsytheme.colors.layout_1 + 50}
          />
        </SquircleView>
      </View>
    );
  }

  function Token0PickerItemComponent({token}) {
    return (
      <Bounceable
        onPress={() => {
          setToken0Details(token.item);
          onClosePickToken0();
        }}>
        <View
          variant="sub_view_20_margin"
          sx={{
            height: 100,
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <StyledCircleFastImage25
            source={{
              uri: token.item.logoURI,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View sx={{flexDirection: 'column'}}>
            <View sx={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                variant="body_thick"
                sx={{color: 'layout_1', marginHorizontal: '$4'}}>
                {token.item.name}
              </Text>
              <Text
                variant="body_thick"
                sx={{color: 'layout_1', marginHorizontal: '$4'}}>
                {token.item.symbol}
              </Text>
            </View>
            <Text
              variant="text"
              sx={{color: 'layout_1', marginHorizontal: '$4', opacity: 0.5}}>
              {token.item.address}
            </Text>
          </View>
        </View>
      </Bounceable>
    );
  }

  const modalizePickToken1CoinRef = useRef(null);
  const onOpenPickToken1 = () => {
    modalizePickToken1CoinRef.current?.open();
  };
  const onClosePickToken1 = () => {
    modalizePickToken1CoinRef.current?.close();
  };

  function Token1PickerHeader() {
    const [searchText, setSearchText] = useState('');

    const filter = e => {
      const keyword = e.nativeEvent.text;

      if (keyword !== '') {
        const results = tokensList.filter(token => {
          return token.name.toLowerCase().startsWith(keyword.toLowerCase());
          // Use the toLowerCase() method to make it case-insensitive
        });
        setToken1PickerList(results);
      } else {
        setToken1PickerList(tokensList);
        // If the text field is empty, show all users
      }

      setSearchText(keyword);
    };

    return (
      <View variant={'sub_view_20_margin'} sx={{alignSelf: 'center'}}>
        <Text
          variant={'heading_thick'}
          sx={{marginVertical: '$6', textAlign: 'center', color: 'layout_1'}}>
          search tokens
        </Text>
        <SquircleView
          style={sxCustom({
            width: windowWidth - 40,
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: '$3',
          })}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 15,
            fillColor: dripsytheme.colors.layout_3 + '25',
          }}>
          <TextInput
            numberOfLines={1}
            onChange={e => filter(e)}
            value={searchText}
            style={sxCustom({
              backgroundColor: 'transparent',
              ...dripsytheme.text.body_thick,
              color: dripsytheme.colors.layout_1,
              width: windowWidth - 40,
              height: 50,
              alignSelf: 'center',
              textAlign: 'center',
            })}
            placeholder={'search coins'}
            placeholderTextColor={dripsytheme.colors.layout_1 + 50}
          />
        </SquircleView>
      </View>
    );
  }

  function Token1PickerItemComponent({token}) {
    return (
      <Bounceable
        onPress={() => {
          setToken1Details(token.item);
          onClosePickToken1();
        }}>
        <View
          variant="sub_view_20_margin"
          sx={{
            height: 100,
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <StyledCircleFastImage25
            source={{
              uri: token.item.logoURI,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View sx={{flexDirection: 'column'}}>
            <View sx={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                variant="body_thick"
                sx={{color: 'layout_1', marginHorizontal: '$4'}}>
                {token.item.name}
              </Text>
              <Text
                variant="body_thick"
                sx={{color: 'layout_1', marginHorizontal: '$4'}}>
                {token.item.symbol}
              </Text>
            </View>
            <Text
              variant="text"
              sx={{color: 'layout_1', marginHorizontal: '$4', opacity: 0.5}}>
              {token.item.address}
            </Text>
          </View>
        </View>
      </Bounceable>
    );
  }

  function SwapComponent() {
    const [token0Amount, setToken0Amount] = useState('');
    const [token1Amount, setToken1Amount] = useState('');

    const [token0AmountFiat, setToken0AmountFiat] = useState('0');
    const [token1AmountFiat, setToken1AmountFiat] = useState('0');

    useEffect(() => {
      if (Number(token0Amount) > 0 && Number(token0FiatRate) > 0) {
        setToken0AmountFiat(Number(token0Amount) * Number(token0FiatRate));
      }
    }, [token0Amount, token0FiatRate]);

    useEffect(() => {
      if (Number(token1Amount) > 0 && Number(token1FiatRate) > 0) {
        setToken1AmountFiat(Number(token1Amount) * Number(token1FiatRate));
      }
    }, [token1Amount, token1FiatRate]);

    const {loading0xSwapQuote, quoteDetails0x, quoteDetails0xRaw} =
      use0xSwapQuote(
        token0Details.address,
        token1Details.address,
        token0Amount,
        token0Details.decimals,
        wallet_address,
      );

    const SwapButton = useMemo(
      () =>
        function SwapButton() {
          if (token0Amount.length > 0 && quoteDetails0x) {
            return (
              <Bounceable onPress={() => setShowBalanceCheckPopup(true)}>
                <View sx={{marginVertical: '$3'}}>
                  <SquircleButton
                    buttonColor={dripsytheme.colors.success_3}
                    width={windowWidth * 0.7}
                    height={50}
                    buttonText={'swap'}
                    font={dripsytheme.text.body_thick}
                    textColor={dripsytheme.colors.layout_1}
                  />
                </View>
              </Bounceable>
            );
          } else {
            return (
              <Bounceable onPress={() => setShowBalanceCheckPopup(false)}>
                <View sx={{marginVertical: '$3'}}>
                  <SquircleButton
                    buttonColor={dripsytheme.colors.layout_1 + '10'}
                    width={windowWidth * 0.7}
                    height={50}
                    buttonText={'swap'}
                    font={dripsytheme.text.body_thick}
                    textColor={dripsytheme.colors.layout_1}
                  />
                </View>
              </Bounceable>
            );
          }
        },
      [token0Amount, quoteDetails0x],
    );

    const [showBalanceCheckPopup, setShowBalanceCheckPopup] = useState(false);
    const [passedToken0BalCheck, setPassedToken0BalCheck] = useState(false);

    function BalanceCheckPopup() {
      const {
        loading0xSwapQuoteWithChecks,
        quoteDetails0xWithChecks,
        quoteDetails0xRawWithChecks,
        quoteError0xWithChecks,
      } = use0xSwapQuoteWithBalanceChecks(
        token0Details.address,
        token1Details.address,
        token0Amount,
        token0Details.decimals,
        wallet_address,
      );

      function Token0Balance() {
        if (!loading0xSwapQuoteWithChecks) {
          if (quoteError0xWithChecks) {
            setPassedToken0BalCheck(true);
            return (
              <View sx={{alignItems: 'center'}}>
                <Iconly
                  name="TickSquareBold"
                  color={dripsytheme.colors.success_2}
                  size={30}
                />
                <Text
                  variant="body_thick"
                  sx={{color: 'layout_1', mb: '$4', mt: '$2'}}>
                  You have enough {token0Details.name} balance
                </Text>
                <Pressable
                  onPress={() => {
                    setShowBalanceCheckPopup(false);
                    navigation.navigate('SwapTxnScreen', {
                      swapQuote: quoteDetails0xWithChecks,
                    });
                  }}>
                  <View sx={{marginVertical: '$3'}}>
                    <SquircleButton
                      buttonColor={dripsytheme.colors.success_3}
                      width={windowWidth * 0.7}
                      height={50}
                      buttonText={'confirm stake'}
                      font={dripsytheme.text.body_thick}
                      textColor={dripsytheme.colors.layout_1}
                    />
                  </View>
                </Pressable>
              </View>
            );
          } else {
            return (
              <View sx={{alignItems: 'center'}}>
                <Iconly
                  name="DangerBold"
                  color={dripsytheme.colors.danger_2}
                  size={30}
                />
                <Text
                  variant="body_thick"
                  sx={{color: 'layout_1', mb: '$4', mt: '$2'}}>
                  You don't have enough {token0Details.name} balance
                </Text>
              </View>
            );
          }
        } else {
          return (
            <View sx={{alignItems: 'center'}}>
              <Bubbles size={10} color="#FFF" />
              <Text
                variant="body_thick"
                sx={{color: 'layout_1', mb: '$4', mt: '$2'}}>
                Checking {token0Details.name} balance
              </Text>
            </View>
          );
        }
      }

      return (
        <View variant="layout.info_popup">
          <Text
            variant="heading_thick"
            sx={{color: 'layout_1', mt: '$4', mb: '$8'}}>
            Balance Check
          </Text>
          <Token0Balance />
        </View>
      );
    }

    return (
      <SquircleView
        style={sxCustom({
          width: windowWidth - 40,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginVertical: '$2',
        })}
        squircleParams={{
          cornerSmoothing: 1,
          cornerRadius: 15,
          fillColor: dripsytheme.colors.layout_4,
        }}>
        <SquircleView
          style={sxCustom({
            width: windowWidth - 80,
            height: 90,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: '$3',
          })}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 15,
            fillColor: dripsytheme.colors.layout_1 + '10',
          }}>
          <View sx={{flexDirection: 'column'}}>
            <TextInput
              numberOfLines={1}
              value={token0Amount}
              onChangeText={input => setToken0Amount(input)}
              keyboardType={'decimal-pad'}
              onEndEditing={() => {}}
              style={sxCustom({
                backgroundColor: 'transparent',
                ...dripsytheme.text.body_thick,
                color: dripsytheme.colors.layout_1,
                width: windowWidth / 2,
                height: 50,
                alignSelf: 'center',
                textAlign: 'left',
                paddingHorizontal: '$4',
              })}
              placeholder={'how much to swap?'}
              placeholderTextColor={dripsytheme.colors.layout_1 + 50}
            />
            <Text
              variant="text"
              sx={{
                color: 'layout_1',
                marginHorizontal: '$4',
              }}>
              $ {token0AmountFiat}
            </Text>
          </View>
          <Bounceable onPress={() => onOpenPickToken0()}>
            <View sx={{flexDirection: 'row', alignItems: 'center'}}>
              <StyledCircleFastImage25
                source={{
                  uri: token0Details.logoURI,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{backgroundColor: dripsytheme.colors.layout_1}}
              />
              <Text
                variant="body_thick"
                sx={{color: 'layout_1', marginHorizontal: '$2'}}>
                {token0Details.symbol}
              </Text>
            </View>
          </Bounceable>
        </SquircleView>
        <SquircleView
          style={sxCustom({
            width: windowWidth - 80,
            height: 90,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: '$3',
          })}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 15,
            fillColor: dripsytheme.colors.layout_1 + '10',
          }}>
          <View sx={{flexDirection: 'column'}}>
            <View
              sx={{
                height: 50,
                justifyContent: 'center',
              }}>
              <Text
                variant={'body_thick'}
                sx={{
                  ...dripsytheme.text.body_thick,
                  color: dripsytheme.colors.layout_1,
                  width: windowWidth / 2,
                  alignSelf: 'center',
                  textAlign: 'left',
                  paddingHorizontal: '$4',
                }}>
                {quoteDetails0x
                  ? Number(
                      Number(quoteDetails0x.buyAmount) *
                        10 ** -Number(token1Details.decimals),
                    ).toFixed(2)
                  : '0'}
              </Text>
            </View>
            {/* <TextInput
              numberOfLines={1}
              value={token1Amount}
              onChangeText={input => setToken1Amount(input)}
              keyboardType={'decimal-pad'}
              onEndEditing={() => {}}
              style={sxCustom({
                backgroundColor: 'transparent',
                ...dripsytheme.text.body_thick,
                color: dripsytheme.colors.layout_1,
                width: windowWidth / 2,
                height: 50,
                alignSelf: 'center',
                textAlign: 'left',
                paddingHorizontal: '$4',
              })}
              placeholder={'how much you will get'}
              placeholderTextColor={dripsytheme.colors.layout_1 + 50}
            /> */}
            <Text
              variant="text"
              sx={{
                color: 'layout_1',
                marginHorizontal: '$4',
              }}>
              $ {token1AmountFiat}
            </Text>
          </View>
          <Bounceable onPress={() => onOpenPickToken1()}>
            <View sx={{flexDirection: 'row', alignItems: 'center'}}>
              <StyledCircleFastImage25
                source={{
                  uri: token1Details.logoURI,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{backgroundColor: dripsytheme.colors.layout_1}}
              />
              <Text
                variant="body_thick"
                sx={{color: 'layout_1', marginHorizontal: '$2'}}>
                {token1Details.symbol}
              </Text>
            </View>
          </Bounceable>
        </SquircleView>
        <RenderDetail
          title={'exchange rate'}
          value={
            quoteDetails0x ? Number(quoteDetails0x.price).toFixed(2) : '- - -'
          }
        />
        <RenderDetail
          title={'transaction fee'}
          value={
            quoteDetails0x
              ? `$ ${Number(
                  Number(quoteDetails0x.gasPrice) *
                    Number(priceEth) *
                    Number(quoteDetails0x.gas) *
                    10 ** -18,
                ).toFixed(2)}`
              : '- - -'
          }
        />
        <SwapButton />
        <Modal
          visible={showBalanceCheckPopup}
          initialValue={0}
          useNativeDriver={true}
          modalStyle={{backgroundColor: 'transparent'}}
          modalAnimation={new ScaleAnimation()}
          onTouchOutside={() => {
            setShowBalanceCheckPopup(false);
            setPassedToken0BalCheck(false);
          }}>
          <ModalContent>
            <BalanceCheckPopup />
          </ModalContent>
        </Modal>
      </SquircleView>
    );
  }

  function FAQs() {
    function RenderFAQ({question, answer}) {
      const [faqExpanded, setFaqExpanded] = useState(false);
      return (
        <ExpandableSection
          top={false}
          expanded={faqExpanded}
          sectionHeader={
            <View
              variant="layout.sub_view_20_margin"
              sx={{
                borderRadius: 10,
                backgroundColor: 'layout_4',
                justifyContent: 'center',
                paddingVertical: '$4',
                marginVertical: '$2',
              }}>
              <Text
                variant="body_thick"
                sx={{color: 'layout_2', marginHorizontal: '$4'}}>
                {question}
              </Text>
            </View>
          }
          onPress={() => setFaqExpanded(!faqExpanded)}>
          <View
            variant="layout.sub_view_20_margin"
            sx={{
              backgroundColor: 'off_background',
              alignItems: 'center',
            }}>
            <Text
              variant="body"
              sx={{
                color: 'layout_2',
                opacity: 0.75,
                marginHorizontal: '$4',
                marginVertical: '$4',
              }}>
              {answer}
            </Text>
          </View>
        </ExpandableSection>
      );
    }

    let faqsHere = SwapFAQs;

    return (
      <View
        variant={'layout.sub_view_20_margin'}
        sx={{alignSelf: 'center', marginVertical: '$4'}}>
        <Text
          variant="heading_thick"
          sx={{
            color: 'layout_1',
            marginHorizontal: '$4',
            marginVertical: '$2',
          }}>
          FAQs
        </Text>
        {faqsHere.map((item, index) => (
          <RenderFAQ question={item.question} answer={item.answer} />
        ))}
      </View>
    );
  }

  return (
    <View variant="layout.full_screen">
      <HeaderHere />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={dripsytheme.colors.layout_1}
          />
        }>
        <SwapComponent />
        <FAQs />
        <SpacerVertical height={60} />
      </Animated.ScrollView>
      <Modalize
        ref={modalizePickToken0CoinRef}
        modalStyle={{
          backgroundColor: dripsytheme.colors.layout_4,
          width: windowWidth,
        }}
        flatListProps={{
          data: token0PickerList,
          renderItem: item => <Token0PickerItemComponent token={item} />,
          keyExtractor: item => item.heading,
          showsVerticalScrollIndicator: false,
          ListHeaderComponent: Token0PickerHeader(),
        }}
      />
      <Modalize
        ref={modalizePickToken1CoinRef}
        modalStyle={{
          backgroundColor: dripsytheme.colors.layout_4,
          width: windowWidth,
        }}
        flatListProps={{
          data: token1PickerList,
          renderItem: item => <Token1PickerItemComponent token={item} />,
          keyExtractor: item => item.heading,
          showsVerticalScrollIndicator: false,
          ListHeaderComponent: Token1PickerHeader(),
        }}
      />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(SwapScreen);
