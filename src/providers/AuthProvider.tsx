import React, { createContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/gotrue-js";

interface Context {
  session: Session | null;
}

export const AuthContext = createContext<Context>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<null | Session>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_, sess) => {
      setSession(sess);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};
