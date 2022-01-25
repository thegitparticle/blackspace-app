import React, {useEffect, useState} from 'react';
import {Appearance, Dimensions} from 'react-native';
import {View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {connect} from 'react-redux';
import {WalletDetailsDummy} from '../DummyData';
import {VictoryPie} from 'victory-native';
import {DoubleBounce} from 'react-native-loader';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function WalletPie() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let data_here = [];
    for (let i = 0; i < WalletDetailsDummy.cryptos.length; i++) {
      let object_here = {
        y: Number(WalletDetailsDummy.cryptos[i].base_coverted_balance),
        label: WalletDetailsDummy.cryptos[i].item_name,
      };
      data_here.push(object_here);
    }
    for (let i = 0; i < WalletDetailsDummy.erc_tokens.length; i++) {
      let object_here = {
        y: Number(WalletDetailsDummy.erc_tokens[i].base_coverted_balance),
        label: WalletDetailsDummy.erc_tokens[i].item_name,
      };
      data_here.push(object_here);
    }
    setData(data_here);
  }, []);

  function RenderPie() {
    if (data.length > 0) {
      return (
        <VictoryPie
          data={data}
          width={windowWidth * 0.8}
          height={windowWidth * 0.8}
          innerRadius={75}
          style={{
            labels: {
              fill: 'white',
              fontSize: 15,
              padding: 7,
            },
          }}
        />
      );
    } else {
      return <DoubleBounce size={10} color="#1CAFF6" />;
    }
  }

  return (
    <View
      variant="sub_view_0_margin"
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 70,
      }}>
      <RenderPie />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(WalletPie);
