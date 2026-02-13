import LoadingTailwind from './components/singles/LoadingTailwind';
import { useAuthContext } from './contexts/Auth/AuthContext';
import Router from './router';

function App() {
  const { isLoading } = useAuthContext();

  if (isLoading) {
    return <LoadingTailwind />;
  }

  return <Router />;
}

export default App;
