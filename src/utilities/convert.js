export const getRoomPrice = (price) => {
    return `${(price / 1000000).toFixed(1)} tr/phòng`;
};

export const convertToVND = (price) => {
    return price.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
    });
};

export const convertTime = (t) => {
    let time = t;
    if (time < 10000000000) {
        time = time * 1000;
    }

    return new Date(time).toLocaleDateString('en', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};
