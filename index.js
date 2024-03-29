/**
 * @format
 */

import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import {Buffer} from 'buffer';
global.Buffer = global.Buffer || Buffer;
import './shim.js';
import crypto from 'crypto';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {startNetworkLogging} from 'react-native-network-logger';

startNetworkLogging();
AppRegistry.registerComponent(appName, () => App);
