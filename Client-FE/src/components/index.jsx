import React, { useState, useEffect } from "react";
import axios from "axios";

const Index = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:3333/api/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const onDelete = (id) => {
    axios
      .delete(`http://localhost:3333/api/items/${id}`)
      .then((resp) => {
        console.log(resp.data);
        setItems(items.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRent = (item) => {
    const data = {
      title: item.name,
      typeBike: item.typeBike,
      price: item.price
    };

    axios
      .delete(`http://localhost:3333/api/items/${item._id}`)
      .then((resp) => {
        console.log(resp.data);
        setItems(items.filter((i) => i._id !== item._id));
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("http://localhost:3333/api/rentals/", data)
      .then(() => {
        console.log("Success!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="available-rent">
      <h3>🚲 Available Bicycles ({items.length})</h3>
      <ul>
        {items.map((item) => (
          <li key={item._id} className="available-rent__item">
            <span>{item.name} / {item.typeBike} / ${item.price}</span>
            <div className="item__btns">
              <button className="btns__rent" onClick={() => onRent(item)}>Rent</button>
              <button className="btns__delete" onClick={() => onDelete(item._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Index;
