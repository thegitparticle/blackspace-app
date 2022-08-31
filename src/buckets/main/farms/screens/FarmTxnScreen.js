// FarmTxnScreen
import {useNavigation} from '@react-navigation/native';
import {Text, useSx, View} from 'dripsy';
import React, {useCallback, useState, useEffect} from 'react';
import {Dimensions, Pressable, RefreshControl, TextInput} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SquircleView} from 'react-native-figma-squircle';
import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let state_here = {};

function FarmTxnScreen({route}) {
  const sxCustom = useSx();
  const navigation = useNavigation();
  const {farmData, amountStake1, amountStake2} = route.params;

  return (
    <View variant="layout.full_screen">
      <Text
        variant="body_thick"
        sx={{color: 'layout_2', marginHorizontal: '$4'}}>
        transactions happen here
      </Text>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(FarmTxnScreen);
