import React from 'react';
import {SquircleView} from 'react-native-figma-squircle';
import {Text} from 'react-native';

function SquircleButton({
  width,
  height,
  buttonColor,
  textColor,
  font,
  buttonText,
}) {
  return (
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
      }}>
      <Text
        style={{
          ...font,
          color: textColor,
        }}>
        {buttonText}
      </Text>
    </SquircleView>
  );
}

export default SquircleButton;
