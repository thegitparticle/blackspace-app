import React from 'react';
import {StyleSheet, Dimensions, Appearance, Linking} from 'react-native';
import {Text, View, useSx, styled, ScrollView} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {connect} from 'react-redux';
import StoryThumbnail from '../../../bits/jargonbuster/StoryThumbnail';
import Spacer from '../../../bits/Spacer';
import {Bounceable} from 'rn-bounceable';
import {Icon} from 'react-native-elements';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function MemeCoinsJargonBuster(props) {
  // props - appInfo
  let dummy_jargon_buster = {
    name: 'Meme Coins',
    content:
      "Bowie, Derek Bramble, and Hugh Padgham produced the album. Much of Bowie's creative process was the same as he used on Let's Dance. Many of the same personnel from Let's Dance and the Serious Moonlight tour returned for the Tonight sessions, with a few additions. Like its predecessor, Bowie played no instruments on Tonight, instead offering little creative input to the musicians during the sessions. Devoid of new ideas from touring, Bowie wrote only two new songs himself.",
  };
  let dummy_stories = [
    {
      name: 'why meme?',
      thumbnail_url:
        'https://upload.wikimedia.org/wikipedia/en/d/d7/Tonight_%28album%29.jpg',
      stories: [
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F42%2F71%2F11%2F4271119636f4f08d3eaff2aaf567e021.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F81%2F47%2F14%2F814714d16599c351cb5101e48ae3396d.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwave.video%2Fblog%2Fwp-content%2Fuploads%2F2020%2F12%2Finstagram-story-poll-519x1024.jpeg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.guidingtech.com%2Fimager%2Fmedia%2Fassets%2F2019%2F07%2F231731%2FTop-7-Best-Apps-for-Instagram-Stories-in-2019-21_4d470f76dc99e18ad75087b1b8410ea9.png%3F1562942283&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.socialmediaexaminer.com%2Fwp-content%2Fuploads%2F2017%2F06%2Fag-instagram-story-ad-spotify.png&f=1&nofb=1',
      ],
    },
    {
      name: 'risks',
      thumbnail_url:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.fotocommunity.com%2Fno-risk-no-fun-95004125-c06b-4ca4-bfe4-ed0570189d34.jpg%3Fheight%3D1080&f=1&nofb=1',
      stories: [
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F42%2F71%2F11%2F4271119636f4f08d3eaff2aaf567e021.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F81%2F47%2F14%2F814714d16599c351cb5101e48ae3396d.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwave.video%2Fblog%2Fwp-content%2Fuploads%2F2020%2F12%2Finstagram-story-poll-519x1024.jpeg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.guidingtech.com%2Fimager%2Fmedia%2Fassets%2F2019%2F07%2F231731%2FTop-7-Best-Apps-for-Instagram-Stories-in-2019-21_4d470f76dc99e18ad75087b1b8410ea9.png%3F1562942283&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.socialmediaexaminer.com%2Fwp-content%2Fuploads%2F2017%2F06%2Fag-instagram-story-ad-spotify.png&f=1&nofb=1',
      ],
    },
    {
      name: 'why meme?',
      thumbnail_url:
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-AXkkbmFRErs%2FTjCZIWGawfI%2FAAAAAAAAAlk%2FlT8yTGBYh38%2Fs1600%2FRick-Roll3.png&f=1&nofb=1',
      stories: [
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F42%2F71%2F11%2F4271119636f4f08d3eaff2aaf567e021.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F81%2F47%2F14%2F814714d16599c351cb5101e48ae3396d.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwave.video%2Fblog%2Fwp-content%2Fuploads%2F2020%2F12%2Finstagram-story-poll-519x1024.jpeg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.guidingtech.com%2Fimager%2Fmedia%2Fassets%2F2019%2F07%2F231731%2FTop-7-Best-Apps-for-Instagram-Stories-in-2019-21_4d470f76dc99e18ad75087b1b8410ea9.png%3F1562942283&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.socialmediaexaminer.com%2Fwp-content%2Fuploads%2F2017%2F06%2Fag-instagram-story-ad-spotify.png&f=1&nofb=1',
      ],
    },
    {
      name: 'risks',
      thumbnail_url:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.fotocommunity.com%2Fno-risk-no-fun-95004125-c06b-4ca4-bfe4-ed0570189d34.jpg%3Fheight%3D1080&f=1&nofb=1',
      stories: [
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F42%2F71%2F11%2F4271119636f4f08d3eaff2aaf567e021.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F81%2F47%2F14%2F814714d16599c351cb5101e48ae3396d.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwave.video%2Fblog%2Fwp-content%2Fuploads%2F2020%2F12%2Finstagram-story-poll-519x1024.jpeg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.guidingtech.com%2Fimager%2Fmedia%2Fassets%2F2019%2F07%2F231731%2FTop-7-Best-Apps-for-Instagram-Stories-in-2019-21_4d470f76dc99e18ad75087b1b8410ea9.png%3F1562942283&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.socialmediaexaminer.com%2Fwp-content%2Fuploads%2F2017%2F06%2Fag-instagram-story-ad-spotify.png&f=1&nofb=1',
      ],
    },
    {
      name: 'why meme?',
      thumbnail_url:
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-AXkkbmFRErs%2FTjCZIWGawfI%2FAAAAAAAAAlk%2FlT8yTGBYh38%2Fs1600%2FRick-Roll3.png&f=1&nofb=1',
      stories: [
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F42%2F71%2F11%2F4271119636f4f08d3eaff2aaf567e021.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F81%2F47%2F14%2F814714d16599c351cb5101e48ae3396d.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwave.video%2Fblog%2Fwp-content%2Fuploads%2F2020%2F12%2Finstagram-story-poll-519x1024.jpeg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.guidingtech.com%2Fimager%2Fmedia%2Fassets%2F2019%2F07%2F231731%2FTop-7-Best-Apps-for-Instagram-Stories-in-2019-21_4d470f76dc99e18ad75087b1b8410ea9.png%3F1562942283&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.socialmediaexaminer.com%2Fwp-content%2Fuploads%2F2017%2F06%2Fag-instagram-story-ad-spotify.png&f=1&nofb=1',
      ],
    },
    {
      name: 'risks',
      thumbnail_url:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.fotocommunity.com%2Fno-risk-no-fun-95004125-c06b-4ca4-bfe4-ed0570189d34.jpg%3Fheight%3D1080&f=1&nofb=1',
      stories: [
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F42%2F71%2F11%2F4271119636f4f08d3eaff2aaf567e021.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F81%2F47%2F14%2F814714d16599c351cb5101e48ae3396d.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwave.video%2Fblog%2Fwp-content%2Fuploads%2F2020%2F12%2Finstagram-story-poll-519x1024.jpeg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.guidingtech.com%2Fimager%2Fmedia%2Fassets%2F2019%2F07%2F231731%2FTop-7-Best-Apps-for-Instagram-Stories-in-2019-21_4d470f76dc99e18ad75087b1b8410ea9.png%3F1562942283&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.socialmediaexaminer.com%2Fwp-content%2Fuploads%2F2017%2F06%2Fag-instagram-story-ad-spotify.png&f=1&nofb=1',
      ],
    },
    {
      name: 'why meme?',
      thumbnail_url:
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-AXkkbmFRErs%2FTjCZIWGawfI%2FAAAAAAAAAlk%2FlT8yTGBYh38%2Fs1600%2FRick-Roll3.png&f=1&nofb=1',
      stories: [
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F42%2F71%2F11%2F4271119636f4f08d3eaff2aaf567e021.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F81%2F47%2F14%2F814714d16599c351cb5101e48ae3396d.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwave.video%2Fblog%2Fwp-content%2Fuploads%2F2020%2F12%2Finstagram-story-poll-519x1024.jpeg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.guidingtech.com%2Fimager%2Fmedia%2Fassets%2F2019%2F07%2F231731%2FTop-7-Best-Apps-for-Instagram-Stories-in-2019-21_4d470f76dc99e18ad75087b1b8410ea9.png%3F1562942283&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.socialmediaexaminer.com%2Fwp-content%2Fuploads%2F2017%2F06%2Fag-instagram-story-ad-spotify.png&f=1&nofb=1',
      ],
    },
    {
      name: 'risks',
      thumbnail_url:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.fotocommunity.com%2Fno-risk-no-fun-95004125-c06b-4ca4-bfe4-ed0570189d34.jpg%3Fheight%3D1080&f=1&nofb=1',
      stories: [
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F42%2F71%2F11%2F4271119636f4f08d3eaff2aaf567e021.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F81%2F47%2F14%2F814714d16599c351cb5101e48ae3396d.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwave.video%2Fblog%2Fwp-content%2Fuploads%2F2020%2F12%2Finstagram-story-poll-519x1024.jpeg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.guidingtech.com%2Fimager%2Fmedia%2Fassets%2F2019%2F07%2F231731%2FTop-7-Best-Apps-for-Instagram-Stories-in-2019-21_4d470f76dc99e18ad75087b1b8410ea9.png%3F1562942283&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.socialmediaexaminer.com%2Fwp-content%2Fuploads%2F2017%2F06%2Fag-instagram-story-ad-spotify.png&f=1&nofb=1',
      ],
    },
    {
      name: 'why meme?',
      thumbnail_url:
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-AXkkbmFRErs%2FTjCZIWGawfI%2FAAAAAAAAAlk%2FlT8yTGBYh38%2Fs1600%2FRick-Roll3.png&f=1&nofb=1',
      stories: [
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F42%2F71%2F11%2F4271119636f4f08d3eaff2aaf567e021.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F81%2F47%2F14%2F814714d16599c351cb5101e48ae3396d.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwave.video%2Fblog%2Fwp-content%2Fuploads%2F2020%2F12%2Finstagram-story-poll-519x1024.jpeg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.guidingtech.com%2Fimager%2Fmedia%2Fassets%2F2019%2F07%2F231731%2FTop-7-Best-Apps-for-Instagram-Stories-in-2019-21_4d470f76dc99e18ad75087b1b8410ea9.png%3F1562942283&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.socialmediaexaminer.com%2Fwp-content%2Fuploads%2F2017%2F06%2Fag-instagram-story-ad-spotify.png&f=1&nofb=1',
      ],
    },
    {
      name: 'risks',
      thumbnail_url:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.fotocommunity.com%2Fno-risk-no-fun-95004125-c06b-4ca4-bfe4-ed0570189d34.jpg%3Fheight%3D1080&f=1&nofb=1',
      stories: [
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F42%2F71%2F11%2F4271119636f4f08d3eaff2aaf567e021.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F81%2F47%2F14%2F814714d16599c351cb5101e48ae3396d.jpg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwave.video%2Fblog%2Fwp-content%2Fuploads%2F2020%2F12%2Finstagram-story-poll-519x1024.jpeg&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.guidingtech.com%2Fimager%2Fmedia%2Fassets%2F2019%2F07%2F231731%2FTop-7-Best-Apps-for-Instagram-Stories-in-2019-21_4d470f76dc99e18ad75087b1b8410ea9.png%3F1562942283&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.socialmediaexaminer.com%2Fwp-content%2Fuploads%2F2017%2F06%2Fag-instagram-story-ad-spotify.png&f=1&nofb=1',
      ],
    },
  ];

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
              whitepapercpush
            </Text>
          </View>
        </Bounceable>
      </View>
    );
  }

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
        {dummy_jargon_buster.content}
      </Text>
      <Spacer height={30} />
      <View sx={{height: 150}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {dummy_stories.map(item => (
            <StoryThumbnail story={item} />
          ))}
        </ScrollView>
      </View>
      <Spacer height={30} />
      <RenderLinks />
      <Spacer height={30} />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(MemeCoinsJargonBuster);

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
