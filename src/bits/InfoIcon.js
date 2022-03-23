import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../theme/ButterTheme';
import {Icon, Tooltip} from 'react-native-elements';
import {Bounceable} from 'rn-bounceable';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();

const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function InfoIcon(props) {
  // size, information, height (default 40)

  return (
    <Tooltip
      popover={
        <Text style={{color: 'white', ...themeHere.text.caption}}>
          {props.information}
        </Text>
      }
      overlayColor={'transparent'}
      backgroundColor={'#333333'}
      height={props.height}
      withPointer={true}>
      <View style={{paddingHorizontal: 10}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: props.size,
            height: props.size,
            borderRadius: props.size / 2,
            backgroundColor: themeHere.colors.foreground,
          }}>
          <Icon
            name="info"
            type="entypo"
            color={themeHere.colors.background}
            size={props.size / 2}
          />
        </View>
      </View>
    </Tooltip>
  );
}

export default InfoIcon;
