// Images
import image01 from "./assets/images/image-baklava-desktop.jpg";
import image02 from "./assets/images/image-brownie-desktop.jpg";
import image03 from "./assets/images/image-cake-desktop.jpg";
import image04 from "./assets/images/image-creme-brulee-desktop.jpg";
import image05 from "./assets/images/image-macaron-desktop.jpg";
import image06 from "./assets/images/image-meringue-desktop.jpg";
import image07 from "./assets/images/image-panna-cotta-desktop.jpg";
import image08 from "./assets/images/image-tiramisu-desktop.jpg";
import image09 from "./assets/images/image-waffle-desktop.jpg";
import cartLogo from "./assets/images/icon-add-to-cart.svg";
import cartEmpty from "./assets/images/illustration-empty-cart.svg";
import carbonNeutral from "./assets/images/icon-carbon-neutral.svg";
import iconPlus from "./assets/images/icon-increment-quantity.svg";
import iconMinus from "./assets/images/icon-decrement-quantity.svg";
import orderConfirmed from "./assets/images/icon-order-confirmed.svg";
import removeItem from "./assets/images/icon-remove-item.svg";

// CSS
import "./App.css";
import { useState , useEffect , useRef } from "react";

function App() {
  // Cart Empty Ref
  let cartEmptyRef = useRef(null);

  // Create Object for All Desserts
  const desserts = [
    { id: 1, name: "Waffle with Berries", type: "Waffle", price: "6.50", image: image09 },
    { id: 2, name: "Vanilla Bean Crème Brûlée", type: "Crème Brûlée", price: "7.00", image: image04 },
    { id: 3, name: "Macaron Mix of Five", type: "Macaron", price: "8.00", image: image05 },
    { id: 4, name: "Classic Tiramisu", type: "Tiramisu", price: "5.50", image: image08 },
    { id: 5, name: "Pistachio Baklava", type: "Baklava", price: "4.00", image: image01 },
    { id: 6, name: "Lemon Merinque Pie", type: "Pie", price: "5.00", image: image06 },
    { id: 7, name: "Red Velvet Cake", type: "Cake", price: "4.50", image: image03 },
    { id: 8, name: "Salted Caramel Brownie", type: "Brownie", price: "5.50", image: image02 },
    { id: 9, name: "Vanilla Panna Cotta", type: "Panna Cotta", price: "6.50", image: image07 }
  ];

  // Quantity for Each Dessert
  const [quantity, setQuantity] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  // Cart Total Quantity
  let [cartTotal, setCartTotal] = useState(0);

  // Add 'show-up' Animation On Page Load (only once)
  const [change, setChange] = useState(true);

  useEffect(() => {
    const changeState = () => {
      setChange(true);
      setTimeout(() => {
        setChange(false);
      }, 1500);
    }
    changeState();
  }, []);

  function MainContainer() {
    return (
      <main className={change ? "main-container show-up" : "main-container"}>
        <LeftPart></LeftPart>
        <RightPart></RightPart>
        <OrderConfirmedPart></OrderConfirmedPart>
      </main>
    )
  }

  function DessertCard() {
    return desserts.map((value, number) => (
      <div className="dessert-card-holder" key={number}>
        <div className="dessert-image-holder">
          <img src={value.image} alt="dessert-image" />
          {quantity[number] > 0 ? (
            <div className="btn-quantity-container">
              <div 
                className="btn-quantity" 
                onClick={() => {
                  setQuantity((prevQuantity) => {
                    const newQuantity = [...prevQuantity];
                    newQuantity[number] = newQuantity[number] - 1;
                    return newQuantity;
                  });
                  setCartTotal((prev) => prev - 1);
                }}
              >
                <img src={iconMinus} alt="icon-svg" />
              </div>
              {quantity[number]}
              <div 
                className="btn-quantity"
                onClick={() => {
                  setQuantity((prevQuantity) => {
                    const newQuantity = [...prevQuantity];
                    newQuantity[number] = newQuantity[number] + 1;
                    return newQuantity;
                  });
                  setCartTotal((prev) => prev + 1);
                }}
              >
                <img src={iconPlus} alt="icon-svg" />
              </div>
            </div>
          ) : (
            <button 
              className="btn-action" 
              key={number} 
              disabled={change === false ? false : true} 
              onClick={() => {
                setQuantity(prevQuantity => {
                  const newQuantity = [...prevQuantity];
                  newQuantity[number] = newQuantity[number] + 1;
                  return newQuantity;
                });
                setCartTotal((prev) => prev + 1);
              }}>
              <img src={cartLogo} alt="cart-icon" /> 
              Add to cart
            </button>
          )}
        </div>
        <div className="dessert-info-holder">
          <h1 className="dessert-type">{value.type}</h1>
          <p className="dessert-name">{value.name}</p>
          <p className="dessert-price">${value.price}</p>
        </div>
      </div>
    ))
  }

  // Total Price from an Array
  const [totalArray, setTotalArray] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  // Update Prices Depending on Selected Quantity
   useEffect(() => {
    const newTotalArray = desserts.map((dessert, index) => quantity[index] * dessert.price);
    setTotalArray(newTotalArray);
  }, [quantity]);

  function SelectedItems() {
    return desserts.map((value, number) => (
      quantity[number] > 0 && 
      <div className="item-holder" key={value.id}>
        <div className="item-info-txt">
          <h1>{value.name}</h1>
          <p>
            <span className="total">{quantity[number]}x</span>
            <span className="base-price">@ ${value.price}</span>
            <span className="quantity-price">
              ${Number(quantity[number] * value.price).toFixed(2)}
            </span> 
          </p>
        </div>
        <div 
          className="remove-item-btn"
          onClick={() => {
            setQuantity(prevQuantity => {
              const newQuantity = [...prevQuantity];
              newQuantity[number] = 0;
              return newQuantity;
            });
            setCartTotal((prev) => prev - quantity[number]);
          }}
        >
        <img src={removeItem} alt="icon-svg" />
        </div>
      </div>
    ))
  }

  // Total Price
  const [totalPrice, setTotalPrice] = useState(0); 

  // Set the Total Price from an Array
  useEffect(() => {
    const total = totalArray.reduce((acc, curr) => acc + curr, 0);
    setTotalPrice(total.toFixed(2));
  }, [totalArray]);

  // Modal Window State
  const [modalWindow, setModalWindow] = useState(false);

  function CheckList() {
    return (
      <section className="selected-items-container" style={cartTotal === 0 ? {display: "none"} : {display: "flex"}}>
        <SelectedItems></SelectedItems>
        <div className="order-total-holder">
          <div className="order-total">
            <p>Order Total</p>
            <h1>${totalPrice}</h1>
          </div>
          <div className="eco-friendly-approved">
            <img src={carbonNeutral} alt="icon-svg" />
            <p>This is a <span>carbon-neutral</span> delivery</p>
          </div>
        </div>
        <button className="confirm-order-btn" onClick={() => setModalWindow(true)}>Confirm Order</button>
      </section>
    )
  }

  function LeftPart() {
    return (
      <div className="dessert-menu">
        <h1>Desserts</h1>
        <div className="dessert-card-collection-holder">
          <DessertCard></DessertCard>
        </div>
      </div>
    )
  }

  function RightPart() {
    return (
      <div className="dessert-order-checklist">
        <h1>Your cart ({cartTotal})</h1>
        <div className="cart-empty" style={cartTotal === 0 ? {display: "flex"} : {display: "none"}} ref={cartEmptyRef}>
          <img src={cartEmpty} alt="empty-image" />
          <p>Your added items will appear here.</p>
        </div>
        <CheckList></CheckList>
      </div>
    )
  }

  function ConfirmedList() {
    return desserts.map((value, number) => (
      quantity[number] > 0 && 
      <div className="order-confirmed-holder" key={value.id}>
        <div className="order-confirmed-card">
          <img src={value.image} alt="dessert-image" />
          <div className="order-confirmed-info">
            <h1>{value.name}</h1>
            <p><span>{quantity[number]}x</span><span>${value.price}</span></p>
          </div>
        </div>
        <p>${(quantity[number] * parseFloat(value.price)).toFixed(2)}</p>
      </div>
    ))
  }

  function OrderConfirmedPart() {
    return (
      <section className="modal-window-container" style={modalWindow === true ? {display: "flex"} : {display: "none"}}>
        <div className="modal-window">
          <img src={orderConfirmed} alt="icon-svg" />
          <div className="order-confirmed-txt">
            <h1>Order Confirmed</h1>
            <p>We hope you enjoy your food!</p>
          </div>
          <div className="order-confirmed-list">
            <ConfirmedList></ConfirmedList>
          </div>
          <div className="order-confirmed-total-price">
            <p>Order Total</p>
            <p>${totalPrice}</p>
          </div>
          <button 
            onClick={() => {
              setQuantity([0, 0, 0, 0, 0, 0, 0, 0, 0]);
              setTotalArray([0, 0, 0, 0, 0, 0, 0, 0, 0]);
              setCartTotal(0);
              setTotalPrice(0);
              setModalWindow(false);
            }}>
            Start New Order
          </button>
        </div>
      </section>
    )
  }

  return (
    <MainContainer></MainContainer>
  )
}

export default App;
