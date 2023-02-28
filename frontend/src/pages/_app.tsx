import theme from "../theme";
import { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider } from "@chakra-ui/react";
import { useAuth } from "@src/stores";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isEmpty } from "lodash-es";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    if (!isEmpty(router.query)) login(router.query.role as Role);
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
