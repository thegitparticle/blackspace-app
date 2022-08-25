import {Text, View} from 'dripsy';
import React, {useCallback, useState} from 'react';
import {Dimensions} from 'react-native';
import {SquircleView} from 'react-native-figma-squircle';
import {connect} from 'react-redux';
import {
  dripsytheme,
  StyledCircleFastImage25,
} from '../../../../theme/DripsyTheme';
import {useSx} from 'dripsy';
import FastImage from 'react-native-fast-image';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let state_here = {};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function PoSPoolThumbnailComponent(props) {
  // props - PoolData
  const sxCustom = useSx();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SquircleView
      style={sxCustom({
        width: windowWidth - 40,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: '$2',
      })}
      squircleParams={{
        cornerSmoothing: 1,
        cornerRadius: 15,
        fillColor: dripsytheme.colors.layout_4,
      }}>
      <View
        variant="layout.sub_view_40_margin"
        sx={{flexDirection: 'row', marginVertical: '$3'}}>
        <StyledCircleFastImage25
          source={{
            uri: props.PoolData.pool_logo,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
          style={{backgroundColor: dripsytheme.colors.layout_1}}
        />
        <Text
          variant="body_thick"
          sx={{color: 'layout_1', marginHorizontal: '$2'}}>
          {props.PoolData.pool_name} - {props.PoolData.token_symbol}
        </Text>
      </View>
      <View
        variant="layout.sub_view_40_margin"
        sx={{
          flexDirection: 'row',
          marginVertical: '$3',
          justifyContent: 'space-between',
        }}>
        <View sx={{flexDirection: 'column'}}>
          <Text
            variant="caption"
            sx={{color: 'layout_2', marginVertical: '$1'}}>
            total staked amount
          </Text>
          <Text variant="body" sx={{color: 'layout_1'}}>
            {props.PoolData.total_staked_amount_usd}
          </Text>
        </View>
        <View sx={{flexDirection: 'column'}}>
          <Text
            variant="caption"
            sx={{color: 'layout_2', marginVertical: '$1'}}>
            expected interest %
          </Text>
          <Text variant="body" sx={{color: 'success_2'}}>
            {props.PoolData.interest_rate}
          </Text>
        </View>
      </View>
    </SquircleView>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(PoSPoolThumbnailComponent);
