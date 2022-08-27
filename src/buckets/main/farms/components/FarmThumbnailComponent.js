import {useNavigation} from '@react-navigation/native';
import {Text, useSx, View} from 'dripsy';
import React from 'react';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SquircleView} from 'react-native-figma-squircle';
import {connect} from 'react-redux';
import {Bounceable} from 'rn-bounceable';
import {
  dripsytheme,
  StyledCircleFastImage25,
} from '../../../../theme/DripsyTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let state_here = {};

function FarmThumbnailComponent({farmData}) {
  const sxCustom = useSx();
  const navigation = useNavigation();

  return (
    <Bounceable
      onPress={() =>
        navigation.navigate('FarmPoolScreen', {
          farmData: farmData,
        })
      }>
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
          <View sx={{flexDirection: 'row'}}>
            <StyledCircleFastImage25
              source={{
                uri:
                  'https://homora-v2.alphaventuredao.io/' +
                  farmData.exchange.logo,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={{backgroundColor: dripsytheme.colors.layout_1}}
            />
            <Text
              variant="body_thick"
              sx={{color: 'layout_1', marginHorizontal: '$2'}}>
              {farmData.name}
            </Text>
          </View>
          <View sx={{flexDirection: 'row'}}>
            <StyledCircleFastImage25
              source={{
                uri:
                  'https://homora-v2.alphaventuredao.io/' +
                  farmData.exchange.logo,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={{backgroundColor: dripsytheme.colors.layout_1}}
            />
            <Text
              variant="text"
              sx={{color: 'layout_1', marginHorizontal: '$2'}}>
              {farmData.exchange.name}
            </Text>
          </View>
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
              Pool TVL
            </Text>
            <Text variant="body" sx={{color: 'layout_1'}}>
              {farmData.type}
            </Text>
          </View>
          <View sx={{flexDirection: 'column'}}>
            <Text
              variant="caption"
              sx={{color: 'layout_2', marginVertical: '$1'}}>
              APY % up to
            </Text>
            <Text variant="body" sx={{color: 'success_2'}}>
              {farmData.wTokenType}
            </Text>
          </View>
        </View>
      </SquircleView>
    </Bounceable>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(FarmThumbnailComponent);
