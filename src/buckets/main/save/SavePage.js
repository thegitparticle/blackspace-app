import {Text, View} from 'dripsy';
import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, RefreshControl} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {GetSavePools} from '../../../redux/onchain/save/SavePoolsActions';
import {dripsytheme} from '../../../theme/DripsyTheme';
import PoSPoolThumbnailComponent from './components/PoSPoolThumbnailComponent';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let state_here = {};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function SavePage({dispatch}) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    dispatch(GetSavePools());
  }, [refreshing]);

  const savePools = state_here.SavePoolsReducer.save_pools;

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
          PoS Staking
        </Text>
        {savePools.map((item, index) => (
          <PoSPoolThumbnailComponent PoolData={item} />
        ))}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(SavePage);
