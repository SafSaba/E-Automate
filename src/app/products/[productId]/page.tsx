'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { QuantitySelector } from '@/components/QuantitySelector';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { SuggestedProducts } from '@/components/SuggestedProducts';
import { CheckCircle, Shield, Truck } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  const [quantity, setQuantity] = useState(1);
  const product = getProductById(params.productId);
  const { addToCart } = useCart();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };
  
  const features = [
      { icon: CheckCircle, text: "In Stock & Ready to Ship" },
      { icon: Truck, text: "Free, Fast Shipping" },
      { icon: Shield, text: "2-Year Warranty" }
  ]

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div>
           <Carousel className="w-full max-w-lg mx-auto" data-testid="product-image-carousel">
            <CarouselContent>
                {product.images.map((img, index) => (
                    <CarouselItem key={index}>
                    <Card className="overflow-hidden">
                        <CardContent className="p-0 aspect-square flex items-center justify-center">
                        <Image
                            src={img}
                            alt={`${product.name} - image ${index + 1}`}
                            width={600}
                            height={600}
                            className="object-cover w-full h-full"
                            priority={index === 0}
                            data-ai-hint={product.dataAiHint}
                        />
                        </CardContent>
                    </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {product.images.length > 1 && (
                <>
                    <CarouselPrevious />
                    <CarouselNext />
                </>
            )}
            </Carousel>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium text-primary mb-2">{product.category}</span>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 font-headline" data-testid="product-name">{product.name}</h1>
          <p className="text-2xl lg:text-3xl font-semibold mb-6" data-testid="product-price">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground leading-relaxed mb-6" data-testid="product-description">{product.description}</p>
          
          <Separator className="my-6"/>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} data-testid="quantity-selector" />
            <Button size="lg" onClick={handleAddToCart} data-testid="add-to-cart-button" className="w-full sm:w-auto">
              Add to Cart
            </Button>
          </div>

          <div className="space-y-3">
              {features.map(feature => (
                  <div key={feature.text} className="flex items-center gap-3 text-sm">
                      <feature.icon className="w-5 h-5 text-green-600"/>
                      <span className="text-muted-foreground">{feature.text}</span>
                  </div>
              ))}
          </div>

        </div>
      </div>
      <Separator className="my-12 md:my-16" />
      <SuggestedProducts product={product} />
    </div>
  );
}
