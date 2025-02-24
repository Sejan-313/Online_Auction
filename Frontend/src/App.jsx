import { Outlet } from 'react-router-dom'
import Header from './role/user/component/Header'
import Footer from './role/user/component/Footer'
import './App.css'

function App() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

export default App
