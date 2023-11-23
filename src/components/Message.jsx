import { Avatar, Flex, Text } from '@chakra-ui/react';

const Message = ({ ownMessage }) => {
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={'flex-end'}>
          <Text maxW={'350px'} bg={'blue.600'} p={1} borderRadius={'md'}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            incidunt cumque veritatis esse aliquam libero doloribus ab laborum,
            possimus vel?
          </Text>
          <Avatar src="" w={7} h={7} />
        </Flex>
      ) : (
        <Flex gap={2} alignSelf={'flex-start'}>
          <Avatar src="" w={7} h={7} />
          <Text maxW={'350px'} bg={'gray.600'} p={1} borderRadius={'md'}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            veritatis maiores vel.
          </Text>
        </Flex>
      )}
    </>
  );
};
export default Message;
