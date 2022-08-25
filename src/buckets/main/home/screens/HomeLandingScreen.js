import {useSx, View} from 'dripsy';
import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {connect} from 'react-redux';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import {dripsytheme} from '../../../../theme/DripsyTheme';
import HeaderOnHome from '../components/HeaderOnHome';
import FarmsPage from '../../farms/FarmsPage';
import HomePage from '../pages/HomePage';
import SavePage from '../../save/SavePage';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let state_here = {};

function HomeLandingScreen({dispatch, navigation}) {
  const sxCustom = useSx();

  const renderScene = SceneMap({
    first: SavePage,
    second: FarmsPage,
    third: HomePage,
  });

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'first', title: 'Home'},
    {key: 'second', title: 'Farms'},
    {key: 'third', title: 'Save'},
  ]);

  function renderLabel({route, focused}) {
    if (route.title === 'Home') {
      if (focused) {
        return (
          <View variant="layout.tab_label_chip">
            <Iconly name="HomeBold" color={'#FAFAFA'} size={25} />
          </View>
        );
      } else {
        return (
          <View variant="layout.tab_label_chip">
            <Iconly name="HomeBold" color={'#FAFAFA50'} size={25} />
          </View>
        );
      }
    } else if (route.title === 'Farms') {
      if (focused) {
        return (
          <View variant="layout.tab_label_chip">
            <Iconly name="Filter2Bold" color={'#FAFAFA'} size={25} />
          </View>
        );
      } else {
        return (
          <View variant="layout.tab_label_chip">
            <Iconly name="Filter2Bold" color={'#FAFAFA50'} size={25} />
          </View>
        );
      }
    } else {
      if (focused) {
        return (
          <View variant="layout.tab_label_chip">
            <Iconly name="DiscountBold" color={'#FAFAFA'} size={25} />
          </View>
        );
      } else {
        return (
          <View variant="layout.tab_label_chip">
            <Iconly name="DiscountBold" color={'#FAFAFA50'} size={25} />
          </View>
        );
      }
    }
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={sxCustom({
        width: 0,
      })}
      style={sxCustom({
        backgroundColor: 'layout_4',
        position: 'absolute',
        bottom: 0,
        color: '#000',
        height: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        width: windowWidth * 0.7,
        marginBottom: windowHeight * 0.05,
        borderRadius: 30,
        borderTopWidth: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
      })}
      renderLabel={renderLabel}
      tabStyle={{backgroundColor: 'transparent'}}
    />
  );

  return (
    <LinearGradient
      colors={[
        dripsytheme.colors.layout_4,
        dripsytheme.colors.layout_5,
        dripsytheme.colors.layout_5,
      ]}
      style={{flex: 1}}>
      <HeaderOnHome />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: windowWidth}}
      />
    </LinearGradient>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(HomeLandingScreen);
