
'use client';
import {
    useState,
    useEffect,
    createContext,
    useContext,
    ReactNode,
} from 'react';

import { auth } from '@/lib/firebase';

import {
    User,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    fetchSignInMethodsForEmail,
    linkWithCredential,
    EmailAuthProvider,
} from 'firebase/auth';
import { useToast } from './use-toast';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    login: (pass: string, email: string) => Promise<void>;
    register: (pass: string, email: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const email = result.user.email;
            if (email) {
                const methods = await fetchSignInMethodsForEmail(auth, email);
                if (
                    methods.length > 0 &&
                    methods.indexOf(GoogleAuthProvider.PROVIDER_ID) === -1
                ) {
                    toast({
                        title: 'Account linking required',
                        description:
                            'This email is already associated with another login method. Please sign in with your existing account to link your Google account.',
                        variant: 'default',
                    });
                    await signOut(auth);
                }
            }
        } catch (error: any) {
            if (error.code === 'auth/account-exists-with-different-credential') {
                const email = error.customData.email;
                const methods = await fetchSignInMethodsForEmail(auth, email);
                if (methods.length > 0) {
                    const pendingCred = error.credential;
                    const provider = new GoogleAuthProvider();
                    const result = await signInWithPopup(auth, provider);
                    if (result.user) {
                        await linkWithCredential(result.user, pendingCred);
                        toast({
                            title: 'Accounts linked',
                            description: 'Your accounts have been successfully linked.',
                        });
                    }
                }
            } else {
                toast({
                    title: 'Error',
                    description: error.message,
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
                title: 'Error',
                description: error.message,
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
                title: 'Error',
                description: error.message,
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
                description: error.message,
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
};
