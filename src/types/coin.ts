/**
 * Tipos compartilhados para criptomoedas
 */

export interface CoinProps {
  id: string
  name: string
  symbol: string
  priceUsd: string
  vwap24Hr: string
  changePercent24Hr: string
  rank: string
  supply: string
  maxSupply: string
  marketCapUsd: string
  volumeUsd24Hr: string
  explorer: string
  formatedPrice?: string
  formatedMarket?: string
  formatedVolume?: string
}

export interface CoinApiResponse {
  data: CoinProps[]
}

export interface CoinDetailApiResponse {
  data: CoinProps
}

export interface ApiError {
  error: string
}

