// 4 parts of info
// 1. ETH balance - gets from getBalance() using a node provider and ethers
// 2. Tokens balance - all erc-20 tokens (incl. sidechains) - get query from alchemy
// 3. Defi investments - still need to figure - using Graph
// 4. NFTs - Opensea info

// info needed for each set - amount of "eth/token", $ price, Item name + Item icon

const WalletDetailsDummy = {
  cryptos: [
    {
      item_name: 'Ethereum',
      item_icon:
        'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png',
      item_balance: '5.31',
      base_coverted_balance: '20205',
    },
  ],
  erc_tokens: [
    {
      item_name: 'Unisocks',
      item_icon:
        'https://assets.coingecko.com/coins/images/10717/small/qFrcoiM.png',
      item_balance: '0.017',
      base_coverted_balance: '1697',
    },
    {
      item_name: 'Matic',
      item_icon:
        'https://assets.coingecko.com/coins/images/4713/thumb_2x/matic-token-icon.png',
      item_balance: '105',
      base_coverted_balance: '265.1',
    },
  ],
  nfts: [
    {
      item_name: 'Cool Cat #3452',
      item_icon:
        'https://lh3.googleusercontent.com/o3znq-1N0fKKGuAvkaz-LOh5sqwfzcKEMA7gXSy8xPo5MyqDR-C0NqVq5HW0rZ39eXE7M-kOeDVqxEoAlabwSTSBo52rFtxytsiCYw=w600',
      item_balance: '8',
      base_coverted_balance: '30440',
    },
    {
      item_name: 'RTFKT Spacepod',
      item_icon:
        'https://lh3.googleusercontent.com/2YWoVR9HRI5oKQX202MMkZbKC39YO3DOfizu2Xi3JyuV_KV0qaNI4sMmF4e7roJKV1VrVn6zWpgVNgI44XoJtAehdexXTV8PyZcTEsA',
      item_balance: '0.3',
      base_coverted_balance: '1141.7',
    },
  ],
};
