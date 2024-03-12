import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "./App.css";

const Customer = ({ customer }) => (
  <div className="customer">
    <h3>{customer.name}</h3>
    <p>UUID: {customer.id}</p>
  </div>
);

Customer.propTypes = {
  customer: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.any,
  }),
};

// Restaurant Component
const Restaurant = ({ restaurant }) => (
  <div className="restaurant">
    <h3>{restaurant.name}</h3>
    <p>UUID: {restaurant.id}</p>
  </div>
);

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.any,
  }),
};

// Reservation Component
const Reservation = ({ reservation }) => (
  <div className="reservation">
    <h3>Reservation ID: {reservation.id}</h3>
    <p>Customer ID: {reservation.customer_id}</p>
    <p>Restaurant ID: {reservation.restaurant_id}</p>
    <p>Date: {reservation.date}</p>
    <p>Party Count: {reservation.party_count}</p>
  </div>
);

Reservation.propTypes = {
  reservation: PropTypes.shape({
    customer_id: PropTypes.any,
    date: PropTypes.any,
    id: PropTypes.any,
    party_count: PropTypes.any,
    restaurant_id: PropTypes.any,
  }),
};

function App() {
  const [customers, setCustomers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [customerVisible, setCustomerVisible] = useState(false);
  const [restaurantVisible, setRestaurantVisible] = useState(false);
  const [reservationVisible, setReservationVisible] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [reservationDetails, setReservationDetails] = useState({
    customerId: "",
    restaurantId: "",
    date: "",
    partyCount: "",
  });
  const [reservationIdToDelete, setReservationIdToDelete] = useState("");
  const [customerIdToDelete, setCustomerIdToDelete] = useState("");

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

  // Functionsfor creating Customers, restaurants, and reservations and deleting reservations
  // const createCustomer = async () => {
  //   const name = prompt("Enter customer name:");
  //   const response = await fetch("/api/customers", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name }),
  //   });
  //   const newCustomer = await response.json();
  //   setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  // };

  // const createRestaurant = async () => {
  //   const name = prompt("Enter restaurant name:");
  //   const response = await fetch("/api/restaurants", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name }),
  //   });
  //   const newRestaurant = await response.json();
  //   setRestaurants((prevRestaurants) => [...prevRestaurants, newRestaurant]);
  // };

  // const createReservation = async () => {
  //   const customer_id = prompt("Enter customer ID:");
  //   // This should be a UUID, not a name
  //   const restaurant_id = prompt("Enter restaurant ID:");
  //   // This should be a UUID, not a name
  //   const date = prompt("Enter date (YYYY-MM-DD):");
  //   const party_count = prompt("Enter party count:");
  //   const response = await fetch(`/api/customers/${customer_id}/reservations`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ restaurant_id, date, party_count }),
  //   });
  //   const newReservation = await response.json();
  //   setReservations((prevReservations) => [
  //     ...prevReservations,
  //     newReservation,
  //   ]);
  // };

  // const destroyReservation = async () => {
  //   const id = prompt("Enter reservation ID to delete:");
  //   const customer_id = prompt("Enter customer ID:");
  //   await fetch(`/api/customers/${customer_id}/reservations/${id}`, {
  //     method: "DELETE",
  //   });
  //   setReservations((prevReservations) =>
  //     prevReservations.filter((reservation) => reservation.id !== id)
  //   );
  // };

  // New handles for customer, restaurant, and reservation
  const handleCustomerSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: customerName }),
    });
    const newCustomer = await response.json();
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
    setCustomerName(""); // Reset the input field
  };

  const handleRestaurantSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: restaurantName }),
    });
    const newRestaurant = await response.json();
    setRestaurants((prevRestaurants) => [...prevRestaurants, newRestaurant]);
    setRestaurantName(""); // Reset the input field
  };

  const handleReservationSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `/api/customers/${reservationDetails.customerId}/reservations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurant_id: reservationDetails.restaurantId,
          date: reservationDetails.date,
          party_count: reservationDetails.partyCount,
        }),
      }
    );
    const newReservation = await response.json();
    setReservations((prevReservations) => [
      ...prevReservations,
      newReservation,
    ]);
    setReservationDetails({
      customerId: "",
      restaurantId: "",
      date: "",
      partyCount: "",
    }); // Reset the input fields
  };

  const handleDestroyReservationSubmit = async (event) => {
    event.preventDefault();
    await fetch(
      `/api/customers/${customerIdToDelete}/reservations/${reservationIdToDelete}`,
      {
        method: "DELETE",
      }
    );
    setReservations((prevReservations) =>
      prevReservations.filter(
        (reservation) => reservation.id !== reservationIdToDelete
      )
    );
    setReservationIdToDelete(""); // Reset the input field
    setCustomerIdToDelete(""); // Reset the input field
  };

  return (
    <div className="container">
      <h1>Reservation System</h1>

      <form onSubmit={handleCustomerSubmit}>
        <label>
          Customer Name:
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </label>
        <button type="submit">Create Customer</button>
      </form>

      <form onSubmit={handleRestaurantSubmit}>
        <label>
          Restaurant Name:
          <input
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />
        </label>
        <button type="submit">Create Restaurant</button>
      </form>

      <form onSubmit={handleReservationSubmit}>
        <label>
          Customer ID:
          <input
            type="text"
            value={reservationDetails.customerId}
            onChange={(e) =>
              setReservationDetails({
                ...reservationDetails,
                customerId: e.target.value,
              })
            }
          />
        </label>
        <label>
          Restaurant ID:
          <input
            type="text"
            value={reservationDetails.restaurantId}
            onChange={(e) =>
              setReservationDetails({
                ...reservationDetails,
                restaurantId: e.target.value,
              })
            }
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={reservationDetails.date}
            onChange={(e) =>
              setReservationDetails({
                ...reservationDetails,
                date: e.target.value,
              })
            }
          />
        </label>
        <label>
          Party Count:
          <input
            type="number"
            value={reservationDetails.partyCount}
            onChange={(e) =>
              setReservationDetails({
                ...reservationDetails,
                partyCount: e.target.value,
              })
            }
          />
        </label>
        <button type="submit">Create Reservation</button>
      </form>
      <form onSubmit={handleDestroyReservationSubmit}>
        <label>
          Customer ID:
          <input
            type="text"
            value={customerIdToDelete}
            onChange={(e) => setCustomerIdToDelete(e.target.value)}
          />
        </label>
        <label>
          Reservation ID:
          <input
            type="text"
            value={reservationIdToDelete}
            onChange={(e) => setReservationIdToDelete(e.target.value)}
          />
        </label>
        <button type="submit">Delete Reservation</button>
      </form>

      <button
        className="collapsible"
        onClick={() => setCustomerVisible(!customerVisible)}
      >
        Customers
      </button>
      <div
        className="content"
        style={{ maxHeight: customerVisible ? "100%" : "0" }}
      >
        {customers.map((customer) => (
          <div key={customer.id}>
            <h3>{customer.name}</h3>
            <p>UUID: {customer.id}</p>
          </div>
        ))}
      </div>

      <button
        className="collapsible"
        onClick={() => setRestaurantVisible(!restaurantVisible)}
      >
        Restaurants
      </button>
      <div
        className="content"
        style={{ maxHeight: restaurantVisible ? "100%" : "0" }}
      >
        {restaurants.map((restaurant) => (
          <div key={restaurant.id}>
            <h3>{restaurant.name}</h3>
            <p>UUID: {restaurant.id}</p>
          </div>
        ))}
      </div>

      <button
        className="collapsible"
        onClick={() => setReservationVisible(!reservationVisible)}
      >
        Reservations
      </button>
      <div
        className="content"
        style={{ maxHeight: reservationVisible ? "100%" : "0" }}
      >
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
    </div>
  );
}

export default App;
