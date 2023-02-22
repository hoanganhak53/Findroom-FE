import axios from 'axios';

export async function generateAddressGoogleApis(address) {
    try {
        const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
        const key = 'AIzaSyAyLt4_F7s0KJIVA364XmCEjKyF0VUzhxg';
        const respone = await axios.get(baseUrl, {
            params: {
                key: key,
                address: address,
            },
        });
        console.log('respone', respone.data.results[0]);
        return respone.data.results;
    } catch (e) {
        console.log('generateAddressGoogleApis có lỗi', e);
        return false;
    }
}

export async function generateAddressCode(address_components) {
    try {
        //Lấy tên thành phố và tên quận/huyện
        const provinceName = address_components.find((item) =>
            item.types?.includes('administrative_area_level_1')
        );
        const districtName = address_components.find((item) =>
            item.types?.includes('administrative_area_level_2')
        );

        //Api
        let [respone1, respone2] = await Promise.all([
            axios.get('https://api.mysupership.vn/v1/partner/areas/province'),
            axios.get('https://api.mysupership.vn/v1/partner/areas/district'),
        ]);

        //Lấy đối tượng thành phố
        const listProvice = respone1.data.results;
        const province = listProvice.find((item) =>
            item.name.toLowerCase().includes(provinceName.toLowerCase())
        );

        //Lấy đối tượng quận/huyện
        const listDistrict = respone2.data.results;
        const district = listDistrict.find(
            (item) =>
                item.name.toLowerCase().includes(districtName.toLowerCase()) &&
                item.province.toLowerCase().includes(provinceName.toLowerCase())
        );

        return {
            city: {
                code: province.code,
                text: province.name,
            },
            district: {
                code: district.code,
                text: district.name,
                cityCode: province.code,
            },
            streetName: 'string',
            houseNumber: 'string',
        };
    } catch (e) {
        console.log('generateAddressCode có lỗi', e);
        return {};
    }
}

export async function generateAddressPositionAPI(address) {
    try {
        const baseUrl = 'http://api.positionstack.com/v1/forward';
        const key = '87ede7235625d66f76fe86eb496e37f1';
        const respone = await axios.get(baseUrl, {
            params: {
                access_key: key,
                query: address,
                country: 'VN',
            },
        });
        console.log('respone', respone.data.data[0]);
        return respone.data.data[0];
    } catch (e) {
        console.log('generateAddressGoogleApis có lỗi', e);
        return false;
    }
}

export async function generatePlaceAutocomplete(input) {
    try {
        const baseUrl =
            'https://maps.googleapis.com/maps/api/place/autocomplete/json';
        const key = 'AIzaSyAyLt4_F7s0KJIVA364XmCEjKyF0VUzhxg';
        const respone = await axios.get(baseUrl, {
            params: {
                key,
                input,
                location: '21.0277644%2C-105.8341598',
                types: 'establishment',
                radius: 50000,
                language: 'vi',
            },
        });
        console.log('respone', respone.data.results[0]);
        return respone.data.results;
    } catch (e) {
        console.log('generatePlaceAutocompleteGoogleApis có lỗi', e);
        return false;
    }
}
