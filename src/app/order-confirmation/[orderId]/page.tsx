import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
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
              <Link href="/orders">View Order History</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
