import Firebase from "../Firebase";
import { getFirestore, collection, getDoc, getDocs } from "firebase/firestore/lite";

const db = getFirestore(Firebase);



export const restaurantsInfo = async () => {
    const dataCollection = collection(db, 'data');
    const mapData = await getDocs(dataCollection);
    const restaurants = mapData.docs.map(doc => {
        return doc.data().restaurants
    })
    return restaurants;
}