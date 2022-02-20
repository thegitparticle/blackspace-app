import React from 'react';
import {StyleSheet, Dimensions, Appearance, Pressable} from 'react-native';
import {Text, View, Image, useSx} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../theme/ButterTheme';
import Iconly from '../miscsetups/customfonts/Iconly';
import {useNavigation} from '@react-navigation/native';
import {Header} from 'react-native-elements';
import {Bounceable} from 'rn-bounceable';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function HeaderMiniAppV2(props) {
  // props - app_details
  const navigation = useNavigation();
  const sx = useSx();

  return (
    <Header
      backgroundColor={themeHere.colors.off_background}
      containerStyle={sx({borderBottomWidth: 0})}>
      <Bounceable>
        <View sx={{marginHorizontal: 20}}>
          <Iconly
            name="ChevronDownBroken"
            color={themeHere.colors.foreground + '00'}
            size={25}
          />
        </View>
      </Bounceable>
      <Bounceable
        style={styles.right_side_icon}
        onPress={() => navigation.goBack()}>
        <Text variant="title_2" sx={{color: 'foreground'}}>
          {props.app_details.name}
        </Text>
      </Bounceable>
      <Bounceable onPress={() => navigation.goBack()}>
        <View sx={{marginHorizontal: 20}}>
          <Iconly
            name="CloseSquareBold"
            color={themeHere.colors.foreground}
            size={25}
          />
        </View>
      </Bounceable>
    </Header>
  );
}

export default HeaderMiniAppV2;

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth,
    flexDirection: 'row',
    height: 75,
  },
  left_side_icon: {
    marginHorizontal: 20,
  },
  right_side_icon: {
    marginHorizontal: 20,
  },
  title_text: {
    ...themeHere.text.title_3,
    color: themeHere.colors.foreground,
  },
});
