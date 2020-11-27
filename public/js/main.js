const searchBtn = document.getElementById("searchBtn");

const mainCity = document.getElementById("main");
const response = document.getElementById('response');

const loading = document.querySelector('.loading');
const moreInfon = document.querySelector('.more-info');
const searchLocation = document.getElementsByName('location');

let city = "sousse";

const loadMainCity = (city) => {
    mainCity.innerHTML = "";

    loading.style.display = "block";

    fetch(`/api/v1/weather/search?city=${city}`)
        .then(res => res.json())
        .then(({data}) => {
            // console.log(data)

            const header = document.createElement('div')
            const body = document.createElement('div')
            header.classList.add("header","animate__animated","animate__fadeInRight");
            body.classList.add("body","animate__animated","animate__fadeInRight");

            header.innerHTML = `
                <div class="container">
                    <div class="location-info">
                        <div class="country">${data.sys.country}</div>
                        <div class="city">${data.name}</div>
                    </div>
                    <div class="temp">
                    ${parseInt(data.main.temp)}<sup>°c</sub>
                    </div>
                </div>
                
                <div class="icon">
                    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
                </div>
            
            `
            body.innerHTML = `
            <div class="description">
            ${data.weather[0].description}
            </div>
            <div class="min-max-temp">
            ${parseInt(data.main.temp_min)} <sup>°c</sup> / ${parseInt(data.main.temp_max)} <sup>°c</sup>
            </div>  
        `
            loading.style.display = "none";
            mainCity.appendChild(header);
            mainCity.appendChild(body)
        })
}
const loadForecast = (city) => {
    response.innerHTML = "";
    fetch(`/api/v1/weather/forecast?city=${city}`)
        .then(res => res.json())
        .then(({ data }) => {
            // console.log(data)

            const {list} = data
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            loading.style.display = "none";
            for (let i = 0; i < 3; i++) {
                var d = new Date(list[i*10].dt_txt);
                const card = document.createElement('div')
                card.classList.add("card","animate__animated","animate__fadeInUp",`animate__delay-${i}s`);
                card.innerHTML = `
                    <div class="header">
                    <div class="icon">
                    <img src=http://openweathermap.org/img/wn/${list[i*10].weather[0].icon}@2x.png alt="">
                    </div>
                    <div class="location-info">
                        <div class="date">${days[d.getDay()]}</div>
                        <div class="weather">${list[i*10].weather[0].main}</div>
                    </div>
                    <div class="temp">
                        ${parseInt(list[i*10].main.temp)}<sup>°c</sub>
                    </div>
                    
                </div>`
                response.appendChild(card);
            }
            searchLocation[0].value = ""
        })
}
const loadPhoto = (city) => {
    fetch(`/api/v1/photo/search?city=${city}`)
    .then(res => res.json())
        .then(({ photos }) => { 
            if (photos.length !== 0) {
                moreInfon.style.backgroundImage = `url(${photos[0].src.medium})`
        }
     })
    .catch(err => console.log(err))
}
loadMainCity(city)
loadForecast(city);
loadPhoto(city)



searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    loadMainCity(searchLocation[0].value)
    loadForecast(searchLocation[0].value);
    loadPhoto(searchLocation[0].value)
})