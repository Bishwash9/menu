import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Role } from '../Lib/roles';


//putting userinfo in state for using it later in app
type UserInfo = {
    name: string;
    email: string;
    role: string;
    username: string;
    business_id: number;
    business_type: string;
    business_uid?: string;
}

//defining what the context will hold
interface AuthContextType {
    role: Role;
    setRole: (role: Role) => void;
    user: UserInfo | null;
    setUser: (user: UserInfo | null) => void;
}

//create a context jesma undefined is default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//creating a provider component jesle app wrap garxa hamro
interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    //define state


    //initialize state from localstorage for making it saving the role even if refreshing pages
    const [role, setRoleState] = useState<Role>(() => {
        const saveRole = localStorage.getItem('userRole');
        return (saveRole as Role) || '' as Role;
    });

    const setRole = (newRole: Role) => {
        const normalizedRole = newRole.toLowerCase() as Role;
        localStorage.setItem('userRole', normalizedRole);
        setRoleState(normalizedRole);
    }
       const [user, setUser] = useState<UserInfo | null>(() => {
        try {
            const savedUser = localStorage.getItem('userData');
            if (savedUser) {
                const parsed = JSON.parse(savedUser);
                return {
                    ...parsed,
                    // If 'business_name' is missing, fallback to 'name' or empty string
                    name: parsed.business_name || parsed.name || ''
                };
            }
        } catch (error) {
            console.error("Failed to parse user data", error);
        }
        return null;
    });

    

    return (
        <AuthContext.Provider value={{ role, setRole, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )


}

//creating a custom hook for easy access
export function useAuth() {
    const context = useContext(AuthContext);


    //checks and ensures hook is used inside AuthProvider
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}