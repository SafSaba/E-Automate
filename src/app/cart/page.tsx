'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { QuantitySelector } from '@/components/QuantitySelector';
import { Trash2, ShoppingCart, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CartPage() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">Shopping Cart</h1>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardContent className="p-6">
                            <Skeleton className="h-40 w-full" />
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader><Skeleton className="h-8 w-3/4" /></CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-8 w-full font-bold" />
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-12 w-full" />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven&apos;t added anything to your cart yet.</p>
          <Button asChild className="mt-6">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px] hidden sm:table-cell">Product</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead className="text-center">Quantity</TableHead>
                            <TableHead className="hidden sm:table-cell">Price</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cartItems.map(({ product, quantity }) => (
                            <TableRow key={product.id} data-testid={`cart-item-${product.id}`}>
                                <TableCell className="hidden sm:table-cell">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    width={80}
                                    height={80}
                                    className="rounded-md object-cover"
                                />
                                </TableCell>
                                <TableCell className="font-medium">
                                    <Link href={`/products/${product.id}`} className="hover:underline">
                                        {product.name}
                                    </Link>
                                     <p className="sm:hidden text-sm text-muted-foreground mt-1">${product.price.toFixed(2)}</p>
                                </TableCell>
                                <TableCell className="text-center">
                                <QuantitySelector
                                    quantity={quantity}
                                    onQuantityChange={(newQuantity) => updateQuantity(product.id, newQuantity)}
                                    data-testid={`quantity-selector-${product.id}`}
                                />
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">${product.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right font-medium">
                                    ${(product.price * quantity).toFixed(2)}
                                </TableCell>
                                <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFromCart(product.id)}
                                    aria-label={`Remove ${product.name} from cart`}
                                    data-testid={`remove-item-${product.id}`}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
