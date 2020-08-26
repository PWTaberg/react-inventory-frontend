import React from 'react';
import axios from 'axios';

class AddProduct extends React.Component {
  state = {
    name: '',
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = this.state;

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

  render() {
    const { name } = this.state;
    return (
      <div className='AddProduct'>
        Add Product
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
            type='text'
            name='name'
            value={name}
          ></input>
          <button type='submit'>Add Product</button>
        </form>
      </div>
    );
  }
}

export default AddProduct;
