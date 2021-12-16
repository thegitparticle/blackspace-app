import {Dimensions, Appearance} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const ButterThemeLight = {
  colors: {
    success_green: '#00C781',
    you_prime: '#FE2A55',
  },

  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },

  text: {
    title_large: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 34 : 32,
    },
    title_1: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 28 : 26,
    },
    title_2: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 22 : 21,
    },
    title_3: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 20 : 19,
    },
    header: {
      fontFamily: 'GothamRounded-Medium',
      fontSize: windowHeight > 770 ? 17 : 16,
    },
    body: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 17 : 16,
    },
    callout: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 16 : 15,
    },
    subhead_medium: {
      fontFamily: 'GothamRounded-Medium',
      fontSize: windowHeight > 770 ? 15 : 14,
    },
    subhead: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 15 : 14,
    },
    caption: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 13 : 12,
    },
    smallest: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 12 : 11,
    },
  },
};

export const ButterThemeDark = {
  colors: {
    success_green: '#00C781',
    you_prime: '#F9CC99',
  },

  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },

  text: {
    title_large: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 34 : 32,
    },
    title_1: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 28 : 26,
    },
    title_2: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 22 : 21,
    },
    title_3: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 20 : 19,
    },
    header: {
      fontFamily: 'GothamRounded-Medium',
      fontSize: windowHeight > 770 ? 17 : 16,
    },
    body: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 17 : 16,
    },
    callout: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 16 : 15,
    },
    subhead_medium: {
      fontFamily: 'GothamRounded-Medium',
      fontSize: windowHeight > 770 ? 15 : 14,
    },
    subhead: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 15 : 14,
    },
    caption: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 13 : 12,
    },
    smallest: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 12 : 11,
    },
  },
};
