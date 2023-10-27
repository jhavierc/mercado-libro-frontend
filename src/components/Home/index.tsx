import { Box, Container } from "@chakra-ui/react";
import Banner from "./Banner";
import NewsCarousel from "./NewsCarousel";
import TrendingCarousel from "./TrendingCarousel";
import Categories from "./Categories";
import Services from "./Services";

const Home = () => {
  return (
    <Box>
      <Banner />
      <Container maxW={"container.xl"} mt={12} mb={20}>
        <Box>
          <NewsCarousel />
        </Box>
        <Box my={5}>
          <TrendingCarousel />
        </Box>
        <Categories />
        <Services />
      </Container>
    </Box>
  );
};

export default Home;