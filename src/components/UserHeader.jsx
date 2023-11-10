import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BsInstagram } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';
import { useToast } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import useShowToast from '../hooks/useShowToast';

const UserHeader = ({ user }) => {
  // user is the current user page that we are lookin in - got it from the server thru petition
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom); // this is the logged in user - localStorage obtained from
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  );
  const showToast = useShowToast();
  const [updating, setUpdating] = useState(false);

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast('Error', 'please login to follow', 'error');
      return;
    }
    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }

      if (following) {
        showToast(
          'Success',
          `Unfollowed ${user.username}successfully`,
          'success'
        );
        user.followers.pop(); // simulating the sustraction of a follower to the current render state
      } else {
        showToast(
          'Success',
          `Followed ${user.username}successfully`,
          'success'
        );
        user.followers.push(currentUser._id); // simulating the adition of a follower to the current render state
      }
      setFollowing(!following);
    } catch (error) {
      showToast('Error', error, 'error');
    } finally {
      setUpdating(false);
    }
  };

  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        title: 'link copied',
        status: 'success',
        description: 'profile link copied successfully',
        duration: 2500,
        isClosable: true,
      });
    });
  };
  return (
    <VStack gap={4} alignItems={'start'}>
      <Flex justifyContent={'space-between'} w={'full'}>
        <Box>
          <Text
            fontSize={{
              base: 'lg',
              md: '2xl',
            }}
            fontWeight={'bold'}
          >
            {user.name}
          </Text>
          <Flex gap={2} alignItems={'center'}>
            <Text fontSize={'sm'}>{user.username}</Text>
            <Text
              fontSize={'xs'}
              bg={'gray.dark'}
              color={'gray.light'}
              p={1}
              borderRadius={'full'}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {/*// Avatar*/}
          {user.profilePicture ? (
            <Avatar
              name={user.name}
              src={user.profilePicture}
              size={{ base: 'md', md: 'xl' }}
            />
          ) : (
            <Avatar
              name={user.name}
              src="/noUserAvatar.png"
              size={{ base: 'md', md: 'xl' }}
            />
          )}
        </Box>
      </Flex>
      <Text>{user.bio}</Text>

      {currentUser?._id === user._id && (
        <RouterLink to="/update">
          <Button size={'sm'}>Update Profile</Button>
        </RouterLink>
      )}

      {currentUser?._id !== user._id && (
        <Button onClick={handleFollowUnfollow} size={'sm'} isLoading={updating}>
          {following ? 'unfollow' : 'follow'}
        </Button>
      )}

      <Flex w={'full'} justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'}>
          <Text color={'gray.light'}>{user.followers.length} followers</Text>
          <Box w={1} h={1} bg={'gray.light'} borderRadius={'full'}></Box>
          <Link color={'gray.light'}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={'pointer'} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={'pointer'} />
              </MenuButton>
              <Portal>
                <MenuList bg={'gray.dark'}>
                  <MenuItem bg={'gray.dark'} onClick={copyUrl}>
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={'full'}>
        <Flex
          flex={1}
          borderBottom={'1px solid white'}
          justifyContent={'center'}
          pb="3"
          cursor={'pointer'}
        >
          <Text fontWeight={'bold'}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={'1px solid gray'}
          color={'gray.light'}
          justifyContent={'center'}
          pb="3"
          cursor={'pointer'}
        >
          <Text fontWeight={'bold'}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};
export default UserHeader;
