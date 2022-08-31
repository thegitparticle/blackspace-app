import {useNavigation} from '@react-navigation/native';
import {Text, useSx, View} from 'dripsy';
import React, {useCallback, useState, useMemo, useRef} from 'react';
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
  StyledCircleFastImage25,
  StyledCircleFastImage50,
} from '../../../../theme/DripsyTheme';
import {SwapFAQs} from '../SwapData';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import list from '../../../../utils/tokenslist.json';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

let state_here = {};

function SwapScreen({route}) {
  const sxCustom = useSx();
  const navigation = useNavigation();
  const tokensList = list.tokens;

  const [refreshing, setRefreshing] = useState(false);
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
        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            variant="heading_thick"
            sx={{color: 'layout_1', marginHorizontal: '$2'}}>
            Swap
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

  const modalizePickToken0CoinRef = useRef(null);
  const onOpenPickToken0 = () => {
    modalizePickToken0CoinRef.current?.open();
  };
  const onClosePickToken0 = () => {
    modalizePickToken0CoinRef.current?.close();
  };

  const modalizePickToken1CoinRef = useRef(null);
  const onOpenPickToken1 = () => {
    modalizePickToken1CoinRef.current?.open();
  };
  const onClosePickToken1 = () => {
    modalizePickToken1CoinRef.current?.close();
  };

  function SwapComponent() {
    const [token0Amount, setToken0Amount] = useState('');
    const [token1Amount, setToken1Amount] = useState('');

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
            height: 90,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: '$3',
          })}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 15,
            fillColor: dripsytheme.colors.layout_1 + '10',
          }}>
          <View sx={{flexDirection: 'column'}}>
            <TextInput
              numberOfLines={1}
              value={token0Amount}
              onChangeText={input => setToken0Amount(input)}
              keyboardType={'decimal-pad'}
              onEndEditing={() => {}}
              style={sxCustom({
                backgroundColor: 'transparent',
                ...dripsytheme.text.body_thick,
                color: dripsytheme.colors.layout_1,
                width: windowWidth / 2,
                height: 50,
                alignSelf: 'center',
                textAlign: 'left',
                paddingHorizontal: '$4',
              })}
              placeholder={'how much to swap?'}
              placeholderTextColor={dripsytheme.colors.layout_1 + 50}
            />
            <Text
              variant="text"
              sx={{
                color: 'layout_1',
                marginHorizontal: '$4',
              }}>
              $ 150
            </Text>
          </View>
          <Bounceable onPress={() => onOpenPickToken0()}>
            <View sx={{flexDirection: 'row', alignItems: 'center'}}>
              <StyledCircleFastImage25
                source={{
                  uri: 'https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912',
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{backgroundColor: dripsytheme.colors.layout_1}}
              />
              <Text
                variant="body_thick"
                sx={{color: 'layout_1', marginHorizontal: '$2'}}>
                MATIC
              </Text>
            </View>
          </Bounceable>
        </SquircleView>
        <SquircleView
          style={sxCustom({
            width: windowWidth - 80,
            height: 90,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: '$3',
          })}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 15,
            fillColor: dripsytheme.colors.layout_1 + '10',
          }}>
          <View sx={{flexDirection: 'column'}}>
            <TextInput
              numberOfLines={1}
              value={token1Amount}
              onChangeText={input => setToken1Amount(input)}
              keyboardType={'decimal-pad'}
              onEndEditing={() => {}}
              style={sxCustom({
                backgroundColor: 'transparent',
                // backgroundColor: dripsytheme.colors.brand_orange,
                ...dripsytheme.text.body_thick,
                color: dripsytheme.colors.layout_1,
                width: windowWidth / 2,
                height: 50,
                alignSelf: 'center',
                textAlign: 'left',
                paddingHorizontal: '$4',
              })}
              placeholder={'how much you will get'}
              placeholderTextColor={dripsytheme.colors.layout_1 + 50}
            />
            <Text
              variant="text"
              sx={{
                color: 'layout_1',
                marginHorizontal: '$4',
              }}>
              $ 150
            </Text>
          </View>
          <Bounceable onPress={() => onOpenPickToken1()}>
            <View sx={{flexDirection: 'row', alignItems: 'center'}}>
              <StyledCircleFastImage25
                source={{
                  uri: 'https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912',
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{backgroundColor: dripsytheme.colors.layout_1}}
              />
              <Text
                variant="body_thick"
                sx={{color: 'layout_1', marginHorizontal: '$2'}}>
                MATIC
              </Text>
            </View>
          </Bounceable>
        </SquircleView>
        <RenderDetail title={'you will get'} value={'loading'} />
        <RenderDetail title={'exchange rate'} value={'loading'} />

        <RenderDetail title={'transaction fee'} value={'loading'} />
      </SquircleView>
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

    let faqsHere = SwapFAQs;

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
        <SwapComponent />
        <FAQs />
        <SpacerVertical height={60} />
      </Animated.ScrollView>
      <Modalize
        ref={modalizePickToken0CoinRef}
        modalStyle={{
          backgroundColor: dripsytheme.colors.layout_4,
          width: windowWidth,
          height: windowHeight * 0.5,
        }}
        flatListProps={{
          data: tokensList,
          renderItem: item => (
            <Text
              variant="body_thick"
              sx={{color: 'layout_2', marginHorizontal: '$4'}}>
              question
            </Text>
          ),
          keyExtractor: item => item.heading,
          showsVerticalScrollIndicator: false,
          // ListHeaderComponent: PickToken1Header(),
        }}
      />
      <Modalize
        ref={modalizePickToken1CoinRef}
        modalStyle={{
          backgroundColor: dripsytheme.colors.layout_4,
          width: windowWidth,
          height: windowHeight * 0.5,
        }}
        flatListProps={{
          data: tokensList,
          renderItem: item => (
            <Text
              variant="body_thick"
              sx={{color: 'layout_2', marginHorizontal: '$4'}}>
              question
            </Text>
          ),
          keyExtractor: item => item.heading,
          showsVerticalScrollIndicator: false,
          // ListHeaderComponent: PickToken1Header(),
        }}
      />
    </View>
  );
}

export default SwapScreen;
