import { Box, Container } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserPage from './pages/UserPage.jsx';
import PostPage from './pages/PostPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import UpdateProfilePage from './pages/UpdateProfilePage.jsx';
import Header from './components/Header.jsx';
import CreatePost from './components/CreatePost.jsx';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/userAtom.js';

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Box position={'relative'} w={'full'}>
      <Container maxW="620px" height="90vh">
        <Header />
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route
            path="/update"
            element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/:username"
            element={
              user ? (
                <>
                  <UserPage />
                  <CreatePost />
                </>
              ) : (
                <UserPage />
              )
            }
          />
          <Route path="/:username/post/:pid" element={<PostPage />} />
          <Route
            path="/chat"
            element={user ? <ChatPage /> : <Navigate to={'/auth'} />}
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
