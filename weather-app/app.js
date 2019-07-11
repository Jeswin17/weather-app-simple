window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription= document.querySelector('.temperature-description');
    let temperatureDegree= document.querySelector('.temperature-degree');
    let locationTimezone= document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(" .temperature");
    const temperatureSpan = document.querySelector(" .temperature span");

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position => {
            long=position.coords.longitude;
            lat=position.coords.latitude;


            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/eb543d2c59214100572c79ca1ea13d46/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary , icon  } = data.currently;
                    //Set dom elements frm the api
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    // formula 
                    let celsius = (temperature - 32) * (5/9);
                    setIcons(icon, document.querySelector(".icon"));
                //change temp to Celsius  
                    temperatureSection.addEventListener("click",() => {
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent ="C";
                            temperatureDegree.textContent = Math.floor(celsius);

                        }else{
                            temperatureSpan.textContent ="F";
                            temperatureDegree.textContent = temperature;
                        }
                    })           

                });
                
        });
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});