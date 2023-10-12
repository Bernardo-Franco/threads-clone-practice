import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';

const UserPage = () => {
  return (
    <>
      <UserHeader />
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
