import React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";

const root = createRoot(document.body);
root.render(
  <h2 className="text-3xl font-bold underline text-red-500">
    Hello from React!
    <Button variant="outline">Button</Button>
  </h2>
);
