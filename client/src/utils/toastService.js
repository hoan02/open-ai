import { toast } from 'react-toastify';

const toastService = {
  dismiss: ()=>{
    toast.dismiss();
  },
  success: (message, id) => {
    toast.success(message, {toastId: id, theme: "colored"});
  },
  error: (message, id) => {
    toast.error(message, {toastId: id, theme: "colored"});
  },
  warning: (message, id) => {
    toast.warning(message, {toastId: id, theme: "colored"});
  },
  info: (message, id) => {
    toast.info(message, {toastId: id, theme: "colored"});
  },
};

export default toastService;
