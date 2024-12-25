import React from 'react';
import { Box, Text, Flex, IconButton, Stack, Link, useColorModeValue } from "@chakra-ui/react";
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  // useColorModeValue: define el color del fondo según el modo de color
  const footerBg = useColorModeValue("gray.800", "black"); // gris oscuro en modo claro, negro en modo oscuro
  const textColor = useColorModeValue("white", "gray.300"); // blanco en modo claro, gris claro en modo oscuro

  return (
    <>
      <Box as="footer" bg={footerBg} color={textColor} py={6} px={8}>
        <Stack spacing={4} align="center">
          <Text fontSize="lg" fontWeight="bold">CleverShop</Text>
          
          <Text fontSize="sm">
            Dirección: Ciudad Jardín, Buenos Aires, Argentina
          </Text>
          
          <Flex gap={4} align="center">
            <Link href="https://instagram.com/clevershop" isExternal>
              <IconButton
                icon={<FaInstagram />}
                aria-label="Instagram"
                colorScheme="pink"
                variant="ghost"
                size="lg"
              />
            </Link>
            <Link 
              href="https://www.google.com/maps/place/Ciudad+Jard%C3%ADn,+Buenos+Aires,+Argentina" 
              isExternal
            >
              <IconButton
                icon={<FaMapMarkerAlt />}
                aria-label="Ubicación"
                colorScheme="red"
                variant="ghost"
                size="lg"
              />
            </Link>
          </Flex>

          <Text fontSize="sm" color="gray.400">
            © 2024 - Todos los derechos reservados.
          </Text>
        </Stack>
      </Box>

      <Link
        href="https://wa.me/541160463213?text=Hola%20CleverShop,%20quiero%20más%20información%20sobre%20sus%20productos!"
        isExternal
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
      >
        <IconButton
          icon={<FaWhatsapp />}
          aria-label="WhatsApp"
          colorScheme="whatsapp"
          size="lg"
          isRound
        />
      </Link>
    </>
  );
};

export default Footer;
