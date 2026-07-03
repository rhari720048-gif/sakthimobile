import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

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

// Highly reliable real photo fetching using Flickr with specific Android keywords
const i = {
  display: "https://loremflickr.com/600/400/android,screen,broken?lock=1",
  touch: "https://loremflickr.com/600/400/android,touchscreen?lock=2",
  amoled: "https://loremflickr.com/600/400/amoled,display?lock=3",
  backglass: "https://loremflickr.com/600/400/smartphone,back,glass?lock=4",
  battery: "https://loremflickr.com/600/400/android,battery?lock=5",
  charging: "https://loremflickr.com/600/400/usb-c,port?lock=6",
  speaker: "https://loremflickr.com/600/400/smartphone,speaker?lock=7",
  earpiece: "https://loremflickr.com/600/400/smartphone,earpiece?lock=8",
  mic: "https://loremflickr.com/600/400/smartphone,microphone?lock=9",
  camera: "https://loremflickr.com/600/400/smartphone,camera,lens?lock=10",
  buttons: "https://loremflickr.com/600/400/smartphone,buttons?lock=11",
  fingerprint: "https://loremflickr.com/600/400/fingerprint,sensor,android?lock=12",
  faceid: "https://loremflickr.com/600/400/facial,recognition,android?lock=13",
  sim: "https://loremflickr.com/600/400/simcard,tray?lock=14",
  motor: "https://loremflickr.com/600/400/vibration,motor?lock=15",
  motherboard: "https://loremflickr.com/600/400/android,motherboard?lock=16",
  dead: "https://loremflickr.com/600/400/dead,smartphone?lock=17",
  water: "https://loremflickr.com/600/400/wet,smartphone?lock=18",
  short: "https://loremflickr.com/600/400/circuit,board,repair?lock=19",
  network: "https://loremflickr.com/600/400/no,signal,smartphone?lock=20",
  wifi: "https://loremflickr.com/600/400/wifi,chip?lock=21",
  restart: "https://loremflickr.com/600/400/android,bootloop?lock=22",
  slow: "https://loremflickr.com/600/400/smartphone,lag?lock=23",
  software: "https://loremflickr.com/600/400/android,code?lock=24",
  update: "https://loremflickr.com/600/400/android,update?lock=25",
  lock: "https://loremflickr.com/600/400/android,pattern,lock?lock=26",
  data: "https://loremflickr.com/600/400/data,transfer,smartphone?lock=27",
  virus: "https://loremflickr.com/600/400/malware,android?lock=28",
  google: "https://loremflickr.com/600/400/google,account,android?lock=29",
  apple: "https://loremflickr.com/600/400/iphone,setup?lock=30",
  tempered: "https://loremflickr.com/600/400/tempered,glass,android?lock=31",
  cover: "https://loremflickr.com/600/400/smartphone,case?lock=32",
  charger: "https://loremflickr.com/600/400/android,charger?lock=33",
  cable: "https://loremflickr.com/600/400/usb-c,cable?lock=34",
  earphones: "https://loremflickr.com/600/400/earbuds,tws?lock=35",
  watch: "https://loremflickr.com/600/400/smartwatch?lock=36",
  clean: "https://loremflickr.com/600/400/cleaning,smartphone?lock=37",
  health: "https://loremflickr.com/600/400/diagnostics,smartphone?lock=38",
  used: "https://loremflickr.com/600/400/used,smartphone?lock=39"
};

const newServices = [
  // Mobile Service (hardware)
  { category: "hardware", name: "Display Replacement", desc: "Original quality display replacement.", details: "Premium display replacement with perfect touch and color.", imageUrl: i.display },
  { category: "hardware", name: "Touch Screen Replacement", desc: "Replace broken touch digitizer.", details: "Fix unresponsive touches and ghost touches.", imageUrl: i.touch },
  { category: "hardware", name: "LCD / OLED Display Change", desc: "High-grade OLED and LCD changes.", details: "Expert installation of AMOLED and LCD screens.", imageUrl: i.amoled },
  { category: "hardware", name: "Back Glass Replacement", desc: "Restore the rear glass of your phone.", details: "Laser removal and perfect fit back glass replacement.", imageUrl: i.backglass },
  { category: "hardware", name: "Battery Replacement", desc: "Restore your battery health.", details: "High-capacity batteries with warranty.", imageUrl: i.battery },
  { category: "hardware", name: "Charging Pin Replacement", desc: "Fix charging issues immediately.", details: "Replace loose or broken charging ports.", imageUrl: i.charging },
  { category: "hardware", name: "Speaker Replacement", desc: "Loud and clear audio restored.", details: "Fix low volume or distorted loudspeaker issues.", imageUrl: i.speaker },
  { category: "hardware", name: "Earpiece Replacement", desc: "Hear your calls clearly again.", details: "Clean or replace blocked call speakers.", imageUrl: i.earpiece },
  { category: "hardware", name: "Microphone Replacement", desc: "Ensure others hear you clearly.", details: "Fix muffled or no audio issues during calls.", imageUrl: i.mic },
  { category: "hardware", name: "Ringer / Buzzer Replacement", desc: "Don't miss calls anymore.", details: "Replace faulty ringers and notification speakers.", imageUrl: i.speaker },
  { category: "hardware", name: "Camera Replacement (Front & Rear)", desc: "Fix blurry or non-working cameras.", details: "Original camera modules for crisp photography.", imageUrl: i.camera },
  { category: "hardware", name: "Camera Glass Replacement", desc: "Remove scratches from the lens.", details: "Replace cracked or scratched camera glass.", imageUrl: i.camera },
  { category: "hardware", name: "Power Button / Volume Button Repair", desc: "Restore clicky buttons.", details: "Fix stuck or non-responsive physical buttons.", imageUrl: i.buttons },
  { category: "hardware", name: "Fingerprint Sensor Repair", desc: "Secure your phone again.", details: "Fix broken fingerprint or home button flex cables.", imageUrl: i.fingerprint },
  { category: "hardware", name: "Face ID Diagnosis & Repair", desc: "Advanced Face ID repair.", details: "Specialized micro-soldering to restore Face ID.", imageUrl: i.faceid },
  { category: "hardware", name: "SIM Slot Repair", desc: "Fix 'No SIM' errors.", details: "Repair bent pins and damaged SIM trays.", imageUrl: i.sim },
  { category: "hardware", name: "Memory Card Slot Repair", desc: "Restore SD card functionality.", details: "Fix damaged memory card readers.", imageUrl: i.sim },
  { category: "hardware", name: "Vibration Motor Replacement", desc: "Restore haptic feedback.", details: "Fix weak or noisy vibration motors.", imageUrl: i.motor },

  // Motherboard Services
  { category: "hardware", name: "IC Level Repair", desc: "Advanced chip replacement.", details: "Expert micro-soldering for Power IC, Network IC, etc.", imageUrl: i.motherboard },
  { category: "hardware", name: "Dead Phone Repair", desc: "Bring your dead phone back to life.", details: "Deep diagnostics and repair of completely dead devices.", imageUrl: i.dead },
  { category: "hardware", name: "Water Damage Service", desc: "Liquid damage recovery.", details: "Ultrasonic cleaning and short circuit removal.", imageUrl: i.water },
  { category: "hardware", name: "Short Circuit Repair", desc: "Remove motherboard shorts.", details: "Thermal camera diagnostics to find and remove short circuits.", imageUrl: i.short },
  { category: "hardware", name: "No Display Issue", desc: "Fix blank screen issues.", details: "Repair display light IC and graphics circuits.", imageUrl: i.motherboard },
  { category: "hardware", name: "No Charging Issue", desc: "Advanced charging repairs.", details: "Fix charging IC and OVP issues on the motherboard.", imageUrl: i.motherboard },
  { category: "hardware", name: "No Network Issue", desc: "Fix 'No Service' errors.", details: "Baseband and transceiver IC repair.", imageUrl: i.network },
  { category: "hardware", name: "Wi-Fi Issue", desc: "Restore wireless connectivity.", details: "Fix greyed out Wi-Fi toggles and weak signals.", imageUrl: i.wifi },
  { category: "hardware", name: "Bluetooth Issue", desc: "Fix pairing problems.", details: "Repair Bluetooth IC issues.", imageUrl: i.network },
  { category: "hardware", name: "Auto Restart / Boot Loop Fix", desc: "Stop endless restarting.", details: "Diagnose and fix hardware causing boot loops.", imageUrl: i.restart },
  { category: "hardware", name: "Hanging / Slow Performance Fix", desc: "Speed up your device.", details: "Hardware thermal management and chip-level optimization.", imageUrl: i.slow },

  // Software Services
  { category: "software", name: "Software Flash", desc: "Reinstall operating system.", details: "Complete wipe and flash of stock firmware.", imageUrl: i.software },
  { category: "software", name: "OS Update / Reinstallation", desc: "Upgrade to latest version.", details: "Safe installation of the latest iOS or Android version.", imageUrl: i.update },
  { category: "software", name: "FRP Lock Remove", desc: "Bypass Google Account lock.", details: "Authorized FRP unlock service.", imageUrl: i.lock },
  { category: "software", name: "Pattern / PIN Lock Remove", desc: "Unlock forgotten passwords.", details: "Remove screen locks.", imageUrl: i.lock },
  { category: "software", name: "Data Backup", desc: "Secure your data.", details: "Safe backup of your photos, contacts, and files.", imageUrl: i.data },
  { category: "software", name: "Data Transfer", desc: "Move to a new phone easily.", details: "Complete transfer from old phone to new phone.", imageUrl: i.data },
  { category: "software", name: "Data Recovery", desc: "Recover lost files.", details: "Extraction of data from dead or broken devices.", imageUrl: i.data },
  { category: "software", name: "Virus Removal", desc: "Clean your phone.", details: "Remove malware, adware, and malicious apps.", imageUrl: i.virus },
  { category: "software", name: "Google Account Setup", desc: "Get started with Android.", details: "Create and secure your Google account.", imageUrl: i.google },
  { category: "software", name: "iCloud / Apple ID Setup", desc: "Get started with iPhone.", details: "Setup your Apple ID securely.", imageUrl: i.apple }
];

const newAccessories = [
  { icon: 'Smartphone', name: "Tempered Glass", desc: "Premium screen protection.", price: "199", imageUrl: i.tempered },
  { icon: 'Smartphone', name: "Mobile Covers", desc: "Stylish and rugged cases.", price: "299", imageUrl: i.cover },
  { icon: 'Battery', name: "Chargers", desc: "Fast and safe adapters.", price: "499", imageUrl: i.charger },
  { icon: 'Cable', name: "USB Cables", desc: "Durable braided cables.", price: "249", imageUrl: i.cable },
  { icon: 'Headphones', name: "Earphones / TWS", desc: "Immersive audio experience.", price: "999", imageUrl: i.earphones },
  { icon: 'ShoppingBag', name: "Smart Watch Sales", desc: "Latest wearable tech.", price: "1999", imageUrl: i.watch },
  { icon: 'ShoppingBag', name: "Mobile Cleaning", desc: "Keep your phone pristine.", price: "99", imageUrl: i.clean },
  { icon: 'ShoppingBag', name: "Mobile Health Check", desc: "Complete diagnostic test.", price: "Free", imageUrl: i.health },
  { icon: 'ShoppingBag', name: "Mobile Exchange", desc: "Upgrade your phone.", price: "", imageUrl: i.used },
  { icon: 'ShoppingBag', name: "Used Mobile Buy & Sell", desc: "Certified pre-owned devices.", price: "", imageUrl: i.used }
];

async function runUpdate() {
  console.log("Starting database update with reliable Flickr images...");

  console.log("Clearing existing services...");
  const servicesSnapshot = await getDocs(collection(db, 'services'));
  for (const docSnap of servicesSnapshot.docs) {
    await deleteDoc(doc(db, 'services', docSnap.id));
  }

  console.log("Clearing existing accessories...");
  const accessoriesSnapshot = await getDocs(collection(db, 'accessories'));
  for (const docSnap of accessoriesSnapshot.docs) {
    await deleteDoc(doc(db, 'accessories', docSnap.id));
  }

  console.log("Adding new services...");
  for (const service of newServices) {
    await addDoc(collection(db, 'services'), {
      ...service,
      createdAt: serverTimestamp()
    });
  }

  console.log("Adding accessories...");
  for (const acc of newAccessories) {
    await addDoc(collection(db, 'accessories'), {
      ...acc,
      createdAt: serverTimestamp()
    });
    
    await addDoc(collection(db, 'services'), {
      category: 'accessories',
      name: acc.name,
      desc: acc.desc,
      details: acc.desc,
      imageUrl: acc.imageUrl,
      createdAt: serverTimestamp()
    });
  }

  console.log("Database update complete!");
  process.exit(0);
}

runUpdate().catch(console.error);
