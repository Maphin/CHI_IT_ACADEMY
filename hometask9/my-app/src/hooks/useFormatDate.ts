import { format } from 'date-fns';

export const useFormatDate = (date: string) => {
    return format(new Date(date), "MMM dd, yyyy hh:mm a");
}