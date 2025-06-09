
import React, { useEffect, useState } from 'react';
import Banner from '../pages/Banner';
import CategoryBlock from '../components/CategoryBlock';
import '../assets/css/Home.css'
import ProductCard from '../components/ProductCard'
import API from '../components/api' 



function Home() {

   const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/products'); // ✅ fetch all products
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchData();
     }, []);



  return (
    <>
    <div className="home">
      <Banner />

      <div className="feature-grid">
        <CategoryBlock
          title="Electronics"
          category="electronics"
          image="https://innovationmanagement.se/wp-content/uploads/2009/09/tips-for-innovative-ideas-from-electronics-technology-industry.jpg"
          
        />
        <CategoryBlock
          title="Discover fashion trends"
          category="women's clothing"
          image="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS6-dMqHrKhrfzdhe3-T_zrJU_DZ8vyDBS18BFVbeMTmuIFcKoUz84tdOg2r6IWmcyPIy1n0T1kA9hwV_3duEruOMlYRskrKs1IkhID7g1P82K5_mLzgiVo"
        />
        <CategoryBlock
          title="Men's Clothing"
          category="men's clothing"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeL6T1wzeh7wV0CNtaRXBcLteMGHCflwPneQ&s"
        />
        <CategoryBlock
          title="Jewelry"
          category="jewelery"
          image="https://www.malanij.com/EAdmin/assets/images/Section1/Valentines_Product_Necklace.webp"
        />
      </div>

      
          {/* Product List shown after categories */}
      <div className="product-list-wrapper2">
        {/* <h2>Featured Products</h2> */}
        <div className="product-list2">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
           </div>


        {/* <ProductList /> */}
      {/* </div>  */}
    </div>
   </>
  );
  
}
export default Home