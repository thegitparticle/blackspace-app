import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {connect} from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {WalletDetailsDummy} from '../DummyData';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function AccordianPortfolio() {
  const [activeSections, setActiveSections] = useState([]);
  const navigation = useNavigation();

  const SECTIONS = [
    {
      id: 0,
      title: 'Cryptocurrencies',
      main_icon: require('../../../../assets/crypto_bitcoin_icon.png'),
      content: WalletDetailsDummy.cryptos,
    },
    {
      id: 1,
      title: 'Tokens',
      main_icon: require('../../../../assets/token_t_icon.png'),
      content: WalletDetailsDummy.erc_tokens,
    },
    {
      id: 2,
      title: 'DeFi',
      main_icon: require('../../../../assets/defi_key_icon.png'),
      content: [],
    },
    {
      id: 3,
      title: 'NFTs',
      main_icon: require('../../../../assets/nfts_boredape_icon.png'),
      content: WalletDetailsDummy.nfts,
    },
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
      <View style={styles.listitem_view}>
        <View style={styles.listitem_leftside_view}>
          <Image style={styles.listitem_icon} source={section.main_icon} />
          <Text style={styles.listitem_title}>{section.title}</Text>
        </View>
        <IconShow />
      </View>
    );
  }

  function ItemHoldingAndPrice(item) {
    return (
      <View style={styles.itemholding_view}>
        <View style={styles.itemholding_leftside_view}>
          <FastImage
            style={styles.itemholding_icon}
            source={{uri: item.item_icon, priority: FastImage.priority.normal}}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.itemholding_title}>{item.item_name}</Text>
        </View>
        <View style={styles.itemholding_rightside_view}>
          <Text style={styles.itemholding_balance}>{item.item_balance}</Text>
          <Text style={styles.itemholding_converted_balance}>
            ${item.base_coverted_balance}
          </Text>
        </View>
      </View>
    );
  }

  function NFTItemShow(item) {
    return (
      <TouchableOpacity
        style={styles.itemholding_view}
        onPress={() =>
          navigation.navigate('NFTDetailedView', {
            nft_details: item,
          })
        }>
        <View style={styles.itemholding_leftside_view}>
          <FastImage
            style={styles.itemholding_icon}
            source={{uri: item.item_icon, priority: FastImage.priority.normal}}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.itemholding_title}>{item.item_name}</Text>
        </View>
        <View style={styles.itemholding_rightside_view}>
          <Text style={styles.itemholding_balance}>{item.item_balance}</Text>
          <Text style={styles.itemholding_converted_balance}>
            ${item.base_coverted_balance}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  function RenderContent(section) {
    if (section.title !== 'NFTs') {
      return (
        <View style={styles.expanded_content_view}>
          {section.content.map(item => ItemHoldingAndPrice(item))}
        </View>
      );
    } else {
      return (
        <View style={styles.expanded_content_view}>
          {section.content.map(item => NFTItemShow(item))}
        </View>
      );
    }
  }

  function UpdateActiveSections(sections) {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  }

  return (
    <View style={styles.parent_view}>
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

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    width: windowWidth - 40,
    justifyContent: 'center',
    backgroundColor: themeHere.colors.background,
    shadowColor: themeHere.colors.mid_ground,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.17,
    shadowRadius: 40,
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 40,
  },
  listitem_view: {
    width: windowWidth - 90,
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  listitem_leftside_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listitem_icon: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
  listitem_title: {
    ...themeHere.text.subhead_medium,
    color: themeHere.colors.foreground,
    marginHorizontal: 25,
  },
  expanded_content_view: {
    backgroundColor: themeHere.colors.off_background,
    width: windowWidth - 40,
    alignItems: 'center',
  },
  itemholding_view: {
    width: windowWidth - 90,
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemholding_leftside_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemholding_icon: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
  itemholding_title: {
    ...themeHere.text.subhead_medium,
    color: themeHere.colors.foreground,
    marginHorizontal: 25,
  },
  itemholding_rightside_view: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemholding_balance: {
    ...themeHere.text.caption,
    color: themeHere.colors.red,
    marginVertical: 2.5,
  },
  itemholding_converted_balance: {
    ...themeHere.text.caption,
    color: themeHere.colors.foreground + '50',
    marginVertical: 2.5,
  },
});
