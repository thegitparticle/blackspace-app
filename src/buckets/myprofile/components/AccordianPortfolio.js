import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Appearance,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {connect} from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {WalletDetailsDummy} from '../DummyData';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Image, useSx, styled} from 'dripsy';
import {StyledFastImage25} from '../../../theme/DripsyTheme';
import {Bounceable} from 'rn-bounceable';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function AccordianPortfolio() {
  const [activeSections, setActiveSections] = useState([]);
  const navigation = useNavigation();

  let listTokens = state_here.MyTokenBalancesReducer.tokens;

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
          tokenBalance_decimal:
            (Number(state_here.MyProfileReducer.myProfileDetails.eth_balance) *
              10) ^
            18,
          token_price_usd:
            (Number(state_here.MyProfileReducer.myProfileDetails.eth_balance) *
              10) ^
            (18 * 2400),
        },
      ],
    },
    {
      id: 1,
      title: 'Tokens',
      main_icon: require('../../../../assets/token_t_icon.png'),
      content: listTokens,
    },
    // {
    //   id: 2,
    //   title: 'DeFi',
    //   main_icon: require('../../../../assets/defi_key_icon.png'),
    //   content: [],
    // },
    // {
    //   id: 3,
    //   title: 'NFTs',
    //   main_icon: require('../../../../assets/nfts_boredape_icon.png'),
    //   content: WalletDetailsDummy.nfts,
    // },
  ];

  function RenderHeader(section) {
    function IconShow() {
      if (section.id === activeSections[0]) {
        return (
          <Iconly
            name="ChevronUpBold"
            color={themeHere.colors.foreground}
            size={25}
          />
        );
      } else {
        return (
          <Iconly
            name="ChevronDownBold"
            color={themeHere.colors.foreground}
            size={25}
          />
        );
      }
    }

    return (
      <View
        variant="layout.sub_view_50_margin"
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

  function ItemHoldingAndPrice(item) {
    return (
      <View
        variant="layout.sub_view_50_margin"
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
              uri: item.logoURI,
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
            {item.name}
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
            {item.tokenBalance_decimal}
          </Text>
          <Text
            variant="caption"
            sx={{
              color: 'foreground',
              my: '$1',
              opacity: 0.5,
              textAlign: 'right',
            }}>
            ${item.token_price_usd}
          </Text>
        </View>
      </View>
    );
  }

  function NFTItemShow(item) {
    return (
      <Bounceable
        onPress={() =>
          navigation.navigate('NFTDetailedView', {
            nft_details: item,
          })
        }>
        <View
          variant="layout.sub_view_50_margin"
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
                uri: item.item_icon,
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
              {item.item_name}
            </Text>
          </View>
          <View
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Text
              variant="caption"
              sx={{
                color: 'red',
                my: '$1',
              }}>
              {item.item_balance}
            </Text>
            <Text
              variant="caption"
              sx={{
                color: 'foreground',
                my: '$1',
                opacity: 0.5,
              }}>
              ${item.base_coverted_balance}
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

  return (
    <View
      variant="layout.sub_view_20_margin"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background',
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
      <Accordion
        activeSections={activeSections}
        sections={SECTIONS}
        renderHeader={RenderHeader}
        renderContent={RenderContent}
        onChange={UpdateActiveSections}
      />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(AccordianPortfolio);
