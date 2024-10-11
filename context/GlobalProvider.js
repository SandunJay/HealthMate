
import { createContext, useContext, useState,useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";
import { createUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = ()=>useContext(GlobalContext);

const GlobalProvider = ({children})=>{
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [user,setUser] = useState(null);
    const [isLoading,setIsLoading] = useState(true)

    // useEffect(()=>{
    //     getCurrentUser()
    //     .then((res)=>{
    //         if(res){
    //             setIsLoggedIn(true);
    //             setUser(res)
    //         }else{
    //             setIsLoggedIn(false);
    //             setUser(null);
    //         }
    //     }).catch((error)=>{
    //         console.log(error);
    //     })
    //     .finally(()=>{
    //         setIsLoading(false);
    //     })
    // },[]);

    const createUserAndSave = async (email,password , username , age, gender , bloodType, contact)=>{
        try {
            setIsLoading(true);
            const newUser = await createUser(email, password, username, age, gender, bloodType, contact);

            if(newUser){
                setUser(newUser);
                console.log(newUser);
            }else{
                setUser(null);
            }

        } catch (error) {
            console.error("Error creating user and saving data:", error);
        }finally{
            setIsLoading(false); 
        }
    }
    return(
        <GlobalContext.Provider
        value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading,
            createUserAndSave
        }}
        >
                {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;
