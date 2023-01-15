# BlackSpace

Simplest way to trade on defi from your smartphone. Enter into positions, provide liquidity, manage yield farms all from your phone with enhanced security and native UI and UX (not cluttered web-apps). Currently supports top defi protocols on the Ethereum Mainnet.

[Website](https://www.blackspace.cool/) | [App Store](https://apps.apple.com/us/app/blackspace-use-crypto/id1611233669)

For the previous Super-Dapp edition of BlackSpace - [check this branch](https://github.com/thegitparticle/soupapp/tree/bombay_archive)

##### to run, follow the below steps
1. clone the branch's repo
2. `yarn`
3. `npx pod-install ios`
4. Run this in terminal to make sure browser js packages work - `./node_modules/.bin/rn-nodeify --hack --install`
5. Terminal builds do not work. Open in Xcode (.workspace file in ./ios)
6. Open Pods.
  - Delete `GCDAsyncSocket.m` from TcpSockets's Compile Sources
  - Delete `GCDAsyncUdpSocket.m` from CocoaAsyncSocket's Compile Sources
7. Do an XCode build and run 
