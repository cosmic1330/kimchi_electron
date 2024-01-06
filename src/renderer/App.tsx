import { Route, MemoryRouter, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Hello from './pages/Hello';
import MuiTheme from './theme';
import './App.css';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiTheme>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Hello />} />
            <Route path="users" element={<Hello />}>
              <Route path=":id" element={<Hello />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </MuiTheme>
    </QueryClientProvider>
  );
}
