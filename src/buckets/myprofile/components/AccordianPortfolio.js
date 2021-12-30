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
  const [activeSections, setActiveSections] = useState([]);

  const SECTIONS = [
    {
      title: 'First',
      content: 'Lorem ipsum... first first',
    },
    {
      title: 'Second',
      content: 'Lorem ipsum... second second',
    },
  ];

  function RenderSectionTitle(section) {
    return (
      <View style={{height: 50}}>
        <Text style={{color: 'white'}}>{section.title}</Text>
      </View>
    );
  }

  function RenderHeader(section) {
    return (
      <View style={{height: 50}}>
        <Text style={{color: 'white'}}>{section.title}</Text>
      </View>
    );
  }

  function RenderContent(section) {
    return (
      <View style={{height: 50}}>
        <Text style={{color: 'white'}}>{section.content}</Text>
      </View>
    );
  }

  function UpdateActiveSections(sections) {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  }

  return (
    <View style={styles.parent_view}>
      <Text style={{color: 'white'}}>accordian</Text>
      <Accordion
        activeSections={activeSections}
        sections={SECTIONS}
        renderHeader={RenderHeader}
        renderContent={RenderContent}
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
