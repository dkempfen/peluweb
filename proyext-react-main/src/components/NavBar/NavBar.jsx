import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Icon, // Asegúrate de importar Icon para el ícono
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { CartWidget } from "../CartWidget";
import { useItems } from "../../hooks";
import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi"; // Importa el ícono de carrito


export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { itemsData } = useItems("categories");

  // Colores dinámicos según el modo claro/oscuro
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("gray.800", "white");
  const hoverBg = useColorModeValue("gray.300", "gray.700");
  const buttonBg = useColorModeValue("blue.500", "blue.300");

  return (
    <Box bg={bg} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo como ícono de carrito */}
        <Link to="/">
          <Box
            _hover={{ transform: "scale(1.1)" }}
            transition="all 0.2s ease-in-out"
          >
            <Icon as={HiShoppingCart} boxSize="40px" color={color} />
          </Box>
        </Link>

        {/* Categorías con menú */}
        <Menu>
          <MenuButton
            as={Button}
            cursor="pointer"
            bg={buttonBg}
            color="white"
            _hover={{ bg: useColorModeValue("blue.400", "blue.200") }}
            ml={6}
          >
            Categorías
          </MenuButton>
          <MenuList bg={useColorModeValue("white", "gray.800")} maxH="300px" overflowY="scroll">
            {itemsData.map((category) => (
              <MenuItem
                key={category.slug}
                _hover={{ bg: hoverBg, color: color }}
              >
                <Link to={`/category/${category.slug}`}>{category.name}</Link>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        {/* Zona de Widgets (Carrito, Switch de modo, Avatar) */}
        <Flex alignItems="center">
          <CartWidget />
          <Stack direction="row" spacing={7}>
            {/* Botón de modo claro/oscuro */}
            <Button onClick={toggleColorMode} bg={buttonBg} color="white" _hover={{ bg: hoverBg }}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            {/* Menú de usuario con Avatar */}
            <Menu>
            <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
              <Avatar
                size="sm"
                src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=ShirtScoopNeck&clotheColor=Gray&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
              />
            </MenuButton>
            <MenuList alignItems="center" bg={useColorModeValue("white", "gray.800")}>
              <br />
              <Center>
                <Avatar
                  size="2xl"
                  src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=ShirtScoopNeck&clotheColor=Gray&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                />
              </Center>

                <br />
                <Center>
                  <Box fontWeight="bold" color={color}>User</Box>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem _hover={{ bg: hoverBg, color: color }}>Tu Perfil</MenuItem>
                <MenuItem _hover={{ bg: hoverBg, color: color }}>Ajustes de Cuenta</MenuItem>
                <MenuItem _hover={{ bg: hoverBg, color: color }}>Cerrar Sesión</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};
