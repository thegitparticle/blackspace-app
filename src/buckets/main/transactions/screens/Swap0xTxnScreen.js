import React, {useEffect} from 'react';
import {StyleSheet, Dimensions, Appearance} from 'react-native';
import {View, Text} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {connect} from 'react-redux';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {ethers} from 'ethers';
import Web3 from 'web3';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://ropsten.infura.io/v3/a2d69eb319254260ab3cef34410256ca`,
  ),
);

function Swap0xTxnScreen({dispatch, route}) {
  const {
    Token0Coin,
    Token1Coin,
    Token0Amount,
    Token1Amount,
    Token1Fiat,
    Amount,
    MemeCoinSwap,
  } = route.params;

  const connector = useWalletConnect();

  const externalWallet = state_here.WDeetsReducer.wdeets.wallet_connected;
  const externalWalletName =
    state_here.WDeetsReducer.wdeets.wallet_connected_name;
  const externalWalletCurrentlyActive = connector.connected;

  // until the api from server adds decimals field to tokens use this default value
  let decimals = 18;

  async function ExecuteSwapLocalTransaction() {
    // WEB3 JS
    // Creating a signing account from a private key
    const signer = web3.eth.accounts.privateKeyToAccount(
      state_here.WDeetsReducer.wdeets.wallet_privateKey,
    );
    web3.eth.accounts.wallet.add(signer);

    console.log(Token1Coin);

    let sellToken =
      Token0Coin.symbol === 'ETH' ? 'ETH' : Token0Coin.contractAddress;

    let buyToken = Token1Coin.symbol === 'ETH' ? 'ETH' : Token1Coin.address;

    console.log(
      `https://api.0x.org/swap/v1/quote?sellToken=${sellToken}&buyToken=${buyToken}&buyAmount=${
        Number(Token1Amount) * 10 ** Number(decimals)
      }&takerAddress=${state_here.WDeetsReducer.wdeets.wallet_address}`,
    );

    // Fetch quote from 0x API
    const response = await fetch(
      `https://api.0x.org/swap/v1/quote?sellToken=${sellToken}&buyToken=${buyToken}&buyAmount=${
        Number(Token1Amount) * 10 ** Number(decimals)
      }&takerAddress=${state_here.WDeetsReducer.wdeets.wallet_address}`,
    );

    // dai on ropsten - 0x65600c50Ea42e225368Ded6c3789a539284aA62C &&  WETH - 0xbCA556c912754Bc8E7D4Aad20Ad69a1B1444F42d

    // // Fetch quote from 0x API
    // const response = await fetch(
    //   `https://ropsten.api.0x.org/swap/v1/quote?sellToken=0xbCA556c912754Bc8E7D4Aad20Ad69a1B1444F42d&buyToken=0x65600c50Ea42e225368Ded6c3789a539284aA62C&buyAmount=${
    //     Number(Token1Amount) * 10 ** Number(decimals)
    //   }&takerAddress=${state_here.WDeetsReducer.wdeets.wallet_address}`,
    // );

    const quote = await response.json();

    console.log(quote);

    // web3 js signing transactions

    let signedTx = await web3.eth.accounts
      .signTransaction(quote, signer.privateKey)
      .catch(e => console.log(e));

    // web3 js transaction sending
    web3.eth
      .sendSignedTransaction(signedTx.rawTransaction)
      .then(txhash => {
        console.log(txhash);
        alert('Swap sent! Tokens will appear in a minute.');
      })
      .catch(e => console.log(e));
  }

  async function ExecuteSwapExternalTransaction() {
    // WEB3 JS
    // Creating a signing account from a private key
    const signer = web3.eth.accounts.privateKeyToAccount(
      state_here.WDeetsReducer.wdeets.wallet_privateKey,
    );
    web3.eth.accounts.wallet.add(signer);

    let sellToken =
      Token0Coin.symbol === 'ETH' ? 'ETH' : Token0Coin.contractAddress;

    let buyToken = Token1Coin.symbol === 'ETH' ? 'ETH' : Token1Coin.address;

    // Fetch quote from 0x API
    const response = await fetch(
      `https://ropsten.api.0x.org/swap/v1/quote?sellToken=${sellToken}&buyToken=${buyToken}&buyAmount=${
        Number(Token1Amount) * 10 ** Number(decimals)
      }&takerAddress=${state_here.WDeetsReducer.wdeets.wallet_address}`,
    );
    const quote = await response.json();

    // // web3 js signing transactions
    //
    // let signedTx = await web3.eth.accounts
    //   .signTransaction(quote, signer.privateKey)
    //   .catch(e => console.log(e));
    //
    // // web3 js transaction sending
    // web3.eth
    //   .sendSignedTransaction(signedTx.rawTransaction)
    //   .then(txhash => {
    //     console.log(txhash);
    //     alert('Swap sent! Tokens will appear in a minute.');
    //   })
    //   .catch(e => console.log(e));

    connector
      .sendTransaction(quote)
      .then(info => console.log(info))
      .catch(e => console.log(e));
  }

  useEffect(() => {
    if (externalWallet) {
      setTimeout(() => {
        ExecuteSwapExternalTransaction();
      }, 5000);
    } else {
      ExecuteSwapLocalTransaction();
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

export default connect(mapStateToProps)(Swap0xTxnScreen);
