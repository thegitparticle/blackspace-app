import {Text, useSx, View} from 'dripsy';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {DoubleBounce} from 'react-native-loader';
import {connect} from 'react-redux';
import {VictoryPie} from 'victory-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let state_here = {};

function WalletPieETH() {
  const sxCustom = useSx();

  const [data, setData] = useState([]);

  let listTokens = state_here.MyTokenBalancesReducer.tokens;

  useEffect(() => {
    let data_here = [];
    for (let i = 0; i < listTokens.length; i++) {
      let object_here = {
        y: Number(listTokens[i].token_price_usd),
        label: listTokens[i].symbol,
      };
      data_here.push(object_here);
    }
    let eth_object_here = {
      y: Number(
        (state_here.MyProfileReducer.myProfileDetails.eth_balance * 10) ^
          (18 * 2400),
      ),
      label: 'ETH',
    };
    data_here.push(eth_object_here);
    setData(data_here);
  }, []);

  function RenderPie() {
    if (data.length > 0) {
      return (
        <View sx={{alignItem: 'center', justifyItems: 'center'}}>
          <View
            sx={{
              width: windowWidth * 0.9,
              height: windowWidth * 0.9,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              variant="heading_thick"
              sx={{
                color: 'layout_1',
                my: '$2',
              }}>
              $ {state_here.MyProfileReducer.myProfileDetails.portfolio_value}
            </Text>
          </View>
          <VictoryPie
            data={data}
            colorScale={[
              'tomato',
              'aqua',
              'orange',
              'gold',
              'cyan',
              'navy',
              'chocolate',
              'crimson',
              'deeppink',
              'deepskyblue',
              'indianred',
              'hotpink',
              'springgreen',
              'yellow',
              'yellowgreen',
            ]}
            width={windowWidth * 0.9}
            height={windowWidth * 0.9}
            labelRadius={({innerRadius}) => innerRadius + 50}
            innerRadius={100}
            style={sxCustom({
              labels: {
                fill: 'white',
                fontSize: 15,
                padding: 7,
              },
              position: 'absolute',
            })}
          />
        </View>
      );
    } else {
      return <DoubleBounce size={10} color="#1CAFF6" />;
    }
  }

  return (
    <View
      variant="sub_view_0_margin"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '$6',
      }}>
      <RenderPie />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(WalletPieETH);
