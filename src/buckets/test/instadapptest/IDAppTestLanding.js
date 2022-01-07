import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import Web3 from 'web3';
import DSA from 'dsa-connect';
import {connect} from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function IDAppTestLanding() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      'https://mainnet.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
    ),
  );

  const dsa = new DSA({
    web3: web3,
    mode: 'node',
    privateKey: state_here.WDeetsReducer.wdeets.wallet_privateKey,
  });

  useEffect(() => {
    dsa
      .build({
        gasPrice: 2800, // estimated gas price
        origin: state_here.WDeetsReducer.wdeets.wallet_address,
        authority: state_here.WDeetsReducer.wdeets.wallet_address,
        from: state_here.WDeetsReducer.wdeets.wallet_address,
      })
      .then(res1 => console.log(res1));
    dsa
      .getAccounts(state_here.WDeetsReducer.wdeets.wallet_address)
      .then(res2 => console.log(res2));
  }, []);

  return (
    <View style={styles.parent_view}>
      <Text style={styles.header_text}>ID App test</Text>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(IDAppTestLanding);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeHere.colors.background,
  },
  header_text: {
    ...themeHere.text.title_3,
    color: 'white',
    marginVertical: 60,
  },
});
