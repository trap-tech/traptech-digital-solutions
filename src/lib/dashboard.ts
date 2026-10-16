import { z } from 'zod';
import { Monitor, Play, Shield, Globe, FileText, Download } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

export type Service = Tables<'services'>;
export type CustomerRequest = Tables<'customer_requests'>;
export const serviceIcons = { Monitor, Play, Shield, Globe, FileText, Download };
export const requestSchema = z.object({
  name: z.string().trim().min(1, 'Enter your name').max(100),
  email: z.string().trim().email('Enter a valid email').max(255),
  phone: z.string().trim().max(30),
  service: z.string().min(1, 'Choose a service').max(100),
  message: z.string().trim().min(1, 'Enter a message').max(2000),
});
export const serviceSchema = z.object({ title: z.string().trim().min(1).max(100), description: z.string().trim().min(1).max(1000), icon: z.enum(['Monitor', 'Play', 'Shield', 'Globe', 'FileText', 'Download']), active: z.boolean(), sort_order: z.number().int() });