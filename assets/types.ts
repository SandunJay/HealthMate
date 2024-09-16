export type InventoryItem = {
    id: string;
    name: string;
    category: string;
    sku: string,
    manufacturer:string,
    quantity: number;
    image: string;
  };

  
export type recordType = {
	id: string;
	name: string;
	date: string;
	diagnosis?: string,
	rating:number,
	image: string;
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

  