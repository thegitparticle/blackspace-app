# BlackSpace - soupapp

### Branches

1. v1_changes_1 : March, 2022 - first time Super App Concept app store push version. 
2. bombay : May-July, 2022 - super app concept - but with external wallet (ETH - WalletConnect and Phantom) integration and Solana mini apps support.

##### to run bombay, follow the below steps
1. clone the branch's repo
2. `yarn`
3. `npx pod-install ios`
4. Run this in terminal to make sure browser js packages work - `./node_modules/.bin/rn-nodeify --hack --install`
5. Terminal builds do not work. Open in Xcode (.workspace file in ./ios)
6. Open Pods.
  - Delete `GCDAsyncSocket.m` from TcpSockets's Compile Sources
  - Delete `GCDAsyncUdpSocket.m` from CocoaAsyncSocket's Compile Sources
7. Do an XCode build and run 
