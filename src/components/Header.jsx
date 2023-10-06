import { Flex, Image, useColorMode } from '@chakra-ui/react';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Flex justifyContent={'center'}>
        <Image
          cursor={'pointer'}
          alt="logo"
          w={6}
          src={colorMode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'}
          onClick={toggleColorMode}
        />
      </Flex>
    </>
  );
};
export default Header;