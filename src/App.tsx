import './App.css';
import CollectionsHome from './component/collection/collections-home';
import Header from './component/header/header';
import MintNFT from './component/mint/mint-home';
import { useNFTContext } from './hook/useNFTContext';
import LandingPage from './component/landing-page/landing-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  const { isConnected } = useNFTContext();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/collection"
          element={isConnected ? <CollectionsHome /> : <LandingPage />}
        />
        <Route path="/" element={isConnected ? <MintNFT /> : <LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
