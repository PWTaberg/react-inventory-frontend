import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
  <div className='Nav'>
    <NavLink className='Nav__Link' to='/products'>
      Products
    </NavLink>
    <NavLink className='Nav__Link' to='/stock'>
      Stock
    </NavLink>
    <NavLink className='Nav__Link' to='/stock/add'>
      Add Stock
    </NavLink>
  </div>
);
