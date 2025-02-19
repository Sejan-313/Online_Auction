import './App.css'
import Header from './frontend/main/user/components/Header'
import Footer from './frontend/main/user/components/Footer'
import { Outlet } from 'react-router-dom'


function App() {

  const h1 = './assets/download.png'

  return (
    <>
      <Header></Header>

      <Outlet></Outlet>
      <Footer></Footer>

    </>
  )
}

export default App
