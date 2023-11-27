import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast.js";
import { AiOutlineLogout } from "react-icons/ai";
import { useState } from "react";
import { conversationsAtom } from "../atoms/conversationsAtom.js";

const LogoutButton = () => {
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);
  const setSelectedConversation = useSetRecoilState(conversationsAtom);
  const setConversations = useSetRecoilState(conversationsAtom);

  const [isHovered, setIsHovered] = useState(false);

  const onEnter = () => {
    setIsHovered(true);
  };

  const onLeave = () => {
    setIsHovered(false);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      localStorage.removeItem("userInfo-threads");
      setSelectedConversation({
        _id: "",
        userId: "",
        username: "",
        userProfilePicture: "",
      });
      setConversations([]);
      setUser(null);
    } catch (error) {
      showToast("Error", error, "error");
    }
  };
  return (
    <Button size={"xs"} onClick={handleLogout}>
      {isHovered && <span>Logout&nbsp;</span>}
      <AiOutlineLogout size={"20"} onMouseEnter={onEnter} onMouseLeave={onLeave} />
    </Button>
  );
};
export default LogoutButton;
