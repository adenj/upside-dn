import React, { useState } from "react";
import { supabase } from "../../supabaseClient";

export const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) {
        throw error;
        alert("Check your email for the login link");
      }
    } catch (error) {
      alert(error.error_description || error.mesage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sign in</h1>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        disabled={loading}
        onClick={(e) => {
          e.preventDefault();
          handleLogin(email);
        }}
      >
        {loading ? "Loading..." : "Send magic link"}
      </button>
    </div>
  );
};
