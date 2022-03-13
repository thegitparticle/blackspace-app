import React from 'react';
import {SquircleView} from 'react-native-figma-squircle';
import {Text, Image, StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import MaskedView from '@react-native-masked-view/masked-view';

function SquircleGlassButton({
  width,
  height,
  buttonColor,
  textColor,
  font,
  buttonText,
}) {
  return (
    <MaskedView
      style={{
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      maskElement={
        <SquircleView
          style={{
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 10,
            fillColor: buttonColor,
          }}
        />
      }>
      <BlurView
        style={{
          width: width,
          height: height,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="gray"
      />
      <Text
        style={{
          ...font,
          color: textColor,
        }}>
        {buttonText}
      </Text>
    </MaskedView>
  );
}

export default SquircleGlassButton;
