import React, {useEffect, useMemo, useState} from 'react';
import {Appearance, Dimensions, StyleSheet, Text, View} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {useSx} from 'dripsy';
import {GetAllTips} from '../../../redux/appcore/AllTipsActions';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import ShowSendAndReceivePage from '../pages/ShowSendAndReceivePage';
import ShowScannerPage from '../pages/ShowScannerPage';
import ShowWalletQRPage from '../pages/ShowWalletQRPage';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function SendReceiveLandingScreen({route, dispatch}) {
  const {app_details} = route.params;
  const sxCustom = useSx();

  const [renderSplash, setRenderSplash] = useState(true);

  useEffect(() => {
    dispatch(GetAllTips());
    setTimeout(() => {
      setRenderSplash(false);
    }, 1000);
  }, []);

  // ShowSendAndReceivePage , ShowScannerPage , ShowWalletQRPage
  const [showWhichPage, setShowWhichPage] = useState('ShowSendAndReceivePage');

  function RenderBody() {
    if (showWhichPage === 'ShowSendAndReceivePage') {
      return (
        <ShowSendAndReceivePage
          ChangeBodyToScanner={changeBodyToScannerPage}
          ChangeBodyToQRPage={changeBodyToQRPage}
        />
      );
    } else if (showWhichPage === 'ShowScannerPage') {
      return (
        <ShowScannerPage ChangeBodyBack={changeBodyToSendAndReceivePage} />
      );
    } else if (showWhichPage === 'ShowWalletQRPage') {
      return (
        <ShowWalletQRPage ChangeBodyBack={changeBodyToSendAndReceivePage} />
      );
    } else {
      return <View />;
    }
  }

  function changeBodyToScannerPage() {
    console.log('change body to scanner');
    setShowWhichPage('ShowScannerPage');
  }

  function changeBodyToQRPage() {
    setShowWhichPage('ShowWalletQRPage');
  }

  function changeBodyToSendAndReceivePage() {
    setShowWhichPage('ShowSendAndReceivePage');
  }

  const RenderScreen = useMemo(
    () =>
      function RenderScreen() {
        if (renderSplash) {
          return (
            <FastImage
              style={{width: windowWidth, height: windowHeight}}
              source={{
                uri: app_details.dapp_cover,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          );
        } else {
          return <RenderBody />;
        }
      },
    [renderSplash, showWhichPage],
  );

  return (
    <View style={styles.parent_view}>
      <Text>Send and get tokens, coins and more things!</Text>
      <RenderScreen />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(SendReceiveLandingScreen);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
