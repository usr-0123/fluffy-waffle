import React, {createContext, useContext, useState, useEffect} from "react";
import {User, signOut, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/lib/firebase.ts";

interface AdminContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
    const context = useContext(AdminContext);

    if (context === undefined) {
        throw new Error('useAdmin must be used within AdminProvider');
    }

    return context;
}

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, [user]);

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    }

    const logout = async () => {
        await signOut(auth);
    }

    const value = { user, loading, login, logout };

    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}