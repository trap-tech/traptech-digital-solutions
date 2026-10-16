import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { requestSchema, type Service } from '@/lib/dashboard';

export function RequestForm({ services }: { services: Service[] }) {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError('');
    const parsed = requestSchema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    if (!parsed.success) { setError(parsed.error.issues[0]?.message || 'Check your details'); return; }
    setBusy(true);
    const { name, email, phone, service, message } = parsed.data;
    const result = await supabase.rpc('submit_request', { _name: name, _email: email, _phone: phone, _service: service, _message: message });
    setBusy(false);
    if (result.error) setError(result.error.message); else setSent(true);
  }
  if (sent) return <div className="py-12 text-center space-y-4"><CheckCircle2 className="mx-auto size-10 text-primary" /><h3 className="text-2xl font-semibold">Request received</h3><p className="text-muted-foreground">Thank you. Trap Tech will get back to you.</p><Button variant="outline" onClick={() => setSent(false)}>Send another request</Button></div>;
  return <form onSubmit={submit} className="space-y-5 text-left mt-10 border-t border-border pt-8">
    <h3 className="text-2xl font-semibold">Request a service</h3>
    <div className="grid sm:grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="request-name">Name</Label><Input id="request-name" name="name" required maxLength={100} autoComplete="name" /></div><div className="space-y-2"><Label htmlFor="request-email">Email</Label><Input id="request-email" name="email" type="email" required maxLength={255} autoComplete="email" /></div></div>
    <div className="space-y-2"><Label htmlFor="request-phone">Phone (optional)</Label><Input id="request-phone" name="phone" type="tel" maxLength={30} autoComplete="tel" /></div>
    <div className="space-y-2"><Label htmlFor="request-service">Service</Label><select id="request-service" name="service" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="">Choose a service</option>{services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}<option value="Other">Other</option></select></div>
    <div className="space-y-2"><Label htmlFor="request-message">Message</Label><Textarea id="request-message" name="message" required maxLength={2000} rows={4} /></div>
    {error && <p role="alert" className="text-destructive text-sm">{error}</p>}
    <Button type="submit" disabled={busy}><Send />{busy ? 'Sending…' : 'Send request'}</Button>
  </form>;
}