import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  Linking,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import axios from 'axios';
import {Bounceable} from 'rn-bounceable';
import {Icon} from 'react-native-elements';
import Spacer from '../../../bits/Spacer';
import {ScrollView} from 'dripsy';
import StoryThumbnail from '../../../bits/jargonbuster/StoryThumbnail';
import {Bars} from 'react-native-loader';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function UniswapJargonBuster(props) {
  const [jargonBusterContent, setJargonBusterContent] = useState();
  const [contentLoaded, setContentLoaded] = useState(false);
  const [jargonBusterStories, setJargonBusterStories] = useState();
  const [storiesLoaded, setStoriesLoaded] = useState(false);

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
              color: 'mid_ground',
              maxWidth: windowWidth * 0.9,
              alignSelf: 'center',
            }}>
            {jargonBusterContent.content}
          </Text>
          <Spacer height={30} />
          <View sx={{height: 150}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {jargonBusterStories.map(item => (
                <StoryThumbnail story={item} />
              ))}
            </ScrollView>
          </View>
          <Spacer height={30} />
          <RenderLinks />
          <Spacer height={30} />
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
          <Spacer height={30} />
          <Bars size={10} color="#FDAAFF" />
          <Spacer height={30} />
        </View>
      );
    }
  }

  return <RenderBody />;
}

export default UniswapJargonBuster;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
