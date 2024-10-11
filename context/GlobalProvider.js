import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native"; // Import Platform API
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isIos, setIsIos] = useState(Platform.OS === 'ios'); // Check if the platform is iOS

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        if (res) {
          if (res !== user) { // Only update if the user data is different
            setUser(res);
            setIsLogged(true);
          }
        } else {
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser(); // Call the function to fetch user data
  }, [user]); // Add user as a dependency to avoid infinite loop

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        isDarkMode,
        toggleDarkMode,
        isIos, // Provide `isIos` to the context
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
