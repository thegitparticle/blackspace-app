import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {LOGIN} from '../../../redux/types';
import {connect} from 'react-redux';
import CreateWalletPart from '../components/CreateWalletPart';
import ImportWalletPart from '../components/ImportWalletPart';
import {ZStack} from 'react-native-stacks/src/views/ZStack/ZStack';
import {View, Image} from 'dripsy';
import FastImage from 'react-native-fast-image';
import {StylesFastImageFullScreen} from '../../../theme/DripsyTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function WalletSetupOptionsScreen({dispatch, navigation}) {
  return (
    <View variant="layout.full_screen">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../../../assets/colors_background_1.png')}
        resizeMode="cover"
        style={{width: windowWidth, height: windowHeight}}>
        <CreateWalletPart />
        {/*<ImportWalletPart />*/}
      </ImageBackground>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onLogInClick: () => {
      dispatch({type: LOGIN});
    },
  };
};

export default connect(mapDispatchToProps)(WalletSetupOptionsScreen);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
