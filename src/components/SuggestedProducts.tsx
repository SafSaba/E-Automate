'use client';

import { useEffect, useState } from 'react';
import { suggestRelatedProducts, SuggestRelatedProductsOutput } from '@/ai/flows/suggest-related-products';
import { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from './ui/card';

export function SuggestedProducts({ product }: { product: Product }) {
  const [suggestions, setSuggestions] = useState<SuggestRelatedProductsOutput>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!product.description) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const result = await suggestRelatedProducts({
          productDescription: product.description,
        });
        setSuggestions(result);
      } catch (err) {
        setError('Failed to load suggestions.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [product.description]);

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">You Might Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
        <div className="text-center py-8 px-4 bg-destructive/10 rounded-lg">
            <p className="text-destructive font-medium">{error}</p>
        </div>
    );
  }
  
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-6">You Might Also Like</h2>
        <Carousel
            opts={{
            align: "start",
            loop: true,
            }}
            className="w-full"
        >
            <CarouselContent>
            {suggestions.map((suggestion) => (
                <CarouselItem key={suggestion.productId} className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                    <Link href="#">
                        <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                            <CardContent className="flex flex-col aspect-square items-center justify-center p-0">
                                <Image 
                                    src={`https://placehold.co/300x300.png`} 
                                    width={300}
                                    height={300}
                                    alt={suggestion.productName} 
                                    className="object-cover w-full h-full"
                                    data-ai-hint="product photo"
                                />
                                <div className="absolute bottom-0 bg-gradient-to-t from-black/80 to-transparent w-full p-4">
                                    <h3 className="font-semibold text-lg text-white">{suggestion.productName}</h3>
                                    <p className="text-sm text-gray-300 line-clamp-2">{suggestion.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12" />
            <CarouselNext className="mr-12" />
        </Carousel>
    </div>
  );
}
