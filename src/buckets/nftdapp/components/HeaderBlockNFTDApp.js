import React from 'react';
import {Appearance, Dimensions} from 'react-native';
import {Image, Text, useSx, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../theme/ButterTheme';
import Iconly from '../miscsetups/customfonts/Iconly';
import {useNavigation} from '@react-navigation/native';
import {Header} from 'react-native-elements';
import {Bounceable} from 'rn-bounceable';
import {BlurView} from '@react-native-community/blur';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

const statusBarHeight = getStatusBarHeight();

function HeaderNFTDApp(props) {
  // props - app_details
  const navigation = useNavigation();
  const sx = useSx();

  return (
    <View>
      <Image
        source={{uri: props.app_details.dapp_cover}}
        style={{
          width: windowWidth,
          height: windowHeight * 0.2,
          position: 'absolute',
        }}
      />
      <BlurView
        style={{
          width: windowWidth,
          height: windowHeight * 0.2,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        blurType={'materialDark'}
        blurAmount={10}
        reducedTransparencyFallbackColor="gray"
      />
      <Header
        backgroundColor={'transparent'}
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
        <Bounceable onPress={() => {}}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: windowHeight * 0.1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={{uri: props.app_details.dapp_icon}}
                style={{
                  width: 50,
                  height: 50,
                  marginHorizontal: 5,
                }}
              />
              <Text
                variant="title_2"
                sx={{color: 'foreground', marginHorizontal: '$1'}}>
                {props.app_details.name}
              </Text>
            </View>
            <Text
              variant="caption"
              sx={{color: 'foreground', textAlign: 'center'}}>
              {props.app_details.tagline}
            </Text>
          </View>
        </Bounceable>
        <Bounceable onPress={() => navigation.goBack()}>
          <View
            sx={{
              marginHorizontal: 20,
              height: 50,
              justifyContent: 'center',
            }}>
            <Iconly
              name="CloseSquareBold"
              color={themeHere.colors.foreground}
              size={25}
            />
          </View>
        </Bounceable>
      </Header>
    </View>
  );
}

export default HeaderNFTDApp;
