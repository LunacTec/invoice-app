import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

import { AuthProvider } from "@/lib/auth";
import theme from "@/styles/theme";

const GlobalStyle = ({ children }) => {
    return (
        <>
            <Head>
                <meta
                    content="width=device-width, initial-scale=1"
                    name="viewport"
                />
            </Head>
            {children}
        </>
    );
};

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider resetCSS theme={theme}>
            <AuthProvider>
                <GlobalStyle>
                    <Component {...pageProps} />
                </GlobalStyle>
            </AuthProvider>
        </ChakraProvider>
    );
}

export default MyApp;
