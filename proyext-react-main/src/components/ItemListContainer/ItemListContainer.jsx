import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Center,
  useColorModeValue,
  VStack,
  HStack,
  Tag,
  Icon,
} from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.300", "cyan.400");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Center py={6}>
      <Box
        w="xs"
        rounded="lg"
        overflow="hidden"
        bg={cardBg}
        borderWidth="1px"
        borderColor={borderColor}
        transition="all 0.3s"
        _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
      >
        {/* Imagen del producto */}
        <Box h="200px" borderBottomWidth="1px" borderColor={borderColor}>
          <Image
            src={item.thumbnail}
            alt={item.title}
            h="full"
            w="full"
            objectFit="cover"
          />
        </Box>

        {/* Detalles del producto */}
        <VStack align="start" p={4} spacing={2}>
          <Heading fontSize="lg" fontWeight="bold" noOfLines={1}>
            {item.title}
          </Heading>
          <Text fontSize="sm" color={textColor} noOfLines={2}>
            {item.description}
          </Text>

          {/* Etiquetas de precio y rating */}
          <HStack>
            <Tag bg="yellow.400" color="white" size="sm">
              ★ {item.rating.toFixed(1)}
            </Tag>
            <Tag bg="green.500" color="white" size="sm">
              ${item.price.toFixed(2)}
            </Tag>
          </HStack>
        </VStack>

        {/* Botón de acción */}
        <HStack
          as={Link}
          to={`/item/${item.id}`}
          align="center"
          justify="space-between"
          px={4}
          py={2}
          bg={useColorModeValue("gray.100", "gray.700")}
          _hover={{ bg: useColorModeValue("gray.200", "gray.600") }}
          borderTopWidth="1px"
          borderColor={borderColor}
        >
          <Text fontSize="sm" fontWeight="medium">
            Ver más
          </Text>
          <Icon as={BsArrowRight} w={5} h={5} />
        </HStack>
      </Box>
    </Center>
  );
};

export const ItemListContainer = ({ products }) => {
  return (
    <Flex wrap="wrap" justify="center" gap={6} p={4}>
      {products.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </Flex>
  );
};
