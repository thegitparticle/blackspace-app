import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../theme/ButterTheme';
import {BigNumber, ethers} from 'ethers';
import {connect} from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

const network = 'rinkeby'; // use 'homested' for mainnet

let state_here = {};

function InfuraTestTransactionScreen() {
  const [weiBalance, setWeiBalance] = useState(0);
  const [ethBalanceString, setEthBalanceString] = useState('');

  const prov = new ethers.providers.JsonRpcProvider(
    'https://rinkeby.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
  );

  const provider = ethers.getDefaultProvider(network, {
    infura: {
      projectId: 'a2d69eb319254260ab3cef34410256ca',
      projectSecret: 'b50c6cc3ae3c49f09265264e91384fc7',
    },
  });

  async function FetchBalance() {
    const balance = await prov
      .getBalance(state_here.WDeetsReducer.wdeets.wallet_address)
      .then(r => {
        setWeiBalance(JSON.parse(r));
        setEthBalanceString(
          ethers.utils.formatEther(BigNumber.from(JSON.parse(r).toString())),
        );
      });
  }

  useEffect(() => {
    FetchBalance();
  }, []);

  return (
    <View style={styles.parent_view}>
      <Text style={styles.header_text}>ETH - Infura</Text>
      <Text style={styles.balance_text}>Balance - {ethBalanceString}</Text>
      <Text style={styles.balance_text}>Balance actual - {weiBalance}</Text>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(InfuraTestTransactionScreen);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.background,
  },
  header_text: {
    ...themeHere.text.title_3,
    color: 'white',
    marginVertical: 60,
  },
  balance_text: {
    ...themeHere.text.title_3,
    color: themeHere.colors.red,
    marginVertical: 60,
  },
});
