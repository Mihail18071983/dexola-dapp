import { toast } from "react-toastify";
import { Msg } from "./Msg";
import { ReactComponent as IconRejected } from "../../assets/svg/iconRejected.svg";

export const ErrorMsg = () =>
    toast(
      <Msg
        text1="Connection Error"
        text2="Please try again"
        Component={IconRejected}
      />
    );
