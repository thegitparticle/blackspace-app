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

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let state_here = {};

function TransactionScreen({dispatch, navigation}) {
  const [amountToSend, setAmountToSend] = useState('');

  console.log(state_here.WDeetsReducer.wdeets.wallet_address);

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
