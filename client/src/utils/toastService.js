import { toast } from 'react-toastify';

const toastService = {
  dismiss: ()=>{
    toast.dismiss();
  },
  success: (message, id) => {
    toast.success(message, {toastId: id});
  },
  error: (message, id) => {
    toast.error(message, {toastId: id});
  },
  warning: (message, id) => {
    toast.warning(message, {toastId: id});
  },
  info: (message, id) => {
    toast.info(message, {toastId: id});
  },
};

export default toastService;
