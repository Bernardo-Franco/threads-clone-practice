import { Button, CloseButton, Container } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import UserPage from './pages/UserPage.jsx';
import PostPage from './pages/PostPage.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <Container maxW="620px" height="90vh" style={{ border: '1px solid white' }}>
      <Header />
      <Routes>
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>
    </Container>
  );
}

export default App;