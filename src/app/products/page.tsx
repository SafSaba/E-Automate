'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/products';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from '@/lib/types';
import Link from 'next/link';

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      setLoading(true);
      try {
        const [prods, cats] = await Promise.all([
            getProducts(selectedCategory || undefined),
            getCategories()
        ]);
        setProducts(prods);
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsAndCategories();
  }, [selectedCategory]);
  

  if (loading) {
    return <ProductsSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          {selectedCategory || 'All Products'}
        </h1>
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-12 md:col-span-3">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="flex flex-col gap-2">
            <Button
                variant={!selectedCategory ? 'secondary' : 'ghost'}
                asChild
                className="justify-start"
            >
                <Link href="/products">All</Link>
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'secondary' : 'ghost'}
                asChild
                className="justify-start"
              >
                <Link href={`/products?category=${encodeURIComponent(category)}`}>{category}</Link>
              </Button>
            ))}
          </div>
        </aside>

        <main className="col-span-12 md:col-span-9">
          {products.length === 0 ? (
             <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <p className="mt-2 text-muted-foreground">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
          )}
          {/* TODO: Add pagination */}
        </main>
      </div>
    </div>
  );
}

function ProductsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-10 w-44" />
      </div>
      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-3 hidden md:block">
          <Skeleton className="h-8 w-32 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </aside>
        <main className="col-span-12 md:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex justify-between">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-10 w-10 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}


export default function ProductsPage() {
    return (
        <Suspense fallback={<ProductsSkeleton />}>
            <ProductsPageContent />
        </Suspense>
    )
}
