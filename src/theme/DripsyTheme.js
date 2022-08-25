import {makeTheme, styled} from 'dripsy';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SquircleView} from 'react-native-figma-squircle';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const dripsytheme = makeTheme({
  colors: {
    layout_1: '#FAFAFA',
    layout_2: '#EAEAEA',
    layout_3: '#333333',
    layout_4: '#191919',
    layout_5: '#131313',
    success_1: '#4FEEC6',
    success_2: '#1DE9B6',
    success_3: '#13C295',
    danger_1: '#EC6C69',
    danger_2: '#E53935',
    danger_3: '#CB1E1A',
    warning_1: '#FFE583',
    warning_2: '#FFD740',
    warning_3: '#FFCA03',
    brand_blue: '#009EEB',
    brand_purple: '#592DEA',
    brand_pink: '#FF16D1',
    brand_orange: '#FF5216',
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
    title_thick: {
      fontFamily: 'KumbhSans-ExtraBold',
      fontSize: windowHeight > 770 ? 30 : 28,
    },
    title: {
      fontFamily: 'KumbhSans-SemiBold',
      fontSize: windowHeight > 770 ? 30 : 28,
    },
    heading_thick: {
      fontFamily: 'KumbhSans-Bold',
      fontSize: windowHeight > 770 ? 21 : 20,
    },
    heading: {
      fontFamily: 'KumbhSans-Medium',
      fontSize: windowHeight > 770 ? 21 : 20,
    },
    body_thick: {
      fontFamily: 'KumbhSans-Bold',
      fontSize: windowHeight > 770 ? 15 : 14,
    },
    body: {
      fontFamily: 'KumbhSans-Medium',
      fontSize: windowHeight > 770 ? 15 : 14,
    },
    text_thick: {
      fontFamily: 'KumbhSans-Medium',
      fontSize: windowHeight > 770 ? 13 : 12,
    },
    text: {
      fontFamily: 'KumbhSans-Regular',
      fontSize: windowHeight > 770 ? 13 : 12,
    },
    caption_thick: {
      fontFamily: 'KumbhSans-Regular',
      fontSize: windowHeight > 770 ? 11 : 10,
    },
    caption: {
      fontFamily: 'KumbhSans-Light',
      fontSize: windowHeight > 770 ? 11 : 10,
    },
  },
  layout: {
    // full views - screens
    full_screen: {
      width: windowWidth,
      flex: 1,
      backgroundColor: 'layout_5',
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

    // popups and modals
    info_popup: {
      backgroundColor: 'layout_4',
      borderColor: 'layout_4',
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
      backgroundColor: 'layout_4',
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
});

// Images

export const StylesFastImageFullScreen = styled(FastImage)({
  width: windowWidth,
  height: windowHeight,
});

export const StylesFastImageHalfScreen = styled(FastImage)({
  width: windowWidth,
  height: windowHeight * 0.5,
});

export const StyledCircleFastImage60 = styled(FastImage)({
  width: 60,
  height: 60,
  borderRadius: 30,
});

export const StyledCircleFastImage50 = styled(FastImage)({
  width: 50,
  height: 50,
  borderRadius: 25,
});

export const StyledCircleFastImage35 = styled(FastImage)({
  width: 35,
  height: 35,
  borderRadius: 17.5,
});

export const StyledCircleFastImage30 = styled(FastImage)({
  width: 30,
  height: 30,
  borderRadius: 15,
});

export const StyledCircleFastImage25 = styled(FastImage)({
  width: 25,
  height: 25,
  borderRadius: 12.5,
});

export const SquircleCard = styled(SquircleView)({
  width: windowWidth - 40,
});
