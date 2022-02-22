import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Appearance,
  TouchableOpacity,
} from 'react-native';
import {Text, View, Image, useSx} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-native-shared-element';
import {Bounceable} from 'rn-bounceable';
import {Amplitude} from '@amplitude/react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

const width = (windowWidth - 80) / 3;

function MyAppThumbnail(props) {
  const navigation = useNavigation();
  const sxCustom = useSx();

  return (
    <Bounceable
      // key={app_details.app_id.toString()}
      onPress={() => {
        Amplitude.getInstance().logEvent('MYAPP_OPEN_BUTTON_CLICK', {
          'App Name': String(props.app_details.name),
        });
        navigation.navigate('MiniAppLanding', {
          app_details: props.app_details,
          discover_or_not: false,
        });
      }}>
      <View
        sx={{
          width: width,
          height: width * 1.5,
          backgroundColor: 'off_background',
          flexDirection: 'column',
          borderRadius: 15,
          flexWrap: 'wrap',
          my: '$2',
        }}>
        <SharedElement id={`item.${props.app_details.name}.app_icon`}>
          <FastImage
            source={{
              uri: props.app_details.dapp_icon,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={sxCustom({
              width: width,
              height: width * 1.125,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            })}
          />
        </SharedElement>
        <View
          sx={{
            width: width,
            height: width * 0.375,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text sx={{color: 'foreground'}} variant="body_medium">
            {props.app_details.name}
          </Text>
        </View>
      </View>
    </Bounceable>
  );
}

export default MyAppThumbnail;
