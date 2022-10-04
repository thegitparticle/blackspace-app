import {ScrollView, Text, View} from 'dripsy';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Dimensions, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {GetHomoraAPYs} from '../../../redux/onchain/HomoraAPYsActions';
import {GetHomoraFarms} from '../../../redux/onchain/HomoraFarmsActions';
import {GetHomoraTradingVols} from '../../../redux/onchain/HomoraTradingVolsActions';
import {GetHomoraTokens} from '../../../redux/onchain/HomoraTokensActions';
import {dripsytheme} from '../../../theme/DripsyTheme';
import FarmThumbnailComponent from './components/FarmThumbnailComponent';
import SpacerVertical from '../../../bits/SpacerVertical';
import {GetFarmFaqs} from '../../../redux/onchain/farms/FarmFAQActions';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let state_here = {};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function FarmPage({dispatch}) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    dispatch(GetHomoraFarms());
    dispatch(GetHomoraAPYs());
    dispatch(GetHomoraTradingVols());
    dispatch(GetHomoraTokens());
    dispatch(GetFarmFaqs());
  }, [refreshing]);

  const homoraFarms = state_here.HomoraFarmsReducer.homora_farms;

  const RenderFarmsThumbnails = useMemo(
    () =>
      function RenderFarmsThumbnails() {
        if (homoraFarms.length > 0) {
          return (
            <View>
              {homoraFarms.map((item, index) => (
                <FarmThumbnailComponent farmData={item} />
              ))}
              <SpacerVertical height={windowHeight * 0.25} />
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
                  marginVertical: '$4',
                }}>
                no farms loaded
              </Text>
            </View>
          );
        }
      },
    [homoraFarms],
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={dripsytheme.colors.layout_1}
        />
      }>
      <View variant="layout.full_screen_transparent">
        <Text
          variant="heading_thick"
          sx={{
            color: 'layout_1',
            marginHorizontal: '$4',
            marginVertical: '$4',
          }}>
          Yield Farms
        </Text>
        <RenderFarmsThumbnails />
      </View>
    </ScrollView>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(FarmPage);
