import React, {useEffect} from 'react'
import Product from '../../components/product/Product'
import './Home.css'

const Home = () => {
  const url = window.location.href;

  useEffect(() => {
    const scrollToProducts = () => {
      if (url.includes("#products")) {
        window.scrollTo({
          top: 700,
          behavior: "smooth",
        });
        return;
      }
    };
    scrollToProducts();
  }, [url]);

  return (
    <div className='home'>
      <Product />
    </div>
  );
};

export default Home;
