import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import StockEventTable from './components/StockEventTable';

// Data types
// Product
const fetchedProducts = [
  {
    id: 1,
    name: 'Super Mario XXL',
  },
  {
    id: 2,
    name: 'WW2 Normandy COD',
  },
];

// StockEvents

const fetchedStockEvents = [
  {
    id: 1,
    type: 'add', // 'add' or 'remove'
    qty: 100,
    product: fetchedProducts[0],
  },
  {
    id: 2,
    type: 'remove', // 'add' or 'remove'
    qty: -20,
    product: fetchedProducts[0],
  },
  {
    id: 3,
    type: 'remove', // 'add' or 'remove'
    qty: -10,
    product: fetchedProducts[0],
  },
  {
    id: 4,
    type: 'add', // 'add' or 'remove'
    qty: 200,
    product: fetchedProducts[1],
  },
  {
    id: 5,
    type: 'remove', // 'add' or 'remove'
    qty: -60,
    product: fetchedProducts[1],
  },
];

// Fetch all stock events
// Separate by product
// display event

function App() {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [fetchedStockEvents, setFetchedStockEvents] = useState([]);

  useEffect(() => {
    console.log('App.componentDidMount()');

    const getInventory = async () => {
      try {
        console.log('Get Products');
        const productsRes = await axios({
          method: 'GET',
          url: 'http://localhost:1337/products',
        });

        console.log('Get StockEvents');
        const stockEventsRes = await axios({
          method: 'GET',
          url: 'http://localhost:1337/stockevents',
        });

        const fetchedProducts = productsRes.data;
        const fetchedStockEvents = stockEventsRes.data;

        console.log('Products: ', fetchedProducts);
        console.log('StockEvents: ', fetchedStockEvents);

        setFetchedProducts(fetchedProducts);
        setFetchedStockEvents(fetchedStockEvents);

        console.log('Update state ', fetchedStockEvents);
      } catch (err) {
        console.log('Error: ', err);
      }
    };

    getInventory();
  }, []);

  return (
    <div className='App'>
      <h1>Stock Inventory</h1>
      <StockEventTable
        products={fetchedProducts}
        stockEvents={fetchedStockEvents}
      />
    </div>
  );
}

export default App;
