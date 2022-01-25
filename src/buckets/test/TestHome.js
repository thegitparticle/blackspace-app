import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Appearance} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../theme/ButterTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import axios from 'axios';
import {AddUserDetails} from '../../redux/appcore/UserDetailsActions';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function TestHome({dispatch}) {
  const navigation = useNavigation();

  useEffect(() => {
    let wallet_details = state_here.WDeetsReducer.wdeets;
    let user_details = {};

    const config = {
      method: 'get',
      url:
        'https://suprblack.xyz/api/users/list/?wallet_address=' +
        wallet_details.wallet_address,
    };

    console.log(
      'https://suprblack.xyz/api/users/list/?wallet_address=' +
        wallet_details.wallet_address,
    );

    axios(config)
      .then(function (response) {
        console.log(response.data);
        user_details = {
          userid: response.data.id,
          username: response.data.username,
        };
        dispatch(AddUserDetails(user_details));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const test_screens = [
    {
      title: 'Glass BG',
      screen_name: 'GlassBgScreenTest',
    },
    {
      title: 'Infura Test',
      screen_name: 'InfuraTestTransactionScreen',
    },
    {
      title: 'Network calls log',
      screen_name: 'LogNetworkCalls',
    },
    {
      title: 'insta dapp',
      screen_name: 'IDAppTestLanding',
    },
  ];

  function TestItem(item_deets) {
    return (
      <TouchableOpacity
        style={styles.test_item_view}
        onPress={() => navigation.navigate(item_deets.screen_name)}>
        <Text style={{...themeHere.text.subhead_medium, color: 'white'}}>
          {item_deets.title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.parent_view}>
      <Text style={styles.header_text}>TEST</Text>
      {test_screens.map(item => TestItem(item))}
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(TestHome);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeHere.colors.background,
  },
  header_text: {
    ...themeHere.text.title_3,
    color: 'white',
    marginVertical: 60,
  },
  test_item_view: {
    marginVertical: 20,
    width: windowWidth - 40,
    height: 50,
    borderRadius: 15,
    backgroundColor: themeHere.colors.off_background,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
