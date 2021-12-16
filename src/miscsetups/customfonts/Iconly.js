import React from 'react';
import MyIcon from 'react-native-custom-icon';
import IcomoonConfig from '../../../assets/fonts/selection.json';

function Iconly(props) {
  return (
    <MyIcon
      name={props.name}
      color={props.color}
      size={props.size}
      config={IcomoonConfig}
    />
  );
}

export default Iconly;
