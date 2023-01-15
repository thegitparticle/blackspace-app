# BlackSpace - soupapp

A super-app to natively use top dapps on Ethereum MainNet, Polygon and Solana ecosystems (as of mid 2022). This project is made with the intention to re-think how crypto wallets can be seen as gateways into decentralized applications rather than just a place to check your token balances. BlackSpace super-app allows you to create new wallets to use the natively integrated dapps with or connect external wallets (Metamask, Rainbow, Phantom) as well. All of the integrated dapps have simple native UI/UX compared to using web-apps. It is built to work on both iOS and Android, however, the heavy testing has been done on lots of iOS devices.

[Website](https://batcavelabs.in/) | [App Store](https://apps.apple.com/us/app/blackspace-use-crypto/id1611233669)

For the current Defi-On-Mobile edition of BlackSpace - [check master branch](https://github.com/thegitparticle/soupapp/tree/master)

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
