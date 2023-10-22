import { redis } from '../../om/client.js';
import { purchaseRepository } from './purchase-repository.js';

const ONE_HOUR = 1000 * 60 * 60;

async function purchaseHistory() {
  //  return a range of the 'sales_ts' from an hour ago, to now

}

async function topSellers() {
  // get the range of the 5 last sorted set members with scores (from -5 to -1 index)
  let range = [];
  
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
  // ensure term length is greater than 3 before searching
    // search for artist_name matches term
    // search for album_title matches term
    // search for item_description matches term
    // search for country equals term
    // sort by utc_date_raw descending
    // return the first page of 0, 10

    
}

async function recentPurchases() {
  return purchaseRepository
    .search()
    .sortBy('utc_date_raw', 'DESC')
    .return.page(0, 10);
}

export { purchaseHistory, topSellers, search, recentPurchases };
