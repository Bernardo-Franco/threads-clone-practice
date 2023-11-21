import { DeleteIcon } from '@chakra-ui/icons';
import { Avatar, Divider, Flex, Text } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import postsAtom from '../atoms/postsAtom';
import useShowToast from '../hooks/useShowToast';

const Comment = ({ reply, lastReply, currentPost }) => {
  const currentUser = useRecoilValue(userAtom);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const showToast = useShowToast();

  const handleDeleteComment = async () => {
    try {
      const res = await fetch(`/api/posts/reply/${currentPost._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyId: reply._id }),
      });
      const data = await res.json();
      if (data.error) return showToast('Error', data.error, 'error');

      const updatedPosts = posts.map((p) => {
        if (p._id === currentPost._id) {
          return {
            ...p,
            replies: p.replies.filter((r) => r._id !== reply._id),
          };
        }
        return p;
      });
      setPosts(updatedPosts);
      showToast('Success', 'reply deleted successfully', 'success');
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  return (
    <>
      <Flex gap={4} py={2} my={2} w={'full'}>
        <Avatar src={reply.userProfilePic} size={'sm'} />
        <Flex gap={1} w={'full'} flexDirection={'column'}>
          <Flex
            w={'full'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text fontSize="sm" fontWeight={'bold'}>
              {reply.username}
            </Text>
          </Flex>
          <Text>{reply.text}</Text>
        </Flex>
        {reply.userId === currentUser._id && (
          <DeleteIcon
            size={'xs'}
            onClick={handleDeleteComment}
            cursor={'pointer'}
          />
        )}
      </Flex>
      {!lastReply && <Divider my={4} />}
    </>
  );
};
export default Comment;
