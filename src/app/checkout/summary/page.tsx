import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Mock data for summary page
const mockCart = {
  items: [
    {
      product: { id: 'prod_001', name: 'Chronograph Excellence', price: 450.00, images: ['https://placehold.co/600x600.png'], dataAiHint: 'luxury watch' },
      quantity: 1,
    },
    {
      product: { id: 'prod_003', name: 'Ultra-Slim Laptop', price: 1399.00, images: ['https://placehold.co/600x600.png'], dataAiHint: 'modern laptop' },
      quantity: 1,
    }
  ],
  total: 1849.00
};
const mockShipping = { name: 'John Doe', address: '123 Main St, Apt 4B', city: 'New York, NY 10001', country: 'United States' };
const mockPayment = { method: 'Visa', last4: '4242' };

export default function SummaryPage() {
  const { items, total } = mockCart;

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
              <p>{mockShipping.name}</p>
              <p>{mockShipping.address}</p>
              <p>{mockShipping.city}</p>
              <p>{mockShipping.country}</p>
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
              <p>Card ending in {mockPayment.last4}</p>
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
                        {items.map(({ product, quantity }) => (
                            <div key={product.id} className="flex items-center gap-4">
                                <Image src={product.images[0]} alt={product.name} width={64} height={64} className="rounded-md" data-ai-hint={product.dataAiHint}/>
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
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>$0.00</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Taxes</span>
                            <span>Calculated at next step</span>
                        </div>
                    </div>
                    <Separator className="my-4"/>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button asChild size="lg" className="w-full">
                        <Link href="/order-confirmation/order_12345">Place Order</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
