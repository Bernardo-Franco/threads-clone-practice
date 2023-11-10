import { useToast } from '@chakra-ui/react';

const useShowToast = () => {
  const toast = useToast();
  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 2300,
      isClosable: true,
    });
  };
  return showToast;
};
export default useShowToast;
