/**
 * @format
 */

import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import './shim.js';
import crypto from 'crypto';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
