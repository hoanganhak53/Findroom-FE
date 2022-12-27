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
    return time
        ? new Date(time).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
          })
        : '12/18/2022';
};
