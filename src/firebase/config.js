import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9xweoHhKzcHX8_RCuipzxyfC_hSXV6ic",
  authDomain: "admin-page-daladan.firebaseapp.com",
  projectId: "admin-page-daladan",
  storageBucket: "admin-page-daladan.appspot.com",
  messagingSenderId: "988564701972",
  appId: "1:988564701972:web:87dfe466ad5ecdafe07801",
  measurementId: "G-PQ8VS9MXWY",
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)