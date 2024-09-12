import { Client, Databases } from 'appwrite';

// Initialize Appwrite client and database
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Ensure correct Appwrite endpoint
  .setProject('66c9c3e20011fac01b50'); // Ensure correct project ID

const databases = new Databases(client);
console.log('Appwrite client and databases initialized',databases);
// Export the client and databases for reuse in other parts of your app
export { client, databases };
