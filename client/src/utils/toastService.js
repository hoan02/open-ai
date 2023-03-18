import { toast } from 'react-toastify';

const toastService = {
  dismiss: ()=>{
    toast.dismiss();
  },
  success: (message) => {
    toast.success(message);
  },
  error: (message) => {
    toast.error(message);
  },
  warning: (message) => {
    toast.warning(message);
  },
  info: (message) => {
    toast.info(message);
  },
};

export default toastService;
