import styles from './header.module.css'
import logimg from '../../assets/logo.svg'
import { Link } from 'react-router-dom'

/**
 * Componente Header
 * Exibe o logo do site com link para a página inicial
 */
export function Header() {
  return (
    <header className={styles.container}>
      <Link to="/" aria-label="Ir para página inicial">
        <img src={logimg} alt="Logo Cripto App" className={styles.logo} />
      </Link>
    </header>
  )
}
