import React, {useState} from 'react';
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

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function EarnInterestCompoundFinance() {
  const [amount, setAmount] = useState('');
  const [activeSections, setActiveSections] = useState([]);
  const navigation = useNavigation();

  const CryptosToBorrow = [
    {
      id: 0,
      title: 'Ethereum',
      main_icon: require('../../../../../assets/crypto_bitcoin_icon.png'),
      content: WalletDetailsDummy.cryptos,
      interest: '0.08%',
    },
    {
      id: 1,
      title: 'BAT',
      main_icon: require('../../../../../assets/token_t_icon.png'),
      content: WalletDetailsDummy.erc_tokens,
      interest: '0.26%',
    },
    {
      id: 2,
      title: 'USDC',
      main_icon: require('../../../../../assets/defi_key_icon.png'),
      content: [],
      interest: '3.07%',
    },
    {
      id: 3,
      title: 'USD Tether',
      main_icon: require('../../../../../assets/nfts_boredape_icon.png'),
      content: WalletDetailsDummy.nfts,
      interest: '3.24%',
    },
    {
      id: 4,
      title: 'DAI',
      main_icon: require('../../../../../assets/nfts_boredape_icon.png'),
      content: WalletDetailsDummy.nfts,
      interest: '2.97%',
    },
  ];

  function EnterAmountAndStake() {
    return (
      <View>
        <Text style={styles.block_title}>
          stake{' '}
          {
            CryptosToBorrow[
              activeSections[0] !== undefined ? activeSections[0] : 0
            ].title
          }{' '}
          to earn interest
        </Text>
        <SquircleView
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 7.5,
            fillColor: themeHere.colors.mid_ground + '25',
          }}
          style={styles.enter_amount_input_view}>
          <TextInput
            numberOfLines={1}
            onChangeText={setAmount}
            value={amount}
            style={styles.enter_amount_input}
            placeholder={`0.0 ${
              CryptosToBorrow[
                activeSections[0] !== undefined ? activeSections[0] : 0
              ].title
            }`}
            placeholderTextColor={themeHere.colors.foreground + 50}
          />
          <Text style={styles.enter_amount_input_fiat}>{amount * 3700}</Text>
        </SquircleView>
        <View style={styles.wallet_balances_view}>
          <Text style={styles.crypto_conversion_text}>
            ~ 1{' '}
            {
              CryptosToBorrow[
                activeSections[0] !== undefined ? activeSections[0] : 0
              ].title
            }{' '}
            = $ 3790
          </Text>
          <Text style={styles.wallet_balance_text}>
            my balance: 5.1{' '}
            {
              CryptosToBorrow[
                activeSections[0] !== undefined ? activeSections[0] : 0
              ].title
            }{' '}
            = $ 19329
          </Text>
        </View>
        <Button
          title={'deposit'}
          type={'solid'}
          containerStyle={styles.deposit_button_container}
          buttonStyle={styles.deposit_button_style}
          titleStyle={styles.deposit_button_title}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: [
              themeHere.colors.success_green_dark,
              themeHere.colors.success_green,
            ],
          }}
        />
      </View>
    );
  }

  function PoolMoreInfo() {
    return (
      <View style={{marginBottom: 30}}>
        <Text style={styles.block_title}>more details</Text>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}>
            annual interest % to earn
          </Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>3.07%</Text>
          </Text>
        </View>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}># of Suppliers</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>218405</Text>
          </Text>
        </View>
        <View style={styles.order_info_one_block_view}>
          <Text style={styles.order_info_title_text}># of Borrowers</Text>
          <Text style={styles.order_info_value_text}>
            <Text style={{color: themeHere.colors.foreground}}>2918</Text>
          </Text>
        </View>
      </View>
    );
  }

  function UpdateActiveSections(sections) {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  }

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

  function RenderContent(section) {
    return (
      <>
        <PoolMoreInfo />
        <EnterAmountAndStake />
      </>
    );
  }

  return (
    <View style={styles.parent_view}>
      <Accordion
        activeSections={activeSections}
        sections={CryptosToBorrow}
        renderHeader={RenderHeader}
        renderContent={RenderContent}
        onChange={UpdateActiveSections}
      />
    </View>
  );
}

export default EarnInterestCompoundFinance;

const styles = StyleSheet.create({
  parent_view: {},
  block_title: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
    marginHorizontal: 20,
    marginVertical: 30,
  },
  enter_amount_input_view: {
    width: windowWidth - 80,
    height: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  enter_amount_input: {
    backgroundColor: 'transparent',
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
    maxWidth: windowWidth * 0.5,
    marginHorizontal: 20,
  },
  enter_amount_input_fiat: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground,
    marginHorizontal: 20,
  },
  wallet_balances_view: {
    width: windowWidth - 80,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  crypto_conversion_text: {
    ...themeHere.text.caption,
    color: themeHere.colors.foreground + 50,
  },
  wallet_balance_text: {
    ...themeHere.text.caption,
    color: themeHere.colors.foreground + 50,
  },
  liquidation_price_text: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '50',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  order_info_one_block_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  order_info_title_text: {
    ...themeHere.text.caption,
    color: themeHere.colors.foreground + '50',
  },
  order_info_value_text: {
    ...themeHere.text.caption,
    color: themeHere.colors.foreground + '50',
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
