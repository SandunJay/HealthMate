import { Drug, Patient, Prescription } from "./types";

export const categoriesData = [
    {
        title: 'Doctors',
        image: require('../assets/images/phamacard/img7.jpg')
    },
    {
        title: 'Drugs',
        image: require('../assets/images/phamacard/img2.png')
    },
    {
        title: 'Equipment',
        image: require('../assets/images/phamacard/img10.jpg')
    },
    {
        title: 'Nurses',
        image: require('../assets/images/phamacard/img8.jpg')
    },
    {
        title: 'records',
        image: require('../assets/images/phamacard/img5.jpg')
    },
    {
        title: 'statistics',
        image: require('../assets/images/phamacard/img1.jpg')
    },
]

export const constSortCategoryData= ['All', 'Popular', 'Recommended', 'More'];

export const cardData = [
  {
    id: 1,
    title: "AI Technology Enhances Breast Cancer Detection",
    category: "AI in Healthcare",
    shortDescription: "A new AI tool enhances early detection of breast cancer, helping radiologists identify early-stage cancers more accurately, with the potential to save thousands of lives annually.",
    longDescription: "The rise of artificial intelligence in healthcare has led to a new AI-driven diagnostic tool that significantly enhances the early detection of breast cancer. This tool can analyze mammograms more quickly and accurately than conventional methods, identifying small abnormalities that might go unnoticed by the human eye. In clinical trials, the AI system has demonstrated its ability to reduce false positives and negatives, ultimately allowing healthcare providers to offer more timely and accurate diagnoses. As breast cancer is one of the leading causes of death in women worldwide, the implementation of this technology is expected to save thousands of lives by detecting tumors in their early stages, when treatment is most effective. Beyond breast cancer, this AI model holds promise for use in other forms of cancer detection, transforming the landscape of radiology and preventative care.",
    image:  require('../assets/images/phamacard/img9.jpg')
  },
  {
    id: 2,
    title: "Telemedicine Gains Popularity Amid Pandemic",
    category: "Telemedicine",
    shortDescription: "Telemedicine has reshaped healthcare by making remote consultations accessible during the pandemic, and it's likely to remain a significant healthcare trend.",
    longDescription: "The COVID-19 pandemic has drastically changed the way healthcare is delivered, with telemedicine becoming a crucial service for patients and providers alike. With lockdowns, social distancing, and overwhelmed healthcare systems, patients turned to telemedicine for consultations, check-ups, and even diagnoses. This shift allowed doctors to provide care to individuals without the need for in-person visits, which was especially vital for those with chronic illnesses and patients in rural areas. The convenience of telemedicine has been universally acknowledged, leading to its widespread adoption even post-pandemic. Analysts predict that telemedicine will continue to grow, as both healthcare providers and patients have found the remote consultation model to be effective, safe, and efficient. Insurance companies have also started incorporating telemedicine services into their policies, ensuring that this innovative model will be part of mainstream healthcare for years to come.",
    image: require('../assets/images/phamacard/img5.jpg')
  },
  {
    id: 3,
    title: "Gene Therapy Breakthrough Cures Rare Disease",
    category: "Medical Innovations",
    shortDescription: "Gene therapy has cured a rare genetic disorder in a clinical trial, marking a major milestone in treating hereditary diseases through genetic modifications.",
    longDescription: "A groundbreaking clinical trial has successfully demonstrated the power of gene therapy in curing a rare and previously untreatable genetic disorder. Researchers targeted the faulty gene responsible for the disorder and replaced it with a functioning version, effectively reversing the disease's effects. This revolutionary technique, known as gene therapy, involves altering a patient's DNA to treat or prevent disease, and it represents a significant leap forward in medical science. The trial's success provides hope to those suffering from other hereditary diseases, as similar approaches could be applied to a wide range of conditions. Although gene therapy is still in its infancy, the results from this trial indicate that we are on the brink of a new era in personalized medicine, where treatments are tailored to an individual's genetic makeup, offering cures for diseases that were once considered untreatable.",
    image:  require('../assets/images/phamacard/img6.png')
  },
  {
    id: 4,
    title: "Wearable Tech Revolutionizes Heart Health Monitoring",
    category: "Health Tech",
    shortDescription: "New wearable tech allows real-time heart health monitoring, helping patients and doctors track conditions like arrhythmias and provide better-informed care.",
    longDescription: "The latest advancements in wearable technology are transforming how individuals monitor their heart health. Devices like smartwatches and fitness trackers now come equipped with sophisticated sensors that track heart rate, detect irregularities such as arrhythmias, and even measure blood oxygen levels. This data is not only valuable for personal health management but can also be shared with healthcare providers in real time, allowing for more accurate diagnoses and timely interventions. For patients with pre-existing heart conditions, these wearables provide peace of mind by offering continuous monitoring and early detection of potential issues. Additionally, wearable technology is helping to bridge the gap between doctor visits, providing a constant stream of health data that can inform treatment plans and prevent emergencies. As wearable devices become more advanced, they are expected to play an even greater role in preventive healthcare.",
    image:  require('../assets/images/phamacard/img7.jpg')
  },
  {
    id: 5,
    title: "New COVID-19 Booster Shots Recommended",
    category: "COVID-19 Updates",
    shortDescription: "As new COVID-19 variants spread, booster shots are recommended to strengthen immunity and reduce the risk of severe illness and hospitalization.",
    longDescription: "Health authorities are once again urging the public to receive booster shots in the fight against COVID-19, particularly as new variants of the virus continue to emerge. These booster shots are designed to provide enhanced protection against newer strains, which have shown the ability to partially evade immunity from earlier vaccines. By boosting the immune response, individuals can reduce their chances of severe illness, hospitalization, or death, especially those in high-risk groups such as the elderly and immunocompromised. While vaccination rates have remained steady, booster shots are a critical component of the ongoing battle against COVID-19. Experts emphasize that staying up to date with vaccines is the best way to protect yourself and others as we continue to navigate this pandemic and its ever-evolving threats.",
    image:  require('../assets/images/phamacard/img10.jpg')
  },
  {
    id: 6,
    title: "Robotic Surgery Advancements Make Complex Procedures Safer",
    category: "Surgical Technology",
    shortDescription: "Robotic surgery is making complex procedures safer and more efficient, with reduced recovery times and improved outcomes for patients worldwide.",
    longDescription: "Recent advancements in robotic surgery are revolutionizing the field of healthcare by enabling surgeons to perform complex procedures with unprecedented precision and control. These robotic systems, often controlled remotely, allow for smaller incisions, less blood loss, and shorter recovery times compared to traditional surgical methods. Patients who undergo robotic surgery often experience reduced pain and faster healing, leading to better overall outcomes. Furthermore, robotic technology allows surgeons to operate in areas that would otherwise be difficult to reach, making it possible to perform intricate surgeries with minimal risk. As these technologies continue to evolve, they are expected to become the standard in many types of surgeries, from cardiac procedures to cancer treatments, transforming the way we approach surgery in the modern age.",
    image:  require('../assets/images/phamacard/img3.jpg')
  },
  {
    id: 7,
    title: "Mental Health Apps Surge in Popularity",
    category: "Mental Health",
    shortDescription: "Mental health apps are becoming a popular tool for individuals seeking to manage stress, anxiety, and depression, offering accessible support and resources.",
    longDescription: "The use of mental health apps has surged in recent years, providing individuals with tools to manage their mental well-being in a convenient and accessible way. These apps offer resources for stress relief, anxiety management, and depression treatment, often including features such as guided meditation, mood tracking, and access to licensed therapists. The rise in popularity of these apps has been accelerated by the global pandemic, as more people seek digital alternatives to traditional therapy due to restrictions and increased demand for mental health services. For many, mental health apps serve as a valuable supplement to in-person therapy or as a standalone resource for managing their mental well-being. As the stigma around mental health continues to decrease, the demand for these digital solutions is expected to grow, providing individuals with the tools they need to take control of their mental health anytime, anywhere.",
    image:  require('../assets/images/phamacard/img11.jpg')
  },
  {
    id: 8,
    title: "Global Vaccine Rollout Faces New Challenges",
    category: "Global Health",
    shortDescription: "The global vaccine rollout faces challenges as logistical issues, vaccine hesitancy, and new variants complicate efforts to achieve widespread immunity.",
    longDescription: "The global effort to roll out COVID-19 vaccines has faced numerous challenges, from logistical hurdles to vaccine hesitancy. In many parts of the world, vaccines have become widely available, but distribution remains uneven, particularly in low-income countries where infrastructure and resources are limited. Additionally, new variants of the virus have raised concerns about the efficacy of existing vaccines, prompting discussions about the need for updated formulas. Vaccine hesitancy has also played a significant role in slowing down the progress of global immunization efforts, with misinformation and distrust in healthcare systems contributing to lower vaccination rates in some regions. Despite these challenges, health officials are pushing forward with vaccination campaigns, emphasizing the importance of global cooperation to overcome the barriers and achieve widespread immunity.",
    image:  require('../assets/images/phamacard/img2.png')
  },
  {
    id: 9,
    title: "Healthcare Robots Assist in Elderly Care",
    category: "Assistive Technology",
    shortDescription: "Robots are being used to assist in elderly care, helping with daily tasks, monitoring health, and providing companionship in care facilities.",
    longDescription: "In response to the growing demand for elderly care, healthcare robots are now being deployed in care facilities to assist with daily tasks and monitor the health of senior citizens. These robots, designed with user-friendly interfaces, help individuals with activities such as medication reminders, mobility assistance, and vital sign monitoring. In addition to providing practical support, robots are also offering companionship to elderly individuals who may feel isolated, especially in light of restrictions on family visits due to the COVID-19 pandemic. Caregivers and healthcare providers have found that these robots can help improve the quality of life for elderly patients, allowing for a more personalized approach to care. As technology continues to evolve, the role of robots in healthcare is expected to expand, addressing the needs of an aging population and improving care efficiency.",
    image:  require('../assets/images/phamacard/img8.jpg')
  },
  {
    id: 10,
    title: "3D Printing in Medicine: The Future of Custom Healthcare",
    category: "Medical Technology",
    shortDescription: "3D printing is revolutionizing medicine, allowing for custom-made prosthetics, implants, and even organ scaffolds to be created on demand.",
    longDescription: "The advent of 3D printing technology is revolutionizing the field of medicine by allowing for the creation of custom-made medical devices, implants, and prosthetics. This technology enables the production of items that are perfectly tailored to the needs of individual patients, improving outcomes and enhancing comfort. Beyond prosthetics, 3D printing is also being used to create organ scaffolds, offering the potential for organ regeneration and transplants in the future. Surgeons are already using 3D-printed models to plan complex surgeries, allowing them to practice on patient-specific replicas before entering the operating room. As the technology continues to advance, the cost of 3D printing medical devices is expected to decrease, making it more accessible to healthcare providers worldwide. This innovation is poised to transform personalized medicine and offer new solutions for patients with unique medical needs.",
    image:  require('../assets/images/phamacard/img4.jpg')
  }
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
