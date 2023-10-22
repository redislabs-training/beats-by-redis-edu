import { Repository, Schema } from 'redis-om';

import { redis } from '../../om/client.js';

const purchaseSchema = new Schema('purchase', {
  utc_date: { type: 'date', sortable: true },
  utc_date_raw: { type: 'date', sortable: true },
  artist_name: { type: 'text' },
  item_description: { type: 'text' },
  country: { type: 'string' },
  album_title: { type: 'text' },
});

export const purchaseRepository = new Repository(purchaseSchema, redis);

await purchaseRepository.createIndex();
