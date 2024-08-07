import { Box } from "@mui/material";
import Header from "./header/Header";
import Content from "./content/Content";

import HomePage from "../views/HomePage/HomePage";
import Providers from "../context/Providers";
import Footer from "../views/HomePage/Footer/Footer";
import ModalCustom from "../components/ModalCustom/ModalCustom";

export default function Layout() {
  return (
    <Providers>
      <Box>
        <Header />
        {/* <HomePage /> */}
        <Content />
        <Footer />
      </Box>
      <ModalCustom />
    </Providers>
  );
}
