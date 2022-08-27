import {Text, View, useSx} from 'dripsy';
import React, {useCallback, useState} from 'react';
import {Dimensions} from 'react-native';
import {SquircleView} from 'react-native-figma-squircle';
import {connect} from 'react-redux';
import {Bounceable} from 'rn-bounceable';
import {useNavigation} from '@react-navigation/native';
import {dripsytheme} from '../../../../theme/DripsyTheme';
import Iconly from '../../../../miscsetups/customfonts/Iconly';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let state_here = {};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function HomePage({dispatch}) {
  const sxCustom = useSx();
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function Utilities() {
    function UtilityButton({icon, title, navigateTo}) {
      return (
        <Bounceable onPress={() => navigation.navigate(navigateTo)}>
          <SquircleView
            style={sxCustom({
              width: (windowWidth - 60) / 2,
              height: 50,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginVertical: '$2',
            })}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: dripsytheme.colors.layout_4,
            }}>
            <Iconly name={icon} color={dripsytheme.colors.layout_1} size={25} />
            <Text
              variant="body_thick"
              sx={{color: 'layout_1', marginHorizontal: '$2'}}>
              {title}
            </Text>
          </SquircleView>
        </Bounceable>
      );
    }

    return (
      <View
        variant={'sub_view_20_margin'}
        sx={{
          alignSelf: 'center',
          flexDirection: 'row',
          width: windowWidth - 40,
          justifyContent: 'space-between',
        }}>
        <UtilityButton
          title={'Swap'}
          icon={'FilterBold'}
          navigateTo={'SwapScreen'}
        />
        <UtilityButton
          title={'Prices'}
          icon={'ActivityBold'}
          navigateTo={'PricesScreen'}
        />
      </View>
    );
  }

  return (
    <View variant="layout.full_screen_transparent">
      <Utilities />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(HomePage);
