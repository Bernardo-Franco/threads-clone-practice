import { Button } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast.js';
import { AiOutlineLogout } from 'react-icons/ai';
import { useState } from 'react';

const LogoutButton = () => {
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);

  const [isHovered, setIsHovered] = useState(false);

  const onEnter = () => {
    setIsHovered(true);
  };

  const onLeave = () => {
    setIsHovered(false);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }

      localStorage.removeItem('userInfo-threads');

      setUser(null);
    } catch (error) {
      showToast('Error', error, 'error');
    }
  };
  return (
    <Button
      position={'fixed'}
      top={'30px'}
      right={'30px'}
      size={'sm'}
      onClick={handleLogout}
    >
      {isHovered && <span>Logout&nbsp;</span>}
      <AiOutlineLogout
        size={'20'}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      />
    </Button>
  );
};
export default LogoutButton;
