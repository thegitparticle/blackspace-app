import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  ScrollView,
  SectionList,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {connect} from 'react-redux';
import MyAppThumbnail from '../components/MyAppThumbnail';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {GetMyApps} from '../../../redux/MyAppsActions';
import DiscoverAppThumbnail from '../components/DiscoverAppThumbnail';
import {GetDiscoverApps} from '../../../redux/DiscoverAppsActions';
import {DraggableGrid} from 'react-native-draggable-grid';
import {SectionGrid} from 'react-native-super-grid';

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

  const DATA = [
    {
      title: 'My Apps',
      data: my_apps,
    },
    {
      title: 'Discover',
      data: discover_apps,
    },
  ];

  function ThumbnailItem({item, section}) {
    if (section.title === 'My Apps') {
      return MyAppThumbnail(item);
    } else {
      return DiscoverAppThumbnail(item);
    }
  }

  return (
    <SectionGrid
      itemDimension={100}
      sections={DATA}
      renderItem={({item, section}) => (
        <ThumbnailItem item={item} section={section} />
      )}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.header}>{title}</Text>
      )}
      showsVerticalScrollIndicator={false}
    />
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
    paddingTop: 100,
    width: windowWidth,
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
