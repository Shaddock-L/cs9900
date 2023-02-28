import React, { useEffect } from "react";
import { useGetTable } from "@src/services/table.api";

import { Container, Table } from "@src/components";

export default function TablePage() {
  const { isFetchingTable, tables } = useGetTable();

  useEffect(() => {
    console.log("Fetching tables...");
  }, [isFetchingTable]);

  if (!tables) {
    return <></>;
  }

  return (
    <Container pageTitle="Table">
      <Table tables={tables} />
    </Container>
  );
}
