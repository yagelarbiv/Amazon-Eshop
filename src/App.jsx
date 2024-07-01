import './App.css';
//import Title from './components/shared/Title.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import HomePage from './pages/homepage';
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <BrowserRouter>
      <div className='d-flex flex-column side-allPage min-width'>
          <ToastContainer position="bottom-center" limit={1} />
          <Header />
          <main>
            <Container className='mt-3'>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/singin' element={<SignIn/>}/>
                <Route path='/signup' element={<SignUp/>}/>
              </Routes>
            </Container>
          </main>
          <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;