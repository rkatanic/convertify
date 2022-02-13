import { toast } from "react-toastify";

export const notify = (message: string, isDarkTheme: boolean) => {
  toast(message, {
    className: isDarkTheme ? "toast-dark" : "toast-light",
    progressClassName: isDarkTheme ? "toast-secondary" : "toast-primary",
  });
};
