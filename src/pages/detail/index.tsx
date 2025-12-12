import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import type { CoinProps, CoinDetailApiResponse, ApiError } from '../../types/coin'
import { fetchCoinDetail } from '../../utils/api'
import { formatCurrency, formatCompactCurrency } from '../../utils/formatters'
import styles from './detail.module.css'

/**
 * Componente Detail
 * Exibe informações detalhadas de uma criptomoeda específica
 */
export function Detail() {
  const { cripto } = useParams()
  const navigate = useNavigate()

  const [coin, setCoin] = useState<CoinProps>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function getCoin() {
      if (!cripto) {
        navigate('/')
        return
      }

      try {
        setLoading(true)
        setError(false)

        const data: CoinDetailApiResponse | ApiError = await fetchCoinDetail(cripto)

        if ('error' in data) {
          setError(true)
          setLoading(false)
          return
        }

        // Formatação de valores monetários
        const resultData: CoinProps = {
          ...data.data,
          formatedPrice: formatCurrency(Number(data.data.priceUsd)),
          formatedMarket: formatCompactCurrency(Number(data.data.marketCapUsd)),
          formatedVolume: formatCompactCurrency(Number(data.data.volumeUsd24Hr)),
        }

        setCoin(resultData)
        setLoading(false)
      } catch (err) {
        console.error('Erro ao buscar dados:', err)
        setError(true)
        setLoading(false)
      }
    }

    getCoin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cripto])

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <h4 className={styles.center}>Carregando detalhes...</h4>
        </div>
      </div>
    )
  }

  if (error || !coin) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <h2 className={styles.center}>Criptomoeda não encontrada</h2>
          <p className={styles.errorMessage}>
            Não foi possível encontrar informações sobre "{cripto}"
          </p>
          <Link to="/" className={styles.backButton}>
            Voltar para a lista
          </Link>
        </div>
      </div>
    )
  }

  const isPositive = Number(coin.changePercent24Hr) > 0

  return (
    <div className={styles.container}>
      {/* Header da página */}
      <div className={styles.header}>
        <Link to="/" className={styles.backLink}>
          ← Voltar
        </Link>
        <h1 className={styles.title}>{coin.name}</h1>
        <p className={styles.symbol}>{coin.symbol.toUpperCase()}</p>
      </div>

      {/* Card de informações */}
      <section className={styles.content}>
        <div className={styles.logoContainer}>
          <img
            src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
            alt={`Logo ${coin.name}`}
            className={styles.logo}
          />
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Preço</span>
            <span className={styles.infoValue}>{coin.formatedPrice}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Valor de Mercado</span>
            <span className={styles.infoValue}>{coin.formatedMarket}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Volume 24h</span>
            <span className={styles.infoValue}>{coin.formatedVolume}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Mudança 24h</span>
            <span
              className={
                isPositive ? styles.changePositive : styles.changeNegative
              }
            >
              {isPositive ? '+' : ''}
              {Number(coin.changePercent24Hr).toFixed(2)}%
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}