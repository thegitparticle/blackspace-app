import React, {useState} from 'react';
import {
  Appearance,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Text, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import BrandStoryTextsAnimation from '../components/BrandStoryTextsAnimation';
import {Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {ChangeSecretSettings} from '../../../redux/appcore/SecretSettingsActions';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function SecretScreen({dispatch}) {
  const [showSettings, setShowSettings] = useState(false);

  function RenderBody() {
    const [password, setPassword] = useState(null);

    if (password === 'Batman') {
      if (state_here.SecretSettingsReducer.secretsettings) {
        return (
          <>
            <TouchableOpacity
              onLongPress={() => {
                dispatch(ChangeSecretSettings(false));
                setPassword('');
              }}
              style={{
                width: windowWidth * 0.8,
                height: 75,
                borderRadius: 37.5,
                backgroundColor: themeHere.colors.orange_light,
                marginBottom: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text sx={{...themeHere.text.body_medium}}>
                hide dev features
              </Text>
            </TouchableOpacity>
          </>
        );
      } else {
        return (
          <>
            <TouchableOpacity
              onLongPress={() => dispatch(ChangeSecretSettings(true))}
              style={{
                width: windowWidth * 0.8,
                height: 75,
                borderRadius: 37.5,
                backgroundColor: themeHere.colors.orange_light,
                marginBottom: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text sx={{...themeHere.text.body_medium}}>
                show dev features
              </Text>
            </TouchableOpacity>
          </>
        );
      }
    } else {
      function handlePasswordTyping(value) {
        setPassword(value);
      }

      return (
        <>
          <View />
          <TextInput
            placeholder="INPUT WITH CUSTOM ICON"
            onChangeText={handlePasswordTyping}
            value={password}
            style={{color: 'white'}}
          />
          <TouchableOpacity
            // onLongPress={() => }
            style={{
              width: windowWidth * 0.8,
              height: 75,
              borderRadius: 37.5,
              backgroundColor: themeHere.colors.orange_light + '00',
              marginBottom: 40,
            }}></TouchableOpacity>
        </>
      );
    }
  }

  return (
    <View variant="layout.full_screen">
      <ImageBackground
        source={require('../../../../assets/space_bg_1.jpeg')}
        style={{
          width: windowWidth,
          height: windowHeight,
          alignItems: 'center',
          justifyContent: 'space-between',
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

export default connect(mapStateToProps)(SecretScreen);
