import toast from 'react-hot-toast';

const useToast = () => {
    const successNotification = (message: string) => {
        toast.success(message, {
            duration: 4000,
            position: 'top-right',
        });
    };

    const newExhibitNotification = (message: string) => {
        toast.success(message, {
            duration: 4000,
            position: 'top-right',
            icon: '🔥',
        });
    };

    return { successNotification, newExhibitNotification };
};

export default useToast;