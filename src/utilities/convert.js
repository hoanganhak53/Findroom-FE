export const getRoomPrice = (price) => {
    return `${(price / 1000000).toFixed(1)} tr/phòng`;
};

export const convertToVND = (price) => {
    return price.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
    });
};

export const convertTime = (time) => {
    return new Date(time).toLocaleDateString('en', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};
