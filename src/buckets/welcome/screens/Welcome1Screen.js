import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function Welcome1Screen() {
  return (
    <View style={styles.screen_view}>
      <Text>superblack</Text>
    </View>
  );
}

export default Welcome1Screen;

const styles = StyleSheet.create({
  screen_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
