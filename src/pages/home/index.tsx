import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import styles from './home.module.css'
import { BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import type { CoinProps, CoinApiResponse } from '../../types/coin'
import { fetchCoins } from '../../utils/api'
import { formatCurrency, formatCompactCurrency } from '../../utils/formatters'

/**
 * Componente Home
 * Página principal que exibe lista de criptomoedas e busca
 */
export function Home() {
  const [input, setInput] = useState('')
  const [coins, setCoins] = useState<CoinProps[]>([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset])

  /**
   * Busca dados das criptomoedas da API
   */
  async function getData() {
    setLoading(true)
    try {
      const data: CoinApiResponse = await fetchCoins(10, offset)
      const coinsData = data.data

      if (!coinsData || coinsData.length === 0) {
        console.warn('Nenhuma criptomoeda retornada da API')
        return
      }

      // Formatação de valores monetários
      const formatedResult = coinsData.map((item) => ({
        ...item,
        formatedPrice: formatCurrency(Number(item.priceUsd)),
        formatedMarket: formatCompactCurrency(Number(item.marketCapUsd)),
        formatedVolume: formatCompactCurrency(Number(item.volumeUsd24Hr)),
      }))

      // Se for o primeiro carregamento (offset === 0), substitui o array
      // Se for carregar mais, adiciona ao array existente
      if (offset === 0) {
        setCoins(formatedResult)
      } else {
        setCoins((prevCoins) => [...prevCoins, ...formatedResult])
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle do formulário de busca
   */
  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (input.trim() === '') return

    navigate(`/detail/${input.trim().toLowerCase()}`)
  }

  /**
   * Carrega mais criptomoedas
   */
  function handleGetMore() {
    if (offset === 0) {
      setOffset(10)
      return
    }

    setOffset(offset + 10)
  }

  return (
    <main className={styles.container}>
      {/* Hero Section - Formulário de busca */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Explore Criptomoedas</h1>
        <p className={styles.heroSubtitle}>
          Busque informações sobre qualquer criptomoeda
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite o nome da moeda... Ex: bitcoin"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.input}
            aria-label="Buscar criptomoeda"
          />
          <button type="submit" className={styles.searchButton} aria-label="Buscar">
            <BsSearch size={24} color="#FFF" />
          </button>
        </form>
      </section>

      {/* Tabela de criptomoedas */}
      <section className={styles.tableSection}>
        {loading && coins.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.spinner}></div>
            <p>Carregando criptomoedas...</p>
          </div>
        ) : coins.length > 0 ? (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Moeda</th>
                  <th scope="col">Valor mercado</th>
                  <th scope="col">Preço</th>
                  <th scope="col">Volume</th>
                  <th scope="col">Mudança 24h</th>
                </tr>
              </thead>
              <tbody>
                {coins.map((item) => (
                  <tr className={styles.tr} key={item.id}>
                    <td className={styles.tdLabel} data-label="Moeda">
                      <div className={styles.name}>
                        <img
                          className={styles.logo}
                          alt={`Logo ${item.name}`}
                          src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                          loading="lazy"
                        />
                        <Link to={`/detail/${item.id}`} className={styles.coinLink}>
                          <span className={styles.coinName}>{item.name}</span>
                          <span className={styles.coinSymbol}> | {item.symbol}</span>
                        </Link>
                      </div>
                    </td>

                    <td className={styles.tdLabel} data-label="Valor mercado">
                      {item.formatedMarket}
                    </td>

                    <td className={styles.tdLabel} data-label="Preço">
                      {item.formatedPrice}
                    </td>

                    <td className={styles.tdLabel} data-label="Volume">
                      {item.formatedVolume}
                    </td>

                    <td
                      className={
                        Number(item.changePercent24Hr) > 0
                          ? styles.tdProfit
                          : styles.tdLoss
                      }
                      data-label="Mudança 24h"
                    >
                      <span>
                        {Number(item.changePercent24Hr) > 0 ? '+' : ''}
                        {Number(item.changePercent24Hr).toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className={styles.buttonMore}
              onClick={handleGetMore}
              disabled={loading}
              aria-label="Carregar mais criptomoedas"
            >
              {loading ? 'Carregando...' : 'Carregar mais'}
            </button>
          </>
        ) : (
          <div className={styles.emptyState}>
            <p>Nenhuma criptomoeda encontrada.</p>
          </div>
        )}
      </section>
    </main>
  )
}
