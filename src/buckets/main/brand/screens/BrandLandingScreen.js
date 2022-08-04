import React, {useEffect} from 'react';
import {
  Appearance,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import BrandStoryTextsAnimation from '../components/BrandStoryTextsAnimation';
import {useNavigation} from '@react-navigation/native';
import WalletConnectProvider, {
  useWalletConnect,
} from '@walletconnect/react-native-dapp';
import {ethers} from 'ethers/src.ts';
import {EthersLiquity} from '@liquity/lib-ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function BrandLandingScreen() {
  const navigation = useNavigation();

  // External Wallet Config
  const connector = useWalletConnect();

  // const provider = new WalletConnectProvider({
  //   rpc: connector.rpcUrl,
  //   infuraId: 'b81341e3ab894360a84f3fa640ab985e',
  //   qrcode: true,
  //   // redirectUrl: 'blackspace://',
  //   // storageOptions: {
  //   //   asyncStorage: AsyncStorage,
  //   // },
  // });

  async function setupExternalProvider() {
    // await provider.enable;
    const externalProvider = new ethers.providers.Web3Provider(
      connector.rpcUrl,
    );
    const signerExternal = externalProvider.getSigner();
  }

  useEffect(() => {
    (async () => {
      setupExternalProvider()
        .then(r => console.log(r))
        .catch(e => console.log(e));
    })();
    console.log('use effect hook');
  }, []);

  return (
    <View variant="layout.full_screen">
      <ImageBackground
        source={require('../../../../../assets/space_bg_1.jpeg')}
        style={{
          width: windowWidth,
          height: windowHeight,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {/*<Image*/}
        {/*  sx={{width: windowWidth * 0.6, height: windowWidth * 0.3}}*/}
        {/*  source={require('../../../../assets/blackSpace_logo_full.png')}*/}
        {/*  resizeMode="contain"*/}
        {/*/>*/}
        <View />
        <BrandStoryTextsAnimation />
        <TouchableOpacity
          onLongPress={() => navigation.navigate('SecretScreen')}
          style={{
            width: windowWidth * 0.8,
            height: 75,
            borderRadius: 37.5,
            backgroundColor: themeHere.colors.orange_light + '00',
            marginBottom: 40,
          }}></TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default BrandLandingScreen;
