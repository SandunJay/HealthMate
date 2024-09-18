import { Drug, Patient, Prescription } from "./types";

export const categoriesData = [
    {
        title: 'Ocean',
        image: require('../assets/images/icon.png'),
    },
    {
        title: 'Woods',
        image: require('../assets/images/icon.png'),
    },
    {
        title: 'Beach',
        image: require('../assets/images/icon.png'),
    },
    {
        title: 'Hill',
        image: require('../assets/images/icon.png'),
    },
    {
        title: 'Mountain',
        image: require('../assets/images/icon.png'),
    },
    {
        title: 'City',
        image: require('../assets/images/icon.png'),
    },
]

export const constSortCategoryData= ['All', 'Popular', 'Recommended', 'More'];

export const destinationData= [
    {
        id: 1,
        title: "Ofdsfjkkf",
        duration: '12',
        distance: 'fds',
        price: 2432,
        shortDescription:'fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf ',
        longDescription: 'fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf ',
        image: require('../assets/images/icon.png')
    },
    {
        id:2,
        title: "Ofdsfjkkf",
        duration: '12',
        distance: 'fds',
        price: 2432,
        shortDescription:'fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf ',
        longDescription: 'fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf ',
        image: require('../assets/images/icon.png')
    },
    {
        id:3,
        title: "Ofdsfjkkf",
        duration: '12',
        distance: 'fds',
        price: 2432,
        shortDescription:'fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf ',
        longDescription: 'fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf ',
        image: require('../assets/images/icon.png')
    },
    {
        id:4,
        title: "Ofdsfjkkf",
        duration: '12',
        distance: 'fds',
        price: 2432,
        shortDescription:'fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf ',
        longDescription: 'fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf fseffsdkfjsdf fhkjsdfh djfksfd fsdk fhdsfkhsduf ',
        image: require('../assets/images/icon.png')
    },
];


export const inventoryData = [
    {
        id: '1',
        name: 'Aspirin',
        category: 'Pain Relief',
        sku: 'BAT-125-GEN1',
        manufacturer: 'ABCD',
        quantity: 150,
        image: 'https://images.unsplash.com/photo-1590099544765-22fa95c04d02',
      },
      {
        id: '2',
        name: 'Paracetamol',
        category: 'Pain Relief',
        sku: 'BAT-125-GEN1',
        manufacturer: 'ABCD',
        quantity: 200,
        image: 'https://images.unsplash.com/photo-1597764691241-bb4d0cc7fdb8',
      },
    {
      id: '3',
      name: 'Amoxicillin',
      category: 'Antibiotic',
      sku: 'BAT-125-GEN1',
      manufacturer: 'ABCD',
      quantity: 120,
      image: 'https://www.pexels.com/photo/white-and-red-penicillin-pills-305479/',
    },
    {
      id: '4',
      name: 'Ibuprofen',
      category: 'Anti-inflammatory',
      sku: 'BAT-125-GEN1',
      manufacturer: 'ABCD',
      quantity: 180,
      image: 'https://www.pexels.com/photo/medicine-capsules-593451/',
    },
    {
      id: '5',
      name: 'Loratadine',
      category: 'Antihistamine',
      sku: 'BAT-125-GEN1',
      manufacturer: 'ABCD',
      quantity: 75,
      image: 'https://www.pexels.com/photo/capsules-in-blister-pack-593452/',
    },
    {
      id: '6',
      name: 'Cough Syrup',
      category: 'Cold & Flu',
      sku: 'BAT-125-GEN1',
      manufacturer: 'ABCD',
      quantity: 60,
      image: 'https://www.pexels.com/photo/orange-syrup-in-glass-bottle-4342218/',
    },
    {
      id: '7',
      name: 'Omeprazole',
      category: 'Gastrointestinal',
      manufacturer: 'ABCD',
      quantity: 95,
      image: 'https://www.pexels.com/photo/white-pills-on-a-table-1289823/',
    },
    {
      id: '8',
      name: 'Salbutamol Inhaler',
      category: 'Respiratory',
      quantity: 45,
      image: 'https://www.pexels.com/photo/close-up-photo-of-medication-208516/',
    },
    {
      id: '9',
      name: 'Atorvastatin',
      category: 'Cholesterol',
      quantity: 130,
      image: 'https://www.pexels.com/photo/white-medicine-pills-416512/',
    },
    {
      id: '10',
      name: 'Metformin',
      category: 'Diabetes',
      quantity: 170,
      image: 'https://www.pexels.com/photo/white-round-medicine-tablets-409828/',
    },
    {
      id: '11',
      name: 'Vitamin D',
      category: 'Supplement',
      quantity: 200,
      image: 'https://www.pexels.com/photo/vitamin-d3-capsules-4333725/',
    },
    {
      id: '12',
      name: 'Folic Acid',
      category: 'Supplement',
      quantity: 110,
      image: 'https://www.pexels.com/photo/pink-and-white-capsules-593453/',
    },
    {
      id: '13',
      name: 'Cetirizine',
      category: 'Antihistamine',
      quantity: 80,
      image: 'https://www.pexels.com/photo/medication-in-blister-pack-593453/',
    },
    {
      id: '14',
      name: 'Prednisone',
      category: 'Steroid',
      quantity: 65,
      image: 'https://www.pexels.com/photo/white-pills-on-table-3652086/',
    },
    {
      id: '15',
      name: 'Insulin',
      category: 'Diabetes',
      quantity: 50,
      image: 'https://www.pexels.com/photo/insulin-vial-and-syringe-4332171/',
    },
    {
      id: '16',
      name: 'Clopidogrel',
      category: 'Cardiovascular',
      quantity: 115,
      image: 'https://www.pexels.com/photo/round-pills-in-a-blister-pack-1438199/',
    },
    {
      id: '17',
      name: 'Warfarin',
      category: 'Blood Thinner',
      quantity: 90,
      image: 'https://www.pexels.com/photo/white-medicine-pills-1170986/',
    },
    {
      id: '18',
      name: 'Montelukast',
      category: 'Respiratory',
      quantity: 100,
      image: 'https://www.pexels.com/photo/pink-capsules-on-brown-wooden-surface-208525/',
    },
    {
      id: '19',
      name: 'Levothyroxine',
      category: 'Hormonal',
      quantity: 140,
      image: 'https://www.pexels.com/photo/white-capsule-pill-on-green-surface-1193996/',
    },
    {
      id: '20',
      name: 'Hydrochlorothiazide',
      category: 'Diuretic',
      quantity: 130,
      image: 'https://www.pexels.com/photo/white-and-blue-capsules-208519/',
    },
  ];
  

  export const records = [
    {
      id: '123',
      date: 'June 25, 2022, 10:00 PM - 03:00 PM',
      name: 'Alexa Johnson',
      diagnosis: 'Diabetes',
      rating: 4.8,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: '245',
      date: 'March 15, 2023, 11:00 AM - 05:00 PM',
      name: 'Bob Smith',
      diagnosis: 'Hypertension',
      rating: 4.5,
      image: 'https://randomuser.me/api/portraits/men/10.jpg',
    },
    ];
    
   export const prescriptiondatas = [
    {
      pid: '12446563',
      id: '123',
      name: 'Amoxicillin',
      dosage: '500mg',
      quantity: 21,
    },
    {
      pid: '12446564',
      id: '123',
      name: 'Metformin',
      dosage: '850mg',
      quantity: 14,
    },
    {
      pid: '12446565',
      id: '245',
      name: 'Lisinopril',
      dosage: '20mg',
      quantity: 30,
    },
    {
      pid: '12446566',
      id: '245',
      name: 'Amlodipine',
      dosage: '5mg',
      quantity: 28,
    },
    {
      pid: '124446565',
      id: '245',
      name: 'Lisinopril',
      dosage: '20mg',
      quantity: 30,
      },
      {
      pid: '124466',
      id: '245',
      name: 'Amlodipine',
      dosage: '5mg',
      quantity: 28,
      },
    ];

    export const bookings = [
      {
        id: '123',
        date: 'June 25, 2022, 10:00 PM - 03:00 PM',
        name: 'Alexa Johnson',
        diagnosis:'Diabetes',
        status: true,
        rating: 4.8,
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      {
        id: '245',
        date: 'June 25, 2022, 10:00 PM - 03:00 PM',
        name: 'John Wilson',
        diagnosis:'Chornic Kidney',
        status: false,
        rating: 4.8,
        image: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      {
        id: '678',
        date: 'June 22, 2022, 09:00 PM - 11:00 PM',
        name: 'Wade Warren',
        diagnosis:'Diabetes',
        status: true,
        rating: 4.2,
        image: 'https://randomuser.me/api/portraits/men/25.jpg',
      },
      {
        id: '9820147',
        date: 'June 25, 2022, 10:00 PM - 03:00 PM',
        name: 'Alexa Johnson',
        status: true,
        rating: 4.8,
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      {
        id: '5896795',
        date: 'June 25, 2022, 10:00 PM - 03:00 PM',
        name: 'John Wilson',
        status: true,
        rating: 4.8,
        image: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      {
        id: '2856344',
        date: 'June 22, 2022, 09:00 PM - 11:00 PM',
        name: 'Wade Warren',
        status: true,
        rating: 4.2,
        image: 'https://randomuser.me/api/portraits/men/25.jpg',
      },
      {
        id: '9820017',
        date: 'June 25, 2022, 10:00 PM - 03:00 PM',
        name: 'Alexa Johnson',
        status: false,
        rating: 4.8,
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      {
        id: '587895',
        date: 'June 25, 2022, 10:00 PM - 03:00 PM',
        name: 'John Wilson',
        status: false,
        rating: 4.8,
        image: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      {
        id: '287564',
        date: 'June 22, 2022, 09:00 PM - 11:00 PM',
        name: 'Wade Warren',
        status: true,
        rating: 4.2,
        image: 'https://randomuser.me/api/portraits/men/25.jpg',
      },
      {
        id: '8200147',
        date: 'June 25, 2022, 10:00 PM - 03:00 PM',
        name: 'Alexa Johnson',
        status: false,
        rating: 4.8,
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      {
        id: '58995',
        date: 'June 25, 2022, 10:00 PM - 03:00 PM',
        name: 'John Wilson',
        status: false,
        rating: 4.8,
        image: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      {
        id: '256344',
        date: 'June 22, 2022, 09:00 PM - 11:00 PM',
        name: 'Wade Warren',
        rating: 4.2,
        status: true,
        image: 'https://randomuser.me/api/portraits/men/25.jpg',
      },
    ];


export const patient: Patient[] = [
      { patientid: 'u001', username: 'jdoe', firstname: 'John', lastname: 'Doe', age: 30, residency: 'New York', mobile: '123-456-7890' },
      { patientid: 'u002', username: 'asmith', firstname: 'Alice', lastname: 'Smith', age: 25, residency: 'California', mobile: '234-567-8901' },
      { patientid: 'u003', username: 'bjohnson', firstname: 'Bob', lastname: 'Johnson', age: 40, residency: 'Texas', mobile: '345-678-9012' },
      { patientid: 'u004', username: 'cparker', firstname: 'Carol', lastname: 'Parker', age: 35, residency: 'Florida', mobile: '456-789-0123' },
      { patientid: 'u005', username: 'dclark', firstname: 'David', lastname: 'Clark', age: 50, residency: 'Nevada', mobile: '567-890-1234' },
      { patientid: 'u006', username: 'emartin', firstname: 'Emma', lastname: 'Martin', age: 29, residency: 'Oregon', mobile: '678-901-2345' },
      { patientid: 'u007', username: 'fjones', firstname: 'Frank', lastname: 'Jones', age: 33, residency: 'Arizona', mobile: '789-012-3456' },
      { patientid: 'u008', username: 'gwhite', firstname: 'Grace', lastname: 'White', age: 42, residency: 'Colorado', mobile: '890-123-4567' },
  ];

  
export const prescriptions: Prescription[] = [
    { id: 'p001', patientid: 'u001', name: 'Medication A', date: '2024-09-01', diagnosis: 'Condition X', duration: 30 },
    { id: 'p002', patientid: 'u001', name: 'Medication B', date: '2024-09-15', duration: 15 },
    { id: 'p003', patientid: 'u001', name: 'Medication C', date: '2024-09-20', duration: 20 },
    { id: 'p004', patientid: 'u001', name: 'Medication D', date: '2024-09-25', diagnosis: 'Condition Y', duration: 10 },
    { id: 'p005', patientid: 'u001', name: 'Medication E', date: '2024-09-30', duration: 25 },

    { id: 'p006', patientid: 'u002', name: 'Medication F', date: '2024-09-02', duration: 7 },
    { id: 'p007', patientid: 'u002', name: 'Medication G', date: '2024-09-10', diagnosis: 'Condition Z', duration: 14 },
    { id: 'p008', patientid: 'u002', name: 'Medication H', date: '2024-09-18', duration: 21 },
    { id: 'p009', patientid: 'u002', name: 'Medication I', date: '2024-09-22', duration: 30 },
    { id: 'p010', patientid: 'u002', name: 'Medication J', date: '2024-09-28', duration: 5 },

    // Repeat similarly for other users
];


export const drugs: Drug[] = [
  { id: 'd001', pid: 'p001', name: 'Drug A', dosage: '10mg', quantity: 30 },
  { id: 'd002', pid: 'p001', name: 'Drug B', dosage: '20mg', quantity: 15 },
  { id: 'd003', pid: 'p002', name: 'Drug C', dosage: '5mg', quantity: 30 },
  { id: 'd004', pid: 'p002', name: 'Drug D', dosage: '25mg', quantity: 20 },
  { id: 'd005', pid: 'p003', name: 'Drug E', dosage: '15mg', quantity: 25 },
  { id: 'd006', pid: 'p003', name: 'Drug F', dosage: '50mg', quantity: 10 },
  { id: 'd007', pid: 'p004', name: 'Drug G', dosage: '100mg', quantity: 5 },
  { id: 'd008', pid: 'p004', name: 'Drug H', dosage: '200mg', quantity: 15 },
  { id: 'd009', pid: 'p005', name: 'Drug I', dosage: '75mg', quantity: 20 },
  { id: 'd010', pid: 'p006', name: 'Drug J', dosage: '25mg', quantity: 25 },
  { id: 'd011', pid: 'p006', name: 'Drug I', dosage: '75mg', quantity: 20 },
  { id: 'd012', pid: 'p006', name: 'Drug J', dosage: '25mg', quantity: 25 },
  { id: 'd013', pid: 'p006', name: 'Drug I', dosage: '75mg', quantity: 20 },
  { id: 'd014', pid: 'p006', name: 'Drug J', dosage: '25mg', quantity: 25 },

  // Repeat similarly for other prescriptions
];
