"use client";
import React, { useEffect, useState } from "react";
import Forms from "../component/forms";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleRegister = () => {
    
  }

  return (
    <>
    <title>Register</title>
      <Forms
        title={"Register new account"}
        hidden={"hidden"}
        submit={"Sign up"}
        loading={loading ? "opacity-50" : "opacity-100"}
        disabledInput={loading && "disabled"}
      />
    </>
  );
}
