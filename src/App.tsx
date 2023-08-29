import './tailwind-setup.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Foo from './pages/Foo';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Foo />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;