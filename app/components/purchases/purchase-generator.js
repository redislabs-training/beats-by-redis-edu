import { redis } from '../../om/client.js';

async function createPurchaseAmount(artist_name, amount_paid_usd) {
  // increment the artist_name's score inc the sorted set by the amount_paid_usb
  
  return amount_paid_usd;
}

async function createAlbumPurchase(purchase) {
  purchase.artist_name = purchase.artist_name.replaceAll(':', ';');
  purchase.utc_date_raw = parseFloat(purchase.utc_date);
  purchase.utc_date = Math.floor(purchase.utc_date);
  purchase.amount_paid = parseInt(purchase.amount_paid);
  purchase.item_price = parseInt(purchase.item_price);
  purchase.amount_paid_usd = parseInt(purchase.amount_paid_usd);
  if (purchase.album_title === 'null') {
    purchase.album_title = purchase.item_description;
  }

  const artistKey = `purchase:${purchase.artist_name}.${purchase.utc_date_raw}`;
  const purchaseJSON = await redis.json.set(artistKey, '$', purchase);

  await createPurchaseAmount(purchase.artist_name, purchase.amount_paid_usd);
  return purchaseJSON;
}

export { createAlbumPurchase };
