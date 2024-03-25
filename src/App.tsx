import './App.css';
import LandingPage from './pages/landingPage';
import ResultPage from './pages/resultPage';
import { SearchSuccessProvider, SearchSuccessContext } from './contexts/searchContext';
import { useContext } from 'react';

function Content() {
  const { searchSuccess } = useContext(SearchSuccessContext);
  console.log(searchSuccess);
  if (searchSuccess) {
    return <ResultPage />;
  }
  return <LandingPage />;
}

function App() {
  return (
    <SearchSuccessProvider>
      <Content />
    </SearchSuccessProvider>
  );
}

export default App;


/// <reference types="vite-plugin-svgr/client" />
