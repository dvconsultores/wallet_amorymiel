import axios from 'axios';
// import * as nearAPI from "near-api-js";
// import utils from './utils';
import walletUtils from '@/services/wallet'
import localStorageUser from '~/services/local-storage-user';
// const { connect } = nearAPI;


function getListContractToken(address) {
  return axios.get(process.env.URL_NEAR_API+"account/"+address+"/likelyTokensFromBlock")
    .then(response => {
      return response.data.list
    }).catch(error => {return error}
  );
}


async function getTokenBalance({ contract, address, symbol }) {
  let priceToken = 0;
  const getPrice = await walletUtils.getPrice("USD", symbol);
  
  if(getPrice) {
    priceToken = getPrice;
  }

  const account = await walletUtils.nearConnection();
  return account.viewFunctionV1(
    contract,
    'ft_balance_of',
    { account_id: address }
  ).then(response => {
    return {
      balance: response,
      price: priceToken
    }
  }).catch(error => {
    return error
  });
}

async function getTokenMetadata(contract) {
  const account = await walletUtils.nearConnection();
  return account.viewFunctionV1(
    contract,
    'ft_metadata',
  );
}

async function getListTokensBalance() {
  const address = localStorageUser.getCurrentAccount().address;
  const listContract = await getListContractToken(address)
  const list = [];

  console.log()

  const balanceNear = await walletUtils.getBalance();
  
  list.push({
    contract: "NEAR",
    balance: balanceNear.near.toFixed(5),
    name: "NEAR",
    symbol: "NEAR",
    decimals: 24,
    icon: require('@/assets/sources/logos/near-icon.svg'),
    balance_usd: balanceNear.usd.toFixed(2),
    price: balanceNear.price
  });

  for(let i = 0; i < listContract.length; i++){
    try {
      await getTokenMetadata(listContract[i]).then( async (metadata) => {
        console.log("aqui", metadata)
        let { balance, price } = { balance: 0, price: 0};
        const getBalance = await getTokenBalance({ contract: listContract[i], address, symbol: metadata.symbol })
        
        if(getBalance) {
          balance = getBalance.balance;
          price = getBalance.price;
        }

        if(Number(balance) > 0) {
          const balanceUsd = (Number(walletUtils.formatTokenAmount(balance, metadata.decimals, 5)) * Number(price)).toFixed(2)
          list.push({
            contract: listContract[i],
            balance: walletUtils.formatTokenAmount(balance, metadata.decimals, 5),
            name: metadata.name,
            symbol: metadata.symbol,
            decimals: metadata.decimals,
            icon: metadata.icon,
            balance_usd: isNaN(balanceUsd) ? 0.00 : balanceUsd,
            price
          });
        }
      });
    } catch (error) {
      continue
    }
  }
  
  return list

}


async function getInventoryUser() {
  const address = localStorageUser.getCurrentAccount().address;
  const list = {
    fts: [],
    nfts: [],
  };

  const balanceNear = await walletUtils.getBalance();

  list.fts.push({
    contract: "NEAR",
    balance: balanceNear.near.toFixed(5),
    name: "NEAR",
    symbol: "NEAR",
    decimals: 24,
    icon: require('@/assets/sources/logos/near-icon.svg'),
    balance_usd: balanceNear.usd.toFixed(2),
    price: balanceNear.price
  });

  await axios.get(`${process.env.URL_API_INDEXER}/account/${address}/inventory`)
  .then(response => {
    const data = response.data?.inventory;

    if(!data) throw new Error("no existe inventory");

    list.nfts = data.nfts

    list.fts = list.fts.concat(data.fts.map((item) => {
        const price = !item.ft_metas.price ? 0 : item.ft_metas.price;
        const balance = Number(walletUtils.formatTokenAmount(item.amount, item.ft_metas.decimals, 5));
        const balanceUsd = (balance * Number(price)).toFixed(2)
        return {
          contract: item.contract,
          balance: balance.toFixed(5),
          name: item.ft_metas.name,
          symbol: item.ft_metas.symbol,
          decimals: item.ft_metas.decimals,
          icon: item.ft_metas.icon,
          balance_usd: balanceUsd, // isNaN(balanceUsd) ? 0.00 : balanceUsd,
          price
        }
      })
    )
  }).catch(error => {
    console.log("error api nearblocks inventory: ", error)
  });

  return list
}



export default {
  getTokenBalance,
  getTokenMetadata,
  getListTokensBalance,
  getInventoryUser,
}