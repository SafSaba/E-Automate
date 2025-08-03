
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { initialProducts } from '@/lib/products';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

const ADMIN_EMAIL = 'isafwan@outlook.com';


const AdminPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/admin/login');
      } else if (user.email !== ADMIN_EMAIL) {
        toast({
          title: 'Access Denied',
          description: 'You do not have permission to view this page.',
          variant: 'destructive',
        });
        router.push('/');
      }
    }
  }, [user, loading, router, toast]);

  const handleAddProduct = () => {
    // A more robust implementation would involve uploading the image to Firebase Storage
    // and then saving the product with the image URL to Firestore.
    // For simplicity, this is left as a placeholder.
    console.log('Adding product:', { productName, productDescription, productPrice, productImage });
    toast({
        title: "Product Added",
        description: `${productName} has been added (simulation).`,
    });
  };

  const handleSeedProducts = async () => {
    setIsSeeding(true);
    toast({
        title: "Seeding Products",
        description: "Please wait while we populate the database...",
    });
    try {
        const productsCollection = collection(db, 'products');
        for (const product of initialProducts) {
            const productRef = doc(productsCollection, product.id);
            await setDoc(productRef, product);
        }
        toast({
            title: "Success",
            description: "Initial products have been seeded to your Firestore database.",
        });
    } catch (error) {
        console.error("Error seeding products: ", error);
        toast({
            title: "Error",
            description: "Failed to seed products. Check the console for details.",
            variant: "destructive",
        });
    } finally {
        setIsSeeding(false);
    }
  };

  if (loading || !user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-40" />
        </div>
        <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleSeedProducts} disabled={isSeeding}>
            {isSeeding ? 'Seeding...' : 'Seed Initial Products'}
        </Button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <div className="space-y-4 max-w-lg">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
            <Input
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Description</label>
            <Textarea
              id="productDescription"
              rows={3}
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Price</label>
            <Input
              type="number"
              id="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">Product Image</label>
            <Input
              type="file"
              id="productImage"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <Button onClick={handleAddProduct}>
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
