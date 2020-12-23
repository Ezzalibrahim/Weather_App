    const cityForm = document.querySelector('form');
    const card = document.querySelector('.card');
    const details = document.querySelector('.details');
    const icon = document.getElementsByClassName('icon');
    const time = document.getElementsByClassName('time');
    // console.log("icon", icon, "time", time)

    var storedata = {
        cityDets: 1,
        weather: 2,
        city: ""
    };
    const updateUi = (data) => {

        localStorage.setItem('cityDets', JSON.stringify(data.cityDets));
        localStorage.setItem('weather', JSON.stringify(data.weather));

        let cityDets2 = JSON.parse(localStorage.getItem('cityDets'));
        let weather2 = JSON.parse(localStorage.getItem('weather'));

        storedata.cityDets = cityDets2;
        storedata.weather = weather2;

        const {
            cityDets,
            weather
        } = data;
        // const cityDets = data.cityDets;
        // const weather = data.weather;

        // Update UI design template
        details.innerHTML = `
             <h5 class="my-3">${cityDets.EnglishName}</h5>
                <div class="my-3">${weather[0].WeatherText}</div>
                <div class="display-4 my-4">
                <span>${weather[0].Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
            
        `;
        // the first time we use app we woud't show anything 
        if (card.classList.contains('d-none'))
            card.classList.remove('d-none');

        // update the backgroung images of Time
        let timesrc = weather[0].IsDayTime ? "img/day.svg" : "img/night.svg";
        time[0].setAttribute("src", timesrc);

        // update the backgroung images of Time
        let iconsrc = `img/icons/${weather[0].WeatherIcon}.svg`;
        icon[0].setAttribute("src", iconsrc);
        console.log("icon", icon, "time", time)

        // Add data to local storage



    }

    const updateCity = async (city) => {

        const cityDets = await getCity(city);
        const weather = await GetWeather(cityDets.Key);

        return {
            cityDets,
            weather
        } // Object shorthand Notation

    }

    cityForm.addEventListener('submit', e => {
        e.preventDefault();

        const city = cityForm.city.value.trim();
        cityForm.reset();
        updateCity(city)
            .then(data => updateUi(data))
            .catch(err => console.log(err));
        localStorage.setItem('city', city);
        let city2 = localStorage.getItem('city');
        storedata.city = city2;
    });

    // document.onload(e => {
    //     if (localStorage.getItem('city') === storedata.city) {
    //         let data2 = {
    //             cityDets: storedata.cityDets,
    //             weather: storedata.weather
    //         }
    //         updateUi(data2);
    //     }
    // });