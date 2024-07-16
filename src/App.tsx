// src/App.jsx
import React, { useEffect, useState } from "react";
import { db } from "./main/utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface DataItems {
  born: string;
  first: string;
  last: string;
  middle: string;
  id: string;
}

function App() {
  const [data, setData] = useState<DataItems[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));

        const dataArray = querySnapshot.docs.map((doc) => {
          const docData = doc.data() as DataItems;
          return { ...docData, id: doc.id };
        });

        setData(dataArray);
      } catch (error) {
        console.log("GET USER ERROR: ", error);
      }
    };
    // fetchData();
  }, []);

  return (
    <div>
      <h1>Firebase Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
