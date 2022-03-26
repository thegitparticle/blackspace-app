import React, { useEffect, useState } from "react";
import { Appearance, Dimensions, ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native";
import { ButterThemeDark, ButterThemeLight } from "../../../theme/ButterTheme";
import { connect } from "react-redux";
import LottieView from "lottie-react-native";
import axios from "axios";
import { GetMyProfileDetails } from "../../../redux/appcore/MyProfileActions";
import { GetTokenBalances } from "../../../redux/appcore/MyTokenBalancesActions";
import { AddUserDetails } from "../../../redux/appcore/UserDetailsActions";
import { LOGIN } from "../../../redux/types";
import { Amplitude } from "@amplitude/react-native";
import { AddWDeets } from "../../../redux/appcore/WDeetsActions";

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
      const dataJWT = JSON.stringify({
        wallet_address: String(state_here.WDeetsReducer.wdeets.wallet_address),
        password: '#some$#password$#that$#i$#chose$#',
      });

      const configJWT = {
        method: 'post',
        url: 'https://suprblack.xyz/api/auth/token/',
        headers: {
          'Content-Type': 'application/json',
        },
        data: dataJWT,
      };

      axios(configJWT)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });

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
      setTimeout(() => {
        Amplitude.getInstance().logEvent('APP_SETUP_API_CALLS_FINISHED');
        setAPIDone(true);
      }, 7500);
      setTimeout(() => {
        const wallet = {
          wallet_privateKey: null,
          wallet_address: null,
          wallet_phrase: null,
        };
        wallet.wallet_address = state_here.WDeetsReducer.wdeets.wallet_address;
        wallet.wallet_privateKey =
          state_here.WDeetsReducer.wdeets.wallet_privateKey;
        wallet.wallet_phrase = {};
        dispatch(AddWDeets(wallet));
      }, 10000);
      setTimeout(() => {
        dispatch({type: LOGIN});
      }, 12500);
    }
  }, [userId]);

  function RenderBody() {
    if (!apiDone) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.text_highlighted}>
            Setting up blackSpace for you
          </Text>
          <LottieView
            source={require('../../../../assets/panda_popcorn.json')}
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
            loop={false}
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
      <ImageBackground
        source={require('../../../../assets/colors_background_2.png')}
        resizeMode="cover"
        style={{
          width: windowWidth,
          height: windowHeight,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <RenderBody />
      </ImageBackground>
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
    justifyContent: 'center',
  },
  text_highlighted: {
    ...themeHere.text.header,
    color: themeHere.colors.foreground,
    marginVertical: 30,
    maxWidth: windowWidth * 0.7,
    textAlign: 'center',
    lineHeight: 30,
  },
  text_not_highlighted: {
    ...themeHere.text.body_medium,
    color: themeHere.colors.foreground + '75',
    marginVertical: 30,
    maxWidth: windowWidth * 0.7,
    textAlign: 'center',
    lineHeight: 30,
  },
});
