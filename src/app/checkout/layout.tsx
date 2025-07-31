'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const steps = [
  { name: 'Shipping', href: '/checkout' },
  { name: 'Payment', href: '/checkout/payment' },
  { name: 'Summary', href: '/checkout/summary' },
];

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentStepIndex = steps.findIndex((step) => step.href === pathname);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-center font-headline">Checkout</h1>
      
      <nav aria-label="Progress" className="mb-12">
        <ol role="list" className="flex items-center justify-center">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className={cn('relative', stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '')}>
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className={cn('h-0.5 w-full', stepIdx < currentStepIndex ? 'bg-primary' : 'bg-border')} />
                  </div>
                  <Link
                    href={step.href}
                    className={cn(
                      'relative flex h-8 w-8 items-center justify-center rounded-full',
                      stepIdx < currentStepIndex ? 'bg-primary hover:bg-primary/90' : '',
                      stepIdx === currentStepIndex ? 'bg-primary ring-4 ring-primary/30' : '',
                      stepIdx > currentStepIndex ? 'bg-border group-hover:bg-gray-300' : ''
                    )}
                  >
                    {stepIdx < currentStepIndex ? (
                      <Check className="h-5 w-5 text-primary-foreground" />
                    ) : (
                      <span className={cn("text-sm", stepIdx <= currentStepIndex ? "text-primary-foreground" : "text-muted-foreground")}>{stepIdx + 1}</span>
                    )}
                     <span className="absolute top-10 w-max text-center text-sm font-medium">{step.name}</span>
                  </Link>
                </>
            </li>
          ))}
        </ol>
      </nav>
      
      {children}
    </div>
  );
}
