import React from 'react';
import Navbar from '../component/Home/Navbar';
import Ads_top from '../component/Home/Ads_top';
import Slider from '../component/Home/Slider';
import Categories from '../component/Home/Categories';
import BestProducts from '../component/Home/BestProducts';
import BestTitle from '../component/Home/BestTitle';
import Newsletter from '../component/Home/Newsletter';
import Footer from '../component/Home/Footer';

const Home = () => {
  return (
    <div>
      <Ads_top />
      <Navbar />
      <Slider />
      <Categories />
      <BestTitle />
      <BestProducts />
      <Newsletter />
      <Footer />
    </div>
  )
}
export default Home;