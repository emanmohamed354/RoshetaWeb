import React, { useEffect, useState } from 'react';
import { BaseUrl } from './../../BaseUrl/base';
import axios from 'axios';
import Product from '../Product/Product';

export default function Products() {
  const [eyes, setEyes] = useState([]);
  const [painkiller, setPainkiller] = useState([]);
  const [skinCare, setSkinCare] = useState([]);
  const [haircare, setHaircare] = useState([]);
  const [head, setHead] = useState([]);
  const [depression, setDepression] = useState([]);
  const [internalDiseases, setInternalDiseases] = useState([]);
  const [bones, setBones] = useState([]);
  const [ear, setEar] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  let getAllItems = async (category, callBack) => {
    try {
      setLoading(true);
      let { data } = await axios.post(`${BaseUrl}/products/category`, { category });
      callBack(data.products);
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllItems('Ear', setEar);
    getAllItems('eyes', setEyes);
    getAllItems('Pain killer', setPainkiller);
    getAllItems('Skin care', setSkinCare);
    getAllItems('haircare', setHaircare);
    getAllItems('Head', setHead);
    getAllItems('Depression and Mental illnesses', setDepression);
    getAllItems('internal diseases', setInternalDiseases);
    getAllItems('Bones', setBones);
  }, []);

  // Filtering products based on search term
  const filterProducts = (products) => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <>
      <div className="search-bar w-50 m-auto mt-4">
        <input
          type="text"
          placeholder="Search on products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control p-2"
        />
      </div>

      <Product categoryProducts={filterProducts(eyes)} categoryName={'Product Of Category Eyes'} loading={loading} />
      <Product categoryProducts={filterProducts(painkiller)} categoryName={'Product Of Category Pain Killer'} loading={loading} />
      <Product categoryProducts={filterProducts(skinCare)} categoryName={'Product Of Category Skin Care'} loading={loading} />
      <Product categoryProducts={filterProducts(haircare)} categoryName={'Product Of Category Hair Care'} loading={loading} />
      <Product categoryProducts={filterProducts(depression)} categoryName={'Product Of Category Depression and Mental illnesses'} loading={loading} />
      <Product categoryProducts={filterProducts(internalDiseases)} categoryName={'Product Of Category Internal Diseases'} loading={loading} />
      <Product categoryProducts={filterProducts(bones)} categoryName={'Product Of Category Bones'} loading={loading} />
      <Product categoryProducts={filterProducts(ear)} categoryName={'Product Of Category Ear'} loading={loading} />
    </>
  );
}
