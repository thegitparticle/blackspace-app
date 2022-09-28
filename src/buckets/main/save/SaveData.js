export const PoSStakingPools = [
  {
    id: 1,
    pool_name: 'Ethereum 2.0',
    token_symbol: 'ETH',
    pool_logo:
      'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
    token_logo:
      'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
    total_staked_amount: '4,296,432',
    total_staked_amount_usd: '$ 16.3 Billion',
    interest_rate: '4.0%',
    faqs: [
      {
        question: 'What is Lido?',
        answer:
          'Lido is a liquid staking solution for ETH 2.0 backed by industry-leading staking providers. Lido lets users stake their ETH - without locking assets or maintaining infrastructure - whilst participating in on-chain activities, e.g. lending.',
      },
      {
        question: 'How does Lido work?',
        answer:
          'When staking with Lido, users receive stETH tokens on a 1:1 basis representing their staked ETH. stETH balances can be used like regular ETH to earn yields and lending rewards, and are updated on a daily basis to reflect your ETH staking rewards. Note that there are no lock-ups or minimum deposits when staking with Lido.',
      },
      {
        question: 'What is liquid staking?',
        answer:
          'Liquid staking protocols allow users to earn staking rewards without locking assets or maintaining staking infrastructure. Users can deposit tokens and receive tradable liquid tokens in return. ',
      },
      {
        question: 'What is stETH?',
        answer:
          'stETH is a token that represents staked ether in Lido, combining the value of initial deposit + staking rewards. stETH tokens are minted upon deposit and burned when redeemed. stETH token balances are issued 1:1 to the ethers that are staked by Lido. stETH token’s balances are updated when the oracle reports change in total stake every day.',
      },
      {
        question: 'What are the risks of staking with Lido?',
        answer:
          'There exist a number of potential risks when staking ETH using liquid staking protocols.',
      },
    ],
  },
  {
    id: 1,
    pool_name: 'Polygon',
    token_symbol: 'MATIC',
    pool_logo:
      'https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912',
    token_logo:
      'https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912',
    total_staked_amount: '42,520,082 ',
    total_staked_amount_usd: '$ 1.4 Billion',
    interest_rate: '8.7%',
    faqs: [
      {
        question: 'What is Lido on Polygon?',
        answer:
          'Lido on Polygon is a liquid staking solution for MATIC backed by industry-leading staking providers. Lido lets users earn MATIC staking rewards without needing to maintain infrastructure and enables them to trade staked positions, as well as participate in on-chain decentralized finance with their staked assets.',
      },
      {
        question: 'How does Lido on Polygon work?',
        answer:
          'When staking with Lido on Polygon, users receive stMATIC tokens as soon as they submit MATIC. Lido will calculate the current stMATIC/MATIC ratio and send the correct amount to the user. MATIC tokens are then delegated across Polygon validators that are part of Lido on Polygon.',
      },
      {
        question: 'What is liquid staking?',
        answer:
          'Liquid staking protocols allow users to earn staking rewards without locking assets or maintaining staking infrastructure. Users can deposit tokens and receive tradable liquid tokens in return. ',
      },
      {
        question: 'What is stMATIC?',
        answer:
          'stMATIC is an ERC20 token that represents the account’s share of the total supply of MATIC tokens inside PoLido system. It is a non-rebasable token, which means that the amount of tokens in the user’s wallet is not going to change. During time, the value of this token is changing, since the amount of MATIC tokens inside the protocol is not constant. stMATIC will be supported by a variety of DeFi applications across Ethereum and Polygon networks.',
      },
      {
        question: 'What fee is applied by Lido? What is it used for?',
        answer:
          'Lido applies a 10% fee on a user’s staking rewards. This fee is split between node operators, the DAO, and a coverage fund.',
      },
    ],
  },
];
