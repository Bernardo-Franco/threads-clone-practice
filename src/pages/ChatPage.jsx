import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Conversation from '../components/Conversation.jsx';
import MessageContainer from '../components/MessageContainer.jsx';
import { useEffect, useState } from 'react';
import { GiConversation } from 'react-icons/gi';
import useShowToast from '../hooks/useShowToast.js';
import { useRecoilState } from 'recoil';
import {
  conversationsAtom,
  selectedConversationAtom,
} from '../atoms/conversationsAtom.js';

const ChatPage = () => {
  const showToast = useShowToast();
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [conversations, setConversations] = useRecoilState(conversationsAtom);
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch('/api/messages/conversations');
        const data = await res.json();
        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }
        setConversations(data);
      } catch (error) {
        showToast('Error', error.message, 'error');
      } finally {
        setLoadingConversations(false);
      }
    };
    getConversations();
  }, []);
  return (
    <Box
      position={'absolute'}
      left={'50%'}
      w={{ base: '100%', md: '80%', lg: '750px' }}
      transform={'translateX(-50%)'}
      p={4}
    >
      <Flex
        gap={4}
        flexDirection={{ base: 'column', md: 'row' }}
        maxW={{ sm: '400px', md: 'full' }}
        mx={'auto'}
      >
        <Flex
          flex={30}
          gap={2}
          flexDirection={'column'}
          maxW={{ sm: '250px', md: 'full' }}
          mx={'auto'}
        >
          <Text
            fontWeight={'700'}
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            Your Conversations
          </Text>
          <form>
            <Flex alignItems={'center'} gap={2}>
              <Input placeholder="search for an User" />
              <Button size={'sm'}>
                <SearchIcon />
              </Button>
            </Flex>
          </form>
          {loadingConversations &&
            [0, 1, 2, 3, 4].map((_, i) => (
              <Flex
                key={i}
                gap={4}
                alignItems={'center'}
                p={1}
                borderRadius={'md'}
              >
                <Box>
                  <SkeletonCircle size={10} />
                </Box>
                <Flex w={'full'} flexDirection={'column'} gap={3}>
                  <Skeleton h={'10px'} w={'80px'} />
                  <Skeleton h={'9px'} w={'90%'} />
                </Flex>
              </Flex>
            ))}

          {!loadingConversations &&
            conversations.map((conversation) => (
              <Conversation
                key={conversation._id}
                conversation={conversation}
              />
            ))}
        </Flex>
        {!selectedConversation._id && (
          <Flex
            flex={70}
            borderRadius={'md'}
            p={2}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            height={'400px'}
          >
            <GiConversation size={100} />
            <Text fontSize={20}>select a conversation to start messaging</Text>
          </Flex>
        )}
        {selectedConversation._id && <MessageContainer />}
      </Flex>
    </Box>
  );
};
export default ChatPage;
