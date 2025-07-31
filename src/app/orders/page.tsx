import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Order } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

const mockOrders: Order[] = [
  {
    id: 'order_12345',
    userId: 'user_1',
    items: [],
    total: 1849.00,
    status: 'Delivered',
    shippingAddress: { name: '', address: '', city: '', zip: '', country: '' },
    paymentMethod: 'Visa',
    createdAt: new Date('2023-10-26').getTime(),
  },
  {
    id: 'order_67890',
    userId: 'user_1',
    items: [],
    total: 799.99,
    status: 'Shipped',
    shippingAddress: { name: '', address: '', city: '', zip: '', country: '' },
    paymentMethod: 'PayPal',
    createdAt: new Date('2023-11-15').getTime(),
  },
    {
    id: 'order_ABCDE',
    userId: 'user_1',
    items: [],
    total: 150.00,
    status: 'Processing',
    shippingAddress: { name: '', address: '', city: '', zip: '', country: '' },
    paymentMethod: 'Klarna',
    createdAt: new Date('2023-11-28').getTime(),
  },
];

const getStatusVariant = (status: Order['status']) => {
  switch (status) {
    case 'Delivered':
      return 'default';
    case 'Shipped':
      return 'secondary';
    case 'Processing':
      return 'destructive';
    case 'Cancelled':
      return 'outline';
    default:
      return 'default';
  }
};

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">My Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>Here is a list of your past orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id.replace('order_', '')}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/orders/${order.id}`}>View <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
