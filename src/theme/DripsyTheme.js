import {makeTheme} from 'dripsy';
import {Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const dripsytheme = makeTheme({
  colors: {
    dark: '#050505',
    off_dark: '#1A1A1A',
    mid_gray: '#999999',
    off_light: '#F1F4F9',
    light: '#FFFFFF',
    background: '#050505',
    off_background: '#1A1A1A',
    mid_ground: '#999999',
    off_foreground: '#F1F4F9',
    foreground: '#FFFFFF',
    success_green: '#0ACF83',
    success_green_light: '#13F49D',
    success_green_dark: '#08A76A',
    danger_red: '#EC193E',
    danger_red_light: '#F04C68',
    danger_red_dark: '#C31030',
    icon: '#F1F4F9',
    icon_background: '#333333',
    red: '#FF3E41',
    red_light: '#FF8182',
    red_dark: '#FF0106',
    blue: '#1ABCFE',
    blue_light: '#55CDFE',
    blue_dark: '#01A1E2',
    purple: '#A259FF',
    purple_light: '#CAA1FF',
    purple_dark: '#7E18FF',
    yellow: '#FFC82C',
    pink: '#FF49DB',
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