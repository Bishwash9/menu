import { createContext, useContext, useState, type ReactNode } from 'react';
import type {Role} from '../Lib/roles';
import {ROLES} from '../Lib/roles'


//defining what the context will hold
interface AuthContextType {
    role : Role;
    setRole : (role:Role) => void;
}

//create a context jesma undefined is default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//creating a provider component jesle app wrap garxa hamro
interface AuthProviderProps{
    children: ReactNode;
}

export function AuthProvider({children}:AuthProviderProps){
    //define state


    //initialize state from localstorage for making it saving the role even if refreshing pages
    const [role,setRoleState] = useState<Role>(()=>{
        const saveRole = localStorage.getItem('userRole');
        return (saveRole as Role) || ROLES.ADMIN;
    });

    const setRole = (newRole : Role) => {
        localStorage.setItem('userRole',newRole);
        setRoleState(newRole);
    }

    return (
        <AuthContext.Provider value={{role,setRole}}>
            {children}
        </AuthContext.Provider>
    )

  
}

//creating a custom hook for easy access
export function useAuth(){
    const context = useContext(AuthContext);


    //checks and ensures hook is used inside AuthProvider
    if(context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}