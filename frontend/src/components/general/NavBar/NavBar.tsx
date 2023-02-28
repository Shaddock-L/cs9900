import React from "react";
import Image from "next/image";
import { Link } from "@chakra-ui/react";
import { useAuth } from "@src/stores";

export function NavBar() {
  const { login } = useAuth();

  return (
    <div
      style={{
        height: 70,
        background: "#fff",
        width: "100%",
        padding: "0 50px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Image src="/logo.jpg" alt="logo" width="200" height="100" />
      <div>
        <Link
          color="black"
          style={{
            marginLeft: 50,
            fontWeight: "bold",
          }}
          flexGrow={1}
          mr={2}
        >
          MENU
        </Link>
        <Link
          color="black"
          style={{
            marginLeft: 50,
            fontWeight: "bold",
          }}
          flexGrow={1}
          mr={2}
        >
          OFFERS
        </Link>
        <Link
          color="black"
          style={{
            marginLeft: 50,
            fontWeight: "bold",
          }}
          flexGrow={1}
          mr={2}
        >
          STORES
        </Link>
        <Link
          color="black"
          style={{
            marginLeft: 50,
            fontWeight: "bold",
          }}
          flexGrow={1}
          mr={2}
        >
          GET THE APP
        </Link>
      </div>
    </div>
  );
}
