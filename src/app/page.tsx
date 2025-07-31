import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { getProducts } from '@/lib/products';
import { ArrowRight, ShoppingBag, Watch, Laptop, Smartphone } from 'lucide-react';

export default function Home() {
  const featuredProducts = getProducts().slice(0, 4);
  const categories = [
    { name: 'Watches', icon: Watch, href: '/products?category=Watches' },
    { name: 'Laptops', icon: Laptop, href: '/products?category=Laptops' },
    { name: 'Smartphones', icon: Smartphone, href: '/products?category=Smartphones' },
  ];

  return (
    <div className="flex flex-col">
      <section className="bg-secondary/50 py-20 md:py-32">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center px-4">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary-foreground font-headline">
              The Future of Automated E-Commerce Testing
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Welcome to E-Automate, your dedicated platform for robust and dynamic UI, API, and database testing. Explore our catalog and experience a seamless shopping flow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="font-semibold">
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-semibold">
                <Link href="#">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-96">
            <Image
              src="https://placehold.co/600x400.png"
              alt="E-commerce illustration"
              data-ai-hint="e-commerce illustration"
              fill
              className="object-cover rounded-lg shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check out some of our most popular items. Perfect for starting your test automation scenarios.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Easily find what you're looking for by browsing our product categories.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link href={category.href} key={category.name} className="group">
                <div className="bg-card p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center flex flex-col items-center">
                  <category.icon className="h-16 w-16 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
