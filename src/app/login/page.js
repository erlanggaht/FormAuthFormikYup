"use client";
import React, { useEffect, useState } from "react";
import Forms from "../component/forms";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading (false) 
  }, []);


  return (
    <>
    <title>Login</title>
      <Forms
        title={"Sign in to your account"}
        submit={"Log in"}
        hiddenConfirmPass={"hidden"}
        loading={loading ? 'opacity-50' : 'opacity-100'}
        disabledInput={loading && "disabled" }
      />
    </>
  );
}
