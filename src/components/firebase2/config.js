
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

const firebaseConfig={
        apiKey:process.env.REACT_APP_APIKEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId:process.env.REACT_APP_PROJECTID,
        storageBucket:process.env.REACT_APP_STORAGEBUCKET,
        messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID,
        appId:process.env.REACT_APP_APPID,
        measurementId:process.env.REACT_APP_MEASUREMENTID
   
}


const app = initializeApp(firebaseConfig);  
const analytics = getAnalytics(app);
  export const db = getFirestore(app);





