'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
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
import { CheckCircle, Shield, Truck, Loader2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productRef = doc(db, 'products', params.productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() } as Product);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.productId]);

  if (loading) {
    return (
       <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
              <div>
                  <Skeleton className="w-full aspect-square" />
              </div>
              <div className="space-y-4">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-12 w-3/4" />
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-24 w-full" />
                  <Separator />
                  <div className="flex gap-4">
                     <Skeleton className="h-12 w-24" />
                     <Skeleton className="h-12 w-48" />
                  </div>
              </div>
          </div>
      </div>
    );
  }

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
