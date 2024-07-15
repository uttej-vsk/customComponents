'use client'
import dynamic from 'next/dynamic';
import { type RegisteredComponent } from "@builder.io/sdk-react";

export const customComponents: RegisteredComponent[] = [
  {
    component: dynamic(() => import('./Button')),
    name: 'Button',
  },
];