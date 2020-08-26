import React, { useState } from 'react';

function StockDetail(props) {
  const [show, setShow] = useState(true);

  const { name, total, stockEvents } = props;

  return (
    <div
      className='StockDetail'
      onClick={() => (show ? setShow(false) : setShow(true))}
    >
      <h2>
        Product: {name} | Total: {total}
      </h2>
      {show && (
        <div>
          {stockEvents.map((event) => (
            <div className='StockEventTable__card' key={event.id.toString()}>
              <p>Id: {event.id}</p>
              <p>Type: {event.type}</p>
              <p>Quantity: {event.qty}</p>
              <p>Product Name: {event.product.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default StockDetail;
