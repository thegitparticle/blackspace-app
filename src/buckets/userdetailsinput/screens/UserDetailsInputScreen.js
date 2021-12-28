import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Appearance,
  Keyboard,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {LOGIN} from '../../../redux/types';
import {connect} from 'react-redux';
import {AddMyProfileDetails} from '../../../redux/MyProfileActions';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import SquircleButton from '../../../bits/SquircleButton';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {showMessage, hideMessage} from 'react-native-flash-message';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

// 1. Header in the main return () statement
// 2. input and ok button  - button changes to text when api is called
// 3. error component if username exists already
// 4. if api call success, get userid - call redux and send info
// 5. show a full screen overlay - green and done
// 6. then after few seconds - change nav stack

function UserDetailsInputScreen({route, dispatch, navigation}) {
  const {wallet_address} = route.params;
  const [username, setUsername] = useState('');
  const [renderInputBody, setRenderInputBody] = useState(true);
  const [showError, setShowError] = useState(false);
  const [showSetupDoneOverlay, setShowSetupDoneOverlay] = useState(false);

  const myProfileDetails = {username: '', userid: null};

  const toggleSetupDoneOverlay = () => {
    setShowSetupDoneOverlay(!showSetupDoneOverlay);
  };

  function SetUserDetails() {
    const config = {
      method: 'post',
      url: 'https://af61ab05-edce-441a-9dec-1ffa83307433.mock.pstmn.io/setuserdetails',
      headers: {'content-type': 'application/json'},
      data: {
        username: username,
        wallet_address: wallet_address,
      },
    };

    axios(config)
      .then(res => {
        myProfileDetails.username = username;
        myProfileDetails.userid = res.data.userid;
        dispatch(AddMyProfileDetails(myProfileDetails));
        Keyboard.dismiss();
        setShowSetupDoneOverlay(true);
        NavigateToMainStack();
      })
      .catch(error => {
        console.log(error);
        showMessage({
          message: 'username already in use, try another',
          type: 'error',
          backgroundColor: themeHere.colors.danger_red,
        });
        renderInputBody(true);
      });
  }

  function SaveButton() {
    if (renderInputBody) {
      return (
        <TouchableOpacity
          style={{
            marginVertical: windowHeight * 0.1,
          }}
          onPress={() => {
            setRenderInputBody(false);
            SetUserDetails();
          }}>
          <SquircleButton
            buttonColor={'#282828'}
            width={windowWidth * 0.7}
            height={50}
            buttonText={'save'}
            font={themeHere.text.subhead_medium}
            textColor={themeHere.colors.light}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            marginVertical: windowHeight * 0.1,
          }}>
          <SquircleButton
            buttonColor={'#28282800'}
            width={windowWidth * 0.7}
            height={50}
            buttonText={'saving username ...'}
            font={themeHere.text.subhead_medium}
            textColor={themeHere.colors.light}
          />
        </TouchableOpacity>
      );
    }
  }

  function RenderBody() {
    return (
      <View style={styles.input_wallet_button_view}>
        <View style={styles.input_wrap_view}>
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
            placeholder={'type username'}
            placeholderTextColor={'#FFFFFF50'}
          />
        </View>
        <SaveButton />
      </View>
    );
  }

  function SetupDoneOverlay() {
    return (
      <LinearGradient
        colors={['#0ACF83', '#068756']}
        style={styles.overlay_gradient_background}>
        <Text style={styles.screen_header_text}>ALL DONE!</Text>
      </LinearGradient>
    );
  }

  function NavigateToMainStack() {
    setTimeout(() => {
      dispatch({type: LOGIN});
    }, 3000);
  }

  return (
    <View style={styles.parent_view}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#050505', '#1F1F1F']}
        style={styles.gradient_background}>
        <TouchableOpacity
          onPress={() => {
            setRenderInputBody(false);
            SetUserDetails();
          }}>
          <Text style={styles.screen_header_text}>PICK A USERNAME</Text>
        </TouchableOpacity>
        <RenderBody />
      </LinearGradient>
      <Overlay
        isVisible={showSetupDoneOverlay}
        fullScreen={true}
        overlayStyle={styles.overlay_gradient_background}
        onBackdropPress={toggleSetupDoneOverlay}>
        <SetupDoneOverlay />
      </Overlay>
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
    backgroundColor: 'tomato',
  },
  gradient_background: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  overlay_gradient_background: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waiting_text_showcase_view: {
    width: windowWidth * 0.8,
    alignItems: 'center',
  },
  input_wallet_button_view: {
    width: windowWidth,
    alignItems: 'center',
  },
  input_wrap_view: {
    backgroundColor: 'transparent',
    width: windowWidth,
    alignItems: 'center',
    marginVertical: windowHeight * 0.075,
  },
  screen_header_text: {
    ...themeHere.text.title_3,
    color: 'white',
    marginVertical: windowHeight * 0.1,
  },
});
