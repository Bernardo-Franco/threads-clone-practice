import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import useShowToast from '../hooks/useShowToast';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  conversationsAtom,
  selectedConversationAtom,
} from '../atoms/conversationsAtom';

const MessageInput = ({ setMessages }) => {
  const showToast = useShowToast();
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const [messageText, setMessageText] = useState('');
  const setConversations = useSetRecoilState(conversationsAtom);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText) return;
    try {
      const res = await fetch(`/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientId: selectedConversation.userId,
          message: messageText,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }

      setMessages((messages) => [...messages, data]);

      setConversations((prevConvs) => {
        const updatedConversations = prevConvs.map((conversation) => {
          if (conversation._id === selectedConversation._id) {
            return {
              ...conversation,
              lastMessage: {
                text: messageText,
                sender: data.sender,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });
      setMessageText('');
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  const handleEnter = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await handleSendMessage(e);
    } else return;
  };
  return (
    <form onSubmit={handleSendMessage}>
      <InputGroup>
        <Input
          w={'full'}
          mb={2}
          onKeyDown={handleEnter}
          placeholder="type a message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <InputRightElement onClick={handleSendMessage} cursor={'pointer'}>
          <IoSendSharp />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};
export default MessageInput;
