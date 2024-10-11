import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.synapsecode.healthmate",
  projectId: "66e890e0000b2bc58a26",
  storageId: "66ea2f63001d4c56985c",
  databaseId: "66ea243f001038f90d48",
  userCollectionId: "66ea24af0031394e9da4",
  inventoryCollectionId:"66ea28ca003bbcf41010",
  prescriptionCollectionId: "66ea262c0016c7c57d29",
  drugCollectionId:"66ea274d000d45996c84",
  alertCollectionId: "670940c10035c0521c9f"
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);


// Sign In
// export async function signIn(email:string, password:string) {
//   try {
//     const session = await account.createEmailPasswordSession(email, password);
//     console.log(session)
//     return session;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error('An unknown error occurred.');
//     }
//   }
// }

// Sign In
export async function signIn(email: string, password: string) {
  try {
    try {
      const currentSession = await account.get(); 
      if (currentSession) {
        await account.deleteSession("current");
        console.log("Previous session logged out successfully.");
      }
    } catch (sessionError: unknown) {
      console.log("No active session found.");
    }
    const session = await account.createEmailPasswordSession(email, password);
    // console.log("New session created:", session);
    return session;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
}


// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  }catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
}

// Get Current User
// export async function getCurrentUser() {
//   try {
//     const currentAccount = await getAccount();
//     if (!currentAccount) throw Error;

//     console.log("User Document: "+ currentAccount.labels);

//     const currentUser = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       [Query.equal("accountId", currentAccount.$id)]
//     );

//     if (!currentUser) throw new Error('User not found.');
//     return currentUser.documents[0];
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error('An unknown error occurred.');
//     }
//   }
// }

// Add new Inventory Item
export async function addInventoryItem(form: any) {
  try {
    const quantity = parseInt(form.quantity);
    if (isNaN(quantity)) {
      throw new Error('Quantity must be a valid number');
    }

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.inventoryCollectionId,
      ID.unique(),
      {
        name: form.name,
        sku: form.sku,
        quantity: quantity,
        expiration: form.expiration,
        manufacturer: form.manufacturer,
        category: form.category,
        description: form.description
      }
    );

    return newPost;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
}

export async function getInventoryItems() {
  try {
    const inventoryItems = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.inventoryCollectionId
    );
    return inventoryItems.documents;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
}

export async function getInventoryItem(id: string) {
  try {
    const item = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.inventoryCollectionId,
      [Query.equal("$id", id)]
    );
    return item.documents[0];
  }  catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
}

export const updateInventoryItem = async (itemId: string, amountToAdd: number): Promise<void> => {
  try {
    // Fetch the current item data
    const item = await databases.getDocument(
        appwriteConfig.databaseId, 
        appwriteConfig.inventoryCollectionId,
        itemId // Remove the array brackets
    );
    const newQuantity = (item.quantity || 0) + amountToAdd;

    await databases.updateDocument(        
        appwriteConfig.databaseId, 
        appwriteConfig.inventoryCollectionId,
        itemId, {
            quantity: newQuantity,
        }
    );
    
    console.log(`Updated item ${itemId} with new quantity: ${newQuantity}`);
  } catch (error) {
    console.error('Error updating inventory item:', error);
    throw error; 
  }
};


export const getPrescriptionsByPatientId = async (patientId: string) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId, 
      appwriteConfig.prescriptionCollectionId,
      [Query.equal("user", patientId)]
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    return [];
  }
};


export const getPatientDetails = async (patientId: string) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId, 
      appwriteConfig.userCollectionId,
      [Query.equal("$id", patientId)]
    );
    return response.documents[0];
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    return [];
  }
};

export const getPrescriptionDetailsById = async (prescriptionId: string) => {
  try {
    // Fetch the prescription details
    const prescription = await getPrescriptionById(prescriptionId);
    if (!prescription) {
      console.log("No prescription found.");
      return null;
    }

    // Extract inventory IDs from the prescription's drugs array
    const inventoryIds = prescription.drugs.map((drug) => drug.inventory.$id);

    // Fetch inventory details for each drug
    const inventoryDetails = await getInventoryByIds(inventoryIds);

    // Map the fetched inventory details to the corresponding drugs
    const drugsWithDetails = prescription.drugs.map((drug) => {
      // Safeguard in case inventory is missing in a drug object
      if (!drug.inventory || !drug.inventory.$id) {
        return {
          ...drug,
          inventoryDetails: {
            name: "Unknown Drug",
            sku: "N/A",
            quantity: 0,
            expiration: "N/A",
            manufacturer: "N/A",
            category: "N/A",
            description: "N/A",
          },
        };
      }

      // Find the matching inventory item
      const inventoryItem = inventoryDetails.find(
        (item) => item.$id === drug.inventory.$id
      );

      return {
        ...drug,
        inventoryDetails: inventoryItem
          ? {
              name: inventoryItem.name || "Unknown",
              sku: inventoryItem.sku || "N/A",
              quantity: inventoryItem.quantity || 0,
              expiration: inventoryItem.expiration || "N/A",
              manufacturer: inventoryItem.manufacturer || "N/A",
              category: inventoryItem.category || "N/A",
              description: inventoryItem.description || "N/A",
            }
          : {
              name: "Unknown Drug",
              sku: "N/A",
              quantity: 0,
              expiration: "N/A",
              manufacturer: "N/A",
              category: "N/A",
              description: "N/A",
            },
      };
    });

    // Combine the prescription details with the enriched drug details
    const prescriptionDetails = {
      ...prescription,
      drugs: drugsWithDetails,
    };

    return prescriptionDetails;
  } catch (error) {
    console.error('Error fetching prescription details by ID:', error);
    return null;
  }
};


// Function to fetch a prescription by ID
const getPrescriptionById = async (prescriptionId: string) => {
  try {
    console.log(`Fetching prescription with ID: ${prescriptionId}`);
    const response = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.prescriptionCollectionId,
      prescriptionId  // Fetch prescription by its ID
    );
    return response;
  } catch (error) {
    console.error('Error fetching prescription by ID:', error);
    return null;
  }
};


// Function to get inventory details by multiple IDs
const getInventoryByIds = async (inventoryIds: string[]) => {
  if (!Array.isArray(inventoryIds) || inventoryIds.length === 0) {
    console.log('No inventory IDs provided.');
    return []; 
  }

  try {
    const inventoryPromises = inventoryIds.map(async (id) => {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.inventoryCollectionId,
        [Query.equal('$id', id)]  // Query the $id attribute instead of id
      );
      return response.documents[0];  // Return the first document found
    });

    const inventoryData = await Promise.all(inventoryPromises);
    return inventoryData;  
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return [];
  }
};

export const fetchUserData = async (userId: string) => {

  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("$id", userId)]
    );    
    return response.documents[0];
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
};


export const fetchPrescriptions = async (status?: string, search?: string) => {
  try {
    let query = [];
    if (status) {
      query.push(Query.equal('status', status));
    }
    if (search) {
      query.push(Query.search('diagnosis', search));
    }
    const prescriptionsResponse = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.prescriptionCollectionId,
      query
    );
    const prescriptions = prescriptionsResponse.documents;
    const enrichedPrescriptions = await Promise.all(prescriptions.map(async (prescription) => {
      if (!prescription.user || typeof prescription.user !== 'string' || prescription.user.length > 36) {
        return { ...prescription, userName: 'Unknown User' };
      }
      const userResponse = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        prescription.user 
      );
      return { ...prescription, userName: userResponse.name };
    }));
    return enrichedPrescriptions;
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    return [];
  }
};



export const updatePrescriptionStatus = async (prescriptionId: string, status: string, notes: string = '') => {
  try {
    const updatedDocument = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.prescriptionCollectionId,
      prescriptionId,
      {
        status: status,
        note: notes, 
      }
    );
    console.log("Updated document: " + updatedDocument);
    return updatedDocument;
  } catch (error) {
    console.error('Error updating prescription status:', error);
    throw error;
  }
};


const saveAlertMessage = async (alertType: string, message: string) => {
  console.log("New alert: "+ alertType)
  await databases.createDocument(
    appwriteConfig.databaseId,           // Database ID
    appwriteConfig.alertCollectionId,     // Collection ID
    ID.unique(),                          // Generate a unique document ID
    {                                     // Document data
      type: alertType,
      message: message,
      timestamp: new Date().toISOString(),  // Store the current timestamp
    }
  );
};

// Functions for each alert
export const triggerAmbulanceAlert = () => saveAlertMessage('Ambulance', 'Ambulance alert triggered!');
export const triggerFireAlert = () => saveAlertMessage('Fire', 'Fire alert triggered!');
export const triggerHazardousAlert = () => saveAlertMessage('Hazardous', 'Hazardous alert triggered!');
export const triggerGeneralAlert = () => saveAlertMessage('General', 'General alert triggered!');


const isAlertFromToday = (alertTimestamp) => {
  const alertDate = new Date(alertTimestamp);
  const now = new Date();

  // Get start of today (00:00) in the current timezone
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Check if the alert is from today
  return alertDate >= startOfToday;
};

export const fetchAlertsFromToday = async () => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.alertCollectionId
    );
    // Filter alerts based on whether they are created within today
    const newAlerts = response.documents.filter(alert => {
      return isAlertFromToday(alert.timestamp) && !alert.isRead;
    });
    return newAlerts;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
};

export const fetchRecentAlerts = async () => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.alertCollectionId
    );
    
    const recentAlerts = response.documents.filter(alert => {
      const alertTime = new Date(alert.timestamp);
      const now = new Date();
      return now.getTime() - alertTime.getTime() < 24 * 60 * 60 * 1000; // Within the last 24 hours
    });

    return recentAlerts;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
};

