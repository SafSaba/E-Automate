'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAuth } from 'firebase/auth';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
        setAvatarFile(event.target.files[0]);
        handleUpload(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
      fileInputRef.current?.click();
  }

  const handleUpload = async (file: File) => {
    if (!file) return;

    const auth = getAuth();
    const idToken = await auth.currentUser?.getIdToken();

    if (!idToken) {
        console.error("Could not get ID token.");
        return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('/api/profile/avatar', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // You might want to update the user context or state with the new photoURL
        console.log('Upload successful:', data);
        // Force a reload of the user to get the new photoURL
        await auth.currentUser?.reload();
        // This will trigger a re-render with the new avatar via the useAuth hook
      } else {
        console.error('Upload failed:', await response.text());
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
             <div className="md:col-span-1 space-y-4">
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
      </div>
    )
  }

  const [firstName, lastName] = user.displayName?.split(' ') || ['', ''];
  const fallbackText = (user.displayName || '').split(' ').map(n => n[0]).join('') || 'U';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">My Profile</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" defaultValue={firstName} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" defaultValue={lastName} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user.email || ''} readOnly />
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-1 space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>Upload a new profile picture.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={user.photoURL || undefined} alt="User avatar" />
                        <AvatarFallback>{fallbackText}</AvatarFallback>
                    </Avatar>
                    <input 
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <Button variant="outline" onClick={handleUploadClick}>Upload Picture</Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
                <CardDescription>Your default shipping address.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue="123 Main St" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue="New York" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" defaultValue="NY" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input id="zip" defaultValue="10001" />
                        </div>
                    </div>
                    <Button className="w-full">Update Address</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
