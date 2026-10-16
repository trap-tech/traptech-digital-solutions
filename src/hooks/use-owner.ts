import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useOwner() {
  const [state, setState] = useState({ loading: true, signedIn: false, owner: false, error: '' });
  useEffect(() => {
    let active = true;
    let version = 0;
    const check = async () => {
      const current = ++version;
      const { data, error } = await supabase.auth.getUser();
      if (!data.user) {
        if (active && current === version) setState({ loading: false, signedIn: false, owner: false, error: '' });
        return;
      }
      const role = await supabase.rpc('has_role', { _user_id: data.user.id, _role: 'admin' });
      if (active && current === version) setState({ loading: false, signedIn: true, owner: role.data === true, error: error?.message || role.error?.message || '' });
    };
    const { data: listener } = supabase.auth.onAuthStateChange(() => { setTimeout(check, 0); });
    void check();
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);
  return state;
}