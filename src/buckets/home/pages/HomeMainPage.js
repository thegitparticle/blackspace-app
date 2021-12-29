import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  ScrollView,
} from 'react-native';
import {
  ButterThemeDark,
  ButterThemeLight,
} from '../../../../../../Desktop/soupapp/src/theme/ButterTheme';
import {connect} from 'react-redux';
import MyAppThumbnail from '../components/MyAppThumbnail';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {GetMyApps} from '../../../redux/MyAppsActions';
import DiscoverAppThumbnail from '../components/DiscoverAppThumbnail';
import {GetDiscoverApps} from '../../../redux/DiscoverAppsActions';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function HomeMainPage({dispatch}) {
  let my_apps = state_here.MyAppsReducer.myapps;
  let discover_apps = state_here.DiscoverAppsReducer.discoverapps;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(GetMyApps(state_here.MyProfileReducer.myProfileDetails.userid));
      dispatch(
        GetDiscoverApps(state_here.MyProfileReducer.myProfileDetails.userid),
      );
    }, [dispatch]),
  );

  console.log(my_apps);
  return (
    <View style={styles.parent_view}>
      <ScrollView style={styles.parent_scrollview}>
        {my_apps.map(item => (
          <MyAppThumbnail
            app_image={item.app_icon}
            app_name={item.app_name}
            extra_message={item.extra_message}
          />
        ))}
        {discover_apps.map(item => (
          <DiscoverAppThumbnail
            app_image={item.app_icon}
            app_name={item.app_name}
            extra_message={item.extra_message}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(HomeMainPage);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parent_scrollview: {
    width: windowWidth,
  },
  header_right_image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
});
