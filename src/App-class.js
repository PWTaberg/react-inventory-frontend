import React from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import StockEventTable from './components/StockEventTable';
import AddStockEvent from './components/AddStockEvent';
import AddProduct from './components/AddProduct';
import Nav from './components/Nav';

import './App.css';

// Data types

// Product
//const fetchedProducts = [];

// StockEvents
//const fetchedStockEvents = [];

// Fetch all stock events
// Separate by product
// display event

class App extends React.Component {
  state = {
    fetchedProducts: [],
    fetchedStockEvents: [],
  };

  async componentDidMount() {
    console.log('App.componentDidMount()');
    // ****
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

      this.setState({
        fetchedProducts,
        fetchedStockEvents,
      });

      console.log('Update state ', this.state.fetchedStockEvents);
    } catch (err) {
      console.log('Error: ', err);
    }
    //****
  }

  render() {
    console.log('App.render()');
    const { fetchedProducts, fetchedStockEvents } = this.state;
    return (
      <div className='App'>
        <h1>Stock Inventory</h1>
        <BrowserRouter>
          <Nav />

          <Switch>
            <Route exact path='/products'>
              <AddProduct />
            </Route>
            <Route exact path='/stock'>
              <StockEventTable
                products={fetchedProducts}
                stockEvents={fetchedStockEvents}
              />
            </Route>
            <Route exact path='/stock/add'>
              <AddStockEvent products={fetchedProducts} />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
