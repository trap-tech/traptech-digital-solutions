import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, LockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { useOwner } from '@/hooks/use-owner';
import '@lovable.dev/cloud-auth-js/styles.css';

export default function Login() {
  const auth = useOwner();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  if (auth.owner) return <Navigate to="/dashboard" replace />;
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(''); setMessage(''); setBusy(true);
    const values = new FormData(e.currentTarget);
    const email = String(values.get('email')).trim(); const password = String(values.get('password') || '');
    const result = mode === 'forgot' ? await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` }) : mode === 'signup' ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/login` } }) : await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (result.error) setError(result.error.message);
    else if (mode === 'signup') setMessage('Check your email to confirm your owner account, then sign in.');
    else if (mode === 'forgot') setMessage('If this account exists, a reset link has been sent.');
  }
  async function social(provider: 'google' | 'lovable') {
    setError(''); setBusy(true);
    const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/login` });
    if (result.error) setError(result.error.message);
    setBusy(false);
  }
  return <main className="min-h-screen bg-background flex flex-col px-6 py-8">
    <Button variant="ghost" className="self-start" asChild><Link to="/"><ArrowLeft />Back to website</Link></Button>
    <div className="w-full max-w-sm m-auto py-12 space-y-7">
      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center"><LockKeyhole className="text-primary size-6" /></div>
      <div><p className="text-primary font-semibold mb-2">Trap Tech</p><h1 className="text-3xl font-bold">{mode === 'signup' ? 'Set up owner account' : mode === 'forgot' ? 'Reset your password' : 'Owner sign in'}</h1><p className="mt-3 text-muted-foreground text-sm">Private access for the Trap Tech owner.</p></div>
      {auth.signedIn && !auth.owner ? <div className="space-y-4"><p role="alert" className="text-destructive">{auth.error || 'This account does not have owner access. Use your business email account.'}</p><Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button></div> : <>
      <form onSubmit={submit} className="space-y-5"><div className="space-y-2"><Label htmlFor="login-email">Email</Label><Input id="login-email" name="email" type="email" autoComplete="email" required maxLength={255} /></div>{mode !== 'forgot' && <div className="space-y-2"><Label htmlFor="login-password">Password</Label><Input id="login-password" name="password" type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} required minLength={8} maxLength={128} /></div>}<Button className="w-full" disabled={busy || auth.loading} type="submit">{busy ? 'Please wait…' : mode === 'signup' ? 'Create account' : mode === 'forgot' ? 'Send reset link' : 'Sign in'}</Button></form>
      {mode === 'login' && <div className="space-y-3"><Button variant="outline" className="w-full" disabled={busy} onClick={() => social('google')}>Sign in with Google</Button><Button className="lovable-auth-button w-full" disabled={busy} onClick={() => social('lovable')}>Sign in with Lovable</Button></div>}
      <div className="flex flex-wrap justify-between gap-2"><Button variant="link" className="px-0" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMessage(''); setError(''); }}>{mode === 'login' ? 'Set up owner account' : 'Back to sign in'}</Button>{mode === 'login' && <Button variant="link" className="px-0" onClick={() => setMode('forgot')}>Forgot password?</Button>}</div></>}
      {error && <p className="text-destructive text-sm" role="alert">{error}</p>}{message && <p className="text-primary text-sm" role="status">{message}</p>}
    </div>
  </main>;
}