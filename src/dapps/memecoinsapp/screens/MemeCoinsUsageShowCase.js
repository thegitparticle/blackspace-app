import React from 'react';
import {Appearance, Dimensions, StyleSheet} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {useSx, Text, View} from 'dripsy';
import {useNavigation} from '@react-navigation/native';
import {Bounceable} from 'rn-bounceable';
import {SquircleView} from 'react-native-figma-squircle';
import {StyledFastImage25} from '../../../theme/DripsyTheme';
import FastImage from 'react-native-fast-image';
import SpacerVertical from '../../../bits/SpacerVertical';
import SpacerHorizontal from '../../../bits/SpacerHorizontal';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

const PositionsDummyData = [
  {
    buy_token_symbol: 'SHIB',
    buy_token_icon:
      'https://assets.coingecko.com/coins/images/11939/small/shiba.png?1622619446',
    buy_token_contract_address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
    paid_token_symbol: 'ETH',
    paid_token_icon:
      'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
    paid_token_contract_address: '',
    buy_token_amount: '385750',
    buy_token_amount_fiat: '4501.11',
    paid_token_amount: '2.2',
    paid_token_amount_fiat: '4509.5',
    token_buy_price: '0.00001168',
    token_sold_price: '0.00001868',
    payment_received_amount: '3.498',
    payment_received_amount_fiat: '7345.7',
    is_active: false,
    purchase_timestamp: '1652573698',
  },
];

function MemeCoinsUsageShowCase() {
  const navigation = useNavigation();
  const sxCustom = useSx();

  function ActivePositionTile() {}

  function ClosedPositionTile(props) {
    return (
      <Bounceable onPress={() => console.log('tapped')}>
        <View
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            width: windowWidth - 40,
            height: 75,
            my: '$2',
            alignSelf: 'center',
          }}>
          <SquircleView
            style={sxCustom({
              width: windowWidth - 40,
              height: 75,
              flexDirection: 'column',
              justifyContent: 'center',
            })}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: themeHere.colors.mid_ground + '75',
            }}>
            <View
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginHorizontal: 20,
                }}>
                <StyledFastImage25
                  source={{
                    uri: props.Position.buy_token_icon,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    backgroundColor: themeHere.colors.off_foreground,
                  }}
                />
                <SpacerHorizontal width={20} />
                <Text variant="subhead_medium" sx={{color: 'foreground'}}>
                  {props.Position.buy_token_amount}{' '}
                  {props.Position.buy_token_symbol}
                </Text>
              </View>
              <View
                sx={{
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  marginHorizontal: 20,
                }}>
                <Text
                  variant="body_medium"
                  sx={{
                    textAlign: 'left',
                    color:
                      Number(props.Position.payment_received_amount_fiat) -
                        Number(props.Position.paid_token_amount_fiat) >
                      0
                        ? 'success_green'
                        : 'danger_red',
                  }}>
                  {(
                    ((Number(props.Position.payment_received_amount_fiat) -
                      Number(props.Position.paid_token_amount_fiat)) /
                      Number(props.Position.paid_token_amount_fiat)) *
                    100
                  ).toFixed(2)}{' '}
                  %
                </Text>
              </View>
            </View>
          </SquircleView>
        </View>
      </Bounceable>
    );
  }

  function PositionTile(props) {
    if (props.Position.is_active) {
      return <ActivePositionTile Position={props.Position} />;
    } else {
      return <ClosedPositionTile Position={props.Position} />;
    }
  }

  return (
    <View style={styles.parent_view}>
      <SpacerVertical height={40} />
      <Text
        sx={{
          ...themeHere.text.subhead_medium,
          marginVertical: 10,
          marginHorizontal: 20,
          color: 'foreground',
          textAlign: 'left',
        }}>
        closed positions
      </Text>
      {PositionsDummyData.map(item => (
        <PositionTile Position={item} />
      ))}
    </View>
  );
}

export default MemeCoinsUsageShowCase;

const styles = StyleSheet.create({
  parent_view: {},
});
