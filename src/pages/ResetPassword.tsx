import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [recovery, setRecovery] = useState(false);
  const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  useEffect(() => {
    const recoveryLink = new URLSearchParams(window.location.hash.slice(1)).get('type') === 'recovery';
    const { data } = supabase.auth.onAuthStateChange((event) => { if (event === 'PASSWORD_RECOVERY') setRecovery(true); });
    if (recoveryLink) void supabase.auth.getUser().then(({ data }) => setRecovery(Boolean(data.user)));
    return () => data.subscription.unsubscribe();
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = new FormData(e.currentTarget); const password = String(form.get('password'));
    if (password !== form.get('confirm')) { setError('Passwords do not match.'); return; }
    setBusy(true); const { error } = await supabase.auth.updateUser({ password }); setBusy(false);
    if (error) setError(error.message); else navigate('/dashboard');
  }
  return <main className="min-h-screen flex items-center justify-center px-6"><div className="max-w-sm w-full space-y-6"><p className="font-semibold text-primary">Trap Tech</p><h1 className="text-3xl font-bold">New password</h1>{recovery ? <form onSubmit={submit} className="space-y-5"><Label htmlFor="new-password">Password</Label><Input id="new-password" name="password" type="password" minLength={8} maxLength={128} required autoComplete="new-password" /><Label htmlFor="confirm-password">Confirm password</Label><Input id="confirm-password" name="confirm" type="password" minLength={8} maxLength={128} required autoComplete="new-password" /><Button disabled={busy} type="submit">{busy ? 'Saving…' : 'Save password'}</Button></form> : <p className="text-muted-foreground">Open the password reset link from your email. If it has expired, request a new one.</p>}{error && <p role="alert" className="text-destructive">{error}</p>}<Button asChild variant="link"><Link to="/login">Back to sign in</Link></Button></div></main>;
}