import { Link } from 'react-router-dom'
import styles from './notfound.module.css'

/**
 * Componente Notfound
 * Página 404 exibida quando uma rota não é encontrada
 */
export function Notfound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Página não encontrada</h2>
        <p className={styles.message}>
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link to="/" className={styles.backButton}>
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}