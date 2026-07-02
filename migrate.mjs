import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

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

const servicesData = {
  hardware: [
    { name: "Display Replacement", desc: "Original and OEM quality display replacement with True Tone restoration.", details: "We use only premium quality replacement screens to ensure perfect color accuracy, touch responsiveness, and brightness. For Apple devices, we restore True Tone functionality. Your phone will look and feel brand new." },
    { name: "Battery Replacement", desc: "Restore your battery health to 100% with premium quality replacements.", details: "Experiencing rapid battery drain or unexpected shutdowns? We replace your old battery with a high-capacity, original-grade battery. We ensure 100% battery health recognition and safe charging protocols." },
    { name: "Dead Mobile / Motherboard", desc: "Advanced chip-level micro-soldering and IC replacements.", details: "If your phone is completely dead and won't turn on, our specialized technicians perform chip-level motherboard diagnostics and repairs, including power IC replacement and short-circuit removal." },
    { name: "Water Damage Recovery", desc: "Ultrasonic cleaning and complete liquid damage recovery.", details: "Dropped your phone in water? We disassemble the device completely, perform an ultrasonic chemical wash on the motherboard to remove corrosion, and test all components to bring your device back to life." },
    { name: "Charging Port Replacement", desc: "Fix loose connections, slow charging, or completely broken ports.", details: "We replace damaged charging flex cables and ports with genuine parts, ensuring fast charging capabilities and seamless data transfer to your computer are fully restored." },
    { name: "Speaker & Mic Repair", desc: "Crystal clear audio restoration for calls and media playback.", details: "If people can't hear you during calls or your media sounds distorted and low, we will clean or replace your earpiece, loudspeaker, and microphones for perfect audio clarity." },
    { name: "Camera Glass / Lens", desc: "Remove cracks and scratches for perfect photo clarity.", details: "A cracked camera glass ruins your photos and exposes the actual camera sensor to dust. We safely extract the broken glass and install a brand new sapphire-grade lens cover." },
    { name: "No Power Issue", desc: "Comprehensive diagnosis for devices that refuse to boot.", details: "We systematically check the battery, charging flex, power button flex, and primary power lines on the motherboard to identify and fix exactly what is stopping your device from turning on." },
    { name: "No Charging Issue", desc: "Fix motherboard-level charging faults and IC issues.", details: "If replacing the charging port and battery didn't fix the issue, the problem lies in the charging IC (like Tristar on iPhones) or OVP circuits. We can replace these microchips directly." },
    { name: "No Network Issue", desc: "Resolve 'No Service', 'Searching', and weak signal problems.", details: "We repair damaged antenna lines, baseband ICs, and network transceivers. We ensure your phone connects flawlessly to 4G/5G networks and GPS signals." },
    { name: "Wi-Fi & Bluetooth Issue", desc: "Fix greyed-out toggles and weak wireless connections.", details: "If your Wi-Fi toggle is greyed out or keeps dropping connection, we repair or replace the Wi-Fi/Bluetooth module on the motherboard to restore perfect wireless connectivity." },
    { name: "Auto Restart / Boot Loop", desc: "Fix phones stuck on the brand logo or constantly restarting.", details: "Boot loops can be caused by software corruption, faulty batteries, or motherboard issues. We perform advanced diagnostics to flash the software safely or repair the underlying hardware fault." },
    { name: "Hanging / Slow Performance", desc: "Deep cleaning and optimization to make your phone fast again.", details: "We analyze your device for thermal throttling, storage bottlenecks, and rogue applications. We perform complete system optimization to restore factory-level speed and responsiveness." }
  ],
  software: [
    { name: "Software Flash", desc: "Complete operating system reinstallation for a fresh start.", details: "We completely wipe the corrupted firmware and flash the latest official stock ROM for your specific device model. This fixes deep system bugs, viruses, and boot loops." },
    { name: "OS Update / Reinstallation", desc: "Safely upgrade to the latest Android or iOS version.", details: "Having trouble updating your phone over Wi-Fi? We manually download and securely install the latest official operating system updates to ensure you have the latest features and security patches." },
    { name: "FRP Lock Remove", desc: "Bypass Factory Reset Protection securely.", details: "Forgot your Google account details after a hard reset? We use professional authorized tools to safely bypass the Google FRP lock so you can use your device again." },
    { name: "Pattern / PIN Lock Remove", desc: "Unlock your device if you forgot your screen password.", details: "We can safely remove forgotten PINs, Patterns, and Passwords. (Note: Depending on the device model and security patch, this process may require wiping the user data)." },
    { name: "Data Backup & Transfer", desc: "Securely move all your data to a new device.", details: "Upgrading to a new phone? We offer complete, secure data migration including your photos, contacts, WhatsApp chats, applications, and documents, ensuring nothing is left behind." },
    { name: "Data Recovery", desc: "Recover lost photos, contacts, and files from damaged devices.", details: "Even if your screen is broken or your phone is dead, we can often temporarily repair the motherboard just enough to extract your precious photos, memories, and important documents." },
    { name: "Virus Removal", desc: "Clean malware, adware, and malicious apps.", details: "If your phone is showing pop-up ads on the home screen or apps are installing themselves, we perform a deep system clean to eradicate malware and secure your personal data." },
    { name: "Google Account Setup", desc: "Assistance with creating and securing a Google ID.", details: "We help you set up a new Google account, configure the Play Store, and ensure your contacts and photos are properly backing up to the cloud." },
    { name: "iCloud / Apple ID Setup", desc: "Proper configuration of Apple services for new iPhone users.", details: "We assist with creating a secure Apple ID, setting up Find My iPhone, configuring iCloud backups, and downloading your essential apps from the App Store." }
  ],
  accessories: [
    { name: "Tempered Glass & Covers", desc: "Premium edge-to-edge protection for your screen and phone.", details: "We stock ultra-durable 9H and 11D tempered glasses, privacy guards, and matte films. We also offer a huge variety of rugged, slim, and aesthetic back covers for all models." },
    { name: "Chargers & USB Cables", desc: "Fast charging adapters and durable braided cables.", details: "Don't ruin your battery with fake chargers. We sell genuine, brand-authorized fast chargers (20W, 33W, 65W+) and premium braided Type-C and Lightning cables." },
    { name: "Earphones / TWS", desc: "High-quality wired earphones and wireless Bluetooth earbuds.", details: "Experience immersive audio with our collection of premium wired earphones, neckbands, and True Wireless Stereo (TWS) earbuds with Active Noise Cancellation (ANC) features." },
    { name: "Smart Watch Sales", desc: "Latest smartwatches with fitness tracking and Bluetooth calling.", details: "Explore our collection of the latest smartwatches featuring AMOLED displays, heart rate monitoring, SpO2 tracking, multiple sports modes, and seamless smartphone integration." },
    { name: "Mobile Cleaning & Health Check", desc: "Professional exterior cleaning and diagnostic checkup.", details: "We use isopropyl alcohol and specialized brushes to clean out your charging port, speaker grills, and earpiece, followed by a complete hardware diagnostic test. Free of charge!" },
    { name: "Mobile Exchange", desc: "Trade in your old phone for the best market value.", details: "Bring in your old, working, or slightly damaged smartphone. We offer instant valuation and the best exchange price in the market towards a repair or accessory purchase." },
    { name: "Used Mobile Buy & Sell", desc: "Certified, pre-owned smartphones at unbeatable prices.", details: "We sell strictly quality-checked, second-hand smartphones. Every device undergoes a 30-point inspection and comes with our shop's testing warranty for complete peace of mind." }
  ]
};

const dummyReviews = [
  { name: 'Karthik', text: 'Display change pannen. Original part use pannanga. Romba neat and clean work!', rating: 5 },
  { name: 'Rajesh', text: 'Motherboard dead nu sonna phone a romba kammi selavula ready panni kuduthutanga. Best service in Srivilliputhur.', rating: 5 },
  { name: 'Priya', text: 'Quick and fast service. Just 1 hour la ennoda iPhone display mathi kuduthutanga. Trustworthy.', rating: 5 },
  { name: 'Muthu', text: 'Budget ketha maari first copy option-um sonnanga. Transparent service. Thanks!', rating: 4 },
  { name: 'Saravanan', text: 'Edge display glass change pakka-va pannanga. Yaarum ivalo clear a panna maattanga.', rating: 5 },
  { name: 'Dinesh', text: 'Water damage aan phone data full-a save panni eduthu thandhutanga. Life saver!', rating: 5 },
];

async function runMigration() {
  console.log("Starting migration...");
  
  // Migrate Services
  for (const [category, services] of Object.entries(servicesData)) {
    for (const service of services) {
      await addDoc(collection(db, 'services'), {
        ...service,
        category,
        createdAt: serverTimestamp()
      });
      console.log(`Added service: ${service.name}`);
    }
  }

  // Migrate Reviews
  for (const review of dummyReviews) {
    await addDoc(collection(db, 'reviews'), {
      ...review,
      createdAt: serverTimestamp()
    });
    console.log(`Added review from: ${review.name}`);
  }

  console.log("Migration complete!");
  process.exit(0);
}

runMigration().catch(console.error);
