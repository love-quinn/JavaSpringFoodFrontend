import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


type NotifyType = "success" | "error";

export const useNotify = () => {
  const notify = (type: NotifyType, message: string) => {
    if (type === "success") {
      toast.success(message, {
        pauseOnHover:false,
        pauseOnFocusLoss: false,
        transition: Bounce,
        autoClose: 3000

      });
    } else if (type === "error") {
      toast.error(message, {
        pauseOnHover:false,
        pauseOnFocusLoss: false,
        transition: Bounce,
        autoClose: 3000
      });
    }
  };
  
  return { notify };
};
