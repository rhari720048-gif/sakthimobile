import { db } from '../firebase';
import { doc, updateDoc, increment, setDoc, getDoc } from 'firebase/firestore';

export const trackWhatsAppClick = async () => {
  try {
    const analyticsRef = doc(db, 'analytics', 'whatsapp');
    const docSnap = await getDoc(analyticsRef);
    
    if (!docSnap.exists()) {
      await setDoc(analyticsRef, { clickCount: 1 });
    } else {
      await updateDoc(analyticsRef, {
        clickCount: increment(1)
      });
    }
  } catch (error) {
    console.error("Error tracking whatsapp click:", error);
  }
};
