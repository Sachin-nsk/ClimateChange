const apikey = "4b1c90b87b6262b1b1df95c426ecb12b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiUrl_air_pollution = "https://api.openweathermap.org/data/2.5/air_pollution/history?";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.getElementById("w-icon");

var oldClass = "fa-solid fa-cloud-moon-rain fa-5x";

var lon=0;
var lat=0;



async function CheckWeather(city) {

    const response = await fetch(apiUrl + `${city}` + `&appid=${apikey}`);
    var data = await response.json();
    console.log(data);


    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp - 273) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".Wind").innerHTML = data.wind.speed + " Km/hr";
    document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";

    lon=data.coord.lon;
    lat=data.coord.lat;
    const start=1712687400;  
    const end=1712773800; 

    if (data.weather[0].main == 'Clear') {
        weatherIcon.className = "fa-solid fa-cloud fa-5x";
    }
    else if (data.weather[0].main == 'Drizzle') {

        weatherIcon.className = "fa-solid fa-cloud-rain fa-5x";
    }
    else if (data.weather[0].main == 'Rain') {

        weatherIcon.className = "fa-solid fa-cloud-showers-heavy fa-5x";
    }

    else if (data.weather[0].main == 'Mist') {

        weatherIcon.className = "fa-solid fa-smog fa-5x";

    }
    else if (data.weather[0].main == 'Clouds') {

        weatherIcon.className = "fa-solid fa-cloud-bolt fa-5x";

    }

    const response_air = await fetch(apiUrl_air_pollution + `lat=${lat}`+`&lon=${lon}`+`&start=${start}`+`&end=${end}` + `&appid=${apikey}`);
    var data1 = await response_air.json();
    
    var co=new Array();
    var no=new Array();
    var no2=new Array();
    
    
    
    data1.list.forEach(item => {
      
      let components = item.components;
      let coValue = components.co;
      let noValue = components.no;
      let no2Value = components.no2;
              
      co.push(coValue);
      no.push(noValue);
      no2.push(no2Value);
          
      
  });


   


      var options = {
        series: [{
        name: 'Co',
        data:co
      }, {
        name: 'No',
        data: no
      }, {
        name: 'No2',
        data:no2
      }],
        chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories:[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,25],
      },
      yaxis: {
        title: {
          text: '(μg/m3)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return  val + " (μg/m3)"
          }
        }
      }
      };

    
    

      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    
}

searchBtn.addEventListener("click", () => {
    CheckWeather(searchBox.value);
})




///
