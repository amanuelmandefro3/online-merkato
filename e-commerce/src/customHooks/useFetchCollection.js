import { getDatabase, ref, onValue, orderByChild, query } from "firebase/database";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCollection = () => {
    setIsLoading(true);
    const db = getDatabase();
    const dbRef = ref(db, collectionName);
    const q = query(dbRef, orderByChild("createdAt"));

    try {
      const unsubscribe = onValue(q, (snapshot) => {
        const allData = [];
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          allData.push({ id: childSnapshot.key, ...childData });
        });
        setData(allData);
        setIsLoading(false);
      });

      // Cleanup function to unsubscribe from onValue when the component unmounts
      return () => unsubscribe && unsubscribe();
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = getCollection();
    
    // Return cleanup function
    return () => unsubscribe && unsubscribe();
  }, [collectionName]);

  return { data, isLoading };
};

export default useFetchCollection;
