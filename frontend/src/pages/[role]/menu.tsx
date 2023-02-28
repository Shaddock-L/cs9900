import React from "react";

import { Container, CustomerPanel, ManagerPanel } from "@src/components";
import { useAuth } from "@src/stores";

export default function MenuPage() {
  const { role } = useAuth();

  return (
    <Container pageTitle="Menu">
      {role === "customer" && <CustomerPanel />}
      {role === "manager" && <ManagerPanel />}
    </Container>
  );
}
