import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import ArticlePage from './pages/ArticlePage/ArticlePage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:articleSlug' element={<ArticlePage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
