import React from "react";
import { DebouncedFunc } from "lodash-es";

import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Icon } from "@src/components";

type MenuSearchBarProps = {
  onSearch: DebouncedFunc<(event: React.ChangeEvent<HTMLInputElement>) => void>;
};
export function MenuSearchBar({ onSearch }: MenuSearchBarProps) {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Icon variant="search" color="gray.300" />
      </InputLeftElement>
      <Input
        onChange={onSearch}
        type="tel"
        placeholder="Search your favorite"
      />
    </InputGroup>
  );
}
