import React from 'react';
import {Appearance, Dimensions} from 'react-native';
import {ScrollView, Text, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {SquircleCard} from '../../../theme/DripsyTheme';
import SpacerVertical from '../../../bits/SpacerVertical';
import {Icon} from 'react-native-elements';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function TipViewModal({route}) {
  const {tipInfo} = route.params;

  function StepTile(props) {
    // props - content (string) and stepNumber (Number)
    return (
      <View
        sx={{
          alignItems: 'center',
          alignSelf: 'center',
          marginVertical: '$3',
        }}>
        <SquircleCard
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 15,
            fillColor: themeHere.colors.mid_ground + '75',
          }}>
          <Text
            variant="body_medium"
            sx={{
              color: 'foreground',
              opacity: 0.75,
              marginVertical: '$4',
              marginHorizontal: '$4',
            }}>
            {String(props.stepNumber)}. {props.content}
          </Text>
        </SquircleCard>
        <SpacerVertical height={30} />
        <Icon
          name="arrow-down"
          type="feather"
          color={themeHere.colors.mid_ground}
        />
      </View>
    );
  }

  return (
    <View variant="full_screen">
      <Text
        variant="header_bold"
        sx={{
          alignSelf: 'center',
          maxWidth: windowWidth * 0.75,
          color: 'foreground',
          textAlign: 'center',
          marginVertical: '$10',
        }}>
        {tipInfo.name}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {[1, 2, 3, 4, 5].map(item => (
          <StepTile
            stepNumber={item}
            content={tipInfo[`step_${String(item)}`]}
          />
        ))}
        <SpacerVertical height={200} />
      </ScrollView>
    </View>
  );
}

export default TipViewModal;
