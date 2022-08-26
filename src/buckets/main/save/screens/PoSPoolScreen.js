import {Text, View} from 'dripsy';
import React, {useCallback, useState} from 'react';
import {Dimensions, RefreshControl} from 'react-native';
import {SquircleView} from 'react-native-figma-squircle';
import {connect} from 'react-redux';
import {
  dripsytheme,
  StyledCircleFastImage25,
  StyledCircleFastImage50,
} from '../../../../theme/DripsyTheme';
import {useSx} from 'dripsy';
import FastImage from 'react-native-fast-image';
import {Bounceable} from 'rn-bounceable';
import Iconly from '../../../../miscsetups/customfonts/Iconly';
import {useNavigation} from '@react-navigation/native';
import {ExpandableSection} from 'react-native-ui-lib';
import Animated from 'react-native-reanimated';
import SpacerVertical from '../../../../bits/SpacerVertical';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

let state_here = {};

function PoSPoolScreen({route}) {
  const sxCustom = useSx();
  const navigation = useNavigation();
  const {poolData} = route.params;

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
          <StyledCircleFastImage50
            source={{
              uri: poolData.pool_logo,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={{backgroundColor: dripsytheme.colors.layout_1}}
          />
          <Text
            variant="heading_thick"
            sx={{color: 'layout_1', marginHorizontal: '$2'}}>
            {poolData.pool_name} - {poolData.token_symbol}
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

  function StakeComponent() {}

  function PoolDetails() {
    function RenderDetail({title, value, highlight}) {
      // title - string, value - string, highlight - boolean
      return (
        <View
          sx={{
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

    return (
      <View
        variant={'layout.sub_view_20_margin'}
        sx={{alignSelf: 'center', marginVertical: '$4'}}>
        <RenderDetail
          title={'Annual % Rate'}
          value={poolData.interest_rate}
          highlight={true}
        />
        <RenderDetail
          title={'Total staked via Lido'}
          value={poolData.total_staked_amount_usd}
        />
        <RenderDetail
          title={'Total staked via Lido ($USD)'}
          value={poolData.total_staked_amount_usd}
        />
        <RenderDetail
          title={'Stakers'}
          value={poolData.total_staked_amount_usd}
        />
        <RenderDetail
          title={'Reward Fee (%)'}
          value={poolData.total_staked_amount_usd}
        />
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

    let faqsHere = poolData.faqs;

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

export default connect(mapStateToProps)(PoSPoolScreen);
