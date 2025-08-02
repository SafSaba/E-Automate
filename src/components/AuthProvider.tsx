
'use client';
import React from 'react';
import { AuthProvider as FirebaseAuthProvider } from '@/hooks/use-auth';
export function AuthProvider({ children }: { children: React.ReactNode }) {
    return <FirebaseAuthProvider>{children}</FirebaseAuthProvider>;
}
