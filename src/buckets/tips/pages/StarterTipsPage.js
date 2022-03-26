import React from "react";
import { Appearance, Dimensions } from "react-native";
import { ScrollView, View } from "dripsy";
import { ButterThemeDark, ButterThemeLight } from "../../../theme/ButterTheme";
import { connect } from "react-redux";
import TipTile from "../components/TipTile";
import Spacer from "../../../bits/Spacer";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function StarterTipsPage() {
  let allTips = state_here.AllTipsReducer.alltips;

  return (
    <View sx={{width: windowWidth}}>
      <Spacer height={windowHeight * 0.05} />
      <ScrollView>
        {allTips.map(item => (
          <TipTile tipInfo={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(StarterTipsPage);
