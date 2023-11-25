import { Avatar, Flex, Text } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { selectedConversationAtom } from '../atoms/conversationsAtom';
import userAtom from '../atoms/userAtom';

const Message = ({ message, ownMessage }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const currentUser = useRecoilValue(userAtom);
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={'flex-end'}>
          <Text maxW={'350px'} bg={'blue.600'} p={1} borderRadius={'md'}>
            {message.text}
          </Text>
          <Avatar src={currentUser.profilePicture} w={7} h={7} />
        </Flex>
      ) : (
        <Flex gap={2} alignSelf={'flex-start'}>
          <Avatar src={selectedConversation.userProfilePicture} w={7} h={7} />
          <Text maxW={'350px'} bg={'gray.600'} p={1} borderRadius={'md'}>
            {message.text}
          </Text>
        </Flex>
      )}
    </>
  );
};
export default Message;
