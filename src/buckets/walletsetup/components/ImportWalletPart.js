import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  TouchableOpacity,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import LinearGradient from 'react-native-linear-gradient';
import SquircleButton from '../../../bits/SquircleButton';
import {useNavigation} from '@react-navigation/native';
import {Bounceable} from 'rn-bounceable';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function ImportWalletPart() {
  const navigation = useNavigation();

  return (
    <View style={styles.parent_view}>
      <LinearGradient
        colors={['#050505', '#1F1F1F']}
        style={styles.gradient_background}>
        <View style={styles.items_wrap_view}>
          <Text style={styles.heading_text}>IMPORT OLD WALLET</Text>
          <Text style={styles.explanation_text}>
            import your wallet from rainbow, metamask, trust wallet, etc...
          </Text>
          <Bounceable
            onPress={() => {
              navigation.navigate('ImportWalletScreen');
            }}>
            <SquircleButton
              buttonColor={'#282828'}
              width={windowWidth * 0.7}
              height={50}
              buttonText={'import now'}
              font={themeHere.text.subhead_medium}
              textColor={themeHere.colors.light}
            />
          </Bounceable>
        </View>
      </LinearGradient>
    </View>
  );
}

export default ImportWalletPart;

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
    ...themeHere.text.body,
    color: 'white',
    width: windowWidth * 0.8,
    textAlign: 'center',
  },
});
