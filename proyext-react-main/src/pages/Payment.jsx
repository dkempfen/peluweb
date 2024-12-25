import React, { useContext, useState } from "react";
import {
  Flex,
  Button,
  Input,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Text,
  useToast,
  Box,
} from "@chakra-ui/react";
import { CartContext } from "../context";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export const Payment = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { cartState } = useContext(CartContext);
  const toast = useToast();

  const isFormValid = name !== "" && lastName !== "" && email.includes("@");

  const handleCreateOrder = async () => {
    if (!isFormValid) {
      toast({
        title: "Formulario incompleto",
        description: "Por favor, completa todos los campos correctamente.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    const total = cartState.reduce(
      (acc, item) => acc + item.price * item.qtyItem,
      0
    );

    const orderObj = {
      buyer: { name, lastName, email },
      items: cartState.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        qty: item.qtyItem,
      })),
      total,
    };

    try {
      const ordersCollection = collection(db, "orders");
      const { id } = await addDoc(ordersCollection, orderObj);

      Swal.fire({
        icon: "success",
        title: "Orden creada exitosamente",
        text: `Tu identificador de orden es: ${id}`,
        confirmButtonText: "Aceptar",
      });

      setName("");
      setLastName("");
      setEmail("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear la orden",
        text: "Intenta nuevamente más tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      bgGradient="linear(to-r, teal.100, teal.50)"
      px={4}
    >
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        shadow="xl"
        w="full"
        maxW="500px"
        animation="fadeIn 0.5s"
      >
        <Heading
          textAlign="center"
          size="lg"
          mb={6}
          bgGradient="linear(to-r, teal.400, blue.500)"
          bgClip="text"
        >
          Crear Orden
        </Heading>

        <Text textAlign="center" mb={4} color="gray.500">
          Completa los datos para finalizar tu compra
        </Text>

        <VStack spacing={4}>
          <FormControl isInvalid={name === ""}>
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              placeholder="Ingresa tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              focusBorderColor="teal.400"
            />
            {name === "" && <FormErrorMessage>Nombre requerido.</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={lastName === ""}>
            <FormLabel>Apellido</FormLabel>
            <Input
              type="text"
              placeholder="Ingresa tu apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              focusBorderColor="teal.400"
            />
            {lastName === "" && <FormErrorMessage>Apellido requerido.</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={!email.includes("@")}>
            <FormLabel>Correo electrónico</FormLabel>
            <Input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              focusBorderColor="teal.400"
            />
            {!email.includes("@") && (
              <FormErrorMessage>Correo inválido.</FormErrorMessage>
            )}
          </FormControl>

          <Button
            colorScheme="teal"
            size="lg"
            w="full"
            mt={4}
            onClick={handleCreateOrder}
            isLoading={isSubmitting}
            isDisabled={!isFormValid || isSubmitting}
            _hover={{
              bgGradient: "linear(to-r, teal.400, blue.500)",
              color: "white",
            }}
          >
            Confirmar Orden
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};
