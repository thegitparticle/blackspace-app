import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'dripsy';
import React from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {Bounceable} from 'rn-bounceable';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import {dripsytheme} from '../../../../theme/DripsyTheme';
import AppTile from '../components/AppTile';
import MiscTile from '../components/MiscTile';
import WalletTile from '../components/WalletTile';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function SettingsHomeScreen() {
  const navigation = useNavigation();

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
        <Bounceable>
          <Iconly
            name="SettingBold"
            color={dripsytheme.colors.layout_1 + '00'}
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
            Settings
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <WalletTile />
        {/*<UserTile />*/}
        <AppTile />
        <MiscTile />
      </ScrollView>
    </View>
  );
}

export default SettingsHomeScreen;
