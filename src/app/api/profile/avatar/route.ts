
import { NextRequest, NextResponse } from 'next/server';
import { auth as adminAuth, firestore, storage } from 'firebase-admin';
import { admin, db } from '@/lib/firebase/admin';


export async function POST(req: NextRequest) {
  try {
    const authorization = req.headers.get('Authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authorization.split('Bearer ')[1];
    let decodedToken: adminAuth.DecodedIdToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      console.error('Error verifying token:', error);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { uid } = decodedToken;
    const formData = await req.formData();
    const file = formData.get('avatar') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const fileName = `avatars/${uid}/${file.name}`;
    const bucket = admin.storage().bucket();
    const fileRef = bucket.file(fileName);
    
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    await fileRef.save(fileBuffer, {
      metadata: { 
        contentType: file.type,
        cacheControl: 'public, max-age=31536000', // Cache for 1 year
       },
       public: true, // Make the file publicly accessible
    });
    
    // The public URL is straightforward with public:true
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    await admin.auth().updateUser(uid, {
      photoURL: publicUrl,
    });
    
    const userRef = admin.firestore().collection('users').doc(uid);
    await userRef.set({ photoURL: publicUrl }, { merge: true });


    return NextResponse.json({ photoURL: publicUrl });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
