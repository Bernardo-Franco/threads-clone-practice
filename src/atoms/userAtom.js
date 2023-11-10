import { atom } from 'recoil';

const userAtom = atom({
  key: 'userAtom',
  default: JSON.parse(localStorage.getItem('userInfo-threads')),
});

export default userAtom;
