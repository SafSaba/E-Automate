
'use client';

import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useMemo,

} from 'react';
import { getFirebaseAuth } from '@/lib/firebase';
import type { User, Auth } from 'firebase/auth';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged,

} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    login: (email: string, pass: string) => Promise<void>;
    register: (email: string, pass: string) => Promise<void>;
    logout: () => Promise<void>;
    sendPasswordReset: (email: string) => Promise<void>;

}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const auth = useMemo(() => getFirebaseAuth(), []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);

    const signInWithGoogle = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'An unknown error occurred.',
                variant: 'destructive',
            });
            throw error;

        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, pass: string) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, pass);
        } catch (error: any) {
            toast({
                title: 'Login Failed',
                description: error.message || 'An unexpected error occurred.',
                variant: 'destructive',
            });
            throw error;

        } finally {
            setLoading(false);
        }
    };

    const register = async (email: string, pass: string) => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, pass);
        } catch (error: any) {
            toast({
                title: 'Signup Failed',
                description: error.message || 'An unexpected error occurred.',
                variant: 'destructive',
            });
            throw error;

        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'An unexpected error occurred.',
                variant: 'destructive',
            });
            throw error;
        } finally {
            setLoading(false);
        }
    };
    
    const sendPasswordReset = async (email: string) => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            toast({
                title: 'Password Reset Email Sent',
                description: 'Check your inbox for a link to reset your password.',
            });
        } catch (error: any) {
             toast({
                title: 'Error',
                description: error.message || 'Could not send password reset email.',
                variant: 'destructive',
            });
            throw error;

        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        signInWithGoogle,
        login,
        register,
        logout,
        sendPasswordReset,

    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
