import React, {useEffect, useState} from 'react';
import {Appearance, Dimensions} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {connect} from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {Image, Text, View} from 'dripsy';
import {StyledFastImage25} from '../../../theme/DripsyTheme';
import {Bounceable} from 'rn-bounceable';
import useEthFiatPrice from '../../../helpers/useGetEthFiatPrice';
import {WalletDetailsDummy} from '../DummyData';
import {ListItem, Avatar} from 'react-native-elements';
import {ExpandableSection} from 'react-native-ui-lib';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function AccordianPortfolio() {
  const [activeSections, setActiveSections] = useState([]);
  const navigation = useNavigation();

  let listTokens = state_here.MyTokenBalancesReducer.tokens;
  let myNfts = state_here.MyNFTsReducer.mynfts;

  const [myNftsRefined, setMyNftsRefined] = useState([]);

  const myNftsRefinedList = myNfts.reduce((catsSoFar, item) => {
    if (!catsSoFar[item.collection_name]) catsSoFar[item.collection_name] = [];
    catsSoFar[item.collection_name].push(catsSoFar);
    return catsSoFar;
  }, {});

  console.log(myNftsRefinedList);

  useEffect(() => {
    setMyNftsRefined(myNftsRefinedList);
  }, [myNfts]);

  const {loadingEth, priceEth} = useEthFiatPrice();

  const SECTIONS = [
    {
      id: 0,
      title: 'Cryptocurrencies',
      main_icon: require('../../../../assets/crypto_bitcoin_icon.png'),
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
      ],
    },
    {
      id: 1,
      title: 'Tokens',
      main_icon: require('../../../../assets/token_t_icon.png'),
      content: listTokens,
    },
    {
      id: 3,
      title: 'NFTs',
      main_icon: require('../../../../assets/nfts_boredape_icon.png'),
      content: myNfts,
    },
  ];

  function RenderHeader(section, expanded) {
    function IconShow() {
      if (expanded) {
        return (
          <Iconly
            name="ChevronDownBroken"
            color={themeHere.colors.foreground}
            size={25}
          />
        );
      } else {
        return (
          <Iconly
            name="ChevronRightBroken"
            color={themeHere.colors.foreground}
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
          backgroundColor: 'off_background',
        }}>
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Image
            variant="images.small_icon_25_round"
            source={section.main_icon}
          />
          <Text
            variant="subhead_medium"
            sx={{
              color: 'foreground',
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
          <StyledFastImage25
            source={{
              uri: props.item.logoURI,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text
            variant="subhead_medium"
            sx={{
              color: 'foreground',
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
              color: 'red',
              my: '$1',
              textAlign: 'right',
            }}>
            {props.item.tokenBalance_decimal}
          </Text>
          <Text
            variant="caption"
            sx={{
              color: 'foreground',
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
  function NFTItemShow(item) {
    return (
      <Bounceable
        onPress={() =>
          navigation.navigate('NFTDetailedView', {
            nft_details: item,
          })
        }>
        <View
          variant="layout.sub_view_20_margin"
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
            <StyledFastImage25
              source={{
                uri: item.media[0].gateway,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text
              variant="subhead_medium"
              sx={{
                color: 'foreground',
                mx: '$5',
              }}>
              {item.title}
            </Text>
          </View>
        </View>
      </Bounceable>
    );
  }

  function RenderContent(section) {
    if (section.title !== 'NFTs') {
      return (
        <View
          variant="layout.sub_view_20_margin"
          sx={{
            backgroundColor: 'off_background',
            alignItems: 'center',
          }}>
          {section.content.map(item => ItemHoldingAndPrice(item))}
        </View>
      );
    } else {
      return (
        <View
          variant="layout.sub_view_20_margin"
          sx={{
            backgroundColor: 'off_background',
            alignItems: 'center',
          }}>
          {section.content.map(item => NFTItemShow(item))}
        </View>
      );
    }
  }

  function UpdateActiveSections(sections) {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  }

  const [expandedCryptoCurrencies, setExpandedCryptoCurrencies] =
    useState(false);
  const [expandedTokens, setExpandedTokens] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <View
      variant="layout.sub_view_20_margin"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'off_background',
        shadowColor: 'mid_ground',
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
      {/*<ListItem.Accordion*/}
      {/*  content={*/}
      {/*    <>*/}
      {/*      <ListItem.Content>*/}
      {/*        <ListItem.Title*/}
      {/*          style={{*/}
      {/*            color: themeHere.colors.foreground,*/}
      {/*            ...themeHere.text.header_bold,*/}
      {/*          }}>*/}
      {/*          List Accordion*/}
      {/*        </ListItem.Title>*/}
      {/*      </ListItem.Content>*/}
      {/*    </>*/}
      {/*  }*/}
      {/*  containerStyle={{*/}
      {/*    backgroundColor: themeHere.colors.off_background,*/}
      {/*    width: windowWidth - 80,*/}
      {/*    color: themeHere.colors.foreground,*/}
      {/*  }}*/}
      {/*  isExpanded={expanded}*/}
      {/*  icon={*/}
      {/*    <Iconly*/}
      {/*      name="ChevronDownBroken"*/}
      {/*      color={themeHere.colors.foreground}*/}
      {/*      size={25}*/}
      {/*    />*/}
      {/*  }*/}
      {/*  onPress={() => {*/}
      {/*    setExpanded(!expanded);*/}
      {/*  }}>*/}
      {/*  {SECTIONS[0].content.map((l, i) => (*/}
      {/*    <ListItem key={i} bottomDivider>*/}
      {/*      <ItemHoldingAndPrice item={l} />*/}
      {/*    </ListItem>*/}
      {/*  ))}*/}
      {/*</ListItem.Accordion>*/}
      <ExpandableSection
        top={false}
        expanded={expandedCryptoCurrencies}
        sectionHeader={RenderHeader(SECTIONS[0], expandedCryptoCurrencies)}
        onPress={() => setExpandedCryptoCurrencies(!expandedCryptoCurrencies)}>
        {SECTIONS[0].content.map((item, key) => (
          <View
            variant="layout.sub_view_20_margin"
            sx={{
              backgroundColor: 'off_background',
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
              backgroundColor: 'off_background',
              alignItems: 'center',
            }}>
            <ItemHoldingAndPrice item={item} />
          </View>
        ))}
      </ExpandableSection>
      <ExpandableSection
        top={false}
        expanded={expandedTokens}
        sectionHeader={RenderHeader(SECTIONS[2], expandedTokens)}
        onPress={() => setExpandedTokens(!expandedTokens)}>
        {SECTIONS[2].content.map((item, key) => (
          <View
            variant="layout.sub_view_20_margin"
            sx={{
              backgroundColor: 'off_background',
              alignItems: 'center',
            }}>
            {/*<NFTItemShow item={item} />*/}
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

export default connect(mapStateToProps)(AccordianPortfolio);
