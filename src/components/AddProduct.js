import React, { useState } from 'react';
import axios from 'axios';

function AddProduct(props) {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const addProductRes = await axios({
        method: 'POST',
        url: 'http://localhost:1337/products',
        data: {
          name,
        },
      });

      if (addProductRes.status === 200) {
        alert(`Product ${name} successfully added`);
      }

      window.location = window.location;
    } catch (err) {
      console.log('Error ', err);
    }
  };

  return (
    <div className='AddProduct'>
      Add Product
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName({ [e.target.name]: e.target.value })}
          type='text'
          name='name'
          value={name}
        ></input>
        <button type='submit'>Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
