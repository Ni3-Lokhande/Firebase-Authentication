

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDp4Ij6GGsUkuFuMwYfw_-ueNnGCsWUIZ0",
  authDomain: "task-1-5130b.firebaseapp.com",
  projectId: "task-1-5130b",
  storageBucket: "task-1-5130b.appspot.com",
  messagingSenderId: "23656669711",
  appId: "1:23656669711:web:4edce3c22db02e9886b97a"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);