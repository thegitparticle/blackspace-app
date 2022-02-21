import React, {useState} from 'react';
import {StyleSheet, Dimensions, Appearance} from 'react-native';
import {Text, View, useSx, styled, Pressable} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../theme/ButterTheme';
import {StyledFastImage50, StyledFastImage60} from '../../theme/DripsyTheme';
import FastImage from 'react-native-fast-image';
import Spacer from '../Spacer';
import {StoryContainer} from 'react-native-stories-view';
import {Bounceable} from 'rn-bounceable';
import {Button, Overlay, Icon} from 'react-native-elements';
import Iconly from '../../miscsetups/customfonts/Iconly';
import {useNavigation} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function StoryThumbnail(props) {
  // props - {story} object - {thumbnail_url, name, stories -> list of story image links}

  const navigation = useNavigation();

  const [showStory, setShowStory] = useState(false);

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  function RenderStories() {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

    return (
      <View
        sx={{
          width: windowWidth,
          height: windowHeight,
          backgroundColor: 'background',
          marginLeft: -10,
          marginTop: -10,
        }}>
        <FastImage
          style={{width: windowWidth, height: windowHeight}}
          source={{
            uri: props.story.stories[currentStoryIndex],
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}>
          <View
            sx={{
              width: windowWidth,
              flexDirection: 'row-reverse',
              marginTop: getStatusBarHeight(),
            }}>
            <Bounceable onPress={() => toggleOverlay()}>
              <View sx={{marginHorizontal: 10}}>
                <Iconly
                  name="CloseSquareBold"
                  color={themeHere.colors.foreground}
                  size={35}
                />
              </View>
            </Bounceable>
          </View>
          <View
            sx={{
              width: windowWidth,
              height: windowHeight,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: getStatusBarHeight(),
            }}>
            <Pressable
              sx={{
                width: windowWidth * 0.2,
                height: windowHeight,
                flexDirection: 'row',
                marginTop: getStatusBarHeight(),
              }}
              onPress={() => {
                currentStoryIndex > 0
                  ? setCurrentStoryIndex(Number(currentStoryIndex) - 1)
                  : toggleOverlay();
              }}
            />
            <Pressable
              sx={{
                width: windowWidth * 0.2,
                height: windowHeight,
                flexDirection: 'row',
                marginTop: getStatusBarHeight(),
              }}
              onPress={() => {
                currentStoryIndex !== props.story.stories.length - 1
                  ? setCurrentStoryIndex(Number(currentStoryIndex) + 1)
                  : toggleOverlay();
              }}
            />
          </View>
        </FastImage>
      </View>
    );
  }

  return (
    <View>
      <Bounceable
        onPress={() => {
          toggleOverlay();
        }}>
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
      <Overlay
        fullScreen
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          width: windowWidth,
          height: windowHeight,
          backgroundColor: themeHere.colors.background,
        }}>
        <RenderStories />
      </Overlay>
    </View>
  );
}

export default StoryThumbnail;
