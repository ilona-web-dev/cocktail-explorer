import Layout from './components/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CocktailPage from './pages/CocktailPage/CocktailPage';

function App() {
   return (
      <Layout>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cocktail/:id" element={<CocktailPage />} />
         </Routes>
      </Layout>
   );
}

export default App;
