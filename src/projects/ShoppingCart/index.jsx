import { useEffect, useState } from "react";
import "./style.css";

const getProducts = async () => {
  return [
    {
      id: 1,
      name: "Apple",
      description: "A crisp and juicy fruit with a sweet-tart flavor.",
      price: 0.99,
    },
    {
      id: 2,
      name: "Banana",
      description: "A tropical fruit with a creamy texture and a rich taste.",
      price: 0.49,
    },
    {
      id: 3,
      name: "Mango",
      description:
        "A tropical fruit with a fragrant aroma and a sweet, juicy flesh.",
      price: 1.99,
    },
    {
      id: 4,
      name: "Strawberry",
      description:
        "A small, sweet fruit with a bright red color and a tangy flavor.",
      price: 2.49,
    },
  ];
};

export default function ShoppingCart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      const _products = data.map((product) => {
        return {
          ...product,
          quantity: 0,
        };
      });
      setProducts(_products);
    });
  }, []);

  const totalPrice = products
    .reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0)
    .toFixed(2);

  const handleEmptyCart = () => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        return {
          ...prevProduct,
          quantity: 0,
        };
      });
    });
  };

  return (
    <div>
      <ProductTable products={products} setProducts={setProducts} />
      <h3>Total price: ${totalPrice}</h3>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <button>Checkout</button>
        <button onClick={handleEmptyCart}>Empty Cart</button>
      </div>
    </div>
  );
}

function ProductTable({ products, setProducts }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          return (
            <ProductRow
              key={product.id}
              product={product}
              setProducts={setProducts}
            />
          );
        })}
      </tbody>
    </table>
  );
}

function ProductRow({ product, setProducts }) {
  const { name, price, description, quantity } = product;

  const handleIncrement = () => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + 1,
          };
        }
        return prevProduct;
      });
    });
  };
  const handleDecrement = () => {
    if (quantity === 0) return;

    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity - 1,
          };
        }
        return prevProduct;
      });
    });
  };

  return (
    <tr>
      <td>{name}</td>
      <td>${price}</td>
      <td>
        <button onClick={handleDecrement}>-</button>
        <span>{quantity}</span>
        <button onClick={handleIncrement}>+</button>
      </td>
    </tr>
  );
}
