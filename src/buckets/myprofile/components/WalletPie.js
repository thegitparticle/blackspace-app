import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  Pressable,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {connect} from 'react-redux';
import Pie from 'react-native-pie';
import {WalletDetailsDummy} from '../DummyData';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function WalletPie() {
  let total_value = 0;
  let cryptos_value = 0;
  let tokens_value = 0;
  let defi_value = 0;
  let nfts_value = 0;
  let cryptos_percent = 0;
  let tokens_percent = 0;
  let defi_percent = 0;
  let nfts_percent = 0;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    total_value = Number(WalletDetailsDummy.total.value);
    for (let i = 0; i < WalletDetailsDummy.cryptos.length; i++) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      cryptos_value += Number(
        WalletDetailsDummy.cryptos[i].base_coverted_balance,
      );
    }
    for (let i = 0; i < WalletDetailsDummy.erc_tokens.length; i++) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      tokens_value += Number(
        WalletDetailsDummy.erc_tokens[i].base_coverted_balance,
      );
    }
    for (let i = 0; i < WalletDetailsDummy.nfts.length; i++) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      nfts_value += Number(WalletDetailsDummy.nfts[i].base_coverted_balance);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    cryptos_percent = (cryptos_value / total_value) * 100;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    tokens_percent = (tokens_value / total_value) * 100;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    nfts_percent = (nfts_value / total_value) * 100;

    // console.log(cryptos_value);
    // console.log(tokens_value);
    // console.log(nfts_value);
    // console.log(Math.trunc(cryptos_percent));
    // console.log(Math.trunc(tokens_percent));
    // console.log(Math.trunc(nfts_percent));
  }, []);

  return (
    <View style={styles.parent_view}>
      <Pie
        radius={120}
        innerRadius={60}
        sections={[
          {
            // percentage: Math.trunc(cryptos_percent),
            percentage: 37,
            color: themeHere.colors.yellow,
          },
          {
            // percentage: Math.trunc(tokens_percent),
            percentage: 3,
            color: themeHere.colors.blue_light,
          },
          {
            // percentage: Math.trunc(defi_percent),
            percentage: 1,
            color: themeHere.colors.red_light,
          },
          {
            // percentage: Math.trunc(nfts_percent),
            percentage: 58,
            color: themeHere.colors.purple_light,
          },
        ]}
        dividerSize={6}
        strokeCap={'butt'}
        backgroundColor={'#CCCCCC00'}
      />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(WalletPie);

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    width: windowWidth,
    justifyContent: 'center',
    marginVertical: 70,
  },
});
