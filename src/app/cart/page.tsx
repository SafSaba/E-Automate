'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { QuantitySelector } from '@/components/QuantitySelector';
import { Trash2, ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
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
                            <TableHead className="w-[100px]">Product</TableHead>
                            <TableHead></TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cartItems.map(({ product, quantity }) => (
                            <TableRow key={product.id} data-testid={`cart-item-${product.id}`}>
                                <TableCell>
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    width={80}
                                    height={80}
                                    className="rounded-md object-cover"
                                    data-ai-hint={product.dataAiHint}
                                />
                                </TableCell>
                                <TableCell className="font-medium">
                                    <Link href={`/products/${product.id}`} className="hover:underline">
                                        {product.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                <QuantitySelector
                                    quantity={quantity}
                                    onQuantityChange={(newQuantity) => updateQuantity(product.id, newQuantity)}
                                    data-testid={`quantity-selector-${product.id}`}
                                />
                                </TableCell>
                                <TableCell>${product.price.toFixed(2)}</TableCell>
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
