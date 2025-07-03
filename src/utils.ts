import toast from "react-hot-toast";

export const showErrMsg = (err: any) => {
    if (err instanceof Error) {
        toast.error(err.message);
    }
    console.error(err);
}

export const showSuccessMsg = (msg: string) => {
    toast.success(msg);
}