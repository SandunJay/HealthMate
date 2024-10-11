export type InventoryItem = {
    "$id": string;
    name: string;
    category: string;
    sku: string,
    manufacturer:string,
    quantity: number;
    expiration: string;
    description: string;
  };

  
export type recordType = {
  drugs: Array<{ 
    $id: string; 
    inventoryDetails?: { name: string }; // Assuming this structure based on your usage
    dosage: string; 
    duration: string; 
  }>;
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  patientid: string; // Include this if it's part of your fetched data
  diagnosis: string; // Include this if it's part of your fetched data
  date: string; // Include this if it's part of your fetched data
};
  
  export type PrescriptionType = {
    pid: string;
    name: string;
    dosage: string;
    quantity: number;
  };

  export type bookingType = {
    id: string;
    name: string;
    date: string;
    diagnosis?: string,
    rating:number,
    image: string;
  };


  // New dummy data
  export type Patient = {
    patientid: string;
    username: string;
    firstname: string;
    lastname: string;
    age: number;
    residency: string;
    mobile: string;
};

export type Prescription = {
    id: string;
    patientid: string; 
    name: string;
    date: string;
    diagnosis?: string;
    duration: number;
};

export type Drug = {
    id: string;
    pid: string; 
    name: string;
    dosage: string;
    quantity: number;
};

  