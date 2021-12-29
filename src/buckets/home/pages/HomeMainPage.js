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
      title: 'Main dishes',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'Sides',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: 'Drinks',
      data: ['Water', 'Coke', 'Beer'],
    },
    {
      title: 'Desserts',
      data: ['Cheese Cake', 'Ice Cream'],
    },
  ];

  const Item = ({title}) => (
    <View style={{backgroundColor: '#f9c2ff', padding: 20, marginVertical: 8}}>
      <Text style={{fontSize: 24}}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.parent_view}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item title={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
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
    paddingTop: 100,
    width: '100%',
    height: '100%',
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
