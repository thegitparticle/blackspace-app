import {makeTheme, styled, useSx} from 'dripsy';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SquircleView} from 'react-native-figma-squircle';
import {Button} from 'react-native-elements';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const dripsytheme = makeTheme({
  colors: {
    dark: '#090909',
    off_dark: '#171717',
    mid_gray: '#323232',
    off_light: '#F1F4F9',
    light: '#FFFFFF',
    background: '#090909',
    off_background: '#171717',
    mid_ground: '#323232',
    off_foreground: '#F1F4F9',
    foreground: '#FFFFFF',
    success_green: '#13CE66',
    success_green_light: '#29EB7F',
    success_green_dark: '#0F9F4F',
    danger_red: '#EC193E',
    danger_red_light: '#F04C68',
    danger_red_dark: '#C31030',
    icon: '#F1F4F9',
    icon_background: '#353535',
    red: '#FF3E41',
    red_light: '#FF8182',
    red_dark: '#FF0106',
    blue: '#1FB6FF',
    blue_light: '#85D7FF',
    blue_dark: '#009EEB',
    purple: '#7E5BEF',
    purple_light: '#A389F4',
    purple_dark: '#592DEA',
    yellow: '#FFC82C',
    yellow_light: '#FFD55F',
    yellow_dark: '#F8B700',
    pink: '#FF49DB',
    pink_light: '#FF7CE5',
    pink_dark: '#FF16D1',
    orange: '#FF7849',
    orange_light: '#FF9E7C',
    orange_dark: '#FF5216',
    turquoise: '#3DC8BF',
    special_gray: '#272D2D',
    neon_blue: '#6874E8',
  },

  space: {
    // recommended: set 0 first, then double for consistent nested spacing
    $0: 0,
    $1: 5,
    $2: 10,
    $3: 15,
    $4: 20,
    $5: 25,
    $6: 30,
    $7: 35,
    $8: 40,
    $9: 45,
    $10: 50,
  },
  text: {
    title_large: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 30 : 28,
    },
    title_large_i: {
      fontFamily: 'GothamRounded-BoldItalic',
      fontSize: windowHeight > 770 ? 30 : 28,
    },
    title_1: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 25 : 24,
    },
    title_1_i: {
      fontFamily: 'GothamRounded-BoldItalic',
      fontSize: windowHeight > 770 ? 25 : 24,
    },
    title_2: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 21 : 20,
    },
    title_2_i: {
      fontFamily: 'GothamRounded-BoldItalic',
      fontSize: windowHeight > 770 ? 21 : 20,
    },
    title_3: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 19 : 18,
    },
    title_3_i: {
      fontFamily: 'GothamRounded-BoldItalic',
      fontSize: windowHeight > 770 ? 19 : 18,
    },
    header_bold: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 17 : 16,
    },
    header: {
      fontFamily: 'GothamRounded-Medium',
      fontSize: windowHeight > 770 ? 17 : 16,
    },
    header_i: {
      fontFamily: 'GothamRounded-MediumItalic',
      fontSize: windowHeight > 770 ? 17 : 16,
    },
    subhead_bold: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 15 : 14,
    },
    subhead_medium: {
      fontFamily: 'GothamRounded-Medium',
      fontSize: windowHeight > 770 ? 15 : 14,
    },
    subhead_medium_i: {
      fontFamily: 'GothamRounded-MediumItalic',
      fontSize: windowHeight > 770 ? 15 : 14,
    },
    subhead: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 15 : 14,
    },
    subhead_i: {
      fontFamily: 'GothamRounded-BookItalic',
      fontSize: windowHeight > 770 ? 15 : 14,
    },
    body_medium: {
      fontFamily: 'GothamRounded-Medium',
      fontSize: windowHeight > 770 ? 13 : 12,
    },
    body_medium_i: {
      fontFamily: 'GothamRounded-MediumItalic',
      fontSize: windowHeight > 770 ? 13 : 12,
    },
    body: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 13 : 12,
    },
    body_i: {
      fontFamily: 'GothamRounded-BookItalic',
      fontSize: windowHeight > 770 ? 13 : 12,
    },
    caption: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 11 : 10,
    },
    caption_i: {
      fontFamily: 'GothamRounded-BookItalic',
      fontSize: windowHeight > 770 ? 11 : 10,
    },
    smallest: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 9 : 8,
    },
    smallest_i: {
      fontFamily: 'GothamRounded-BookItalic',
      fontSize: windowHeight > 770 ? 9 : 8,
    },
  },
  layout: {
    // full views - screens
    full_screen: {
      width: windowWidth,
      flex: 1,
      backgroundColor: 'background',
    },
    full_screen_transparent: {
      width: windowWidth,
      flex: 1,
      backgroundColor: 'transparent',
    },

    // sub views - components
    sub_view_0_margin: {
      width: windowWidth,
    },
    sub_view_20_margin: {
      width: windowWidth - 40,
    },
    sub_view_40_margin: {
      width: windowWidth - 80,
    },
    sub_view_50_margin: {
      width: windowWidth - 100,
    },

    // popups and modals
    info_popup: {
      backgroundColor: 'off_background',
      borderColor: 'off_background',
      justifyContent: 'center',
      alignItems: 'center',
      width: windowWidth - 40,
      borderRadius: 15,
    },

    // custom Chips in <View />
    tab_label_chip: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      borderRadius: 20,
      paddingHorizontal: 20,
      backgroundColor: 'off_background',
    },

    // for icons wrapped in <View />
    round_icon_container_30: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },

  // for <Image />
  images: {
    full_screen: {
      width: windowWidth,
      height: windowHeight,
    },
    half_screen: {
      width: windowWidth,
      height: windowHeight * 0.5,
    },
    small_icon_25_round: {
      width: 25,
      height: 25,
      borderRadius: 12.5,
    },
    small_icon_30_round: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },
  },
});

// Images

export const StylesFastImageFullScreen = styled(FastImage)({
  width: windowWidth,
  height: windowHeight,
});

export const StyledFastImage60 = styled(FastImage)({
  width: 60,
  height: 60,
  borderRadius: 30,
});

export const StyledFastImage50 = styled(FastImage)({
  width: 50,
  height: 50,
  borderRadius: 25,
});

export const StyledFastImage35 = styled(FastImage)({
  width: 35,
  height: 35,
  borderRadius: 17.5,
});

export const StyledFastImage30 = styled(FastImage)({
  width: 30,
  height: 30,
  borderRadius: 15,
});

export const StyledFastImage25 = styled(FastImage)({
  width: 25,
  height: 25,
  borderRadius: 12.5,
});

// Squircles - Cards, Tiles
export const SquircleCard = styled(SquircleView)({
  width: windowWidth - 40,
});
