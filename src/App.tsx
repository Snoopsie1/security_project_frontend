import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import Layout from './components/layout/Layout';
import Foo from './pages/Foo';
import './globals.css';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Products />}/>
          <Route path='/orders' element={<Foo />}/> {/* Skal skiftes til Orders component*/}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;