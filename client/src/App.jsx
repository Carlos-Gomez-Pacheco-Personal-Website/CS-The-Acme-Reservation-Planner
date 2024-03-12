import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [customers, setCustomers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [reservations, setReservations] = useState([]);

  // Fetch the data when the component mounts
  useEffect(() => {
    fetch("/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error:", error));

    fetch("/api/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error("Error:", error));

    fetch("/api/reservations")
      .then((response) => response.json())
      .then((data) => setReservations(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const createCustomer = async () => {
    const name = prompt("Enter customer name:");
    const response = await fetch("/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const newCustomer = await response.json();
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  const createRestaurant = async () => {
    const name = prompt("Enter restaurant name:");
    const response = await fetch("/api/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const newRestaurant = await response.json();
    setRestaurants((prevRestaurants) => [...prevRestaurants, newRestaurant]);
  };

  const createReservation = async () => {
    const customer_id = prompt("Enter customer ID:");
    const restaurant_id = prompt("Enter restaurant ID:");
    const date = prompt("Enter date (YYYY-MM-DD):");
    const party_count = prompt("Enter party count:");
    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customer_id, restaurant_id, date, party_count }),
    });
    const newReservation = await response.json();
    setReservations((prevReservations) => [
      ...prevReservations,
      newReservation,
    ]);
  };

  const destroyReservation = async () => {
    const id = prompt("Enter reservation ID to delete:");
    await fetch(`/api/reservations/${id}`, {
      method: "DELETE",
    });
    setReservations((prevReservations) =>
      prevReservations.filter((reservation) => reservation.id !== id)
    );
  };

  return (
    <div>
      <h1>Reservation System</h1>

      <button onClick={createCustomer}>Create Customer</button>

      <button onClick={createRestaurant}>Create Restaurant</button>

      <button onClick={createReservation}>Create Reservation</button>

      <button onClick={destroyReservation}>Delete Reservation</button>

      <h2>Customers</h2>
      {customers.map((customer) => (
        <div key={customer.id}>
          <h3>{customer.name}</h3>
        </div>
      ))}

      <h2>Restaurants</h2>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <h3>{restaurant.name}</h3>
        </div>
      ))}

      <h2>Reservations</h2>
      {reservations.map((reservation) => (
        <div key={reservation.id}>
          <h3>Reservation ID: {reservation.id}</h3>
          <p>Customer ID: {reservation.customer_id}</p>
          <p>Restaurant ID: {reservation.restaurant_id}</p>
          <p>Date: {reservation.date}</p>
          <p>Party Count: {reservation.party_count}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
