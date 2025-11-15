import type { Portfolio, Asset, Trade } from './types';

const portfolios: Portfolio[] = [
  {
    id: 1,
    name: 'Aggressive Growth Fund',
    description: 'A high-risk, high-reward portfolio.',
    created_at: '2023-01-15T09:30:00Z',
    updated_at: '2023-10-27T14:00:00Z'
  },
  {
    id: 2,
    name: 'Balanced Retirement Plan',
    description: 'A diversified portfolio for long-term growth.',
    created_at: '2022-05-20T11:00:00Z',
    updated_at: '2023-10-27T10:30:00Z'
  },
  {
    id: 3,
    name: 'Conservative Income',
    description: 'A low-risk portfolio focused on generating income.',
    created_at: '2021-11-10T16:45:00Z',
    updated_at: '2023-10-26T09:00:00Z'
  }
];

const assets: Asset[] = [
    {
        id: 1,
        portfolio_id: 1,
        symbol: 'AAPL',
        name: 'Apple Inc.',
        current_quantity: 100,
        average_cost_basis: 150.00,
        created_at: '2023-01-15T09:30:00Z',
        updated_at: '2023-10-27T14:00:00Z'
    },
    {
        id: 2,
        portfolio_id: 1,
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        current_quantity: 50,
        average_cost_basis: 2800.00,
        created_at: '2023-01-15T09:30:00Z',
        updated_at: '2023-10-27T14:00:00Z'
    },
    {
        id: 3,
        portfolio_id: 2,
        symbol: 'VOO',
        name: 'Vanguard 500 Index Fund ETF',
        current_quantity: 200,
        average_cost_basis: 400.00,
        created_at: '2022-05-20T11:00:00Z',
        updated_at: '2023-10-27T10:30:00Z'
    }
];

const trades: Trade[] = [
    {
        id: 1,
        trade_date: '2023-01-15T09:30:00Z',
        quantity: 100,
        price: 150.00,
        trade_type: 'BUY',
        created_at: '2023-01-15T09:30:00Z'
    },
    {
        id: 2,
        trade_date: '2023-02-01T10:00:00Z',
        quantity: 50,
        price: 2800.00,
        trade_type: 'BUY',
        created_at: '2023-02-01T10:00:00Z'
    }
];

export function getPortfolios(): Promise<Portfolio[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(portfolios);
    }, 500);
  });
}

export function getPortfolio(id: number): Promise<Portfolio | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(portfolios.find((p) => p.id === id));
    }, 500);
  });
}

export function getAssetsForPortfolio(portfolioId: number): Promise<Asset[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(assets.filter((a) => a.portfolio_id === portfolioId));
        }, 500);
    });
}

export function getTradesForAsset(assetId: number): Promise<Trade[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            // This is a simplified mock. In a real app, you'd fetch trades for a specific asset.
            resolve(trades);
        }, 500);
    });
}
