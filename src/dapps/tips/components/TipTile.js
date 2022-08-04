import React from 'react';
import {Appearance, Dimensions} from 'react-native';
import {Text, useSx, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import window from '@react-navigation/native/src/__mocks__/window';
import {SquircleView} from 'react-native-figma-squircle/src/index';
import {Bounceable} from 'rn-bounceable';
import {useNavigation} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function TipTile(props) {
  // props - tipInfo object
  const navigation = useNavigation();
  const sxCustom = useSx();

  return (
    <Bounceable
      onPress={() =>
        navigation.navigate('TipViewModal', {
          tipInfo: props.tipInfo,
        })
      }>
      <View
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          width: windowWidth - 40,
          height: 75,
          my: '$2',
          alignSelf: 'center',
        }}>
        <SquircleView
          style={sxCustom({
            width: windowWidth - 40,
            height: 75,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          })}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 15,
            fillColor: themeHere.colors.mid_ground + '75',
          }}>
          <View sx={{mx: '$4', flexDirection: 'row', alignItems: 'center'}}>
            <View
              sx={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                height: 50,
                mx: '$4',
              }}>
              <Text variant="subhead_medium" sx={{color: 'foreground'}}>
                {props.tipInfo.name}
              </Text>
            </View>
          </View>
        </SquircleView>
      </View>
    </Bounceable>
  );
}

export default TipTile;
