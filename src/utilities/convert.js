import moment from 'moment/moment';

export const getRoomPrice = (price) => {
    return price ? `${(price / 1000000).toFixed(1)} tr/phòng` : '0 tr/phòng';
};

export const convertToVND = (price) => {
    return price
        ? price.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
          })
        : '0 VND';
};

export const convertTime = (time) => {
    if (!time) return '12/18/2022';
    let newTime = time;
    if (time < 100000000000) newTime *= 1000;
    return new Date(newTime).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

export const convertTimeMessage = (time) => {
    if (!time) return '10:12 13 tháng 1, 2023';
    if (new Date() - time * 1000 > 86400000) {
        return moment(time * 1000).format('HH:mm D [tháng] M, YYYY');
    }
    return moment(time * 1000).fromNow();
};

export const convertTimeToDate = (time) => {
    if (!time) return '10/12/2022';
    return moment(time).format('D/M/YYYY');
};
