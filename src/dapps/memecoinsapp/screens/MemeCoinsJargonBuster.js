import React from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {connect} from 'react-redux';

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
      'We take loan so that we dont have to liquidate our ETH(Ethereum) to buy something as risky as memecoins.\\r\\nWe will need to know that, Liquity app asks for 145 percent collateralization, which means for example: for 145 eth as collateral we deposit, we can get upto 100 eth worth of loan. \\r\\nAnother aspect here, is  liquidation',
  };
  let dummy_stories = [
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

  return (
    <View style={styles.parent_view}>
      <Text style={{color: 'orange'}}>jargons will be slayed</Text>
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
