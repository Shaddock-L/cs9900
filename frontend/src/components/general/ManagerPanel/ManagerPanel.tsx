import React, { useEffect, useRef, useState } from "react";
import { useDeleteMenuItem, useMenu, useUpdateMenuItem } from "@src/services";

import Image from "next/image";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  Checkbox,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Tag,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { formatCurrency } from "@src/utils";
import { Icon } from "@src/components/display";
import { useForm } from "react-hook-form";
import { rest } from "lodash-es";

export function ManagerPanel() {
  const { menu } = useMenu({ category: "all" });

  return (
    <Accordion>
      {menu?.map((item) => {
        return (
          <AccordionItem key={crypto.randomUUID()}>
            <AccordionButton>
              <HStack>
                <Image src={item.img} alt={item.name} width={50} height={100} />
                <Text>{item.name}</Text>
                <CategoryTag category={item.category} />
                <Text color="green" fontWeight="semibold">
                  {formatCurrency(item.price)}
                </Text>
                {item.recommended && <Icon variant="like" />}
              </HStack>
            </AccordionButton>
            <AccordionPanel>
              <MenuItemEditor item={item} />
            </AccordionPanel>
          </AccordionItem>
        );
      })}
      <AccordionItem>
        <AccordionButton>Add New Menu Item</AccordionButton>
        <AccordionPanel>
          <NewMenuItemEditor />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

function NewMenuItemEditor() {
  const { isUpdating, updateMenuItem } = useUpdateMenuItem();
  const { register, handleSubmit,reset } = useForm({
    defaultValues: {
      id: null,
      name: "",
      category: "pizzas",
      price: 0,
      recommended: false,
      img: "",
      ingredients: "",
    },
  });

  const onUpdateMenuItem = handleSubmit((value) => {
    updateMenuItem(value)
    reset()
  });

  return (
    <VStack as="form" onSubmit={onUpdateMenuItem} alignItems="stretch">
      <HStack>
        <Input {...register("name")} flex={2} placeholder="Name" />
        <Select {...register("category")} flex={2} placeholder="Category">
          <option value="pizzas">pizzas</option>
          <option value="sides">sides</option>
          <option value="chicken">chicken</option>
          <option value="drinks-and-shakes">drinks-and-shakes</option>
          <option value="desserts">desserts</option>
        </Select>
        <NumberInput flex={1} placeholder="Price" precision={2} step={0.5}>
          <NumberInputField {...register("price")}/>
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Checkbox {...register("recommended")} flex={1}>
          Recommended
        </Checkbox>
      </HStack>
      <Input {...register("img")} placeholder="Image URL" />
      <Textarea {...register("ingredients")} placeholder="Ingredient" />
      <Button
        type="submit"
        isLoading={isUpdating}
        width="160px"
        colorScheme="green"
      >
        Save
      </Button>
    </VStack>
  );
}

type MenuItemEditorProps = {
  item: MenuItem;
};
function MenuItemEditor({ item }: MenuItemEditorProps) {
  const { isUpdating, updateMenuItem } = useUpdateMenuItem();
  const { register, handleSubmit } = useForm({
    defaultValues: item,
  });
  const onUpdateMenuItem = handleSubmit((value) => updateMenuItem(value));

  const { isDeleting, deleteMenuItem } = useDeleteMenuItem();
  const onDeleteItem = () => deleteMenuItem(item.id);

  return (
    <VStack as="form" onSubmit={onUpdateMenuItem} alignItems="stretch">
      <HStack>
        <Input
          {...register("name")}
          flex={2}
          placeholder="Name"
          defaultValue={item.name}
        />
        <Select {...register("category")} flex={2} placeholder="Category">
          <option value="pizzas">pizzas</option>
          <option value="sides">sides</option>
          <option value="chicken">chicken</option>
          <option value="drinks-and-shakes">drinks-and-shakes</option>
          <option value="desserts">desserts</option>
        </Select>
        <NumberInput
          flex={1}
          placeholder="Price"
          defaultValue={item.price}
          precision={2}
          step={0.5}
        >
          <NumberInputField {...register("price")} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Checkbox
          {...register("recommended")}
          flex={1}
          defaultChecked={item.recommended}
        >
          Recommended
        </Checkbox>
      </HStack>
      <Input
        {...register("img")}
        placeholder="Image URL"
        defaultValue={item.img}
      />
      <Textarea
        {...register("ingredients")}
        placeholder="Ingredient"
        defaultValue={item.ingredients}
      />
      <HStack>
        <Button
          type="submit"
          isLoading={isUpdating}
          width="160px"
          colorScheme="green"
        >
          Save
        </Button>
        <Button
          onClick={onDeleteItem}
          isLoading={isDeleting}
          width="160px"
          colorScheme="red"
        >
          Delete
        </Button>
      </HStack>
    </VStack>
  );
}

type CategoryTagProps = {
  category: Category;
};
function CategoryTag({ category }: CategoryTagProps) {
  const tagVariants: { [key in Category]: { bg: string; color?: string } } = {
    all: { bg: "#EEEEEE" },
    pizzas: { bg: "#d1d17f" },
    sides: { bg: "#e7df4d" },
    chicken: { bg: "#b8901b", color: "#FFFFFF" },
    "drinks-and-shakes": { bg: "#60905c", color: "#FFFFFF" },
    desserts: { bg: "#a4c49c", color: "#FFFFFF" },
  };

  return <Tag {...tagVariants[category]}>{category}</Tag>;
}
