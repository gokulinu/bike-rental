import React, { useState } from "react";
import axios from "axios";
import { get } from "mongoose";

const New = () => {
  const [formData, setFormData] = useState({
    title: "",
    typeBike: "",
    price: null
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3333/api/items", formData)
      .then((res) => {
        console.log(res, 'res');
        console.log("Success!");
        // axios.get("http://localhost:3333/api/rentals",formData)
      })
      .catch(err => console.log(err));
  };
  function isRequired(){
   if(!formData.title || !formData.price || !formData.typeBike ){
    return true
   }
   else{
    return false
   }
  }
 

  return (
    <>
      <h3>🤑 Create New Rent</h3>
      <section className="new-rent__inputs">
        <label className="inputs__item">
          <span>Bike Name</span>
          <input type="text" name="title" onChange={onChange} />
        </label>
        <label className="inputs__item" htmlFor="bike-type">
          <span>Bike Type</span>
          <select id="bike-type" name="typeBike" onChange={onChange}>
            <option hidden defaultValue></option>
            <option value="Road">Road</option>
            <option value="Mountain">Mountain</option>
            <option value="Hybrid">Hybrid/commuter</option>
            <option value="Cyclocross">Cyclocross</option>
            <option value="Folding">Folding</option>
            <option value="Electric">Electric</option>
            <option value="Touring">Touring</option>
            <option value="Women's">Women’s</option>
          </select>
        </label>
        <label className="inputs__item">
          <span>Rent Price</span>
          <input type="number" name="price" onChange={onChange} />
        </label>
        <button className="new-rent__btn" onClick={onSubmit} disabled={isRequired()}>Submit Rent</button>
      </section>
    </>
  );
};

export default New;



