import React from "react";
import {
  Icon as CKIcon,
  IconProps as CKIconProps,
  Spinner,
} from "@chakra-ui/react";
import { BsSearch, BsCheckCircle, BsXCircle } from "react-icons/bs";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiFillLike,
  AiOutlineExclamationCircle,
  AiOutlineCheckCircle,
} from "react-icons/ai";

export const iconVariants = {
  search: BsSearch,
  email: AiOutlineMail,
  phone: AiOutlinePhone,
  like: AiFillLike,
  loading: Spinner,
  check: BsCheckCircle,
  cross: BsXCircle,
  attention: AiOutlineExclamationCircle,
  available: AiOutlineCheckCircle,
};

export type IconVariants = keyof typeof iconVariants;
export type IconProps = {
  variant: IconVariants;
} & CKIconProps;
export function Icon({ variant }: IconProps) {
  return <CKIcon as={iconVariants[variant]} />;
}
