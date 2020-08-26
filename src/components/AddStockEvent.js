import React, { useState } from 'react';
import axios from 'axios';

function AddStockEvent(props) {
  /*
  const [qty, setQty] = useState(0);
  const [type, setType] = useState('add');
  const [product, setProduct] = useState('no');
  const [show, setShow] = useState(false);
*/

  const [stockEvent, setStockEvent] = useState({
    qty: 0,
    type: 'add',
    product: 'no',
    show: false,
  });

  const { qty, type, product, show } = stockEvent;

  // e.target.name will be which of name, email.. that is changed
  // ... spread operator will spread contacts into its elements name, email etc
  const handleChange = (e) => {
    console.log('handleChange e.target', e.target);
    setStockEvent({ ...stockEvent, [e.target.name]: e.target.value });
  };

  /*
  const handleChange = (e) => {
    console.log('AddStockEvent.handleChange e.target.name ', e.target.name);
    console.log('AddStockEvent.handleChange e.target.value ', e.target.value);

    setName({ [e.target.name]: e.target.value });
  };
*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const { qty, type, product } = this.state;
    console.log('AddStockEvent.handleSubmit qty', qty);
    console.log('AddStockEvent.handleSubmit type', type);

    if (product !== 'no') {
      try {
        const data = {
          qty,
          type,
          product: parseInt(product),
        };

        const addStockRes = await axios({
          method: 'POST',
          url: 'http://localhost:1337/stockevents',
          data,
        });

        console.log('AddStockEvent.handleSubmit addStockRes ', addStockRes);
        if (addStockRes.status === 200) {
          alert('Success');
          // Force an update
          window.location = window.location;
        }
      } catch (err) {
        console.log('Error ', err);
      }
    } else {
      alert('No product chosen');
      return;
    }
  };

  // const { qty, type, product, show } = this.state;

  console.log('AddStockEvent.render this.props ', props);

  const { products } = props;
  return (
    <div className='AddStockEvent'>
      <h1>
        Add Stock Event{' '}
        <button
          onClick={() => setStockEvent({ ...stockEvent, ['show']: true })}
        >
          + Add
        </button>
      </h1>
      {show && (
        <form onSubmit={handleSubmit}>
          <select onChange={handleChange} name='product' value={product}>
            <option value='no'>Please select a product</option>
            {products.map((product, i) => (
              <option key={i} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>

          <input onChange={handleChange} type='number' name='qty' value={qty} />
          <select onChange={handleChange} name='type' value={type}>
            <option value='add'>Add</option>
            <option value='remove'>Remove</option>
          </select>

          <button>Submit</button>
        </form>
      )}
    </div>
  );
}

export default AddStockEvent;
