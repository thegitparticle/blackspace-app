import React from 'react';
import {StyleSheet, Dimensions, Appearance} from 'react-native';
import {Text, View, useSx, styled} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../theme/ButterTheme';
import {StyledFastImage50} from '../../theme/DripsyTheme';
import FastImage from 'react-native-fast-image';
import Spacer from '../Spacer';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function StoryThumbnail(props) {
  // props - {story} object - {thumbnail_url, name, stories -> list of story image links}
  return (
    <View sx={{margin: 10, flexDirection: 'column', alignItems: 'center'}}>
      <StyledFastImage50
        source={{
          uri: props.story.thumbnail_url,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Spacer height={10} />
      <Text variant="header" sx={{textAlign: 'center'}}>
        {props.story.name}
      </Text>
    </View>
  );
}

export default StoryThumbnail;
