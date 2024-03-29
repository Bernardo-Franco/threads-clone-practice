import {
  Avatar,
  Flex,
  Text,
  Image,
  useColorModeValue,
  Divider,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { conversationsAtom, selectedConversationAtom } from "../atoms/conversationsAtom";
import { useEffect, useRef, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";
import { useSocket } from "../context/SocketContext";

const MessageContainer = () => {
  const showToast = useShowToast();
  const { socket } = useSocket();
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const currentUser = useRecoilValue(userAtom);
  const [conversations, setConversations] = useRecoilState(conversationsAtom);
  const messageEndRef = useRef(null);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      if (selectedConversation._id === message.conversationId) {
        setMessages((prevMsgs) => [...prevMsgs, message]);
      }

      if (!conversations.find((conversation) => conversation._id === message.conversationId)) {
        console.log("messsage from another user received", message);
        const getConversationsAgain = async () => {
          try {
            const res = await fetch("/api/messages/conversations");
            const data = await res.json();
            if (data.error) {
              showToast("Error", data.error, "error");
            }
            setConversations(data);
          } catch (error) {
            showToast("Error", error.message, "error");
          }
          return;
        };
        getConversationsAgain();
      }

      setConversations((prevConvs) => {
        const updatedConversations = prevConvs.map((conversation) => {
          if (conversation._id === message.conversationId) {
            return {
              ...conversation,
              lastMessage: {
                text: message.text,
                sender: message.sender,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });
    });
    return () => socket.off("newMessage");
  }, [socket]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessages(true);
      setMessages([]);
      try {
        if (selectedConversation.mock) return;
        const res = await fetch(`/api/messages/${selectedConversation.userId}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setMessages(data);
      } catch (error) {
        showToast("Error", error.message, "error");
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
        bg={useColorModeValue("gray.200", "gray.dark")}
        borderRadius={"md"}
        flexDirection={"column"}
        px={2}
      >
        {/* Message Header */}
        <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
          <Avatar src={selectedConversation.userProfilePicture} size={"sm"} />
          <Text display={"flex"} alignItems={"center"}>
            {selectedConversation.username}
            <Image src="/verified.png" w={4} h={4} ml={1} />
          </Text>
        </Flex>
        <Divider />
        <Flex flexDirection={"column"} gap={4} my={4} px={2} height={"400px"} overflowY={"auto"}>
          {loadingMessages &&
            [...Array(5)].map((_, i) => (
              <Flex
                key={i}
                gap={2}
                alignItems={"center"}
                p={1}
                borderRadius={"md"}
                alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
              >
                {i % 2 === 0 && <SkeletonCircle size={7} />}
                <Flex flexDirection={"column"} gap={2}>
                  <Skeleton h={"8px"} w={"250px"} />
                  <Skeleton h={"8px"} w={"250px"} />
                  <Skeleton h={"8px"} w={"250px"} />
                </Flex>
                {i % 2 !== 0 && <SkeletonCircle size={7} />}
              </Flex>
            ))}
          {!loadingMessages &&
            messages.map((message) => {
              return (
                <Flex
                  key={message._id}
                  direction={"column"}
                  ref={messages.length - 1 === messages.indexOf(message) ? messageEndRef : null}
                >
                  <Message message={message} ownMessage={currentUser._id === message.sender} />
                </Flex>
              );
            })}
        </Flex>

        <MessageInput setMessages={setMessages} />
      </Flex>
    </>
  );
};
export default MessageContainer;
