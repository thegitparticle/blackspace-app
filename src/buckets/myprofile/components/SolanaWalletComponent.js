import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Appearance, Dimensions, Pressable, RefreshControl} from 'react-native';
import {Text, useSx, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import Animated from 'react-native-reanimated';
import SpacerVertical from '../../../bits/SpacerVertical';
import {connect} from 'react-redux';
import {GetMyProfileDetails} from '../../../redux/appcore/MyProfileActions';
import {GetTokenBalances} from '../../../redux/appcore/MyTokenBalancesActions';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {useNavigation} from '@react-navigation/native';
import {Amplitude} from '@amplitude/react-native';
import {GetMyNfts} from '../../../redux/appcore/MyNFTsActions';
import {Bounceable} from 'rn-bounceable';
import SquircleGlassButton from '../../../bits/SquircleGlassButton';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import MainDetailsETH from '../components/MainDetailsETH';
import WalletPieETH from '../components/WalletPieETH';
import AccordianPortfolioETH from '../components/AccordianPortfolioETH';
import RenderAppBluePrintHelper from '../../miniapp/helpers/RenderAppBluePrintHelper';
import RenderAppJargonBusterHelper from '../../miniapp/helpers/RenderAppJargonBusterHelper';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import LottieView from 'lottie-react-native';
import SquircleButton from '../../../bits/SquircleButton';
import bs58 from 'bs58';
import nacl from 'tweetnacl';
import * as Linking from 'expo-linking';
import {Buffer} from 'buffer';
global.Buffer = global.Buffer || Buffer;

const onConnectRedirectLink = Linking.createURL('onConnect');
const onDisconnectRedirectLink = Linking.createURL('onDisconnect');
const onSignAndSendTransactionRedirectLink = Linking.createURL(
  'onSignAndSendTransaction',
);
const onSignAllTransactionsRedirectLink = Linking.createURL(
  'onSignAllTransactions',
);
const onSignTransactionRedirectLink = Linking.createURL('onSignTransaction');
const onSignMessageRedirectLink = Linking.createURL('onSignMessage');

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function SolanaWalletComponent({dispatch}) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // store dappKeyPair, sharedSecret, session and account SECURELY on device
  // to avoid having to reconnect users.
  const [dappKeyPair] = useState(nacl.box.keyPair());

  const [successPhantomConnection, setSuccessPhantomConnection] =
    useState(false);

  const [deepLink, setDeepLink] = useState('');

  const [sharedSecret, setSharedSecret] = useState();
  const [session, setSession] = useState();
  const [phantomWalletPublicKey, setPhantomWalletPublicKey] = useState();

  const buildUrl = (path: string, params: URLSearchParams) =>
    `https://phantom.app/ul/v1/${path}?${params.toString()}`;

  const connectSolanaWallet = async () => {
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      cluster: 'mainnet-beta',
      app_url: 'https://phantom.app',
      // redirect_link: 'blackspace://',
      redirect_link: onConnectRedirectLink,
    });

    const url = buildUrl('connect', params);
    await Linking.openURL(url);
  };

  useEffect(() => {
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setDeepLink(initialUrl);
      }
    })();
    Linking.addEventListener('url', handleDeepLink);
    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  const handleDeepLink = ({url}) => {
    setDeepLink(url);
  };

  const decryptPayload = (data, nonce, sharedSecret) => {
    if (!sharedSecret) throw new Error('missing shared secret');

    const decryptedData = nacl.box.open.after(
      bs58.decode(data),
      bs58.decode(nonce),
      sharedSecret,
    );
    if (!decryptedData) {
      throw new Error('Unable to decrypt data');
    }
    return JSON.parse(Buffer.from(decryptedData).toString('utf8'));
  };

  useEffect(() => {
    if (!deepLink) return;

    const url = new URL(deepLink);
    const params = url.searchParams;

    if (params.get('errorCode')) {
      console.log(JSON.stringify(Object.fromEntries([...params]), null, 2));
      return;
    }

    if (/onConnect/.test(url.pathname)) {
      const sharedSecretDapp = nacl.box.before(
        bs58.decode(params.get('phantom_encryption_public_key')),
        dappKeyPair.secretKey,
      );

      const connectData = decryptPayload(
        params.get('data'),
        params.get('nonce'),
        sharedSecretDapp,
      );

      setSharedSecret(sharedSecretDapp);
      setSession(connectData.session);
      setPhantomWalletPublicKey(connectData.public_key);

      console.log(JSON.stringify(connectData, null, 2));
    } else if (/onDisconnect/.test(url.pathname)) {
      console.log('Disconnected!');
    }
  }, [deepLink]);

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      centerContent={true}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={themeHere.colors.foreground}
        />
      }>
      <View
        style={{
          marginVertical: windowHeight * 0.1,
          alignSelf: 'center',
        }}>
        <Bounceable
          onPress={() => {
            connectSolanaWallet()
              .then(r => {
                console.log('success phantom connection');
                setSuccessPhantomConnection(true);
              })
              .catch(e => {
                console.log('failed phantom connection');
                setSuccessPhantomConnection(false);
              });
            // Amplitude.getInstance().logEvent(
            //   'LFG_WELCOME_BUTTON_CLICKED',
            // );
          }}>
          <SquircleButton
            buttonColor={'#4E44CE'}
            width={windowWidth * 0.7}
            height={50}
            buttonText={'Connect Phantom Wallet'}
            font={themeHere.text.subhead_medium_i}
            textColor={'#FFFFFF'}
          />
        </Bounceable>
      </View>
    </Animated.ScrollView>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(SolanaWalletComponent);
