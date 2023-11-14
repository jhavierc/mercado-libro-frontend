import { Title } from "../Title";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductCard from "../Card/ProductCard";
import { Box} from "@chakra-ui/react";
import { Book } from "../../types/product";
import { useEffect, useState } from "react";
import { getNewBooks } from "../../services/BookService";

interface Props {
  title: string;
  filtro: string

}

const ProductsCarousel = ({ title, filtro}: Props) => {  
  const [newBook, setNewBook] = useState<Book[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    getNewBooks(filtro)
    .then((res) => {
      console.log(res);
      setNewBook(res.content);
    });
  }, []);

  
  return (
    <Box>
      <Title htmlElement={"h2"} size="lg" text={title} />
      <Box mt={8} px={{base: 6, lg: 10}} position={"relative"}>
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          className="productsSwiper"
          loop={true}
        >
          {newBook?.map((item) => { console.log(item)
            return (
            <SwiperSlide>
              <ProductCard
                  id={item.id}
                  image_links={item.image_links}
                  title={item.title}
                  authors={item.authors}
                  price={item.price}
                  stock={item.stock}      />
            </SwiperSlide>
          )})}
        </Swiper>
      </Box>
    </Box>
  );
};

export default ProductsCarousel;
