// src/App.tsx
import { useEffect, useState } from "react";
import { db } from "./main/utils/firebaseConfig";
import {
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

interface DataItems {
  born: string;
  first: string;
  last: string;
  middle: string;
  id: string;
}

function App() {
  const [data, setData] = useState<DataItems[]>([]);
  const enabledGetUsers = false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userData: DataItems[] = querySnapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => {
            const docData = doc.data() as DataItems;
            return { ...docData, id: doc.id };
          }
        );
        setData(userData);
      } catch (error) {
        console.log("GET USER ERROR: ", error);
      }
    };
    if (enabledGetUsers) {
      fetchData(); // Ensure fetchData is used
    }
  }, []);

  return (
    <div>
      <h1>Firebase Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
