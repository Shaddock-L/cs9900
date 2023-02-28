import { useState } from "react";

import {
  Button,
  Flex,
  HStack,
  Image,
  Select,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { Container, Icon } from "@src/components";
import { isEmpty } from "lodash-es";
import { useRouter } from "next/router";
import { useOrder } from "@src/stores";
import { useGetTable } from "@src/services";

export default function HomePage() {
  const router = useRouter();
  const { startOrder } = useOrder();
  const { tables } = useGetTable();

  const onSelectTable = (table: { id: number; label: string }) => {
    startOrder(table);
    router.push(`${router.asPath}/menu`);
  };

  return (
    <Container pageTitle="Home">
      <VStack paddingTop="10vh">
        <SelectTableSection
          tables={tables ?? []}
          onSelectTable={onSelectTable}
        />

        <HeroSection />
      </VStack>
    </Container>
  );
}

type SelectTableSectionProps = {
  tables: Table[];
  onSelectTable: (table: { id: number; label: string }) => void;
};
function SelectTableSection({
  tables,
  onSelectTable,
}: SelectTableSectionProps) {
  const [id, setId] = useState(-1);

  return (
    <HStack borderRadius="8px" padding="16px" background="#FFFFFF">
      <Select
        onChange={(event) => setId(parseInt(event.target.value, 10))}
        placeholder="Select Your Table"
      >
        {tables.map(
          ({ id, label, available }) =>
            available && (
              <option key={label + id} value={id}>
                {label}
              </option>
            )
        )}
      </Select>

      <Button
        disabled={id === -1}
        onClick={() => onSelectTable({ id, label: tables[id].label })}
      >
        Start
      </Button>
    </HStack>
  );
}

function HeroSection() {
  return (
    <>
      <Flex alignItems="center" justifyContent="center">
        <Image
          fit="cover"
          src="/banner.png"
          alt="banner"
          width="50%"
          padding="30px"
        />
      </Flex>
      <Stack direction="row" spacing={4}>
        <Button
          leftIcon={<Icon variant="email" />}
          colorScheme="teal"
          variant="solid"
        >
          Email
        </Button>
        <Button
          rightIcon={<Icon variant="phone" />}
          colorScheme="teal"
          variant="outline"
        >
          Call us
        </Button>
      </Stack>
    </>
  );
}
