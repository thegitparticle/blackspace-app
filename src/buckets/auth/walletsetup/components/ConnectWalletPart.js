import React, {useState} from 'react';
import {Appearance, Dimensions, StyleSheet, Text, View} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {useNavigation} from '@react-navigation/native';
import {Bounceable} from 'rn-bounceable';
import {Amplitude} from '@amplitude/react-native';
import SquircleGlassButton from '../../../../bits/SquircleGlassButton';
import {useWalletConnect} from '@walletconnect/react-native-dapp';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function ConnectWalletPart() {
  const navigation = useNavigation();

  const connector = useWalletConnect();

  const [walletInfo, setWalletInfo] = useState({});

  return (
    <View style={styles.parent_view}>
      <View style={styles.items_wrap_view}>
        <Text style={styles.heading_text}>ALREADY USING IT?</Text>
        <Text style={styles.explanation_text}>
          connect your existing ETH wallet from rainbow, metamask, trust wallet,
          etc...
        </Text>
        <Bounceable
          onPress={() => {
            Amplitude.getInstance().logEvent('CONNECT_WALLET_BUTTON_CLICKED');
            // navigation.navigate('ConnectWalletScreen', {
            //   walletInfo: walletInfo,
            // });
            if (connector.connected) {
              connector.killSession();
            } else {
              connector
                .connect()
                .then(wallet_info => {
                  console.log(wallet_info);
                  navigation.navigate('ConnectWalletScreen', {
                    walletInfo: wallet_info,
                  });
                })
                .catch(e => console.log(e));
            }
          }}>
          <SquircleGlassButton
            buttonColor={themeHere.colors.mid_ground}
            width={windowWidth * 0.7}
            height={50}
            buttonText={'connect now'}
            font={themeHere.text.subhead_medium}
            textColor={themeHere.colors.light}
            blurType={'ultraThinMaterialDark'}
          />
        </Bounceable>
      </View>
    </View>
  );
}

export default ConnectWalletPart;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight * 0.5,
    width: windowWidth,
  },
  gradient_background: {
    height: windowHeight * 0.5,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  items_wrap_view: {
    height: windowHeight * 0.35,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading_text: {
    ...themeHere.text.title_3,
    color: 'white',
  },
  explanation_text: {
    ...themeHere.text.subhead_medium,
    color: 'white',
    width: windowWidth * 0.8,
    textAlign: 'center',
  },
});
