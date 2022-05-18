import React, {useEffect, useState} from 'react';
import {Appearance, Dimensions, StyleSheet, Text, View} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../../theme/ButterTheme';
import {useSharedValue} from 'react-native-reanimated';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function WhileImportingProcessShowcase() {
  const waitingText1Opacity = useSharedValue(1);
  const waitingText2Opacity = useSharedValue(0);
  const waitingText3Opacity = useSharedValue(0);
  const [waitingTextOverallOpacity, setWaitingTextOverallOpacity] = useState(1);

  useEffect(() => {
    WaitingTextChanger();
  }, []);

  function WaitingTextChanger() {
    setTimeout(() => {
      console.log('1 sec done');
      waitingText1Opacity.value = 0;
      waitingText2Opacity.value = 1;
    }, 1000);
    setTimeout(() => {
      waitingText2Opacity.value = 0;
      waitingText3Opacity.value = 1;
    }, 2000);
  }

  return (
    <View style={{...styles.parent_view, opacity: waitingTextOverallOpacity}}>
      <Text
        style={{
          ...styles.text_style,
          opacity: waitingText1Opacity.value,
          maxWidth: windowWidth * 0.75,
        }}>
        importing your wallet ... will take about 30 secs
      </Text>
      <Text
        style={{
          ...styles.text_style,
          opacity: waitingText2Opacity.value,
        }}>
        fetching details from blockchain ...
      </Text>
      <Text
        style={{
          ...styles.text_style,
          opacity: waitingText3Opacity.value,
        }}>
        how long? you could be asking!!!
      </Text>
    </View>
  );
}

export default WhileImportingProcessShowcase;

const styles = StyleSheet.create({
  parent_view: {
    marginVertical: windowHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_style: {
    ...themeHere.text.body,
    position: 'absolute',
    textAlign: 'center',
    color: 'white',
  },
});
