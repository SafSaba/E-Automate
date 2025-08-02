'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

// The type definition has been simplified to resolve the build error.
export default function OrderConfirmationPage({ params }: any) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orderExists, setOrderExists] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/login');
      return;
    }
    
    const verifyOrder = async () => {
      try {
        const orderRef = doc(db, 'orders', params.orderId);
        const orderSnap = await getDoc(orderRef);
        if (orderSnap.exists() && orderSnap.data().userId === user.uid) {
          setOrderExists(true);
        } else {
          setOrderExists(false);
        }
      } catch (error) {
        console.error("Error verifying order:", error);
        setOrderExists(false);
      } finally {
        setLoading(false);
      }
    };
    
    verifyOrder();
  }, [params.orderId, user, authLoading, router]);

  if (loading || authLoading) {
    return (
       <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-16 w-16 text-primary animate-spin" />
      </div>
    );
  }

  if (!orderExists) {
      return (
         <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <Card className="w-full max-w-2xl text-center p-8">
               <CardTitle className="text-2xl font-bold text-destructive">Order Not Found</CardTitle>
               <p className="text-muted-foreground mt-2">We couldn't find the order you're looking for.</p>
                <Button asChild className="mt-6">
                  <Link href="/orders">Go to My Orders</Link>
                </Button>
            </Card>
        </div>
      )
  }

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader className="items-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-3xl font-bold font-headline">Thank You for Your Order!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your order has been placed successfully. You will receive an email confirmation shortly.
          </p>
          <p className="text-lg">
            Your Order ID is: <span className="font-bold text-primary">{params.orderId}</span>
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/orders/${params.orderId}`}>View Order Details</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
