import { Client, Databases, Account, ID } from 'react-native-appwrite';

// Initialize the Appwrite client
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66c9c3e20011fac01b50')
    .setPlatform('healthmate');

// Initialize the services
const databases = new Databases(client);
const account = new Account(client);

// Define the types for function parameters
const loginUser = async (email: string, password: string): Promise<any> => {
  try {
    const response = await account.createSession(email, password);
    console.log('User logged in:', response);
    return response;
  } catch (error) {
    handleLoginError(error);
    throw error; // Rethrow the error after handling it
  }
};

// Custom error handling function
const handleLoginError = (error: unknown) => {
  if (error instanceof Error) {
    // Handle known Error types
    console.error('Error logging in:', error.message);
  } else {
    // Handle unknown types
    console.error('Unknown error occurred:', error);
  }
};

// Function to create a document
const createDocument = async () => {
  try {
    // Login the user
    const email = 'user@example.com'; // Replace with actual user email
    const password = 'userpassword';  // Replace with actual user password
    await loginUser(email, password);

    // Ensure the user is logged in and has a valid session
    const session = await account.getSession('current');
    console.log('User is authenticated:', session);

    // Create a new document in the specified collection
    const result = await databases.createDocument(
        'appoint', // databaseId
        '66c9c467003136e731d1', // collectionId
        '66e3297e001c785941c0', 
        // ID.unique(),
        {
          date: '2024-09-12',
          time: '15:00',
          doctor: 'Dr. Smith',
          description: 'Patient Checkup',
          category: 'General',
        } // data
      );
      
    console.log('Document created:', result);
  } catch (error) {
    handleCreateDocumentError(error);
  }
};

// Custom error handling function for document creation
const handleCreateDocumentError = (error: unknown) => {
  if (error instanceof Error) {
    // Handle known Error types
    console.error('Error creating document:', error.message);
  } else {
    // Handle unknown types
    console.error('Unknown error occurred:', error);
  }
};

createDocument();

export { client, databases, account };
