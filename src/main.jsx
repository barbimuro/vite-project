import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store} from './app/store.js'
import { Provider } from 'react-redux'
import { fetchUsers } from './app/features/users/usersSlice.js'
import { BrowserRouter as Router, Route, Routes }  from 'react-router'

// store.dispatch(fetchUsers())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />}/>
          
          </Routes>
      </Router>
    </Provider>
  </StrictMode>,
)
