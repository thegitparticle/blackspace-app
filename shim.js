import 'react-native-get-random-values';
import '@ethersproject/shims';
import 'big-integer';

if (typeof __dirname === 'undefined') global.__dirname = '/';
if (typeof __filename === 'undefined') global.__filename = '';
if (typeof process === 'undefined') {
  global.process = require('process');
} else {
  const bProcess = require('process');
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p];
    }
  }
}

process.browser = false;
if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer;

// global.location = global.location || { port: 80 }
// if (typeof location === 'undefined')
//   global.location = {port: 80, protocol: 'https:'};
const isDev = typeof __DEV__ === 'boolean' && __DEV__;
// process.env.NODE_ENV = isDev ? ['development'] : ['production'];
Object.assign(process.env, {
  NODE_ENV: isDev ? ['development'] : ['production'],
});
if (typeof localStorage !== 'undefined') {
  localStorage.debug = isDev ? '*' : '';
}

// If using the crypto shim, uncomment the following line to ensure
// crypto is loaded first, so it can populate global.crypto
require('crypto');

// big integer support for react native
if (typeof BigInt === 'undefined') global.BigInt = require('big-integer');
