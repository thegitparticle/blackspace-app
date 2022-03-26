import React, { useEffect, useState } from "react";
import { Appearance, Dimensions, ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import "@ethersproject/shims";
import { ButterThemeDark, ButterThemeLight } from "../../../theme/ButterTheme";
import { Bubbles } from "react-native-loader";
import _ from "lodash";
import { Bounceable } from "rn-bounceable";
import SquircleGlassButton from "../../../bits/SquircleGlassButton";
import { SquircleView } from "react-native-figma-squircle";
import { BlurView } from "@react-native-community/blur";
import MaskedView from "@react-native-masked-view/masked-view";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function SaveSeedPhraseScreen({dispatch, navigation}) {
  const [seedPhraseList, setSeedPhraseList] = useState([]);

  useEffect(() => {
    console.log(state_here.WDeetsReducer.wdeets.wallet_phrase);
    setSeedPhraseList(
      _.split(state_here.WDeetsReducer.wdeets.wallet_phrase.phrase, ' '),
    );
  }, []);

  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  function CenterText() {
    if (seedPhraseList.length === 0) {
      return <Bubbles size={10} color="#FFF" />;
    } else {
      return (
        <View style={{marginVertical: windowHeight * 0.1}}>
          <Text
            style={{
              ...themeHere.text.subhead_i,
              color: 'white',
              alignSelf: 'center',
              textAlign: 'center',
              marginBottom: windowHeight * 0.1,
              maxWidth: windowWidth * 0.8,
            }}>
            note your seed phrase down carefully in the exact order and put it
            in securely. this is all you need to access your wallet from
            blackSpace or any other Ethereum wallet app
          </Text>
          <View
            style={{
              marginVertical: windowHeight * 0.01,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {seedPhraseList.slice(0, 3).map((item, id) => (
              <MaskedView
                style={{
                  width: 120,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 5,
                }}
                maskElement={
                  <SquircleView
                    style={{
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 120,
                    }}
                    squircleParams={{
                      cornerSmoothing: 1,
                      cornerRadius: 20,
                      fillColor: themeHere.colors.red_light,
                    }}
                  />
                }>
                <BlurView
                  style={{
                    width: 120,
                    height: 40,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                  blurType={'ultraThinMaterialDark'}
                  blurAmount={10}
                  reducedTransparencyFallbackColor="gray"
                />
                <Text
                  style={{
                    ...themeHere.text.subhead_bold,
                    color: 'white',
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {id + 1}. {item}
                </Text>
              </MaskedView>
            ))}
          </View>
          <View
            style={{
              marginVertical: windowHeight * 0.01,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {seedPhraseList.slice(3, 6).map((item, id) => (
              <MaskedView
                style={{
                  width: 120,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 5,
                }}
                maskElement={
                  <SquircleView
                    style={{
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 120,
                    }}
                    squircleParams={{
                      cornerSmoothing: 1,
                      cornerRadius: 20,
                      fillColor: themeHere.colors.red_light,
                    }}
                  />
                }>
                <BlurView
                  style={{
                    width: 120,
                    height: 40,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                  blurType={'ultraThinMaterialDark'}
                  blurAmount={10}
                  reducedTransparencyFallbackColor="gray"
                />
                <Text
                  style={{
                    ...themeHere.text.subhead_bold,
                    color: 'white',
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {id + 4}. {item}
                </Text>
              </MaskedView>
            ))}
          </View>
          <View
            style={{
              marginVertical: windowHeight * 0.01,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {seedPhraseList.slice(6, 9).map((item, id) => (
              <MaskedView
                style={{
                  width: 120,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 5,
                }}
                maskElement={
                  <SquircleView
                    style={{
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 120,
                    }}
                    squircleParams={{
                      cornerSmoothing: 1,
                      cornerRadius: 20,
                      fillColor: themeHere.colors.red_light,
                    }}
                  />
                }>
                <BlurView
                  style={{
                    width: 120,
                    height: 40,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                  blurType={'ultraThinMaterialDark'}
                  blurAmount={10}
                  reducedTransparencyFallbackColor="gray"
                />
                <Text
                  style={{
                    ...themeHere.text.subhead_bold,
                    color: 'white',
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {id + 7}. {item}
                </Text>
              </MaskedView>
            ))}
          </View>
          <View
            style={{
              marginVertical: windowHeight * 0.01,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {seedPhraseList.slice(9, 12).map((item, id) => (
              <MaskedView
                style={{
                  width: 120,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 5,
                }}
                maskElement={
                  <SquircleView
                    style={{
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 120,
                    }}
                    squircleParams={{
                      cornerSmoothing: 1,
                      cornerRadius: 20,
                      fillColor: themeHere.colors.red_light,
                    }}
                  />
                }>
                <BlurView
                  style={{
                    width: 120,
                    height: 40,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                  blurType={'ultraThinMaterialDark'}
                  blurAmount={10}
                  reducedTransparencyFallbackColor="gray"
                />
                <Text
                  style={{
                    ...themeHere.text.subhead_bold,
                    color: 'white',
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {id + 10}. {item}
                </Text>
              </MaskedView>
            ))}
          </View>
        </View>
      );
    }
  }

  return (
    <View style={styles.parent_view}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../../../assets/colors_background_1.png')}
        resizeMode="cover"
        style={{
          width: windowWidth,
          height: windowHeight,
          alignItems: 'center',
        }}>
        <Text style={styles.heading_text}>SEED PHRASE</Text>
        <CenterText />
        <View
          style={{
            marginVertical: windowHeight * 0.1,
          }}>
          <Bounceable
            style={{
              marginVertical: windowHeight * 0.1,
            }}
            onPress={() => {
              navigation.navigate('UserDetailsInputScreen');
            }}>
            <SquircleGlassButton
              buttonColor={themeHere.colors.red_light}
              width={windowWidth * 0.7}
              height={50}
              buttonText={'I have noted it down'}
              font={themeHere.text.subhead_medium}
              textColor={themeHere.colors.light}
              blurType={'ultraThinMaterialDark'}
            />
          </Bounceable>
        </View>
      </ImageBackground>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(SaveSeedPhraseScreen);

const styles = StyleSheet.create({
  parent_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeHere.colors.background,
  },
  gradient_background: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  waiting_text_showcase_view: {
    width: windowWidth * 0.8,
    alignItems: 'center',
  },
  heading_text: {
    ...themeHere.text.title_3,
    color: 'white',
    marginTop: windowHeight * 0.1,
  },
});
