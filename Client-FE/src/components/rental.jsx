import React, { useState, useEffect } from "react";
import axios from "axios";

const Rental = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await axios.get("http://localhost:3333/api/rentals");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentals();
  }, []);

  const onDelete = (item) => {
    const data = {
      title: item.name,
      typeBike: item.typeBike,
      price: item.price
    };

    axios
      .delete(`http://localhost:3333/api/rentals/${item._id}`)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => console.log(err));

    axios
      .post("http://localhost:3333/api/items/", data)
      .then(() => {
        console.log("Success!");
      })
      .catch((err) => console.log(err));
  };

  const total = () => {
    let sum = 0;
    items.forEach((item) => {
      sum += item.price;
    });
    return items.length >= 20 ? sum / 2 : sum;
  };

  return (
    <section className="your-rent">
      <h3>🤩 Your rent (total: ${total()})</h3>
      <ul>
        {items.map((item) => (
          <li key={item._id} className="your-rent__item">
            <span>{item.name} / {item.typeBike} / ${item.price}</span>
            <button className="your-rent__btn" onClick={() => onDelete(item)}>Cancel rent</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Rental;
