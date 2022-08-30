import {useNavigation} from '@react-navigation/native';
import {Text, useSx, View} from 'dripsy';
import React, {useCallback, useState, useEffect} from 'react';
import {Dimensions, RefreshControl, TextInput} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SquircleView} from 'react-native-figma-squircle';
import Animated from 'react-native-reanimated';
import {ExpandableSection} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import {Bounceable} from 'rn-bounceable';
import SpacerVertical from '../../../../bits/SpacerVertical';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import {
  dripsytheme,
  StyledCircleFastImage50,
} from '../../../../theme/DripsyTheme';
import {FarmsFaqs} from '../FarmsData';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

let state_here = {};

function FarmPoolScreen({route}) {
  const sxCustom = useSx();
  const navigation = useNavigation();
  const {farmData} = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [apy, setApy] = useState({});
  const allTradingVols =
    state_here.HomoraTradingVolsReducer.homora_trading_vols;

  useEffect(() => {
    const allApys = state_here.HomoraAPYsReducer.homora_apys;

    const farmKey = farmData.key;

    if (farmData.key) {
      setApy(allApys[farmKey]);
    }
  }, [farmData.key]);

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
        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <StyledCircleFastImage50
            source={{
              uri:
                'https://homora-v2.alphaventuredao.io/' +
                farmData.exchange.logo,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={{backgroundColor: dripsytheme.colors.layout_1}}
          />
          <Text
            variant="heading_thick"
            sx={{color: 'layout_1', marginHorizontal: '$2'}}>
            {farmData.name}
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

  function RenderDetail({title, value, highlight}) {
    // title - string, value - string, highlight - boolean
    return (
      <View
        sx={{
          width: windowWidth - 80,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: '$2',
          alignItems: 'center',
        }}>
        <Text
          variant="body"
          sx={{color: 'layout_2', marginVertical: '$1', opacity: 0.75}}>
          {title}
        </Text>
        <Text
          variant="body_thick"
          sx={{color: highlight ? 'success_2' : 'layout_2'}}>
          {value}
        </Text>
      </View>
    );
  }

  function StakeComponent() {
    const [amountStake, setAmountStake] = useState('');

    return (
      <SquircleView
        style={sxCustom({
          width: windowWidth - 40,
          flexDirection: 'column',
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
        <SquircleView
          style={sxCustom({
            width: windowWidth - 80,
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: '$3',
          })}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 15,
            fillColor: dripsytheme.colors.layout_1 + '25',
          }}>
          <TextInput
            numberOfLines={1}
            value={amountStake}
            style={sxCustom({
              backgroundColor: 'transparent',
              ...dripsytheme.text.body_thick,
              color: dripsytheme.colors.foreground,
              width: windowWidth - 80,
              height: 50,
              alignSelf: 'center',
              textAlign: 'left',
              paddingHorizontal: '$4',
            })}
            placeholder={'how much ETH do you wanna stake?'}
            placeholderTextColor={dripsytheme.colors.layout_1 + 50}
          />
        </SquircleView>
        <RenderDetail title={'you will get'} value={farmData.wTokenType} />
        <RenderDetail title={'exchange rate'} value={farmData.wTokenType} />
        <RenderDetail title={'transaction fee'} value={farmData.wTokenType} />
      </SquircleView>
    );
  }

  function PoolDetails() {
    return (
      <View
        variant={'layout.sub_view_20_margin'}
        sx={{alignSelf: 'center', marginVertical: '$4'}}>
        <SquircleView
          style={sxCustom({
            width: windowWidth - 40,
            flexDirection: 'column',
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
          <RenderDetail
            title={'Total APY (%)'}
            value={apy.totalAPY + '%'}
            highlight={true}
          />
          <RenderDetail
            title={'Trading Fee APY (%)'}
            value={apy.tradingFeeAPY + '%'}
            highlight={true}
          />
          <RenderDetail
            title={'Rewards APY (%)'}
            value={apy.farmingAPY + '%'}
            highlight={true}
          />
          <RenderDetail
            title={'Trading Volume (24h)'}
            value={
              '$' +
              ' ' +
              Number(allTradingVols[farmData.key])
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
          />
        </SquircleView>
      </View>
    );
  }

  function FAQs() {
    function RenderFAQ({question, answer}) {
      const [faqExpanded, setFaqExpanded] = useState(false);
      return (
        <ExpandableSection
          top={false}
          expanded={faqExpanded}
          sectionHeader={
            <View
              variant="layout.sub_view_20_margin"
              sx={{
                borderRadius: 10,
                backgroundColor: 'layout_4',
                justifyContent: 'center',
                paddingVertical: '$4',
                marginVertical: '$2',
              }}>
              <Text
                variant="body_thick"
                sx={{color: 'layout_2', marginHorizontal: '$4'}}>
                {question}
              </Text>
            </View>
          }
          onPress={() => setFaqExpanded(!faqExpanded)}>
          <View
            variant="layout.sub_view_20_margin"
            sx={{
              backgroundColor: 'off_background',
              alignItems: 'center',
            }}>
            <Text
              variant="body"
              sx={{
                color: 'layout_2',
                opacity: 0.75,
                marginHorizontal: '$4',
                marginVertical: '$4',
              }}>
              {answer}
            </Text>
          </View>
        </ExpandableSection>
      );
    }

    let faqsHere = FarmsFaqs;

    return (
      <View
        variant={'layout.sub_view_20_margin'}
        sx={{alignSelf: 'center', marginVertical: '$4'}}>
        <Text
          variant="heading_thick"
          sx={{
            color: 'layout_1',
            marginHorizontal: '$4',
            marginVertical: '$2',
          }}>
          FAQs
        </Text>
        {faqsHere.map((item, index) => (
          <RenderFAQ question={item.question} answer={item.answer} />
        ))}
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
        <StakeComponent />
        <PoolDetails />
        <FAQs />
        <SpacerVertical height={60} />
      </Animated.ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(FarmPoolScreen);
