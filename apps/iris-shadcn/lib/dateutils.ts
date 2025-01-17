import moment from 'moment';

export const parseDate = (date: string, pattern = 'MMMM DD, YYYY') => {
  return moment(date).format(pattern);
};


