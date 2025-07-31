import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Mock data for a single order
const mockOrder = {
  id: 'order_12345',
  date: 'October 26, 2023',
  status: 'Delivered',
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
  total: 1849.00,
  shippingAddress: { name: 'John Doe', address: '123 Main St, Apt 4B', city: 'New York, NY 10001', country: 'United States' },
  paymentMethod: { method: 'Visa', last4: '4242' },
};

export default function OrderDetailsPage({ params }: { params: { orderId: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="outline" asChild><Link href="/orders">← Back to Orders</Link></Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <div>
              <CardTitle className="text-2xl font-bold font-headline">Order #{params.orderId.replace('order_','')}</CardTitle>
              <p className="text-sm text-muted-foreground">Date: {mockOrder.date}</p>
            </div>
            <div>
              Status: <Badge variant="default">{mockOrder.status}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Items Ordered</h3>
              <div className="space-y-4">
                {mockOrder.items.map(({ product, quantity }) => (
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
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <div className="text-sm text-muted-foreground">
                        <p>{mockOrder.shippingAddress.name}</p>
                        <p>{mockOrder.shippingAddress.address}</p>
                        <p>{mockOrder.shippingAddress.city}</p>
                    </div>
                </div>
                 <div>
                    <h3 className="font-semibold mb-2">Payment Method</h3>
                    <div className="text-sm text-muted-foreground">
                        <p>{mockOrder.paymentMethod.method} ending in {mockOrder.paymentMethod.last4}</p>
                    </div>
                </div>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${mockOrder.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>$0.00</span>
                </div>
                 <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${mockOrder.total.toFixed(2)}</span>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
