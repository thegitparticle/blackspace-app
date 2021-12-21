import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Appearance,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGOUT} from '../../../redux/types';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconly from '../../../miscsetups/customfonts/Iconly';
import {ButterThemeLight, ButterThemeDark} from '../../../theme/ButterTheme';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {Modal, ModalContent, ScaleAnimation} from 'react-native-modals';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();

const themeHere = colorScheme == 'dark' ? ButterThemeDark : ButterThemeLight;

var state_here = {};

function HomeLandingScreen({dispatch}) {
  const [showPopup, setShowPopup] = useState(false);

  const renderHeader = () => (
    <View
      style={{
        backgroundColor: 'tomato',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}>
      <Text style={{...themeHere.text.header, color: 'white'}}>
        This is Header
      </Text>
    </View>
  );

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'brown',
        height: 450,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{...themeHere.text.subhead_medium, color: 'white'}}>
        Swipe to close
      </Text>
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <View style={styles.screen_view}>
      <Text>superblack inside bro</Text>
      <Text>{state_here.MyProfileReducer.myProfileDetails.username}</Text>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: windowHeight * 0.015,
        }}
        onPress={() => {
          dispatch({type: LOGOUT});
          AsyncStorage.clear();
        }}>
        <Text>log out</Text>
      </TouchableOpacity>
      <LottieView
        source={require('../../../../assets/loading_ping_pong_cup.json')}
        style={{width: 200, height: 200}}
        autoPlay
        loop
      />
      <FastImage
        style={{width: 200, height: 200}}
        source={{
          uri: 'https://unsplash.it/400/400?image=1',
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text
        style={{
          ...themeHere.text.title_3,
          color: themeHere.colors.you_prime,
        }}>
        this is the custom font
      </Text>
      <Button
        icon={<Icon name="arrow-right" size={15} color="white" />}
        title="Button with icon component"
      />
      <Button
        title="Open Bottom Sheet"
        onPress={() => {
          sheetRef.current.snapTo(0);
          ReactNativeHapticFeedback.trigger('impactLight', {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false,
          });
        }}
      />
      <Button
        title="Open Dialog"
        onPress={() => {
          setShowPopup(true);
          ReactNativeHapticFeedback.trigger('impactLight', {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false,
          });
        }}
      />
      <Iconly name="ChevronLeftBroken" color="#000" size={25} />
      <BottomSheet
        ref={sheetRef}
        snapPoints={[550, 300, 0]}
        renderHeader={renderHeader}
        renderContent={renderContent}
        springConfig={{
          mass: 0.3,
          damping: 5,
          stiffness: 80,
          overshootClamping: false,
        }}
        overdragResistanceFactor={2}
      />
      <Modal
        visible={showPopup}
        initialValue={0}
        useNativeDriver={true}
        modalAnimation={new ScaleAnimation()}
        onTouchOutside={() => {
          setShowPopup(false);
        }}>
        <ModalContent>
          <View
            style={{
              backgroundColor: 'brown',
              height: 450,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{...themeHere.text.subhead_medium, color: 'white'}}>
              this is the pop up
            </Text>
          </View>
        </ModalContent>
      </Modal>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(HomeLandingScreen);

const styles = StyleSheet.create({
  screen_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
