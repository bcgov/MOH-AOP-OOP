import { format as formatDateFns } from 'date-fns';

export const formatDate = (date) => {
  if (!date) {
    return null;
  }
  return formatDateFns(date, 'MMMM d, y')
};

export const formatISODate = (date) => {
  if (!date) {
    return null;
  }
  return formatDateFns(date, 'yyyy-MM-dd');
};

export const getBCTimestamp = () => {
  return formatDateFns(new Date(), 'yyyy-MM-dd HH:mm:ss zzz');
};
