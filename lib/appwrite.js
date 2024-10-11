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
  platform: "com.jsm.sora",
  projectId: "660d0e00da0472f3ad52",
  storageId: "660d0e59e293896f1eaf",
  databaseId: "660d14b2b809e838959a",
  userCollectionId: "660d14c0e8ae0ea842b8",
  videoCollectionId: "660d157fcb8675efe308",
};

export const config = {
  endpoint : "https://cloud.appwrite.io/v1",
  platform : "com.uee.healthmate",
  projectId : "6708d45c0034d0c65987",
  databaseId:"6708d4a5001502f54aab",
  patientCollectionId:"6708d4c60010037579ed"

}
const clientPatient = new Client();
const client = new Client();

clientPatient
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform) 
;

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

const accountPatient = new Account(clientPatient);
const databasesPatient = new Databases(clientPatient);

// Register user
export const createUser = async (email,password,username,age,gender,bloodType,contact)=>{
  try{

      const Id = ID.unique();

      const newAccount = await accountPatient.create(
          Id,
          email,
          password,
          username
      )

      if(!newAccount) throw Error;

      //await signIn(email,password);

      const newUser = await databasesPatient.createDocument(
          config.databaseId,
          config.patientCollectionId,
          ID.unique(),
          {
              accountId:newAccount.$id,
              email,
              username,
              age,
              gender,
              bloodType,
              contact
          }
      )

      return newUser;

  }catch(error){
      console.log(error);
      throw new Error(error);
  }

}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await accountPatient.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User


// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Create Video Post
export async function createVideoPost(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

// Get all video Posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts created by user
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts that matches search query
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get latest created video posts
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}


//Patient parts
export const fetchUserData = async (accountId) => {
  try {
    const userData = await databasesPatient.listDocuments(
      config.databaseId,
      config.patientCollectionId,
      [
          Query.equal('accountId',accountId)
      ]
    )
    if (userData.documents.length > 0) {
       console.log("userdata",userData);
      return userData.documents[0]; 
    }else{
      throw new Error('No user found with the provided email.');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const getCurrentUser = async () =>{
  try {

      console.log("in the GetCurrentUser");

      const currentAcoount = await accountPatient.get();

      console.error("this is Current account",currentAcoount);
      if(!currentAcoount) throw Error;

      const currentUser = await databasesPatient.listDocuments(
          config.databaseId,
          config.patientCollectionId,
          [Query.equal('accountId', currentAcoount.$id)]
      )
      if(!currentUser) throw Error;

      console.error("this is current user",currentUser);

      return currentUser.documents[0]
  } catch (error) {
      console.log(error);
  }
}