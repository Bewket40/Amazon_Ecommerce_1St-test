

//  Firestore Functions

import { db } from '../Utility/firebase';
import { collection, addDoc, getDocs, query, where, doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const fetchProducts = async () => {
const querySnapshot = await getDocs(collection(db, 'products'));
return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const saveOrder = async (userId, items, totalAmount) => {
await addDoc(collection(db, 'orders'), {
    userId,
    items,
    totalAmount,
    createdAt: serverTimestamp(),
});
};
