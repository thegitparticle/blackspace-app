import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  TextInput,
  Animated,
  Image,
} from 'react-native';
import {Button} from 'react-native-elements';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {SquircleView} from 'react-native-figma-squircle';
import {WalletDetailsDummy} from '../../../../buckets/myprofile/DummyData';
import Accordion from 'react-native-collapsible/Accordion';
import {useNavigation} from '@react-navigation/native';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import LinearGradient from 'react-native-linear-gradient';
import Compound from '@compound-finance/compound-js';
import _ from 'lodash';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function BorrowCompoundFinance() {
  const [amount, setAmount] = useState('');
  const [activeSections, setActiveSections] = useState([]);
  const [poolsAndDetails, setPoolsAndDetails] = useState([]);

  const [detailsETH, setDetailsETH] = useState({});
  const [detailsBAT, setDetailsBAT] = useState({});
  const [detailsUSDC, setDetailsUSDC] = useState({});
  const [detailsUSDT, setDetailsUSDT] = useState({});
  const [detailsDAI, setDetailsDAI] = useState({});
  const [fetchedDetailsFromCompound, setFetchedDetailsFromCompound] =
    useState(false);

  const navigation = useNavigation();

  const poolsHeadersBorrowProduct = [
    {
      id: 0,
      title: 'Ethereum',
      symbol: 'ETH',
      main_icon: require('../../../../../assets/crypto_bitcoin_icon.png'),
    },
    {
      id: 1,
      title: 'BAT',
      symbol: 'BAT',
      main_icon: require('../../../../../assets/token_t_icon.png'),
    },
    {
      id: 2,
      title: 'USDC',
      symbol: 'USDC',
      main_icon: require('../../../../../assets/defi_key_icon.png'),
    },
    {
      id: 3,
      title: 'USD Tether',
      symbol: 'USDT',
      main_icon: require('../../../../../assets/nfts_boredape_icon.png'),
    },
    {
      id: 4,
      title: 'DAI',
      symbol: 'DAI',
      main_icon: require('../../../../../assets/nfts_boredape_icon.png'),
    },
  ];

  let pools = [
    Compound.cETH,
    Compound.cBAT,
    Compound.cUSDC,
    Compound.cUSDT,
    Compound.cDAI,
  ];

  useEffect(() => {
    (async function () {
      const cData = await Compound.api.cToken({
        addresses: Compound.util.getAddress(Compound.cETH),
      });
      setDetailsETH(cData);
    })().catch(console.error);

    (async function () {
      const cData = await Compound.api.cToken({
        addresses: Compound.util.getAddress(Compound.cBAT),
      });
      setDetailsBAT(cData);
    })().catch(console.error);

    (async function () {
      const cData = await Compound.api.cToken({
        addresses: Compound.util.getAddress(Compound.cUSDC),
      });
      setDetailsUSDC(cData);
    })().catch(console.error);

    (async function () {
      const cData = await Compound.api.cToken({
        addresses: Compound.util.getAddress(Compound.cUSDT),
      });
      setDetailsUSDT(cData);
    })().catch(console.error);

    (async function () {
      const cData = await Compound.api.cToken({
        addresses: Compound.util.getAddress(Compound.cDAI),
      });
      setDetailsDAI(cData);
    })().catch(console.error);

    setFetchedDetailsFromCompound(true);
  }, []);

  function PoolMoreInfoBorrowProduct(props) {
    let infoHere =
      props.Index === 0
        ? detailsETH
        : props.Index === 1
        ? detailsBAT
        : props.Index === 2
        ? detailsUSDC
        : props.Index === 3
        ? detailsUSDT
        : props.Index === 4
        ? detailsDAI
        : detailsETH;

    return (
      <View style={{marginBottom: 30}}>
        <Text style={styles.block_title}>borrowing details</Text>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}>
            interest to be paid (% annual)
          </Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>
              {(infoHere.cToken[0].borrow_rate.value * 100).toFixed(2)} %
            </Text>
          </Text>
        </View>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}>cToken name</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>
              {infoHere.cToken[0].symbol}
            </Text>
          </Text>
        </View>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}># of Suppliers</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>
              {infoHere.cToken[0].number_of_suppliers}
            </Text>
          </Text>
        </View>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}># of Borrowers</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>
              {infoHere.cToken[0].number_of_borrowers}
            </Text>
          </Text>
        </View>
      </View>
    );
  }

  function UpdateActiveSectionsBorrowProduct(sections) {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  }

  function RenderHeaderBorrowProduct(section) {
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
          <Image
            style={styles.listitem_icon}
            source={poolsHeadersBorrowProduct[section.id].main_icon}
          />
          <Text style={styles.listitem_title}>
            {poolsHeadersBorrowProduct[section.id].title}
          </Text>
        </View>
        <IconShow />
      </View>
    );
  }

  function RenderContentBorrowProduct(section) {
    if (fetchedDetailsFromCompound) {
      return (
        <>
          <PoolMoreInfoBorrowProduct Index={section.id} />
        </>
      );
    } else {
      return <View />;
    }
  }

  return (
    <View style={styles.parent_view}>
      <Accordion
        activeSections={activeSections}
        sections={poolsHeadersBorrowProduct}
        renderHeader={RenderHeaderBorrowProduct}
        renderContent={RenderContentBorrowProduct}
        onChange={UpdateActiveSectionsBorrowProduct}
      />
    </View>
  );
}

export default BorrowCompoundFinance;

const styles = StyleSheet.create({
  parent_view: {},
  block_title: {
    ...themeHere.text.subhead_medium,
    color: themeHere.colors.foreground,
    marginHorizontal: 20,
    marginVertical: 30,
  },
  order_info_one_block_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  order_info_title_text: {
    ...themeHere.text.body,
    color: themeHere.colors.foreground + '75',
  },
  order_info_value_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '75',
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
  deposit_button_container: {
    marginVertical: 30,
    alignSelf: 'center',
  },
  deposit_button_style: {
    width: windowWidth * 0.5,
    height: 50,
    borderRadius: 25,
  },
  deposit_button_title: {
    ...themeHere.text.body_medium,
    color: 'white',
  },
});
