import { Flex, Image, useColorMode } from '@chakra-ui/react';
import userAtom from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';
import { Link as RouterLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import LogoutButton from './LogoutButton';
import { BsFillChatQuoteFill } from 'react-icons/bs';
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  return (
    <>
      <Flex justifyContent={'space-between'} mt={6} mb={12}>
        {user && (
          <RouterLink to="/">
            <AiFillHome size={24} />
          </RouterLink>
        )}

        <Image
          cursor={'pointer'}
          alt="logo"
          w={6}
          src={colorMode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'}
          onClick={toggleColorMode}
        />

        {user && (
          <Flex alignItems={'center'} gap={4}>
            <RouterLink to={`/${user.username}`}>
              <RxAvatar size={24} />
            </RouterLink>
            <RouterLink to={`/chat`}>
              <BsFillChatQuoteFill size={20} />
            </RouterLink>
            <LogoutButton />
          </Flex>
        )}
      </Flex>
    </>
  );
};
export default Header;
