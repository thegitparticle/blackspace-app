import React, {useEffect, useMemo, useState} from 'react';
import {Appearance, Dimensions, StyleSheet, Text, View} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {PrizePoolNetwork} from '@pooltogether/v4-client-js';
import {mainnet} from '@pooltogether/v4-pool-data';
import {ethers} from 'ethers';
import {connect} from 'react-redux';
import Compound from '@compound-finance/compound-js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

const prov = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

const providers = {
  1: prov,
  137: new ethers.providers.JsonRpcProvider('https://polygon-rpc.com'),
  // Avalanche
  43114: new ethers.providers.JsonRpcProvider(
    'https://api.avax.network/ext/bc/C/rpc',
  ),
};

function PoolTogetherUsageShowCase() {
  const [poolNetwork, setPoolNetwork] = useState();
  const [ptBalance, setPtBalance] = useState();

  const PrizePoolNtk = useMemo(
    () => new PrizePoolNetwork(providers, mainnet),
    [],
  );

  const prizePool = PrizePoolNtk.getPrizePool(
    1,
    '0xd89a09084555a7D0ABe7B111b1f78DFEdDd638Be',
  );

  useEffect(() => {
    (async function () {
      const balances = await PrizePoolNtk.getUsersPrizePoolBalances(
        '0x44bcd89D8534970351969CAbdb82D9CDAe07F9c0',
      ).catch(e => console.log(e));
      setPtBalance(balances);
      console.log(balances[0].balances);
      console.log(balances[1].balances);
      console.log(balances[2].balances);
    })().catch(console.error);
  }, [PrizePoolNtk]);

  return (
    <View style={styles.parent_view}>
      <Text style={{color: 'orange'}}>are you using this?</Text>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(PoolTogetherUsageShowCase);

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
