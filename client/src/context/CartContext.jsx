import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  useEffect(() => {
  const savedCart = localStorage.getItem("cart");

  if (savedCart) {
    setCart(JSON.parse(savedCart));
  }
  }, []);
  useEffect(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );
  }, [cart]);
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct =
        currentCart.find(
          (item) => item._id === product._id
        );

      if (existingProduct) {
        return currentCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  product.stock
                )
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1
        }
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item._id !== productId
      )
    );
  };

  const updateQuantity = (
    productId,
    quantity
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item._id !== productId) {
          return item;
        }

        return {
          ...item,
          quantity: Math.min(
            quantity,
            item.stock
          )
        };
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }),
    [cart, totalItems, totalPrice]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  return useContext(CartContext);
}