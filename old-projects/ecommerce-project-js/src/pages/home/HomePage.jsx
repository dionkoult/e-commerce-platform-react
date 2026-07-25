import axios from 'axios';
import { useEffect, useState } from 'react';
import './HomePage.css';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import { useSearchParams } from 'react-router';

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async () => {
      if (search) {
        const response = await axios.get(`/api/products?search=${search}`);
        if (response.data.length === 0) {
          setNoResults(true);
          setProducts([]);
          return;
        }

        setNoResults(false);
        setProducts(response.data);
      } else {
        const response = await axios.get('/api/products');
        setNoResults(false);
        setProducts(response.data);
      }
    };

    getHomeData();
  }, [search]);

  return (
    <>
      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        {noResults && <div className='no-products-found'>
          No products matched your search.
        </div>}
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}