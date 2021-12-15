import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function HomeLandingScreen() {
  return (
    <View style={styles.screen_view}>
      <Text>superblack inside bro</Text>
    </View>
  );
}

export default HomeLandingScreen;

const styles = StyleSheet.create({
  screen_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
