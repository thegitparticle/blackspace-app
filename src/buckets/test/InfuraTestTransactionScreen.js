import {BigNumber, ethers} from 'ethers';
import React, {useEffect, useState} from 'react';
import {Appearance, Dimensions, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {AddWDeets} from '../../redux/appcore/WDeetsActions';
import {ButterThemeDark, ButterThemeLight} from '../../theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

const network = 'rinkeby'; // use 'homested' for mainnet

let state_here = {};

function InfuraTestTransactionScreen({dispatch}) {
  const [weiBalance, setWeiBalance] = useState(0);
  const [ethBalanceString, setEthBalanceString] = useState('');

  const prov = new ethers.providers.JsonRpcProvider(
    'https://rinkeby.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
  );

  // const provider = ethers.getDefaultProvider(network, {
  //   infura: {
  //     projectId: 'a2d69eb319254260ab3cef34410256ca',
  //     projectSecret: 'b50c6cc3ae3c49f09265264e91384fc7',
  //   },
  // });

  async function FetchBalance() {
    const balance = await prov
      .getBalance(state_here.WDeetsReducer.wdeets.wallet_address)
      .then(r => {
        setWeiBalance(JSON.parse(r));
        setEthBalanceString(
          ethers.utils.formatEther(BigNumber.from(JSON.parse(r).toString())),
        );
        dispatch(
          AddWDeets({
            wallet_address: state_here.WDeetsReducer.wdeets.wallet_address,
            wallet_phrase: state_here.WDeetsReducer.wdeets.wallet_phrase,
            wallet_privateKey:
              state_here.WDeetsReducer.wdeets.wallet_privateKey,
            wallet_eth_balance: JSON.parse(r),
            wallet_eth_balance_readable_string: ethers.utils.formatEther(
              BigNumber.from(JSON.parse(r).toString()),
            ),
          }),
        );
      });
  }

  useEffect(() => {
    FetchBalance();
  }, []);

  function SendMoney() {
    let wallet = new ethers.Wallet(
      state_here.WDeetsReducer.wdeets.wallet_privateKey,
    );
    let walletSigner = wallet.connect(prov);

    let gas_price = prov.getGasPrice();

    console.log(gas_price);

    const tx = {
      from: state_here.WDeetsReducer.wdeets.wallet_address,
      to: '0x14a28bD398B5b282a363f53A2c28e0E8ed211469',
      value: ethers.utils.parseEther('0.01'),
      nonce: prov.getTransactionCount(
        state_here.WDeetsReducer.wdeets.wallet_address,
        'latest',
      ),
      gasLimit: ethers.utils.hexlify(100000), // 100000
      gasPrice: gas_price,
    };

    walletSigner.sendTransaction(tx).then(transaction => {
      console.dir(transaction);
      alert('Send finished!');
    });
  }

  return (
    <View style={styles.parent_view}>
      <Text style={styles.header_text}>ETH - Infura</Text>
      <Text style={styles.balance_text}>Balance - {ethBalanceString}</Text>
      <Text style={styles.balance_text}>Balance actual - {weiBalance}</Text>
      <TouchableOpacity style={styles.button_view} onPress={() => SendMoney()}>
        <Text style={{...themeHere.text.subhead_medium, color: 'white'}}>
          send
        </Text>
      </TouchableOpacity>
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
  button_view: {
    marginVertical: 20,
    width: windowWidth - 40,
    height: 50,
    borderRadius: 15,
    backgroundColor: themeHere.colors.off_background,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
