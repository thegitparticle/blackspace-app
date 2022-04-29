import React, {useEffect, useState} from 'react';
import {Appearance, Dimensions} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {connect} from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {Image, Text, useSx, View} from 'dripsy';
import {StyledFastImage25} from '../../../theme/DripsyTheme';
import {Bounceable} from 'rn-bounceable';
import useEthFiatPrice from '../../../helpers/useGetEthFiatPrice';
import {ExpandableSection} from 'react-native-ui-lib';
import _ from 'lodash';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function AccordianPortfolio() {
  const navigation = useNavigation();
  const sxCustom = useSx();

  let listTokens = state_here.MyTokenBalancesReducer.tokens;
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
    setMyNftsRefined(myNftsRefinedList);
  }, [myNfts]);

  useEffect(() => {
    setMyNftsRefinedKeys(Object.keys(myNftsRefined));
  }, [myNftsRefined]);

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
      content: myNftsRefinedKeys,
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
  function NFTProjectItemShow(props) {
    const [expandedProjectHoldings, setExpandedProjectHoldings] =
      useState(false);

    const allNftsOfThisProject = myNftsRefined[props.item];

    function RenderProjectName() {
      return (
        <Bounceable
          onPress={() =>
            // navigation.navigate('NFTDetailedView', {
            //   nft_details: props.item,
            // })
            setExpandedProjectHoldings(!expandedProjectHoldings)
          }>
          <Text
            variant="subhead_medium"
            sx={{
              color: 'foreground',
              mx: '$5',
            }}>
            {props.item}
          </Text>
        </Bounceable>
      );
    }

    function RenderAllProjectNFTsAfterSortingRows() {
      let nftsCount = allNftsOfThisProject.length;
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
              backgroundColor: 'red',
            }}>
            <RenderNFTThumbnail NFTDetails={props.RowNFTs[0]} />
          </View>
        );
      } else {
        return (
          <View sx={{flexDirection: 'row'}}>
            <RenderNFTThumbnail NFTDetails={props.RowNFTs[0]} />
            <RenderNFTThumbnail NFTDetails={props.RowNFTs[1]} />
          </View>
        );
      }
    }

    function RenderNFTThumbnail(props) {
      return (
        <Bounceable
          onPress={() =>
            navigation.navigate('NFTDetailedView', {
              nft_details: props.NFTDetails,
            })
          }>
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
        expanded={expandedNfts}
        sectionHeader={RenderHeader(SECTIONS[2], expandedNfts)}
        onPress={() => setExpandedNfts(!expandedNfts)}>
        {SECTIONS[2].content.map((item, key) => (
          <View
            variant="layout.sub_view_20_margin"
            sx={{
              backgroundColor: 'off_background',
              alignItems: 'center',
            }}>
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

export default connect(mapStateToProps)(AccordianPortfolio);
