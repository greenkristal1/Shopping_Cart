import { useState } from "react";

const initialItems = [
  { id: 1, name: "Playstation 5", image: "ps5.jpg", price: 499 },
  { id: 2, name: "Extension cord", image: "cord.jpg", price: 99 },
  { id: 3, name: "HDD Drive", image: "hdd_drive.jpg", price: 130 },
  { id: 4, name: "IPhone Case", image: "phonecase.jpg", price: 35 },
];

function App() {
  const [cartList, setCartList] = useState([]);

  function handleSend(sentItem) {
    setCartList((list) => {
      let newList = list.slice().filter((item) => !(item.id === sentItem.id));
      if (sentItem.number === 0) return newList;
      return [...newList, sentItem];
    });
  }
  return (
    <>
      <Header />
      <main>
        <MainSide data={initialItems} onSend={handleSend} />
        <CartList cartList={cartList} />
      </main>
    </>
  );
}

function Header() {
  return <header>Shopping</header>;
}
function MainSide({ data, onSend }) {
  return (
    <div className="main-side">
      <ItemsHeader number={data.length} />
      <ProductList data={data} onSend={onSend} />
    </div>
  );
}
function ItemsHeader({ number }) {
  return (
    <>
      <div className="product-title">List of available products</div>
      <div className="number-of-all-items">{number} items</div>
    </>
  );
}
function ProductList({ data, onSend }) {
  return (
    <div className="all-items">
      {data.map((item) => {
        return <Product item={item} key={item.id} onSend={onSend} />;
      })}
    </div>
  );
}

function Product({ item, onSend }) {
  const [productQuantity, setProductQuantity] = useState(0);
  function handlePlus() {
    let quan = productQuantity + 1;
    setProductQuantity((i) => i + 1);
    sendToCart(quan);
  }
  function handleMinus() {
    if (!productQuantity) return;
    let quan = productQuantity - 1;
    setProductQuantity((i) => (i > 0 ? i - 1 : i));
    sendToCart(quan);
  }
  function sendToCart(number) {
    const updatedProd = {
      id: item.id,
      name: item.name,
      number,
      price: item.price,
    };

    onSend(updatedProd);
  }

  return (
    <div className="product-container">
      <div className="product-img">
        <img src={`/${item.image}`} alt={item.name} />
      </div>
      <div className="product-name">{item.name}</div>
      <div className="product-price">${item.price}</div>
      <Button onClick={handleMinus}>-</Button>
      <input type="number" value={productQuantity} readOnly />
      <Button onClick={handlePlus}>+</Button>
    </div>
  );
}
function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

function CartList({ cartList }) {
  const total_price = cartList.reduce((sum, current) => {
    return sum + current.price * current.number;
  }, 0);
  return (
    <div className="sidebar">
      <div className="cart-title">Shopping cart</div>
      <div className="cart-list">
        Chosen products:
        {cartList.map((item) => (
          <div>
            {item.name} X{item.number}
          </div>
        ))}
        <br />
      </div>
      <div className="total-price">Total price: ${total_price}</div>
    </div>
  );
}

function CartItem({ item }) {
  return (
    <div>
      <span>{item.name}</span>
      <span>X{item.number}</span>
    </div>
  );
}

export default App;
