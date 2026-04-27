import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/navbar"
import Home from "./pages/home"
import Footer from "./components/footer"


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App 