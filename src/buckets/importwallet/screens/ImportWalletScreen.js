import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import {LOGIN} from '../../../redux/types';
import {connect} from 'react-redux';
import '@ethersproject/shims';
import {ethers} from 'ethers/src.ts/index';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function ImportWalletScreen({dispatch, navigation}) {
  const wallet = {
    wallet_privateKey: null,
    wallet_address: null,
    wallet_phrase: null,
  };
  const [walletDetails, setWalletDetails] = useState(wallet);
  const [walletCreated, setWalletCreated] = useState(false);
  const [phrase, setPhrase] = useState('');

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

  function importWallet() {
    const walletCreated = ethers.Wallet.fromMnemonic(phrase);
    wallet.wallet_address = walletCreated.address;
    wallet.wallet_privateKey = walletCreated.privateKey;
    wallet.wallet_phrase = walletCreated.mnemonicCiphertext;
    console.log(walletCreated.privateKey);
    console.log(walletCreated.address);
    console.log(walletCreated.mnemonic);
    setWalletDetails(wallet);
    setWalletCreated(true);
    navigation.navigate('UserDetailsInputScreen');
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
          backgroundColor: '#333',
        }}>
        <View
          style={{
            backgroundColor: 'transparent',
            width: windowWidth,
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              backgroundColor: 'transparent',
              maxWidth: windowWidth * 0.7,
              color: 'white',
            }}
            onChangeText={setPhrase}
            value={phrase}
            multiline={true}
            autoFocus={true}
            textAlign={'center'}
          />
        </View>
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
            // navigation.navigate('WalletSetupOptionsScreen');
            importWallet();
          }}>
          <Text style={{color: 'white'}}>import your wallet</Text>
        </TouchableOpacity>
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

export default connect(mapDispatchToProps)(ImportWalletScreen);

const styles = StyleSheet.create({
  screen_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
  },
});
