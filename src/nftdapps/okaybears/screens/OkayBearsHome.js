import React from 'react';
import {Appearance, Dimensions} from 'react-native';
import {Text, View} from 'dripsy';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import SpacerVertical from '../../../bits/SpacerVertical';
import {SquircleView} from 'react-native-figma-squircle';
import {MintPhasesOkayBears} from '../../dummydata/OkayBearsDummyData';
import dayjs, {Dayjs} from 'dayjs';
import _ from 'lodash';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

function OkayBearsHome() {
  const MintPhasesList = MintPhasesOkayBears;

  function RenderMintCard() {
    function RenderMintPhase(mintPhase) {
      let humanReadableTimeStamp = new Date(
        Number(mintPhase.start_timestamp) * 1000,
      );

      let humamReadableDate = _.split(humanReadableTimeStamp, 'T');

      function MintPhaseDetailsBlock(props) {
        // props are - title, detail
        return (
          <View
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: '$2',
            }}>
            <Text variant="body" sx={{color: 'foreground', opacity: 0.5}}>
              {props.title}
            </Text>
            <Text variant="body" sx={{color: 'foreground', opacity: 1}}>
              {props.detail}
            </Text>
          </View>
        );
      }

      return (
        <View
          sx={{
            marginHorizontal: '$4',
            marginVertical: '$4',
            flexDirection: 'column',
          }}>
          <Text
            variant="subhead_medium"
            sx={{color: 'turquoise', marginVertical: '$2'}}>
            {mintPhase.phase_name}
          </Text>
          <Text
            variant="title_3"
            sx={{
              color: 'foreground',
              alignSelf: 'center',
              marginVertical: '$2',
            }}>
            {humamReadableDate[0].slice(0, -3)}
          </Text>
          <MintPhaseDetailsBlock
            title={'Mint Price'}
            detail={mintPhase.phase_mint_price}
          />
          <MintPhaseDetailsBlock
            title={'Mint Quantity'}
            detail={mintPhase.phase_mint_quantity}
          />
          <MintPhaseDetailsBlock
            title={'Rules'}
            detail={mintPhase.phase_rules}
          />
        </View>
      );
    }

    return (
      <SquircleView
        squircleParams={{
          cornerSmoothing: 1,
          cornerRadius: 15,
          fillColor: themeHere.colors.off_dark,
        }}
        style={{width: windowWidth - 40}}>
        {MintPhasesList.map(item => RenderMintPhase(item))}
      </SquircleView>
    );
  }

  function RenderSpecialCard() {}

  return (
    <View sx={{alignItems: 'center', justifyContent: 'center'}}>
      <SpacerVertical height={40} />
      <RenderMintCard />
    </View>
  );
}

export default OkayBearsHome;
