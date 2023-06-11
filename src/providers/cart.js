import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '@/lib/common/api';
import toast from 'react-hot-toast';
import { ShippingType } from '@prisma/client';

const cartInitialState = {
  cart: [],
  total: 0,
  showCart: false,
  showPaymentLink: false,
  isSubmitting: false,
  paymentLink: '',
  setShippingFee: 'withInCebu',
  deliveryAddress: '',
  addToCart: () => {},
  removeFromCart: () => {},
  setShippingFee: () => {},
  setDeliveryAddress: () => {},
  clearCart: () => {},
  toggleCartVisibility: () => {},
  togglePaymentLinkVisibility: () => {},
  checkoutCart: () => {},
};

const LPH_CART_KEY = 'LPHCART';

const CartContext = createContext(cartInitialState);

export const SHOP_SHIPPING = {
  withInCebu: {
    title: 'Within Cebu',
    fee: 160,
    key: ShippingType.WITHIN_CEBU,
  },
  ncr: {
    title: 'NCR',
    fee: 200,
    key: ShippingType.NCR,
  },
  northLuzon: {
    title: 'North Luzon',
    fee: 210,
    key: ShippingType.NORTH_LUZON,
  },
  southLuzon: {
    title: 'South Luzon',
    fee: 210,
    key: ShippingType.SOUTH_LUZON,
  },
  visayas: {
    title: 'Other Visayas Region',
    fee: 200,
    key: ShippingType.VISAYAS,
  },
  mindanao: {
    title: 'Mindanao',
    fee: 200,
    key: ShippingType.MINDANAO,
  },
  islander: {
    title: 'Islander',
    fee: 210,
    key: ShippingType.ISLANDER,
  },
};

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setCartVisibility] = useState(false);
  const [showPaymentLink, setPaymentLinkVisibility] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [paymentLink, setPaymentLink] = useState('');
  const [shippingFee, setShippingFee] = useState(SHOP_SHIPPING?.withInCebu);
  const [deliveryAddress, setDeliveryAddress] = useState('');

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem(LPH_CART_KEY));

    if (cart) {
      setCart([...cart]);
    }
  }, []);

  const total = useMemo(
    () => cart.reduce((a, b) => a + b.price * b.quantity, 0),
    [cart]
  );

  const toggleCartVisibility = () => setCartVisibility((state) => !state);

  const togglePaymentLinkVisibility = () =>
    setPaymentLinkVisibility((state) => !state);

  const checkoutCart = () => {
    setSubmitting(true);

    api('/api/shop', {
      body: { items: cart, shippingFee, deliveryAddress },
      method: 'POST',
    }).then((response) => {
      setSubmitting(false);

      if (response.errors) {
        Object.keys(response.errors).forEach((error) =>
          toast.error(response.errors[error].msg)
        );
      } else {
        toggleCartVisibility();
        setPaymentLink(response.data.paymentLink);
        togglePaymentLinkVisibility();
        setCart([]);
        localStorage.setItem(LPH_CART_KEY, JSON.stringify([]));
        toast.success('Posted items for purchase!');
      }
    });
  };

  const addToCart = (item) => {
    const findExistingItem = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    const newCart =
      findExistingItem !== -1
        ? [...cart].splice(findExistingItem, 1, item)
        : [...cart, item];

    setCart([...newCart]);
    localStorage.setItem(LPH_CART_KEY, JSON.stringify([...newCart]));
  };

  const removeFromCart = (id) => {
    const findExistingCartIndex = cart.findIndex((item) => item.id === id);

    const cloneCart = [...cart];

    cloneCart.splice(findExistingCartIndex, 1);

    setCart([...cloneCart]);
    localStorage.setItem(LPH_CART_KEY, JSON.stringify([...cloneCart]));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem(LPH_CART_KEY, JSON.stringify([]));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        showCart,
        showPaymentLink,
        shippingFee,
        deliveryAddress,
        isSubmitting,
        paymentLink,
        addToCart,
        setShippingFee,
        setDeliveryAddress,
        removeFromCart,
        clearCart,
        toggleCartVisibility,
        togglePaymentLinkVisibility,
        checkoutCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
