import { ReactNode, useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import router from "next/router";
import axios from "axios";

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

const api = axios.create({
  baseURL: `http://localhost:5000/api/user`,
});

export default function ProfileNav({ id }) {
  const querystring = require("querystring");
  const [name, setName] = useState("");
  const u_id = querystring.stringify(id).replace(/=$|=(?=&)/g, "");
  const [users, setUser] = useState([]);

  useEffect(() => {
    getProfile();
  });

  const getProfile = async () => {
    let data = await api.get("/").then(({ data }) => data);
    setUser(data);
    users.map((users) => {
      if (id == users.email) {
        setName(users.name);  
      }
      else{
        " "
      }
  })}
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        bg={useColorModeValue("white.100", "white.900")}
        px={30}
        boxShadow={"xl"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {colorMode === "light" ? (
            <Image
              alt={"Logo"}
              objectFit={"contain"}
              h={10}
              w={100}
              src={
                "https://firebasestorage.googleapis.com/v0/b/rentify-4f59b.appspot.com/o/rentify%20reloaded%2FAsset%202.png?alt=media&token=05e10e38-c299-4b1b-b7b4-a4b591dbad26"
              }
            />
          ) : (
            <Image
              alt={"Logo"}
              objectFit={"contain"}
              h={10}
              w={100}
              src={
                "https://firebasestorage.googleapis.com/v0/b/rentify-4f59b.appspot.com/o/rentify%20reloaded%2FAsset%203.png?alt=media&token=1e5548f5-a3ba-4077-aa51-eb8287055c65"
              }
            />
          )}
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{name}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/");
                      window.history.pushState(
                        null,
                        document.title,
                        window.location.href
                      );
                      window.addEventListener("popstate", function (event) {
                        window.history.pushState(
                          null,
                          document.title,
                          window.location.href
                        );
                      });
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
