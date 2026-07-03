import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDng5P4M4_q8RCWqFRcyQDW0cE3vYOpt8w",
  authDomain: "sakthi-mobiles-27d6f.firebaseapp.com",
  projectId: "sakthi-mobiles-27d6f",
  storageBucket: "sakthi-mobiles-27d6f.firebasestorage.app",
  messagingSenderId: "15519654940",
  appId: "1:15519654940:web:9899753d1abd3f206e6bd9",
  measurementId: "G-PBSYHXPWT7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearImages() {
  console.log("Removing images from services...");
  const servicesSnapshot = await getDocs(collection(db, 'services'));
  for (const docSnap of servicesSnapshot.docs) {
    await updateDoc(doc(db, 'services', docSnap.id), {
      imageUrl: ""
    });
  }

  console.log("Removing images from accessories...");
  const accessoriesSnapshot = await getDocs(collection(db, 'accessories'));
  for (const docSnap of accessoriesSnapshot.docs) {
    await updateDoc(doc(db, 'accessories', docSnap.id), {
      imageUrl: ""
    });
  }

  console.log("All images removed!");
  process.exit(0);
}

clearImages().catch(console.error);
