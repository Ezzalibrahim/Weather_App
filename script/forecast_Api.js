// get your Key from API and give it to the key variable
const key = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

const getCity = async (city) => {

    const link = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = "?apikey=" + key + "&q=" + city;

    const response = await fetch(link + query);
    const data = await response.json();

    return data[0]; // we need the first city
}

const GetWeather = async (idcity) => {

    const link = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${idcity}?apikey=${key}`;

    const response = await fetch(link + query);
    const data = await response.json();
    return data;
}

// getCity('manchedter');

// getCity('manchester')
//     .then(data => {
//         return GetWeather(data.Key)
//     }).then(data => console.log(data))
//     .catch(error => console.log(error));