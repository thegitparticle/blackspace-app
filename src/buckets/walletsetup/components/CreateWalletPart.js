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

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme == 'dark' ? ButterThemeDark : ButterThemeLight;

function CreateWalletPart({navigation}) {
  return (
    <View style={styles.parent_view}>
      <LinearGradient
        colors={['#FF5B3A', '#FF3293']}
        style={styles.gradient_background}>
        <View style={styles.items_wrap_view}>
          <Text
            style={{
              ...themeHere.text.title_3,
              color: 'white',
            }}>
            CREATE NEW WALLET
          </Text>
          <Text
            style={{
              ...themeHere.text.body,
              color: 'white',
            }}>
            a fresh, new wallet for a clean start
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MakeWalletScreen');
            }}>
            <SquircleButton
              buttonColor={themeHere.colors.red_light}
              width={windowWidth * 0.7}
              height={50}
              buttonText={'create new'}
              font={themeHere.text.subhead_medium}
              textColor={themeHere.colors.light}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

export default CreateWalletPart;

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
    marginTop: windowHeight * 0.1,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});