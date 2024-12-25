import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { MdLocalShipping } from "react-icons/md";
import { CartContext } from "../../context";

const ItemDetail = ({ item, handleAddItem, handleRemoveItem, count }) => {
  const isOutOfStock = count >= item.stock;

  return (
    <Container maxW={"7xl"} py={{ base: 10, md: 16 }}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
        {/* Imagen del producto */}
        <Flex>
          <Image
            rounded={"md"}
            alt={item.title}
            src={item.thumbnail}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>

        {/* Detalles del producto */}
        <Stack spacing={6}>
          {/* Título y precio */}
          <Box>
            <Heading
              lineHeight={1.2}
              fontWeight={700}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {item.title}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
              mt={2}
            >
              ${item.price.toFixed(2)} USD
            </Text>
          </Box>

          {/* Descripción */}
          <VStack spacing={4} align="start">
            <Text fontSize={"lg"}>{item.description}</Text>
            <Text
              fontWeight="bold"
              color={item.stock < 5 ? "red.400" : "green.500"}
            >
              {item.stock < 5
                ? "¡Últimas unidades disponibles!"
                : `Stock disponible: ${item.stock}`}
            </Text>
          </VStack>

          {/* Controles de cantidad */}
          <Flex alignItems="center" gap={4}>
            <Button
              onClick={handleRemoveItem}
              isDisabled={count === 0}
              colorScheme="red"
              size="sm"
            >
              -
            </Button>
            <Text fontWeight="bold" fontSize="lg">
              {count}
            </Text>
            <Button
              onClick={handleAddItem}
              isDisabled={isOutOfStock}
              colorScheme="teal"
              size="sm"
            >
              +
            </Button>
          </Flex>

          {/* Envío */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            bg={useColorModeValue("gray.50", "gray.700")}
            p={3}
            borderRadius="md"
          >
            <Icon as={MdLocalShipping} w={6} h={6} color="teal.500" />
            <Text>Entrega estimada en 2-3 días hábiles.</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export const ItemDetailContainer = ({ item }) => {
  const [count, setCount] = useState(0);
  const { addItem, removeItem } = useContext(CartContext);

  const handleAddItem = () => {
    if (count < item.stock) {
      const newCount = count + 1;
      setCount(newCount);
      addItem(item, newCount);
    }
  };

  const handleRemoveItem = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      removeItem(item);
    }
  };

  return (
    <ItemDetail
      item={item}
      handleAddItem={handleAddItem}
      handleRemoveItem={handleRemoveItem}
      count={count}
    />
  );
};
