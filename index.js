/**
 * @format
 */

import 'react-native-gesture-handler';
// import './shim';
// import 'react-native-get-random-values';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {startNetworkLogging} from 'react-native-network-logger';

startNetworkLogging();
AppRegistry.registerComponent(appName, () => App);
