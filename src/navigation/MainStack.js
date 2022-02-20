import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import HomeLandingScreen from '../buckets/home/screens/HomeLandingScreen';
import TransactionScreen from '../buckets/test/TransactionScreen';
import TestHome from '../buckets/test/TestHome';
import MyProfileScreen from '../buckets/myprofile/screens/MyProfileScreen';
import SettingsHomeScreen from '../buckets/settings/screens/SettingsHomeScreen';
import NFTDetailedView from '../buckets/myprofile/screens/NFTDetailedView';
import MiniAppLanding from '../buckets/miniapp/screens/MiniAppLanding';
import GlassBgScreenTest from '../buckets/test/GlassBgScreenTest';
import InfuraTestTransactionScreen from '../buckets/test/InfuraTestTransactionScreen';
import LogNetworkCalls from '../buckets/test/LogNetworkCalls';
import IDAppTestLanding from '../buckets/test/instadapptest/IDAppTestLanding';
import {Host, Portal} from 'react-native-portalize';
import TrendingTokensProductDetailsModal from '../dapps/memecoinsapp/products/trendingtokens/TrendingTokensProductDetailsModal';
import Iconly from '../miscsetups/customfonts/Iconly';
import {Appearance, Dimensions, Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BorrowCompoundTransactionModal from '../dapps/compoundfinance/products/borrowcompoundfinance/BorrowCompoundTransactionModal';
import EarnInterestCompoundTransactionModal from '../dapps/compoundfinance/products/earninterestcompoundfinance/EarnInterestCompoundTransactionModal';
import BuyTokensUniswapTransactionModal from '../dapps/uniswap/products/buytokensuniswap/BuyTokensUniswapTransactionModal';
import StakeToEarnUniSwapTransactionModal from '../dapps/uniswap/products/staketoearnuniswap/StakeToEarnUniSwapTransactionModal';
import BorrowLiquityTransactionModal from '../dapps/liquity/products/borrowfromliquity/BorrowLiquityTransactionModal';
import TrendingTokensTransactionModal from '../dapps/memecoinsapp/products/trendingtokens/TrendingTokensTransactionModal';
import LotteryPoolTogetherTransactionModal from '../dapps/pooltogether/products/lotterypooltogether/LotteryPoolTogetherTransactionModal';
import IndexCoopTransactionModal from '../dapps/indexfunds/products/indexcoopfunds/IndexCoopTransactionModal';
import AddCollTransactionModal from '../dapps/liquity/products/borrowfromliquity/AddCollTransactionModal';
import PaybackLiquityTransactionModal from '../dapps/liquity/products/borrowfromliquity/PaybackLiquityTransactionModal';
import PTDepositWithdrawTransactionModal from '../dapps/pooltogether/products/lotterypooltogether/PTDepositWithdrawTransactionModal';
import TipsAppLandingScreen from '../buckets/tips/screens/TipsAppLandingScreen';
import BrandLandingScreen from '../buckets/brand/screens/BrandLandingScreen';
import {ButterThemeDark, ButterThemeLight} from '../theme/ButterTheme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

const StackMain = createStackNavigator();
const HomeAndAppMain = createSharedElementStackNavigator();
const TestMain = createStackNavigator();
const MyProfileMain = createStackNavigator();
const SettingsMain = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function TestStack() {
  return (
    <TestMain.Navigator>
      <TestMain.Screen
        name="TestHome"
        component={TestHome}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
      <TestMain.Screen
        name="GlassBgScreenTest"
        component={GlassBgScreenTest}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
      <TestMain.Screen
        name="InfuraTestTransactionScreen"
        component={InfuraTestTransactionScreen}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
      <TestMain.Screen
        name="LogNetworkCalls"
        component={LogNetworkCalls}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
      <TestMain.Screen
        name="IDAppTestLanding"
        component={IDAppTestLanding}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
    </TestMain.Navigator>
  );
}

function MyProfileStack() {
  return (
    <MyProfileMain.Navigator>
      <MyProfileMain.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
    </MyProfileMain.Navigator>
  );
}

function SettingsStack() {
  return (
    <SettingsMain.Navigator>
      <SettingsMain.Screen
        name="SettingsHomeScreen"
        component={SettingsHomeScreen}
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
    </SettingsMain.Navigator>
  );
}

function HomeAndAppsStack() {
  const navigation = useNavigation();
  return (
    <Host>
      <HomeAndAppMain.Navigator style={{backgroundColor: '#050505'}}>
        <HomeAndAppMain.Screen
          name="HomeLandingScreen"
          component={HomeLandingScreen}
          options={{
            gestureEnabled: true,
            headerShown: false,
          }}
        />
        <HomeAndAppMain.Screen
          name="TransactionScreen"
          component={TransactionScreen}
          options={{
            gestureEnabled: true,
          }}
        />
        <HomeAndAppMain.Screen
          name="MiniAppLanding"
          component={MiniAppLanding}
          sharedElements={(route, otherRoute, showing) => {
            const {app_details} = route.params;
            return [`item.${app_details.app_name}.app_icon`];
          }}
          options={{
            gestureEnabled: true,
            headerShown: true,
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTransparent: true,
            headerTitle: '',
            headerRight: () => (
              <Pressable
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}
                onPress={() => navigation.goBack()}>
                <Iconly name="CloseSquareBold" color={'#FFFFFF'} size={30} />
              </Pressable>
            ),
            headerLeft: () => <View />,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
        <HomeAndAppMain.Screen
          name="TipsAppLandingScreen"
          component={TipsAppLandingScreen}
          sharedElements={(route, otherRoute, showing) => {
            const {app_details} = route.params;
            return [`item.${app_details.app_name}.app_icon`];
          }}
          options={({route}) => ({
            gestureEnabled: true,
            headerShown: true,
            headerStyle: {
              backgroundColor: themeHere.colors.off_background,
            },
            headerTintColor: 'transparent',
            headerTitleStyle: {
              fontWeight: 'bold',
              ...themeHere.text.title_2,
              color: themeHere.colors.foreground,
            },
            // headerTransparent: true,
            headerTitle: route.params.app_details.name,
            headerRight: () => (
              <Pressable
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}
                onPress={() => navigation.goBack()}>
                <Iconly name="CloseSquareBold" color={'#FFFFFF'} size={30} />
              </Pressable>
            ),
            headerLeft: () => <View />,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            transitionSpec: {
              open: config,
              close: config,
            },
          })}
        />
        <HomeAndAppMain.Screen
          name="TrendingTokensProductDetailsModal"
          component={TrendingTokensProductDetailsModal}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <HomeAndAppMain.Screen
          name="TrendingTokensTransactionModal"
          component={TrendingTokensTransactionModal}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <HomeAndAppMain.Screen
          name="BorrowCompoundTransactionModal"
          component={BorrowCompoundTransactionModal}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <HomeAndAppMain.Screen
          name="EarnInterestCompoundTransactionModal"
          component={EarnInterestCompoundTransactionModal}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <HomeAndAppMain.Screen
          name="BuyTokensUniswapTransactionModal"
          component={BuyTokensUniswapTransactionModal}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <HomeAndAppMain.Screen
          name="StakeToEarnUniSwapTransactionModal"
          component={StakeToEarnUniSwapTransactionModal}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <HomeAndAppMain.Screen
          name="BorrowLiquityTransactionModal"
          component={BorrowLiquityTransactionModal}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <HomeAndAppMain.Screen
          name="AddCollTransactionModal"
          component={AddCollTransactionModal}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <HomeAndAppMain.Screen
          name="PaybackLiquityTransactionModal"
          component={PaybackLiquityTransactionModal}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <HomeAndAppMain.Screen
          name="LotteryPoolTogetherTransactionModal"
          component={LotteryPoolTogetherTransactionModal}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <HomeAndAppMain.Screen
          name="PTDepositWithdrawTransactionModal"
          component={PTDepositWithdrawTransactionModal}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <HomeAndAppMain.Screen
          name="IndexCoopTransactionModal"
          component={IndexCoopTransactionModal}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
      </HomeAndAppMain.Navigator>
    </Host>
  );
}

function MainStack() {
  return (
    <StackMain.Navigator style={{backgroundColor: '#050505'}}>
      <StackMain.Group>
        <StackMain.Screen
          name="HomeAndAppsStack"
          component={HomeAndAppsStack}
          options={{
            gestureEnabled: true,
            headerShown: false,
          }}
        />
      </StackMain.Group>
      <StackMain.Group screenOptions={{presentation: 'modal'}}>
        <StackMain.Screen
          name="TestStack"
          component={TestStack}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <StackMain.Screen
          name="BrandLandingScreen"
          component={BrandLandingScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <StackMain.Screen
          name="MyProfileStack"
          component={MyProfileStack}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <StackMain.Screen
          name="NFTDetailedView"
          component={NFTDetailedView}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <StackMain.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
      </StackMain.Group>
    </StackMain.Navigator>
  );
}

export default MainStack;
