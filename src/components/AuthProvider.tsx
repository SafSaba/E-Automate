
'use client';

import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useContext,
} from 'react';
import { auth } from '@/lib/firebase';
import type { User } from 'firebase/auth';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    fetchSignInMethodsForEmail,
    linkWithCredential,
} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    login: (email: string, pass: string) => Promise<void>;
    register: (email: string, pass: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error: any) {
            if (
                error.code === 'auth/account-exists-with-different-credential'
            ) {
                toast({
                    title: 'Account exists',
                    description:
                        'An account with this email already exists. Please sign in with your original method to link your Google account.',
                    variant: 'destructive',
                });
            } else {
                toast({
                    title: 'Error',
                    description: error.message || 'An unknown error occurred.',
                    variant: 'destructive',
                });
            }
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
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
