
'use client';

import { AuthProvider } from './AuthProvider';
import { CartProvider } from './CartProvider';
import { Toaster } from './ui/toaster';
import { CheckoutProvider } from './CheckoutProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <CartProvider>
                <CheckoutProvider>
                    {children}
                    <Toaster />
                </CheckoutProvider>
            </CartProvider>
        </AuthProvider>
    );
}
