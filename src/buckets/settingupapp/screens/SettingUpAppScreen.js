import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  StatusBar,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {GetMyProfileDetails} from '../../../redux/appcore/MyProfileActions';
import {GetTokenBalances} from '../../../redux/appcore/MyTokenBalancesActions';
import {AddUserDetails} from '../../../redux/appcore/UserDetailsActions';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function SettingUpAppScreen({dispatch}) {
  const [apiDone, setAPIDone] = useState(false);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const config1 = {
      method: 'get',
      url:
        'https://suprblack.xyz/api/users/list/?wallet_address=' +
        String(state_here.WDeetsReducer.wdeets.wallet_address),
      headers: {},
    };

    axios(config1)
      .then(function (response) {
        setUserId(response.data[0].id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (userId > 0) {
      dispatch(AddUserDetails(state_here.WDeetsReducer.wdeets.wallet_address));
      dispatch(
        GetMyProfileDetails(
          userId,
          state_here.WDeetsReducer.wdeets.wallet_address,
        ),
      );
      dispatch(
        GetTokenBalances(state_here.WDeetsReducer.wdeets.wallet_address),
      );
    }
  }, [userId]);

  function RenderBody() {
    if (!apiDone) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.text_highlighted}>
            Keep phone aside and relax while we finish the borrowing process
          </Text>
          <LottieView
            source={require('../../../../assets/doge_tail_lottie.json')}
            autoPlay
            loop
            style={{
              marginVertical: 20,
              width: windowWidth * 0.25,
              height: windowWidth * 0.5,
            }}
            resizeMode="cover"
          />
        </View>
      );
    } else {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <LottieView
            source={require('../../../../assets/success_tick_lottie.json')}
            autoPlay
            loop
            style={{
              marginVertical: 20,
              width: windowWidth * 0.25,
              height: windowWidth * 0.5,
            }}
            resizeMode="cover"
          />
          <Text style={styles.text_highlighted}>You are all set</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.parent_view}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#050505', '#1F1F1F']}
        style={styles.gradient_background}>
        <RenderBody />
      </LinearGradient>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(SettingUpAppScreen);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient_background: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
});
