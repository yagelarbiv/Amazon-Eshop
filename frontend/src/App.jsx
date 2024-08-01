import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Router from './Routes';

const App = () => {
  return (
    <BrowserRouter>
      <div className='d-flex flex-column side-allPage min-width'>
          <ToastContainer position="bottom-center" limit={1} />
          <Header />
          <main>
            <Container className='mt-3'>
              <Router />
            </Container>
          </main>
          <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;