import { Route, MemoryRouter, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Parallax from './pages/Parallax';
import MuiTheme from './theme';
import './App.css';
import useUpdater from './hooks/useUpdater';

const queryClient = new QueryClient();

export default function App() {
  useUpdater();
  return (
    <QueryClientProvider client={queryClient}>
      <MuiTheme>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Parallax />} />
            <Route path="users" element={<Parallax />}>
              <Route path=":id" element={<Parallax />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </MuiTheme>
    </QueryClientProvider>
  );
}
