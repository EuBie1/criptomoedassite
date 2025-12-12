import { Header } from '../header'
import { Outlet } from 'react-router-dom'

/**
 * Componente Layout
 * Wrapper principal que contém o Header e renderiza as rotas filhas
 */
export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}