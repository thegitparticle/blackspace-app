import {Dimensions, Appearance} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const colorScheme = Appearance.getColorScheme();

export const ButterThemeLight = {
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

  spacing: {
    s: 5,
    m: 10,
    l: 20,
    xl: 40,
    xxl: 50,
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
};

export const ButterThemeDark3 = {
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
};

export const ButterThemeDark = {
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

  spacing: {
    s: 5,
    m: 10,
    l: 20,
    xl: 40,
    xxl: 50,
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
};

export const ButterTheme = {
  nowTheme: colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight,
};
