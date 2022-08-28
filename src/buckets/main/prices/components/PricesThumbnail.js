import {Text, useSx, View} from 'dripsy';
import React from 'react';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SquircleView} from 'react-native-figma-squircle';
import {
  dripsytheme,
  StyledCircleFastImage30,
} from '../../../../theme/DripsyTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function PricesThumbnail({coinDetails}) {
  const sxCustom = useSx();

  return (
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
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
        squircleParams={{
          cornerSmoothing: 1,
          cornerRadius: 15,
          fillColor: dripsytheme.colors.layout_4,
        }}>
        <View sx={{mx: '$4', flexDirection: 'row', alignItems: 'center'}}>
          <StyledCircleFastImage30
            source={{
              uri: coinDetails.image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={{backgroundColor: dripsytheme.colors.layout_1}}
          />
          <View
            sx={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              height: 50,
              mx: '$4',
            }}>
            <Text variant="body_thick" sx={{color: 'layout_1'}}>
              {coinDetails.name}
            </Text>
            <Text variant="text" sx={{color: 'layout_1', opacity: 0.5}}>
              {coinDetails.symbol.toUpperCase()}
            </Text>
          </View>
        </View>
        <View
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: 50,
            mx: 20,
          }}>
          <Text
            variant="body_thick"
            sx={{color: 'layout_1', textAlign: 'right'}}>
            ${coinDetails.current_price}
          </Text>
          <Text
            variant="text"
            sx={{
              textAlign: 'right',
              color:
                coinDetails.price_change_percentage_24h < 0
                  ? 'danger_2'
                  : 'success_2',
            }}>
            {coinDetails.price_change_percentage_24h.toFixed(2)} %
          </Text>
        </View>
      </SquircleView>
    </View>
  );
}

export default PricesThumbnail;
