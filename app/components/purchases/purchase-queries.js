import { redis } from '../../om/client.js';
import { purchaseRepository } from './purchase-repository.js';

const ONE_HOUR = 1000 * 60 * 60;

async function purchaseHistory() {
  //  return a range of the 'sales_ts' from an hour ago, to now
  return redis.ts.range('sales_ts', Date.now() - ONE_HOUR, Date.now());
}

async function topSellers() {
  const range = await redis.zRangeWithScores('top-sellers', -5, -1);

  // the code below parses Redis return data for chart consumption
  
  let series = [];
  let labels = [];

  range.slice(0, 5).forEach((spender) => {
    series.push(parseFloat(spender.score.toFixed(2)));
    labels.push(spender.value);
  });

  return { series, labels };
}

async function search(term) {
  if (term.length > 3) {
    return purchaseRepository
      .search()
      .where('artist_name')
      .matches(term)
      .or('album_title')
      .matches(term)
      .or('item_description')
      .matches(term)
      .or('country')
      .equals(term)
      .sortBy('utc_date_raw', 'DESC')
      .return.page(0, 10);
  } 
}

async function recentPurchases() {
  return purchaseRepository
    .search()
    .sortBy('utc_date_raw', 'DESC')
    .return.page(0, 10);
}

export { purchaseHistory, topSellers, search, recentPurchases };
