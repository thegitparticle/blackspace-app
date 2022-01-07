import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  ScrollView,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import MainDetails from '../components/MainDetails';
import WalletPie from '../components/WalletPie';
import AccordianPortfolio from '../components/AccordianPortfolio';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BottomSpacer from '../../../bits/BottomSpacer';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function MyProfileScreen() {
  // const [showHeader, setShowHeader] = useState(true);
  //
  // const emptyHeaderVisibility = useSharedValue(1);
  // const filledHeaderVisibility = useSharedValue(0);
  //
  // const scrollHandler = useAnimatedScrollHandler({
  //   onScroll: event => {
  //     'worklet';
  //     console.log(event.contentOffset.y);
  //     if (event.contentOffset.y > 40) {
  //       emptyHeaderVisibility.value = withTiming(0);
  //       filledHeaderVisibility.value = withTiming(1);
  //     } else {
  //       emptyHeaderVisibility.value = withTiming(1);
  //       filledHeaderVisibility.value = withTiming(0);
  //     }
  //     console.log(emptyHeaderVisibility.value + 'empty');
  //     console.log(filledHeaderVisibility.value + 'filled');
  //   },
  // });

  // const emptyHeaderStyles = useAnimatedStyle(() => {
  //   return {
  //     ...styles.header_view_shown,
  //     opacity: emptyHeaderVisibility.value,
  //   };
  // });
  //
  // const filledHeaderStyles = useAnimatedStyle(() => {
  //   return {
  //     ...styles.header_view_hidden,
  //     opacity: filledHeaderVisibility.value,
  //   };
  // });

  // function Header() {
  //   return (
  //     <Animated.View>
  //       <Animated.View style={[filledHeaderStyles]}>
  //         <Text style={styles.header_text}>My Deets!</Text>
  //       </Animated.View>
  //       <Animated.View style={[emptyHeaderStyles]}></Animated.View>
  //     </Animated.View>
  //   );
  // }

  return (
    <View style={styles.parent_view}>
      {/*<Header />*/}
      <Animated.ScrollView showsVerticalScrollIndicator={false}>
        <MainDetails />
        <WalletPie />
        <AccordianPortfolio />
        <BottomSpacer height={50} />
      </Animated.ScrollView>
    </View>
  );
}

export default MyProfileScreen;

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    width: windowWidth,
    backgroundColor: themeHere.colors.background,
  },
  header_view_shown: {
    width: windowWidth,
    height: 30,
    marginVertical: 20,
    alignItems: 'center',
  },
  header_view_hidden: {
    width: windowWidth,
    height: 50,
    alignItems: 'center',
  },
  header_text: {
    ...themeHere.text.title_3,
    color: 'white',
  },
});
