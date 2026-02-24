import {menuService} from '../Services/menuService';
import {useAuth} from './AuthContext';
import type { MenuItem } from '../Features/MenuManagement/Types';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface MenuContextType{
    menuItems: MenuItem[];
    loading: boolean;
    error: string | null;
    refreshMenuItems : () => Promise<void>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider : React.FC<{children: React.ReactNode}> = ({children}) =>{
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {user} = useAuth();

    const fetchMenuItems = useCallback(async () =>{
        if(!user?.business_id){
            console.error("User does not hafe a business id");
            return;
        }

        try{
            setLoading(true);
            const data = await menuService.getMenuItems(user.business_id);

            const mappedItems : MenuItem[]  = data.map(item =>({
                    id: item.id.toString(),
                    business_id: item.business_id,
                    business_name: item.business_name,
                    name: item.name,
                    description: item.description,
                    category: item.category_name,
                    price: parseFloat(item.price),
                    prepTime: item.preparation_time,
                    status: item.is_available ? 'Available' : 'Unavailable',
                    image: item.image || undefined,
                    isAvailable: item.is_available,
                    spiceLevel: item.spice_level_name
            }));
            setMenuItems(mappedItems);
            setError(null);
        }catch(error){
            setError('Failed to load menu items. Please try again later.');
        }finally{
            setLoading(false);
        }
    },[user?.business_id])


    useEffect(()=>{
        //fetch menu items only if items are not already loaded
        if(menuItems.length === 0 && user?.business_id){
            fetchMenuItems();
        }
    },[fetchMenuItems, menuItems.length, user?.business_id]);

    return (
        <MenuContext.Provider value={{menuItems, loading, error, refreshMenuItems:fetchMenuItems}}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () =>{
    const context = useContext(MenuContext);
    if(!context){   
        throw new Error('useMenu must be used within a MenuProvider');
    }

    return context;
};