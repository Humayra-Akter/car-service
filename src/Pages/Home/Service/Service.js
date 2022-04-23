import React from 'react';
import './Service.css'

const Service = ({ service }) => {
      const { name, img, description, price } = service;
      return (
            <div className='service-container'>
                  <img src={img} alt="" />
                  <h3>Name : {name}</h3>
                  <h4>Price : ${price}</h4>
                  <p>Description : {description}</p>
                  <button>Book : {name}</button>
            </div>
      );
};

export default Service;