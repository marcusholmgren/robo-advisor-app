export interface Portfolio {
  name: string;
  description?: string;
  id: number;
  created_at: string;
  updated_at: string;
}

export interface Asset {
  symbol: string;
  name: string;
  id: number;
  portfolio_id: number;
  created_at: string;
  updated_at: string;
  current_quantity?: number;
  average_cost_basis?: number;
}

export interface Trade {
  trade_date: string;
  quantity: number;
  price: number;
  trade_type: 'BUY' | 'SELL';
  id: number;
  created_at: string;
}
