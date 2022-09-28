import {Amplitude} from '@amplitude/react-native';
import {useNavigation} from '@react-navigation/native';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {Text, useSx, View} from 'dripsy';
import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, RefreshControl} from 'react-native';
import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';
import {Bounceable} from 'rn-bounceable';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import {GetMyNfts} from '../../../../redux/appcore/MyNFTsActions';
import {GetMyProfileDetails} from '../../../../redux/appcore/MyProfileActions';
import {GetTokenBalances} from '../../../../redux/appcore/MyTokenBalancesActions';
import {dripsytheme} from '../../../../theme/DripsyTheme';
import RenderETHWallet from '../components/ethereum/RenderETHWallet';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let state_here = {};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function MyProfileScreen({dispatch}) {
  const navigation = useNavigation();
  const sxCustom = useSx();

  const [refreshing, setRefreshing] = useState(false);

  const connector = useWalletConnect();

  useEffect(() => {
    dispatch(GetMyProfileDetails(state_here.UserDetailsReducer.userdetails.id));
    dispatch(
      GetTokenBalances(
        state_here.UserDetailsReducer.userdetails.wallet_address,
      ),
    );
    dispatch(GetMyNfts(state_here.UserDetailsReducer.userdetails.id));
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function HeaderHere() {
    return (
      <View
        variant="layout.sub_view_20_margin"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'center',
          flexDirection: 'row',
          marginVertical: '$3',
        }}>
        <Bounceable
          onPress={() => {
            Amplitude.getInstance().logEvent('SETTINGS_OPEN_BUTTON_CLICK');
            navigation.navigate('SettingsStack');
          }}>
          <Iconly
            name="SettingBold"
            color={dripsytheme.colors.layout_1}
            size={30}
          />
        </Bounceable>
        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            variant="heading_thick"
            sx={{color: 'layout_1', marginHorizontal: '$2'}}>
            My Wallet
          </Text>
        </View>
        <Bounceable onPress={() => navigation.goBack()}>
          <Iconly
            name="CloseSquareBroken"
            color={dripsytheme.colors.layout_1}
            size={30}
          />
        </Bounceable>
      </View>
    );
  }

  return (
    <View variant="layout.full_screen">
      <HeaderHere />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={dripsytheme.colors.layout_1}
          />
        }>
        <RenderETHWallet />
      </Animated.ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(MyProfileScreen);
