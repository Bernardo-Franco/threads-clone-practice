import { useEffect, useState } from 'react';
import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';

const UserPage = () => {
  const [user, setUser] = useState(null);

  const { username } = useParams();
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }

        setUser(data);
      } catch (error) {
        showToast('Error', error, 'error');
      }
    };
    getUser();
  }, [username]);

  if (!user) return null;

  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={1020}
        replies={501}
        postImage="/post1.png"
        postTitle="Let's talk about coffe"
      />
      <UserPost
        likes={2222}
        replies={113}
        postImage="/post2.png"
        postTitle="Let's talk about software"
      />
      <UserPost
        likes={3333}
        replies={233}
        postImage="/post3.png"
        postTitle="Nice book"
      />
      <UserPost likes={444} replies={444} postTitle="this rock" />
    </>
  );
};
export default UserPage;
