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
    const [role, setRole] =useState<Role>(ROLES.ADMIN);

    return(
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