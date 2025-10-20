import React from "react";

export default function ViewContent({ children }) {
  return (
    <section className="mt-8 w-full min-h-100">
      <div className=" w-full">
        {children}
      </div>
    </section>
  );
}