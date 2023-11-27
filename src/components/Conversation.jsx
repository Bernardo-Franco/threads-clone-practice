import {
  Avatar,
  AvatarBadge,
  Flex,
  Image,
  Stack,
  Text,
  WrapItem,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { selectedConversationAtom } from "../atoms/conversationsAtom";

const Conversation = ({ conversation, isOnline }) => {
  const currentUser = useRecoilValue(userAtom);
  const messageParticipant = conversation.participants[0];
  // prettier-ignore
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
  const colorMode = useColorMode();

  return (
    <>
      <Flex
        gap={4}
        alignItems={"center"}
        p={1}
        _hover={{
          cursor: "pointer",
          bg: useColorModeValue("gray.600", "gray.dark"),
          color: "white",
        }}
        onClick={() =>
          setSelectedConversation({
            _id: conversation._id,
            userId: messageParticipant._id,
            username: messageParticipant.username,
            userProfilePicture: messageParticipant.profilePicture,
            mock: conversation.mock,
          })
        }
        borderRadius={"md"}
        //  prettier-ignore
        bg={
          selectedConversation?._id === conversation._id ? (colorMode === 'light' ? 'cyan.300' : 'gray.600') : ''
        }
      >
        <WrapItem>
          <Avatar size={{ base: "xs", sm: "sm", md: "md" }} src={messageParticipant.profilePicture}>
            {isOnline ? (
              <AvatarBadge boxSize={"1em"} bg="green.500" />
            ) : (
              <AvatarBadge boxSize={"1em"} bg="gray.500" />
            )}
          </Avatar>
        </WrapItem>

        <Stack direction={"column"} fontSize={"sm"}>
          <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
            {messageParticipant.username}
            <Image src="/verified.png" w={4} ml={1} />
          </Text>
          <Text fontSize={"sm"} display={"flex"} alignItems={"center"} gap={1}>
            {currentUser._id === conversation.lastMessage.sender ? <BsCheck2All size={16} /> : ""}
            {conversation.lastMessage.text.length > 20
              ? conversation.lastMessage.text.substring(0, 18) + "..."
              : conversation.lastMessage.text}
          </Text>
        </Stack>
      </Flex>
    </>
  );
};
export default Conversation;
