import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDFVNWoFElQIwnpQf5NRgBpQmh_mR7Q27w',
    authDomain: 'prj3-371008.firebaseapp.com',
    projectId: 'prj3-371008',
    storageBucket: 'prj3-371008.appspot.com',
    messagingSenderId: '205258461086',
    appId: '1:205258461086:web:993e463c1cc422c6c3908f',
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebase);
