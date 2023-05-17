import { wrapper, store } from '../redux/store';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap');
  }, []);
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
