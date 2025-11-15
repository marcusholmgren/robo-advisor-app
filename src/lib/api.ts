import { API_BASE_URL } from './constants';
import type { Portfolio, Asset, Trade } from './types';

export async function getPortfolios(): Promise<Portfolio[]> {
  const response = await fetch(`${API_BASE_URL}/api/v1/portfolios`);
  const portfolios = await response.json();

  const detailedPortfolios = await Promise.all(
    portfolios.map(async (portfolio: Portfolio) => {
      const portfolioDetails = await getPortfolio(portfolio.id);
      return {
        ...portfolio,
        ...portfolioDetails,
      };
    })
  );

  return detailedPortfolios;
}



export async function getPortfolio(id: number): Promise<Portfolio | undefined> {
  const response = await fetch(`${API_BASE_URL}/api/v1/portfolios/${id}`);
  const data = await response.json();
  return data;
}

export async function getAssetsForPortfolio(portfolioId: number): Promise<Asset[]> {
  const response = await fetch(`${API_BASE_URL}/api/v1/portfolios/${portfolioId}/assets`);
  const data = await response.json();
  return data;
}

export async function getTradesForAsset(assetId: number): Promise<Trade[]> {
  const response = await fetch(`${API_BASE_URL}/api/v1/assets/${assetId}/trades`);
  const data = await response.json();
  return data;
}
