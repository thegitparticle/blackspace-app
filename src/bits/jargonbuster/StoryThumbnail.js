import React, {useState} from 'react';
import {StyleSheet, Dimensions, Appearance} from 'react-native';
import {Text, View, useSx, styled} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../theme/ButterTheme';
import {StyledFastImage50, StyledFastImage60} from '../../theme/DripsyTheme';
import FastImage from 'react-native-fast-image';
import Spacer from '../Spacer';
import {StoryContainer} from 'react-native-stories-view';
import {Bounceable} from 'rn-bounceable';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function StoryThumbnail(props) {
  // props - {story} object - {thumbnail_url, name, stories -> list of story image links}

  const [showStory, setShowStory] = useState(false);

  return (
    <View>
      <Bounceable onPress={() => setShowStory(true)}>
        <View
          sx={{
            marginVertical: '$2',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '$4',
            width: 100,
            height: 150,
          }}>
          <StyledFastImage60
            source={{
              uri: props.story.thumbnail_url,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Spacer height={10} />
          <Text
            variant="body_medium"
            sx={{textAlign: 'center', color: 'foreground'}}>
            {props.story.name}
          </Text>
        </View>
      </Bounceable>
      <StoryContainer
        visible={showStory}
        images={props.story.stories}
        duration={2}
        containerStyle={{
          width: windowWidth,
          height: windowHeight,
        }}
        onComplete={() => {
          console.log('finished');
          setShowStory(false);
        }}
      />
    </View>
  );
}

export default StoryThumbnail;
