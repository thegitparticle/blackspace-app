import React, {useEffect} from 'react';
import {StyleSheet, Dimensions, Appearance} from 'react-native';
import {View, Text} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {ethers} from 'ethers';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

// transaction to send ETH from one wallet to another
/*
  1. Variables needed - sendToAddress, sendAmount, sendErc20 (boolean), erc20Address (empty if eth),
 */
function SimpleEthereumTxnScreen({dispatch, route}) {
  const {sendToAddress, sendAmount, sendErc20, erc20Address} = route.params;

  const connector = useWalletConnect();

  const externalWallet = state_here.WDeetsReducer.wdeets.wallet_connected;
  const externalWalletName =
    state_here.WDeetsReducer.wdeets.wallet_connected_name;
  const externalWalletCurrentlyActive = connector.connected;

  const prov = new ethers.providers.JsonRpcProvider(
    'https://rinkeby.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
  );

  function ExecuteTransactionLocalTransaction() {
    let wallet = new ethers.Wallet(
      state_here.WDeetsReducer.wdeets.wallet_privateKey,
    );
    let walletSigner = wallet.connect(prov);

    let gas_price = prov.getGasPrice();

    console.log(gas_price);

    const tx = {
      from: state_here.WDeetsReducer.wdeets.wallet_address,
      to: String(sendToAddress),
      value: ethers.utils.parseEther(String(sendAmount)),
      nonce: prov.getTransactionCount(
        state_here.WDeetsReducer.wdeets.wallet_address,
        'latest',
      ),
      gasLimit: ethers.utils.hexlify(100000), // 100000
      gasPrice: gas_price,
    };

    walletSigner.sendTransaction(tx).then(transaction => {
      console.dir(transaction);
      alert('Transaction sent!');
    });
  }

  function ExecuteTransactionExternalTransaction() {
    let gas_price = prov.getGasPrice();

    let txData = {
      from: state_here.WDeetsReducer.wdeets.wallet_address,
      to: String(sendToAddress),
      gas: ethers.utils.hexlify(100000),
      gasPrice: gas_price,
      value: ethers.utils.parseEther(String(sendAmount)),
      data: '',
      nonce: prov.getTransactionCount(
        state_here.WDeetsReducer.wdeets.wallet_address,
        'latest',
      ),
    };

    connector
      .sendTransaction(txData)
      .then(info => console.log(info))
      .catch(e => console.log(e));
  }

  useEffect(() => {
    if (externalWallet) {
      setTimeout(() => {
        ExecuteTransactionExternalTransaction();
      }, 5000);
    } else {
      ExecuteTransactionLocalTransaction();
    }
  }, []);

  function RenderBody() {
    if (externalWallet) {
      return (
        <View sx={{alignItems: 'center', justifyContent: 'center'}}>
          <Text sx={{color: 'white'}}>
            Taking you to {externalWalletName} to make the transaction.
          </Text>
        </View>
      );
    } else {
      return (
        <View sx={{alignItems: 'center', justifyContent: 'center'}}>
          <Text sx={{color: 'white'}}>Transaction in process</Text>
        </View>
      );
    }
  }

  return (
    <View sx={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <RenderBody />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(SimpleEthereumTxnScreen);
