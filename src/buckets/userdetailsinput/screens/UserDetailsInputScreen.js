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
import {AddMyProfileDetails} from '../../../redux/MyProfileActions';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function UserDetailsInputScreen({dispatch, navigation}) {
  const [username, setUsername] = useState('');

  const myProfileDetails = {username: ''};

  return (
    <View style={styles.parent_view}>
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
          <TextInput
            style={{
              backgroundColor: 'transparent',
              maxWidth: windowWidth * 0.7,
              color: 'white',
            }}
            onChangeText={setUsername}
            value={username}
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
            myProfileDetails.username = username;
            dispatch(AddMyProfileDetails(myProfileDetails));
            dispatch({type: LOGIN});
          }}>
          <Text style={{color: 'white'}}>create new wallet</Text>
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

export default connect(mapDispatchToProps)(UserDetailsInputScreen);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
