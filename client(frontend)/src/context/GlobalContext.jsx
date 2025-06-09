import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getIdToken, signOut } from 'firebase/auth';
import { auth } from '../../Utility/firebase';
import { useNavigate } from 'react-router-dom';
import API from '../components/api'; // Axios with token header

const GlobalContext = createContext();
export const useGlobal = () => useContext(GlobalContext);

export function GlobalProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

   const navigate = useNavigate();

  // Set Firebase token
  const setToken = async (firebaseUser) => {
    const token = await getIdToken(firebaseUser);
    localStorage.setItem('token', token);
  };

  // Watch auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await setToken(firebaseUser);
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
        });
        // await fetchOrders();
      } else {
        setUser(null);
        setCart([]);
        setOrders([]);
        localStorage.removeItem('token');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Cart
  const addToCart = (product, qty = 1) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      updateQty(product.id, exists.qty + qty);
    } else {
      setCart([...cart, { ...product, qty }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQty = (productId, qty) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, qty } : item
      )
    );
  };

  // Orders
  // const fetchOrders = async () => {
  //   try {
  //     const res = await API.get('/orders');
  //     setOrders(res.data);
  //   } catch (err) {
  //     console.error('Failed to fetch orders', err);
  //   }
  // };

  const placeOrder = async (address = 'New York') => {
    try {
      const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);
      const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      const res = await API.post('/orders', { items: cart, cartItemCount, cartTotal, address });
      setOrders((prev) => [...prev, res.data]);
      setCart([]);
    } catch (err) {
      console.error('Order failed', err);
    }
  };

  // Sign out
  const signOutUser = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Sign out error', err);
    }
  };

  // Totals
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <GlobalContext.Provider
      value={{
        user,
        cart,
        orders,
        setCart,
        loading,
        cartItemCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQty,
        placeOrder,
        signOutUser,
        setUser,
        // fetchOrders,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}



// import { createContext, useContext, useEffect, useState } from 'react'
// import API from '../components/api' // Axios instance with baseURL and auth
// import { onAuthStateChanged, getIdToken } from 'firebase/auth'
// import { auth } from '../../Utility/firebase' //firebase config file
// import { signOut } from 'firebase/auth';
// const GlobalContext = createContext()
// import { useNavigate } from 'react-router-dom';
// // const { signOutUser } = useGlobal();



// export const useGlobal = () => useContext(GlobalContext)

// export function GlobalProvider({ children }) {
//   const [user, setUser] = useState(null)
//   const [cart, setCart] = useState([])
//   const [wishlist, setWishlist] = useState([])
//   const [orders, setOrders] = useState([])
//   const [loading, setLoading] = useState(true)

//   // ✅ Set auth token in Axios on login

//   const setToken = async (firebaseUser) => {
//     const token = await getIdToken(firebaseUser)
//     localStorage.setItem('token', token)
//   }


//   // ✅ Track login state

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         await setToken(firebaseUser)
//         setUser({
//           uid: firebaseUser.uid,
//           email: firebaseUser.email,
//         })
//         await fetchCart()
//         await fetchWishlist()
//         await fetchOrders()
//       } else {
//         setUser(null)
//         setCart([])
//         setWishlist([])
//         setOrders([])
//         localStorage.removeItem('token')
//       }
//       setLoading(false)
//     })
//     return () => unsubscribe()
//   }, [])

//   // ✅ CART
//   const fetchCart = async () => {
//     try {
//       const res = await API.get('/cart')
//       setCart(res.data)
//     } catch (err) {
//       console.error('Cart fetch failed', err)
//     }
//   }

//   const addToCart = async (product, qty = 1) => {
//     try {
//       const res = await API.post('/cart', { product, qty })
//       setCart(res.data)
//     } catch (err) {
//       console.error('Add to cart failed', err)
//     }
//   }

//   const removeFromCart = async (productId) => {
//     try {
//       const res = await API.delete(`/cart/${productId}`)
//       setCart(res.data)
//     } catch (err) {
//       console.error('Remove from cart failed', err)
//     }
//   }

//   const updateQty = async (productId, qty) => {
//     await removeFromCart(productId)
//     await addToCart(cart.find((p) => p.id === productId), qty)
//   }

//   // ✅ WISHLIST
//   const fetchWishlist = async () => {
//     try {
//       const res = await API.get('/wishlist')
//       setWishlist(res.data)
//     } catch (err) {
//       console.error('Wishlist fetch failed', err)
//     }
//   }

//   const toggleWishlist = async (product) => {
//     try {
//       const res = await API.post('/wishlist', { product })
//       setWishlist(res.data)
//     } catch (err) {
//       console.error('Toggle wishlist failed', err)
//     }
//   }

//   // ✅ ORDERS

//   const fetchOrders = async () => {
//     try {
//       const res = await API.get('/orders')
//       setOrders(res.data)
//     } catch (err) {
//       console.error('Orders fetch failed', err)
//     }
//   }

//   const placeOrder = async (address = 'Newyork') => {
//     try {
//       const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);
//       const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
//       const res = await API.post('/orders', { items: cart, cartItemCount, cartTotal, address })
//       setOrders((prev) => [...prev, res.data])
//       setCart([])
//     } catch (err) {
//       console.error('Order placement failed', err)
//     }
//   }

//   const signOutUser = async () => {
//   try {
//     await signOut(auth);
//     localStorage.removeItem('token');
//     setUser(null); // clear user state
//     console.log('User signed out');
//   } catch (error) {
//     console.error('Error signing out:', error);
//   }
// };

//   // Calculate cart item count and total
//   const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);
//   const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

//   return (
//     <GlobalContext.Provider
//       value={{
//         user,
//         cart,
//         wishlist,
//         orders,
//         setCart,
//         cartItemCount,
//         cartTotal,
//         loading,
//         addToCart,
//         removeFromCart,
//         updateQty,
//         toggleWishlist,
//         placeOrder,
//         setUser,
//         signOutUser,
//         fetchCart,
//         fetchWishlist,
//         fetchOrders
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   )
// }
