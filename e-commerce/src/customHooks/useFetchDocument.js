import { ref, get } from "firebase/database";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

const useFetchDocument = (collectionName, documentID) => {
  const [document, setDocument] = useState(null);

  const getDocument = async () => {
    const docRef = ref(db, `${collectionName}/${documentID}`);
    try {
      const snapshot = await get(docRef);
      if (snapshot.exists()) {
        const obj = {
          id: documentID,
          ...snapshot.val(),
        };
        setDocument(obj);
      } else {
        toast.error("Document not found");
      }
    } catch (error) {
      toast.error("Error fetching document");
      console.error("Error fetching document: ", error);
    }
  };

  useEffect(() => {
    getDocument();
  }, [collectionName, documentID]);

  return { document };
};

export default useFetchDocument;
