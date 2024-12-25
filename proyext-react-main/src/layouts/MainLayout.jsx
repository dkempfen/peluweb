import { Box } from "@chakra-ui/react";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box flex="1">{children}</Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
