import React from "react";
import { Tab, TabList, Tabs } from "@chakra-ui/react";

type CategoryProps = {
  categories: CategoryItem[];
  onSelectCategory: (category: Category) => void;
};
export function Category({ categories, onSelectCategory }: CategoryProps) {
  return (
    <Tabs
      variant="soft-rounded"
      padding="16px"
      borderRadius="8px"
      background="#FFFFFF"
      colorScheme="green"
    >
      <TabList>
        {categories.map((category) => (
          <Tab key={category.id} onClick={() => onSelectCategory(category.id)}>
            {category.label}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
}
