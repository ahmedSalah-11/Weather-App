window.addEventListener('load', () => {
    let ip;
    let city;
    let district;


    let tempretureDeg = document.querySelector(".degree");
    let tempretureDesc = document.querySelector(".description");
    let timeZone = document.querySelector(".location-timezone");
    let unit = document.querySelector(".unit");
    let tempSection = document.querySelector(".tempreture-degree");
    let windSpeed = document.querySelector(".speed");
    let pressuer = document.querySelector(".pressure");
    let city1 = document.querySelector(".city-1-degree");
    let city2 = document.querySelector(".city-2-degree");
    let city3 = document.querySelector(".city-3-degree");

    let ip_Api = `https://api.ipify.org?format=json`;
    fetch(ip_Api)
        .then(response => {
            return response.json();
        })
        .then(data => {

            ip = data.ip;

            return ip;
        })
        .then(ip => {


            const lookup = `https://json.geoiplookup.io/${ip}`;
            fetch(lookup)
                .then(reply => {
                    return reply.json();
                })
                .then(info => {

                    lat = info.latitude;
                    long = info.longitude;
                    city = info.city;
                    district = info.district;

                    return info;
                })

                .then(info => {



                    const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${info.latitude}&lon=${info.longitude}&
            exclude=minutley&lang=en&units=metric&appid=f2f2a5733c7c0b25d486da477885db6e`;

                    return api
                })
                .then(api => {

                    fetch(api)
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {

                            const { temp } = data.current;

                            const description = data.current.weather[0].description;

                            const icon = data.current.weather[0].icon;
                            const wind = data.current.wind_speed;
                            const main = data.current.weather[0].main;
                            const { dt, sunrise, sunset } = data.current;
                            const pressureVal = data.current.pressure;


                            tempretureDeg.textContent = temp;
                            tempretureDesc.textContent = description;
                            timeZone.textContent = city + " , " + district;
                            windSpeed.textContent = wind;
                            pressuer.textContent = pressureVal;

                            setIcon(main, dt, sunrise, sunset, "icon");


                            let Fahrenheit = temp * (9 / 5) + 32;

                            tempSection.addEventListener("click", () => {
                                if (unit.textContent === "°C") {
                                    tempretureDeg.textContent = Math.floor(Fahrenheit);
                                    unit.textContent = "°F";

                                }
                                else {
                                    tempretureDeg.textContent = temp;
                                    unit.textContent = "°C";
                                }
                            })

                        })
                })
        })
    const cityApi1 = `https://api.openweathermap.org/data/2.5/weather?id=350550&lang=en&units=metric&appid=f2f2a5733c7c0b25d486da477885db6e`;
    const cityApi2 = `https://api.openweathermap.org/data/2.5/weather?id=361058&lang=en&units=metric&appid=f2f2a5733c7c0b25d486da477885db6e`;
    const cityApi3 = `https://api.openweathermap.org/data/2.5/weather?id=359792&lang=en&units=metric&appid=f2f2a5733c7c0b25d486da477885db6e`;
    fetch(cityApi1)
        .then(response => {
            return response.json();
        })
        .then(data => {

            const { temp } = data.main;

            city1.textContent = temp + " °C";
            const main = data.weather[0].main;
            const { dt } = data;
            const { sunrise, sunset } = data.sys;
            setIcon(main, dt, sunrise, sunset, "city-1-icon");
        })
    fetch(cityApi2)
        .then(response => {
            return response.json();
        })
        .then(data => {

            const { temp } = data.main;

            city2.textContent = temp + " °C";
            const main = data.weather[0].main;
            const { dt } = data;
            const { sunrise, sunset } = data.sys;
            setIcon(main, dt, sunrise, sunset, "city-2-icon");
        })
    fetch(cityApi3)
        .then(response => {
            return response.json();
        })
        .then(data => {

            const { temp } = data.main;

            city3.textContent = Math.floor(temp) + " °C";
            const main = data.weather[0].main;
            const { dt } = data;
            const { sunrise, sunset } = data.sys;
            setIcon(main, dt, sunrise, sunset, "icon city-3-icon");
        })



});

function setIcon(main, currentTime, sunrise, sunset, id) {
    if (main === "Thunderstorm") {
        document.getElementById(id).src = "./weather_icons/thunder.svg";
    }
    else if (main === "Clear") {
        if (currentTime >= sunrise && currentTime <= sunset) {
            document.getElementById(id).src = "./weather_icons/day.svg";
        }
        else {
            document.getElementById(id).src = "./weather_icons/night.svg";
        }
    }

    else if (main === "Clouds") {
        if (currentTime >= sunrise && currentTime <= sunset) {
            document.getElementById(id).src = "./weather_icons/cloudy-day-3.svg";
        }
        else {
            document.getElementById(id).src = "./weather_icons/cloudy.svg";
        }
    }
}
