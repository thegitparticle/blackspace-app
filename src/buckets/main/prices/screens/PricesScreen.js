import {useNavigation} from '@react-navigation/native';
import {Text, useSx, View} from 'dripsy';
import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, RefreshControl} from 'react-native';
import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';
import {Bounceable} from 'rn-bounceable';
import SpacerVertical from '../../../../bits/SpacerVertical';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import {GetMarketPrices} from '../../../../redux/appcore/MarketPricesActions';
import {dripsytheme} from '../../../../theme/DripsyTheme';
import PricesThumbnail from '../components/PricesThumbnail';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

let state_here = {};

function PricesScreen({dispatch}) {
  const sxCustom = useSx();
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    dispatch(GetMarketPrices());
  }, [refreshing]);

  let marketPrices = state_here.MarketPricesReducer.marketprices;

  function HeaderHere() {
    return (
      <View
        variant="layout.sub_view_20_margin"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'center',
          flexDirection: 'row',
          marginVertical: '$3',
        }}>
        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            variant="heading_thick"
            sx={{color: 'layout_1', marginHorizontal: '$2'}}>
            Prices
          </Text>
        </View>
        <Bounceable onPress={() => navigation.goBack()}>
          <Iconly
            name="CloseSquareBroken"
            color={dripsytheme.colors.layout_1}
            size={30}
          />
        </Bounceable>
      </View>
    );
  }

  function RenderThumbnails() {
    if (marketPrices.length > 1) {
      return (
        <View>
          {marketPrices.map(item => (
            <PricesThumbnail coinDetails={item} />
          ))}
        </View>
      );
    } else {
      return (
        <View>
          <Text
            variant="heading_thick"
            sx={{
              color: 'layout_1',
              marginHorizontal: '$4',
              marginVertical: '$2',
            }}>
            loading prices
          </Text>
        </View>
      );
    }
  }

  return (
    <View variant="layout.full_screen">
      <HeaderHere />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={dripsytheme.colors.layout_1}
          />
        }>
        <RenderThumbnails />
        <SpacerVertical height={60} />
      </Animated.ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(PricesScreen);
