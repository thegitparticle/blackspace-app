import {useNavigation} from '@react-navigation/native';
import {Text, useSx, View} from 'dripsy';
import {BigNumber, ethers} from 'ethers';
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SvgUri} from 'react-native-svg';
import {ExpandableSection} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import {Bounceable} from 'rn-bounceable';
import useEthFiatPrice from '../../../../../helpers/useEthFiatPrice';
import useMaticFiatPrice from '../../../../../helpers/useMaticFiatPrice';
import Iconly from '../../../../../miscsetups/customfonts/Iconly';
import {
  dripsytheme,
  StyledCircleFastImage25,
} from '../../../../../theme/DripsyTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let state_here = {};

function AccordianPortfolioETH() {
  const navigation = useNavigation();
  const sxCustom = useSx();

  const [maticOnPolygonBalance, setMaticOnPolygonBalance] = useState(0);
  let listTokens = state_here.MyTokenBalancesReducer.tokens;

  async function GetBalanceFromChainsDirectly() {
    const prov = new ethers.providers.JsonRpcProvider(
      'https://rinkeby.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
    );

    await prov
      .getBalance(state_here.WDeetsReducer.wdeets.wallet_address)
      .then(result =>
        console.log(
          'eth balance on rinkeby ' +
            ethers.utils.formatEther(
              BigNumber.from(JSON.parse(result).toString()),
            ),
        ),
      );
  }

  let myNfts = state_here.MyNFTsReducer.mynfts;

  const [myNftsRefined, setMyNftsRefined] = useState([]);
  const [myNftsRefinedKeys, setMyNftsRefinedKeys] = useState([]);

  const myNftsRefinedList = myNfts.reduce(
    (
      newList,
      {collection_name, title, description, media, contract_address},
    ) => {
      (newList[collection_name] = newList[collection_name] || []).push({
        collection_name,
        title,
        description,
        media,
        contract_address,
      });
      return newList;
    },
    {},
  );

  useEffect(() => {
    GetBalanceFromChainsDirectly();
    setMyNftsRefined(myNftsRefinedList);
  }, [myNfts]);

  useEffect(() => {
    setMyNftsRefinedKeys(Object.keys(myNftsRefined));
  }, [myNftsRefined]);

  const {loadingEth, priceEth} = useEthFiatPrice();
  const {loadingMatic, priceMatic} = useMaticFiatPrice();

  const SECTIONS = [
    {
      id: 0,
      title: 'Cryptocurrencies',
      main_icon: require('../../../../../../assets/crypto_bitcoin_icon.png'),
      content: [
        {
          name: 'Ethereum',
          symbol: 'ETH',
          logoURI:
            'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png?1595348880',
          tokenBalance_decimal: (
            Number(state_here.MyProfileReducer.myProfileDetails.eth_balance) *
            10 ** -18
          ).toFixed(4),
          token_price_usd:
            Number(state_here.MyProfileReducer.myProfileDetails.eth_balance) *
            10 ** -18 *
            Number(priceEth),
        },
        {
          name: 'Polygon',
          symbol: 'MATIC',
          logoURI:
            'https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912',
          tokenBalance_decimal: Number(maticOnPolygonBalance).toFixed(4),
          token_price_usd: Number(maticOnPolygonBalance) * Number(priceMatic),
        },
      ],
    },
    {
      id: 1,
      title: 'Tokens',
      main_icon: require('../../../../../../assets/token_t_icon.png'),
      content: listTokens,
    },
    {
      id: 3,
      title: 'NFTs',
      main_icon: require('../../../../../../assets/nfts_boredape_icon.png'),
      content: myNftsRefinedKeys,
    },
  ];

  function RenderHeader(section, expanded) {
    function IconShow() {
      if (expanded) {
        return (
          <Iconly
            name="ChevronDownBroken"
            color={dripsytheme.colors.layout_1}
            size={25}
          />
        );
      } else {
        return (
          <Iconly
            name="ChevronRightBroken"
            color={dripsytheme.colors.layout_1}
            size={25}
          />
        );
      }
    }

    return (
      <View
        variant="layout.sub_view_40_margin"
        sx={{
          height: 75,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'layout_4',
        }}>
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <StyledCircleFastImage25
            source={section.main_icon}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text
            variant="body_thick"
            sx={{
              color: 'layout_1',
              mx: '$5',
            }}>
            {section.title}
          </Text>
        </View>
        <IconShow />
      </View>
    );
  }

  // crypto currencies & tokens item component
  function ItemHoldingAndPrice(props) {
    return (
      <View
        variant="layout.sub_view_40_margin"
        sx={{
          height: 75,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <StyledCircleFastImage25
            source={{
              uri: props.item.logoURI,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text
            variant="body_thick"
            sx={{
              color: 'layout_1',
              mx: '$5',
            }}>
            {props.item.name}
          </Text>
        </View>
        <View
          sx={{
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
          }}>
          <Text
            variant="caption"
            sx={{
              color: 'brand_blue',
              my: '$1',
              textAlign: 'right',
            }}>
            {props.item.tokenBalance_decimal}
          </Text>
          <Text
            variant="caption"
            sx={{
              color: 'layout_1',
              my: '$1',
              opacity: 0.5,
              textAlign: 'right',
            }}>
            ${props.item.token_price_usd}
          </Text>
        </View>
      </View>
    );
  }

  // nfts item component
  function NFTProjectItemShow(props) {
    const [expandedProjectHoldings, setExpandedProjectHoldings] =
      useState(false);

    const allNftsOfThisProject = myNftsRefined[props.item];

    function RenderProjectName() {
      function IconShow() {
        if (expandedProjectHoldings) {
          return (
            <Iconly
              name="ChevronDownBroken"
              color={dripsytheme.colors.layout_1}
              size={25}
            />
          );
        } else {
          return (
            <Iconly
              name="ChevronRightBroken"
              color={dripsytheme.colors.layout_1}
              size={25}
            />
          );
        }
      }

      return (
        <Bounceable
          onPress={() =>
            // navigation.navigate('NFTDetailedView', {
            //   nft_details: props.item,
            // })
            setExpandedProjectHoldings(!expandedProjectHoldings)
          }>
          <View
            sx={{
              flexDirection: 'row',
              windowWidth: windowWidth * 0.8,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: '$4',
            }}>
            <Text
              variant="body_thick"
              sx={{
                color: 'layout_1',
                mx: '$5',
              }}>
              {props.item.substring(0, 20)}
            </Text>
            <View
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: '$4',
              }}>
              <Text
                variant="body_thick"
                sx={{
                  color: 'layout_1',
                }}>
                {allNftsOfThisProject.length}
              </Text>
              <IconShow />
            </View>
          </View>
        </Bounceable>
      );
    }

    function RenderAllProjectNFTsAfterSortingRows() {
      let splitLists = _.chunk(allNftsOfThisProject, 2);

      return (
        <View>
          {splitLists.map((list, key) => (
            <RenderNFTRow RowNFTs={list} />
          ))}
        </View>
      );
    }

    function RenderNFTRow(props) {
      if (props.RowNFTs.length === 1) {
        return (
          <View
            sx={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginVertical: '$2',
              marginHorizontal: '$4',
            }}>
            <RenderNFTThumbnail NFTDetails={props.RowNFTs[0]} />
          </View>
        );
      } else {
        return (
          <View
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginVertical: '$2',
            }}>
            <RenderNFTThumbnail NFTDetails={props.RowNFTs[0]} />
            <RenderNFTThumbnail NFTDetails={props.RowNFTs[1]} />
          </View>
        );
      }
    }

    function RenderNFTThumbnail(props) {
      if (_.endsWith(props.NFTDetails.media[0].gateway, 'svg')) {
        return (
          <Bounceable
            onPress={() =>
              navigation.navigate('NFTDetailedView', {
                nft_details: props.NFTDetails,
              })
            }>
            <View
              sx={{
                width: windowWidth * 0.35,
                height: windowWidth * 0.35,
                borderRadius: 10,
                position: 'absolute',
                backgroundColor: 'layout_3',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                variant="caption"
                sx={{
                  color: 'layout_1',
                  mx: '$5',
                }}>
                {props.NFTDetails.title}
              </Text>
            </View>
            <View
              sx={{
                width: windowWidth * 0.35,
                height: windowWidth * 0.35,
                borderRadius: 10,
              }}>
              <SvgUri
                width="100%"
                height="100%"
                uri={props.NFTDetails.media[0].gateway}
              />
            </View>
          </Bounceable>
        );
      } else {
        return (
          <Bounceable
            onPress={() =>
              navigation.navigate('NFTDetailedView', {
                nft_details: props.NFTDetails,
              })
            }>
            <View
              sx={{
                width: windowWidth * 0.35,
                height: windowWidth * 0.35,
                borderRadius: 10,
                position: 'absolute',
                backgroundColor: 'layout_3',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                variant="caption"
                sx={{
                  color: 'layout_1',
                  mx: '$5',
                }}>
                {props.NFTDetails.title}
              </Text>
            </View>
            <FastImage
              style={sxCustom({
                width: windowWidth * 0.35,
                height: windowWidth * 0.35,
                borderRadius: 10,
              })}
              source={{
                uri: props.NFTDetails.media[0].gateway,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </Bounceable>
        );
      }
    }

    return (
      <ExpandableSection
        top={false}
        expanded={expandedProjectHoldings}
        sectionHeader={RenderProjectName()}>
        <RenderAllProjectNFTsAfterSortingRows />
      </ExpandableSection>
    );
  }

  const [expandedCryptoCurrencies, setExpandedCryptoCurrencies] =
    useState(false);
  const [expandedTokens, setExpandedTokens] = useState(false);
  const [expandedNfts, setExpandedNfts] = useState(false);

  return (
    <View
      variant="layout.sub_view_20_margin"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'layout_4',
        shadowColor: 'layout_3',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.17,
        shadowRadius: 40,
        alignSelf: 'center',
        borderRadius: 15,
        mb: '$8',
      }}>
      <ExpandableSection
        top={false}
        expanded={expandedCryptoCurrencies}
        sectionHeader={RenderHeader(SECTIONS[0], expandedCryptoCurrencies)}
        onPress={() => setExpandedCryptoCurrencies(!expandedCryptoCurrencies)}>
        {SECTIONS[0].content.map((item, key) => (
          <View
            variant="layout.sub_view_20_margin"
            sx={{
              backgroundColor: 'layout_4',
              alignItems: 'center',
            }}>
            <ItemHoldingAndPrice item={item} />
          </View>
        ))}
      </ExpandableSection>
      <ExpandableSection
        top={false}
        expanded={expandedTokens}
        sectionHeader={RenderHeader(SECTIONS[1], expandedTokens)}
        onPress={() => setExpandedTokens(!expandedTokens)}>
        {SECTIONS[1].content.map((item, key) => (
          <View
            variant="layout.sub_view_20_margin"
            sx={{
              backgroundColor: 'layout_4',
              alignItems: 'center',
            }}>
            <ItemHoldingAndPrice item={item} />
          </View>
        ))}
      </ExpandableSection>
      <ExpandableSection
        top={false}
        expanded={expandedNfts}
        sectionHeader={RenderHeader(SECTIONS[2], expandedNfts)}
        onPress={() => setExpandedNfts(!expandedNfts)}>
        {SECTIONS[2].content.map((item, key) => (
          <View variant="layout.sub_view_20_margin">
            <NFTProjectItemShow item={item} />
          </View>
        ))}
      </ExpandableSection>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(AccordianPortfolioETH);
