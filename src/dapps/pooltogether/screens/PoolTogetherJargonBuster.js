import React, {useEffect, useState} from 'react';
import {Appearance, Dimensions, Linking} from 'react-native';
import {ScrollView, Text, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import StoryThumbnail from '../../../bits/jargonbuster/StoryThumbnail';
import SpacerVertical from '../../../bits/SpacerVertical';
import {Bounceable} from 'rn-bounceable';
import {Icon} from 'react-native-elements';
import axios from 'axios';
import {Bars} from 'react-native-loader';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function PoolTogetherJargonBuster(props) {
  const [jargonBusterContent, setJargonBusterContent] = useState();
  const [contentLoaded, setContentLoaded] = useState(false);
  const [jargonBusterStories, setJargonBusterStories] = useState();
  const [storiesLoaded, setStoriesLoaded] = useState(false);

  const [noStories, setNoStories] = useState(false);

  useEffect(() => {
    const config1 = {
      method: 'get',
      url:
        'https://suprblack.xyz/api/dapps/inside_app_jargon_buster?app=' +
        String(props.appInfo.id),
      headers: {},
    };

    axios(config1)
      .then(function (response) {
        setJargonBusterContent(response.data[0]);
        setContentLoaded(true);
      })
      .catch(function (error) {
        console.log('jargon buster error');
        setNoStories(true);
        console.log(error);
      });

    const config2 = {
      method: 'get',
      url:
        'https://suprblack.xyz/api/dapps/get_jargon_buster_stories/' +
        String(props.appInfo.id),
      headers: {},
    };

    axios(config2)
      .then(function (response) {
        setJargonBusterStories(response.data);
        setStoriesLoaded(true);
      })
      .catch(function (error) {
        console.log('jargon stories error');
        setNoStories(true);
        console.log(error);
      });
  }, []);

  function RenderLinks() {
    return (
      <View
        variant="layout.sub_view_40_margin"
        sx={{
          alignSelf: 'center',
          marginTop: '$5',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <Bounceable
          onPress={() => Linking.openURL(props.appInfo.link_suite_docs)}>
          <View
            sx={{
              borderRadius: 100,
              alignItems: 'center',
              backgroundColor: themeHere.colors.red_light + '25',
              justifyContent: 'center',
              paddingVertical: '$2',
              paddingHorizontal: '$4',
              flexDirection: 'row',
            }}>
            <Icon
              name="external-link"
              type="feather"
              color={themeHere.colors.red_light}
            />
            <Text
              variant="body_medium"
              sx={{color: 'red_light', marginHorizontal: '$2'}}>
              website
            </Text>
          </View>
        </Bounceable>
        <Bounceable
          onPress={() => Linking.openURL(props.appInfo.link_suite_link2)}>
          <View
            sx={{
              borderRadius: 100,
              alignItems: 'center',
              backgroundColor: themeHere.colors.red_light + '25',
              justifyContent: 'center',
              paddingVertical: '$2',
              paddingHorizontal: '$4',
              flexDirection: 'row',
            }}>
            <Icon
              name="file"
              type="feather"
              color={themeHere.colors.red_light}
            />
            <Text
              variant="body_medium"
              sx={{color: 'red_light', marginHorizontal: '$2'}}>
              whitepaper
            </Text>
          </View>
        </Bounceable>
      </View>
    );
  }

  function RenderBody() {
    if (contentLoaded && storiesLoaded) {
      return (
        <View sx={{alignSelf: 'center', marginTop: '$5'}}>
          <Text
            variant="subhead_medium"
            sx={{
              color: 'foreground',
              maxWidth: windowWidth * 0.9,
              marginHorizontal: windowWidth * 0.05,
              marginTop: windowWidth * 0.1,
              marginBottom: windowWidth * 0.05,
              alignSelf: 'flex-start',
            }}>
            About {props.appInfo.name}
          </Text>
          <Text
            variant="body_medium"
            sx={{
              color: 'off_foreground',
              opacity: 0.5,
              maxWidth: windowWidth * 0.9,
              alignSelf: 'center',
            }}>
            {jargonBusterContent.content}
          </Text>
          <SpacerVertical height={30} />
          <View sx={{height: 150}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {jargonBusterStories.map(item => (
                <StoryThumbnail story={item} />
              ))}
            </ScrollView>
          </View>
          <SpacerVertical height={30} />
          <RenderLinks />
          <SpacerVertical height={30} />
        </View>
      );
    } else {
      if (noStories) {
        return (
          <View
            sx={{
              alignSelf: 'center',
              marginTop: '$5',
              justifyContent: 'center',
              width: windowWidth,
              alignItems: 'center',
            }}>
            <SpacerVertical height={30} />
            <Text
              variant="subhead_medium"
              sx={{
                color: 'foreground',
                maxWidth: windowWidth * 0.9,
                marginHorizontal: windowWidth * 0.05,
                marginTop: windowWidth * 0.1,
                marginBottom: windowWidth * 0.05,
                alignSelf: 'center',
              }}>
              Jargon Buster could not be loaded, try again!
            </Text>
            <SpacerVertical height={30} />
          </View>
        );
      } else {
        return (
          <View
            sx={{
              alignSelf: 'center',
              marginTop: '$5',
              justifyContent: 'center',
              width: windowWidth,
              alignItems: 'center',
            }}>
            <SpacerVertical height={30} />
            <Bars size={10} color="#FDAAFF" />
            <SpacerVertical height={30} />
          </View>
        );
      }
    }
  }

  return <RenderBody />;
}

export default PoolTogetherJargonBuster;
