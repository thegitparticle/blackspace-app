import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {LOGIN} from '../../../redux/types';
import {connect} from 'react-redux';
import '@ethersproject/shims';
import {ethers} from 'ethers/src.ts/index';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function MakeWalletScreen({dispatch, navigation}) {
  const wallet = {
    wallet_privateKey: null,
    wallet_address: null,
    wallet_phrase: null,
  };
  const [walletDetails, setWalletDetails] = useState(wallet);
  const [walletCreated, setWalletCreated] = useState(false);

  function ShowingWalletDeets() {
    if (walletCreated) {
      return (
        <View style={{marginVertical: 20}}>
          <Text style={{color: 'white', margin: 10}}>
            {walletDetails.wallet_privateKey}
          </Text>
          <Text style={{color: 'white', margin: 10}}>
            {walletDetails.wallet_address}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{marginVertical: 20}}>
          <Text style={{color: 'gray'}}>wallet not found yet</Text>
        </View>
      );
    }
  }

  function createWallet() {
    const walletCreated = ethers.Wallet.createRandom();
    wallet.wallet_address = walletCreated.address;
    wallet.wallet_privateKey = walletCreated.privateKey;
    wallet.wallet_phrase = walletCreated.mnemonicCiphertext;
    console.log(walletCreated.privateKey);
    console.log(walletCreated.address);
    console.log(walletCreated.mnemonic);
    setWalletDetails(wallet);
    setWalletCreated(true);
  }

  return (
    <View style={styles.screen_view}>
      <StatusBar barStyle="light-content" />

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: windowHeight,
          width: windowWidth,
          backgroundColor: 'tomato',
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: windowHeight * 0.015,
            backgroundColor: '#FFFFFF50',
            width: 200,
            height: 50,
            borderRadius: 10,
          }}
          onPress={() => {
            createWallet();
          }}>
          <Text style={{color: 'white'}}>create</Text>
        </TouchableOpacity>
        <ShowingWalletDeets />
      </View>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onLogInClick: () => {
      dispatch({type: LOGIN});
    },
  };
};

export default connect(mapDispatchToProps)(MakeWalletScreen);

const styles = StyleSheet.create({
  screen_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato',
  },
});
