import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Appearance,
  Pressable,
} from 'react-native';
import {ButterThemeDark, ButterThemeLight} from '../../../theme/ButterTheme';
import {connect} from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const colorScheme = Appearance.getColorScheme();
const themeHere = colorScheme === 'dark' ? ButterThemeDark : ButterThemeLight;

let state_here = {};

function AccordianPortfolio() {
  const [activeSections, setActiveSections] = useState(0);

  const SECTIONS = [
    {
      title: 'First',
      content: 'Lorem ipsum...',
    },
    {
      title: 'Second',
      content: 'Lorem ipsum...',
    },
  ];

  function RenderSomething() {
    return <Text style={{color: 'white'}}>accordian</Text>;
  }

  function UpdateActiveSections(sections) {
    setActiveSections(sections);
  }

  return (
    <View style={styles.parent_view}>
      <Text style={{color: 'white'}}>accordian</Text>
      <Accordion
        activeSections={[activeSections]}
        sections={SECTIONS}
        renderSectionTitle={RenderSomething}
        renderHeader={RenderSomething}
        renderContent={RenderSomething}
        onChange={UpdateActiveSections}
      />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(AccordianPortfolio);

const styles = StyleSheet.create({
  parent_view: {
    alignItems: 'center',
    width: windowWidth,
    justifyContent: 'center',
    marginVertical: 70,
  },
});
