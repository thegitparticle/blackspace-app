import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {View, Text, useSx} from 'dripsy';
import React from 'react';
import {
  Appearance,
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {Divider} from 'react-native-elements';
import {connect} from 'react-redux';
import {Bounceable} from 'rn-bounceable';
import {LOGIN} from '../../../../redux/types';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {dripsytheme} from '../../../../theme/DripsyTheme';
import ConnectWalletPart from '../components/ConnectWalletPart';
import CreateWalletPart from '../components/CreateWalletPart';
import {Amplitude} from '@amplitude/react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function WalletSetupOptionsScreen({dispatch, navigation}) {
  const sxCustom = useSx();

  const connector = useWalletConnect();

  function ConnectExternalWalletTile() {
    return (
      <Bounceable
        onPress={() => {
          Amplitude.getInstance().logEvent('CONNECT_WALLET_BUTTON_CLICKED');
          if (connector.connected) {
            connector.killSession();
          } else {
            connector
              .connect()
              .then(wallet_info => {
                console.log(wallet_info);
                navigation.navigate('SettingUpAppScreen', {
                  wallet_info: wallet_info,
                });
              })
              .catch(e => console.log(e));
          }
        }}>
        <View
          variant="layout.sub_view_20_margin"
          sx={{
            borderRadius: 10,
            backgroundColor: dripsytheme.colors.layout_4,
            flexDirection: 'column',
            alignSelf: 'center',
            height: windowHeight * 0.3,
            marginVertical: windowHeight * 0.1,
          }}>
          <ImageBackground
            source={require('../../../../../assets/walletconnectbg.png')}
            resizeMode="cover"
            style={sxCustom({
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              borderRadius: 10,
              overflow: 'hidden',
            })}>
            <Text
              variant="heading_thick"
              sx={{
                color: dripsytheme.colors.layout_1,
                marginHorizontal: '$4',
                marginVertical: '$2',
                textAlign: 'center',
              }}>
              Connect Wallet
            </Text>
            <Text
              variant="text"
              sx={{
                color: dripsytheme.colors.layout_1,
                opacity: 0.75,
                marginHorizontal: '$4',
                marginVertical: '$2',
                textAlign: 'center',
              }}>
              You can connect Metamask, Rainbow, Coinbase Wallet, Trust wallet,
              Argent and many more.
            </Text>
          </ImageBackground>
        </View>
      </Bounceable>
    );
  }

  return (
    <View variant="layout.full_screen">
      <StatusBar barStyle="light-content" />
      <Text
        variant="title"
        sx={{
          color: dripsytheme.colors.layout_1,
          marginTop: windowHeight * 0.1,
          marginHorizontal: '$4',
        }}>
        Setup your wallet
      </Text>
      <Text
        variant="text"
        sx={{
          color: dripsytheme.colors.layout_1,
          opacity: 0.75,
          marginHorizontal: '$4',
          marginVertical: '$4',
        }}>
        We currently support Ethereum Mainet only. Polygon, Optimism & Solana
        support coming soon!
      </Text>
      <ConnectExternalWalletTile />
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

export default connect(mapDispatchToProps)(WalletSetupOptionsScreen);
