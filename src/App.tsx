import { router } from './router'
import { RouterProvider } from 'react-router-dom'

/**
 * Componente principal da aplicação
 */
function App() {
  return <RouterProvider router={router} />
}

export default App
