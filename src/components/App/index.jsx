import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';

import '/global.css';

export const App = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);
