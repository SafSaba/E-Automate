'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useCheckout } from '@/hooks/use-checkout';


export default function SummaryPage() {
  const { cartItems, cartTotal } = useCart();
  const { shippingAddress, paymentDetails, createOrder, loading } = useCheckout();
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Shipping Address</CardTitle>
                <CardDescription>Your delivery details.</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild><Link href="/checkout">Edit</Link></Button>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>{shippingAddress?.name}</p>
              <p>{shippingAddress?.line1} {shippingAddress?.line2}</p>
              <p>{shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.postal_code}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Your payment details.</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild><Link href="/checkout/payment">Edit</Link></Button>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
               <p>Card ending in {paymentDetails?.last4 || '****'}</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {cartItems.map(({ product, quantity }) => (
                            <div key={product.id} className="flex items-center gap-4">
                                <Image src={product.images[0]} alt={product.name} width={64} height={64} className="rounded-md"/>
                                <div className="flex-grow">
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
                                </div>
                                <p className="font-medium">${(product.price * quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <Separator className="my-4"/>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>$0.00</span>
                        </div>
                    </div>
                    <Separator className="my-4"/>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={createOrder} disabled={loading} size="lg" className="w-full">
                       {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Place Order'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
