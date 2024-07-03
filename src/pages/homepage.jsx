import { useEffect, useReducer } from 'react';
import Title from '../components/shared/title'
import proptypes from 'prop-types';
import homePageReducer from '../reducers/homePageReducer';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../actions';
import axios from 'axios';
import Loading from '../components/shared/Loading';
import MessageBox from '../components/shared/MessageBox';
import Products from '../components/HomePage/Products';

const initialState = {
  loading: false,
  error: "",
  products: [],
}

const HomePage = () => {
  const [state, dispatch] = useReducer(homePageReducer, initialState);

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: GET_REQUEST });
      
      try {
        const res = await axios.get("/api/v1/products");
        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (err) {
        dispatch({ type: GET_FAIL, payload: err.message });
      }
    }
    getProducts();
  }, [])
  return (
    <div>
      <Title title="HomePage" />
      <div className="backgroundHomePage">
        <img style={{ width: "100%" }} src="https://m.media-amazon.com/images/I/81d5OrWJAkL.SX3000.jpg" alt="backgroundHomePage" />
      </div>
      <div className='products'>
        {
          state.loading ? (<Loading />)
            : state.error ? (<MessageBox variant="danger">{state.error}</MessageBox>)
              : (
                <Products products={state.products} />
              )
        }
      </div>
    </div>
  )
}

export default HomePage
HomePage.propTypes = {
  title: proptypes.string,
};