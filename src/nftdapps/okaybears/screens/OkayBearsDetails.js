import React from 'react';
import {Appearance, Dimensions, Linking} from 'react-native';
import {ScrollView, Text, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import SpacerVertical from '../../../bits/SpacerVertical';
import {Bounceable} from 'rn-bounceable';
import {Icon} from 'react-native-elements';
import SpacerHorizontal from '../../../bits/SpacerHorizontal';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function OkayBearsDetails(props) {
  function RenderLinks() {
    function LinkComponent(props) {
      return (
        <Bounceable onPress={() => Linking.openURL(props.Link)}>
          <View
            sx={{
              borderRadius: 100,
              alignItems: 'center',
              backgroundColor: themeHere.colors.red_light + '25',
              justifyContent: 'center',
              paddingVertical: '$2',
              paddingHorizontal: '$4',
              flexDirection: 'row',
              marginHorizontal: '$1',
            }}>
            <Icon
              name="external-link"
              type="feather"
              size={15}
              color={themeHere.colors.red_light}
            />
            <Text
              variant="body_medium"
              sx={{color: 'red_light', marginHorizontal: '$2'}}>
              {props.Title}
            </Text>
          </View>
        </Bounceable>
      );
    }

    return (
      <ScrollView
        variant="layout.sub_view_0_margin"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        sx={{
          alignSelf: 'center',
          marginTop: '$5',
          flexDirection: 'row',
        }}>
        <SpacerHorizontal width={20} />
        <LinkComponent
          Title={'website'}
          Link={props.appInfo.link_suite_website}
        />
        <LinkComponent
          Title={'twitter'}
          Link={props.appInfo.link_suite_twitter}
        />
        <LinkComponent
          Title={'marketplace'}
          Link={props.appInfo.link_suite_marketplace}
        />
        <SpacerHorizontal width={20} />
      </ScrollView>
    );
  }

  return (
    <View sx={{alignItems: 'center', justifyContent: 'center'}}>
      <SpacerVertical height={40} />
      <Text style={{color: 'orange'}}>what is okay bears all about?</Text>
      <RenderLinks />
    </View>
  );
}

export default OkayBearsDetails;
