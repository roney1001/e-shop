import React ,{useState,useEffect} from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = ()=>{
   //product by sell, most sold products that we get fron our apicall
   const [productsBySell, setProductsBySell] = useState([]);

   // product by arrival like recently arrvied product to our app
   const [productsByArrival, setProductsByArrival] = useState([]);

   //error
   const [error, setError] = useState(false);
   
   // this dunction call our api and we want to sort the product on basis of sold 
   const loadProductsBySell = () => {
      getProducts('sold').then(data => {
          if (data.error) {
              setError(data.error);
          } else {
              setProductsBySell(data);
          }
      });
  };

  // this dunction call our api and we want to sort the product on basis of arrival time(createdAt) 
  const loadProductsByArrival = () => {
   getProducts('createdAt').then(data => {
       console.log(data);
       if (data.error) {
           setError(data.error);
       } else {
           setProductsByArrival(data);
       }
   });
};

// this will run when component load first time or when there is change in state
useEffect(() => {
   loadProductsByArrival();
   loadProductsBySell();
}, []);


   return (<Layout
      title="ĕ-şHöP"
      description='Select the best Item for your new world.'
      className="container-fluid"
   >
       <Search/>
      <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-3 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-3 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
   </Layout>
   
   )
}

export  default Home ;