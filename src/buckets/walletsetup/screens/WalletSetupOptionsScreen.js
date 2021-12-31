import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {LOGIN} from '../../../redux/types';
import {connect} from 'react-redux';
import CreateWalletPart from '../components/CreateWalletPart';
import ImportWalletPart from '../components/ImportWalletPart';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function WalletSetupOptionsScreen({dispatch, navigation}) {
  return (
    <View style={styles.parent_view}>
      <StatusBar barStyle="light-content" />
      <CreateWalletPart />
      <ImportWalletPart />
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
