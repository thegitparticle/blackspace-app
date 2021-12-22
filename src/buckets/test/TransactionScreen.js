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
import {connect} from 'react-redux';
import {API_URL} from '@env';
// import {createAlchemyWeb3} from '@alch/alchemy-web3';
// import {ethers} from 'ethers/src.ts/index';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let state_here = {};

function TransactionScreen({dispatch, navigation}) {
  const [amountToSend, setAmountToSend] = useState('');

  console.log(state_here.WDeetsReducer.wdeets.wallet_address);

  // async function doTheTransaction() {
  //   const web3 = createAlchemyWeb3(API_URL);
  //   const myAddress = state_here.WDeetsReducer.wdeets.wallet_address;
  //
  //   const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0
  //
  //   const transaction = {
  //     to: '0x14a28bD398B5b282a363f53A2c28e0E8ed211469', // faucet address to return eth
  //     value: 100,
  //     gas: 30000,
  //     maxFeePerGas: 1000000108,
  //     nonce: nonce,
  //     // optional data field to send message or execute smart contract
  //   };
  //
  //   // 0x5250b86d7590590748a564E9f4528Aca82bF74b7
  //
  //   await ethers
  //     .getDefaultProvider()
  //     .sendTransaction(
  //       transaction,
  //       state_here.WDeetsReducer.wdeets.wallet_privateKey,
  //     );
  //
  //   const signedTx = await web3.eth.accounts.signTransaction(
  //     transaction,
  //     state_here.WDeetsReducer.wdeets.wallet_privateKey,
  //   );
  //
  //   web3.eth.sendSignedTransaction(
  //     signedTx.rawTransaction,
  //     function (error, hash) {
  //       if (!error) {
  //         console.log(
  //           '🎉 The hash of your transaction is: ',
  //           hash,
  //           "\n Check Alchemy's Mempool to view the status of your transaction!",
  //         );
  //       } else {
  //         console.log(
  //           '❗Something went wrong while submitting your transaction:',
  //           error,
  //         );
  //       }
  //     },
  //   );
  // }

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
        <View
          style={{
            backgroundColor: 'transparent',
            width: windowWidth,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>
            Wallet - {state_here.WDeetsReducer.wdeets.wallet_address} owned by{' '}
            {state_here.MyProfileReducer.myProfileDetails.username}
          </Text>
          <Text style={{color: 'white'}}>
            Destination wallet - 0x14a28bD398B5b282a363f53A2c28e0E8ed211469
          </Text>
        </View>
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
            onChangeText={setAmountToSend}
            value={amountToSend}
            multiline={true}
            autoFocus={true}
            textAlign={'center'}
            keyboardType={'number-pad'}
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
          onPress={() => {}}>
          <Text style={{color: 'white'}}>send some eth</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(TransactionScreen);

const styles = StyleSheet.create({
  screen_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
