import {Text, View} from 'dripsy';
import React, {useCallback, useState} from 'react';
import {Dimensions} from 'react-native';
import {connect} from 'react-redux';

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

  return (
    <View variant="layout.full_screen_transparent">
      <Text variant="heading_thick" sx={{color: 'layout_1'}}>
        save page
      </Text>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(SavePage);
