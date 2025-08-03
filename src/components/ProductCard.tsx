'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col" data-testid={`product-card-${product.id}`}>
      <Link href={`/products/${product.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="aspect-square relative">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={product.dataAiHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold leading-tight mb-2">{product.name}</CardTitle>
          <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center mt-auto">
          <p className="text-xl font-bold text-primary-foreground">
            ${product.price.toFixed(2)}
          </p>
          <Button onClick={handleAddToCart} size="icon" aria-label={`Add ${product.name} to cart`} data-testid="add-to-cart-button">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
