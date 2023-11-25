import {
  Avatar,
  Flex,
  Text,
  Image,
  useColorModeValue,
  Divider,
  SkeletonCircle,
  Skeleton,
} from '@chakra-ui/react';
import Message from './Message';
import MessageInput from './MessageInput';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedConversationAtom } from '../atoms/conversationsAtom';
import { useEffect, useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import userAtom from '../atoms/userAtom';
const MessageContainer = () => {
  const showToast = useShowToast();
  // prettier-ignore
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const currentUser = useRecoilValue(userAtom);
  //const participantUser = selectedConversation.participants[0];
  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessages(true);
      setMessages([]);
      try {
        const res = await fetch(`/api/messages/${selectedConversation.userId}`);
        const data = await res.json();
        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }
        setMessages(data);
      } catch (error) {
        showToast('Error', error.message, 'error');
      } finally {
        setLoadingMessages(false);
      }
    };
    getMessages();
  }, [selectedConversation.userId]);
  return (
    <>
      <Flex
        flex={70}
        bg={useColorModeValue('gray.200', 'gray.dark')}
        borderRadius={'md'}
        flexDirection={'column'}
        px={2}
      >
        {/* Message Header */}
        <Flex w={'full'} h={12} alignItems={'center'} gap={2}>
          <Avatar src={selectedConversation.userProfilePicture} size={'sm'} />
          <Text display={'flex'} alignItems={'center'}>
            {selectedConversation.username}
            <Image src="/verified.png" w={4} h={4} ml={1} />
          </Text>
        </Flex>
        <Divider />
        <Flex
          flexDirection={'column'}
          gap={4}
          my={4}
          px={2}
          height={'400px'}
          overflowY={'auto'}
        >
          {loadingMessages &&
            [...Array(5)].map((_, i) => (
              <Flex
                key={i}
                gap={2}
                alignItems={'center'}
                p={1}
                borderRadius={'md'}
                alignSelf={i % 2 === 0 ? 'flex-start' : 'flex-end'}
              >
                {i % 2 === 0 && <SkeletonCircle size={7} />}
                <Flex flexDirection={'column'} gap={2}>
                  <Skeleton h={'8px'} w={'250px'} />
                  <Skeleton h={'8px'} w={'250px'} />
                  <Skeleton h={'8px'} w={'250px'} />
                </Flex>
                {i % 2 !== 0 && <SkeletonCircle size={7} />}
              </Flex>
            ))}
          {!loadingMessages &&
            messages.map((message) => {
              return (
                <Message
                  key={message._id}
                  message={message}
                  ownMessage={currentUser._id === message.sender}
                />
              );
            })}
        </Flex>

        <MessageInput setMessages={setMessages} />
      </Flex>
    </>
  );
};
export default MessageContainer;
