export type ProductTicker = {
  trade_id: string,
  price: string,
  size: string,
  bid: string,
  ask: string,
  volume: string,
  time: Date;
};

interface BaseOrder {
  type: string;
  side: 'buy' | 'sell';
  product_id: string;
  client_oid?: string;
  stp?: 'dc' | 'co' | 'cn' | 'cb';
}

interface LimitOrder extends BaseOrder {
  type: 'limit';
  price: string;
  size: string;
  time_in_force?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancel_after?: 'min' | 'hour' | 'day';
  post_only?: boolean;
}

/**
 * Only one of `size` and `funds` are required for market and limit orders (the other can be explicitly assigned null or undefined). However,
 * it is advisable to include both. If funds is not specified, the entire user balance is placed on hold until the order is filled which
 * will prevent other orders from being placed in the interim. This can cause issues for HFT algorithms for example.
 */
interface MarketOrder extends BaseOrder {
  type: 'market';
  size: string | null;
  funds: string | null;
}

interface StopOrder extends BaseOrder {
  type: 'stop';
  size: string;
  funds: string;
}

export type OrderParams = MarketOrder | LimitOrder | StopOrder;

export interface BaseOrderInfo {
  id: string;
  price: number;
  size: number;
  product_id: string;
  side: 'buy' | 'sell';
  stp: 'dc' | 'co' | 'cn' | 'cb';
  type: 'limit' | 'market' | 'stop';
  created_at: string;
  post_only: boolean;
  fill_fees: number;
  filled_size: number;
  status: 'received' | 'open' | 'done' | 'pending';
  settled: boolean;
  executed_value: number;
}

export interface OrderResult extends BaseOrderInfo {
  time_in_force: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  status: 'received' | 'open' | 'done';
}

export interface OrderInfo extends BaseOrderInfo {
  status: 'received' | 'open' | 'done' | 'pending';
  funds: number;
  specified_funds: number;
  done_at: string;
  executed_value: number;
}

export type PageArgs = {
  before: number;
  after?: number;
  limit?: number;
} |
  {
    before?: number;
    after: number;
    limit?: number;
  } |
  {
    before?: number;
    after?: number;
    limit: number;
  };


export type Account = {
  id: string,
  profile_id: string,
  currency: CurrencyType,
  balance: number,
  available: number,
  hold: number
};

export type CoinbaseAccount = {
  id: string,
  name: string,
  balance: number,
  currency: CurrencyType,
  type: 'wallet' | 'fiat',
  primary: boolean,
  active: boolean
};

export type CurrencyType = 'USD' | 'BTC' | 'LTC' | 'ETH' | 'B2X';

export type CurrencyInfo = {
  id: CurrencyType,
  name: string,
  min_size: string
};

export interface ProductInfo {
  id: string;
  base_currency: string;
  quote_currency: string;
  base_min_size: string;
  base_max_size: string;
  quote_increment: string;
  display_name: string;
  margin_enabled: boolean;
}
