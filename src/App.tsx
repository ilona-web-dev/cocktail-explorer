import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import CocktailPage from './CocktailPage';

function App() {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/cocktail/:id" element={<CocktailPage />} />
      </Routes>
   );
}

export default App;
