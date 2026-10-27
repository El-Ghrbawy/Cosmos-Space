
var sideLinks = document.querySelectorAll(".side-links")

var todayLink = document.querySelector(".today-link")

var launchesLink = document.querySelector(".launches-link")

var planetsLink = document.querySelector(".planets-link")

var todaySection = document.getElementById("today-in-space")

var launchesSection = document.getElementById("launches")

var planetsSection = document.getElementById("planets")






// for (var i = 0; i < sideLinks.length; i++) {
//     sideLinks[i].addEventListener("click", function (e) {

//         console.log(e);

//     })
// }


launchesLink.addEventListener("click", function () {


  launchesLink.classList.add("bg-blue-500/10", "text-blue-400");
  launchesLink.classList.remove("text-slate-300", "nav-link", "hover:bg-slate-800");

  launchesSection.classList.remove("hidden");



  todayLink.classList.remove("bg-blue-500/10", "text-blue-400");
  todayLink.classList.add("text-slate-300", "nav-link", "hover:bg-slate-800");

  todaySection.classList.add("hidden");


  planetsLink.classList.remove("bg-blue-500/10", "text-blue-400");
  planetsLink.classList.add("text-slate-300", "nav-link", "hover:bg-slate-800");

  planetsSection.classList.add("hidden")


})



planetsLink.addEventListener("click", function () {


  planetsLink.classList.add("bg-blue-500/10", "text-blue-400");
  planetsLink.classList.remove("text-slate-300", "nav-link", "hover:bg-slate-800");

  planetsSection.classList.remove("hidden")



  todayLink.classList.remove("bg-blue-500/10", "text-blue-400");
  todayLink.classList.add("text-slate-300", "nav-link", "hover:bg-slate-800");

  todaySection.classList.add("hidden");



  launchesLink.classList.remove("bg-blue-500/10", "text-blue-400");
  launchesLink.classList.add("text-slate-300", "nav-link", "hover:bg-slate-800");

  launchesSection.classList.add("hidden");




})


todayLink.addEventListener("click", function () {


  todayLink.classList.add("bg-blue-500/10", "text-blue-400");
  todayLink.classList.remove("text-slate-300", "nav-link", "hover:bg-slate-800");

  todaySection.classList.remove("hidden");



  planetsLink.classList.remove("bg-blue-500/10", "text-blue-400");
  planetsLink.classList.add("text-slate-300", "nav-link", "hover:bg-slate-800");

  planetsSection.classList.add("hidden");


  launchesLink.classList.remove("bg-blue-500/10", "text-blue-400");
  launchesLink.classList.add("text-slate-300", "nav-link", "hover:bg-slate-800");

  launchesSection.classList.add("hidden");



})




// ====================== Section Planets ===========================




async function getPlanets() {



  try {


    var res = await fetch("https://solar-system-opendata-proxy.vercel.app/api/planets");

    var data = await res.json();

    // console.log("Plants", data.bodies);

    var planetsName = [];
    var planetsImage = [];
    var planetsDis = [];
    var planetsDia = [];
    var planetsMass = [];
    var planetsPeriod = [];
    var planetsMoons = [];
    var planetsType = [];


    for (var i = 0; i < data.bodies.length; i++) {
      var planet = data.bodies[i];

      planetsName.push(planet.englishName);
      planetsImage.push(planet.image);
      planetsDis.push((planet.semimajorAxis / 149597870.7).toFixed(2));
      planetsDia.push(Math.round(planet.meanRadius * 2).toLocaleString("en-US"));
      planetsMass.push(((planet.mass.massValue * Math.pow(10, planet.mass.massExponent)) / (5.97237 * Math.pow(10, 24))).toFixed(3));
      planetsPeriod.push((planet.sideralOrbit / 365.25).toFixed(1));
      planetsMoons.push(moonsCount(planet.moons));
      planetsType.push(planet.type);
    }


    displayPlants(planetsName, planetsImage, planetsDis);
    planetComparison(planetsName, planetsDis, planetsDia, planetsMass, planetsPeriod, planetsMoons, planetsType);

    earthDisplay(data);





  }



  catch (err) {

    console.log(err);

  }



}






function displayPlants(planetsName, planetsImage, planetsDis) {


  var container = ``;


  for (var i = 0; i < planetsName.length; i++) {

    container += `
        
        
          <!-- Mercury -->
          <div
            class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
            data-planet-id="mercury" style="--planet-color: #eab308" onmouseover="this.style.borderColor='#eab30880'"
            onmouseout="this.style.borderColor='#334155'">
            <div class="relative mb-3 h-24 flex items-center justify-center">
              <img class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                src="${planetsImage[i]}" alt="${planetsName[i]}" />
            </div>
            <h4 class="font-semibold text-center text-sm">${planetsName[i]}</h4>
            <p class="text-xs text-slate-400 text-center">${planetsDis[i]} AU</p>
          </div>



        
        
        
        `




  }



  document.getElementById("planets-grid").innerHTML = container;



}




function earthDisplay(x) {

  var earth = x.bodies[6];

  var semi = (earth.semimajorAxis /1000000 ).toFixed(1);
  
  var redius = Math.round(earth.meanRadius).toLocaleString("en-US");


  console.log(semi);
  
  var container = ` `;

  container += `
  

  

          <div
            class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
            <div class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0">
              <div class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6">
                <img id="planet-detail-image" class="w-full h-full object-contain" src="${earth.image}"
                  alt="earth planet detailed realistic render with clouds and continents" />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between mb-3 md:mb-4">
                  <h3 id="planet-detail-name" class="text-2xl md:text-3xl font-space font-bold">
                    ${earth.englishName}
                  </h3>
                  <button class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <i class="far fa-heart"></i>
                  </button>
                </div>
                <p id="planet-detail-description"
                  class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  ${earth.description}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
              <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-ruler text-xs"></i>
                  <span class="text-xs">Semimajor Axis</span>
                </p>
                <p id="planet-distance" class="text-sm md:text-lg font-semibold">
                  ${semi}M km
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-circle"></i>
                  Mean Radius
                </p>
                <p id="planet-radius" class="text-lg font-semibold">
                  ${redius} km
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-weight"></i>
                  Mass
                </p>
                <p id="planet-mass" class="text-lg font-semibold">
                  ${earth.mass.massValue} × 10^${earth.mass.massExponent} kg
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-compress"></i>
                  Density
                </p>
                <p id="planet-density" class="text-lg font-semibold">
                  ${earth.density} g/cm³
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-sync-alt"></i>
                  Orbital Period
                </p>
                <p id="planet-orbital-period" class="text-lg font-semibold">
                  ${earth.sideralOrbit.toFixed(2)} days
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-redo"></i>
                  Rotation Period
                </p>
                <p id="planet-rotation" class="text-lg font-semibold">
                  ${earth.sideralRotation.toFixed(2)} hours
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-moon"></i>
                  Moons
                </p>
                <p id="planet-moons" class="text-lg font-semibold">${earth.moons.length}</p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-arrows-alt-v"></i>
                  Gravity
                </p>
                <p id="planet-gravity" class="text-lg font-semibold">
                  ${earth.gravity.toFixed(2)} m/s²
                </p>
              </div>
            </div>
          </div>




          <div class="space-y-6">
            <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h4 class="font-semibold mb-4 flex items-center">
                <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                Discovery Info
              </h4>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Discovered By</span>
                  <span id="planet-discoverer" class="font-semibold text-right">Known since antiquity</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Discovery Date</span>
                  <span id="planet-discovery-date" class="font-semibold">Ancient times</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Body Type</span>
                  <span id="planet-body-type" class="font-semibold">${earth.bodyType}</span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-slate-400">Volume</span>
                  <span id="planet-volume" class="font-semibold">${earth.vol.volValue} × 10^${earth.vol.volExponent} km³</span>
                </div>
              </div>
            </div>
            <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h4 class="font-semibold mb-4 flex items-center">
                <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                Quick Facts
              </h4>
              <ul id="planet-facts" class="space-y-3 text-sm">
                <li class="flex items-start">
                  <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                  <span class="text-slate-300">Mass : ${earth.mass.massValue} × 10^${earth.mass.massExponent} kg</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                  <span class="text-slate-300">Surface gravity : ${earth.gravity} m/s²</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                  <span class="text-slate-300">Density : ${earth.density} g/cm³</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                  <span class="text-slate-300">Axial tilt : ${earth.axialTilt}°</span>
                </li>
              </ul>
            </div>
            <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h4 class="font-semibold mb-4 flex items-center">
                <i class="fas fa-satellite text-blue-400 mr-2"></i>
                Orbital Characteristics
              </h4>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Perihelion</span>
                  <span id="planet-perihelion" class="font-semibold">${(earth.perihelion/1000000).toFixed(1)}M km</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Aphelion</span>
                  <span id="planet-aphelion" class="font-semibold">${(earth.aphelion/1000000).toFixed(1)}M km</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Eccentricity</span>
                  <span id="planet-eccentricity" class="font-semibold">${earth.eccentricity}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Inclination</span>
                  <span id="planet-inclination" class="font-semibold">${earth.inclination}°</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Axial Tilt</span>
                  <span id="planet-axial-tilt" class="font-semibold">${earth.axialTilt.toFixed(2)}°</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Avg Temperature</span>
                  <span id="planet-temp" class="font-semibold">${earth.avgTemp}°C</span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-slate-400">Escape Velocity</span>
                  <span id="planet-escape" class="font-semibold">${earth.escape/1000} km/s</span>
                </div>
              </div>
            </div>
            <button class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
              <i class="fas fa-book mr-2"></i>Learn More
            </button>
          </div>



  
  
  
  
  `;






  document.getElementById("earth-info").innerHTML = container;



}


// earthDisplay();




function moonsCount(planetMoons) {


  var moonsCount = 0;
  if (planetMoons != null) {
    moonsCount = planetMoons.length;

  }

  return moonsCount;

}



var planetColors = {
  "Uranus": "#22d3ee",
  "Neptune": "#2563eb",
  "Jupiter": "#fdba74",
  "Mars": "#ef4444",
  "Mercury": "#6b7280",
  "Saturn": "#fde047",
  "Earth": "#3b82f6",
  "Venus": "#fb923c"
};

var typeStyles = {
  "Ice Giant": "background-color: rgba(59,130,246,0.5); color: #bfdbfe;",
  "Gas Giant": "background-color: rgba(168,85,247,0.5); color: #e9d5ff;",
  "Terrestrial": "background-color: rgba(249,115,22,0.5); color: #fed7aa;"
};

function planetComparison(planetsName, planetsDis, planetDia, planetsMass, planetsPeriod, planetsMoons, planetsType) {


  var container = ``;


  for (var i = 0; i < planetsName.length; i++) {

    var rowStyle = "";
    if (planetsName[i] === "Earth") {
      rowStyle = "background-color: rgba(59, 130, 246, 0.05);";
    }


    container += `
     <tr class="hover:bg-slate-800/30 transition-colors" style="${rowStyle}">
                    <td class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10">
                      <div class="flex items-center space-x-2 md:space-x-3">
                        <div class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0" style="background-color:${planetColors[planetsName[i]]}">
                        </div>
                        <span class="font-semibold text-sm md:text-base whitespace-nowrap">${planetsName[i]}</span>
                      </div>
                    </td> 
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${planetsDis[i]}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${planetDia[i]}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${planetsMass[i]}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${planetsPeriod[i]} years
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${planetsMoons[i]}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span class="px-2 py-1 rounded text-xs" style="${typeStyles[planetsType[i]]}" >${planetsType[i]}</span> 
                    </td>
                  </tr>
    
    `


  }

  document.getElementById("planet-comparison-tbody").innerHTML = container;



}

getPlanets();







// ====================== Section Launches ===========================






async function getLaunches() {



  try {


    var res = await fetch("https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10");

    var data = await res.json();




    upLaunches(data.results);
    smallLunches(data.results);





  }



  catch (err) {

    console.log(err);

  }



}


function timeStyle(net) {
  var date = new Date(net);

  var fullDate = date.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "UTC"
  });

  var shortDate = date.toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric", timeZone: "UTC"
  });

  var time = date.toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", timeZone: "UTC"
  }) + " UTC";

  return { fullDate: fullDate, shortDate: shortDate, time: time };
}



function upLaunches(trips) {


  var container = ``;

  var t = timeStyle(trips[0].net);

  container += `
    

    <div
            class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all">
            <div
              class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity">
            </div>
            <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
              <div class="flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-3 mb-4">
                    <span
                      class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2">
                      <i class="fas fa-star"></i>
                      Featured Launch
                    </span>
                    <span class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                      ${trips[0].status.abbrev}
                    </span>
                  </div>
                  <h3 class="text-3xl font-bold mb-3 leading-tight">
                    ${trips[0].name}
                  </h3>
                  <div class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400">
                    <div class="flex items-center gap-2">
                      <i class="fas fa-building"></i>
                      <span>${trips[0].launch_service_provider.name}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <i class="fas fa-rocket"></i>
                      <span>${trips[0].rocket.configuration.name}</span>
                    </div>
                  </div>
                  <div
                    class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6">
                    <i class="fas fa-clock text-2xl text-blue-400"></i>
                    <div>
                      <p class="text-2xl font-bold text-blue-400">2</p>
                      <p class="text-xs text-slate-400">Days Until Launch</p>
                    </div>
                  </div>
                  <div class="grid xl:grid-cols-2 gap-4 mb-6">
                    <div class="bg-slate-900/50 rounded-xl p-4">
                      <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-calendar"></i>
                        Launch Date
                      </p>
                      <p class="font-semibold">${t.fullDate}</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-xl p-4">
                      <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-clock"></i>
                        Launch Time
                      </p>
                      <p class="font-semibold">${t.time}</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-xl p-4">
                      <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-map-marker-alt"></i>
                        Location
                      </p>
                      <p class="font-semibold text-sm">${trips[0].pad.location.name}</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-xl p-4">
                      <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-globe"></i>
                        Country
                      </p>
                      <p class="font-semibold">${trips[0].pad.country.name}</p>
                    </div>
                  </div>
                  <p class="text-slate-300 leading-relaxed mb-6">
                    ${trips[0].mission.description}
                  </p>
                </div>
                <div class="flex flex-col md:flex-row gap-3">
                  <button
                    class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2">
                    <i class="fas fa-info-circle"></i>
                    View Full Details
                  </button>
                  <div class="icons self-end md:self-center">
                    <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                      <i class="far fa-heart"></i>
                    </button>
                    <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                      <i class="fas fa-bell"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="relative">
                <div class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50">
                 <img src="${trips[0].image.image_url}" class="w-full h-full object-cover" alt="${trips[0].name}">
                  <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
    
    
    
    `



  document.getElementById("featured-launch").innerHTML = container;
}





function smallLunches(trips) {



  var container = ``;

  for (var i = 1; i < trips.length; i++) {

    var lunch = trips[i];

    var t = timeStyle(lunch.net);



    container += `
        
        
          <div
            class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
            <div class="relative h-48 bg-slate-900/50 overflow-hidden flex items-center justify-center">
                     <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="${trips[i].image.image_url}" alt="${trips[i].name}">
              <div class="absolute top-3 right-3">
                <span class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold">
                  ${trips[i].status.abbrev}
                </span>
              </div>
            </div>
            <div class="p-5">
              <div class="mb-3">
                <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  ${trips[i].name}
                </h4>
                <p class="text-sm text-slate-400 flex items-center gap-2">
                  <i class="fas fa-building text-xs"></i>
                  ${trips[i].launch_service_provider.name}
                </p>
              </div>
              <div class="space-y-2 mb-4">
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-calendar text-slate-500 w-4"></i>
                  <span class="text-slate-300">${t.shortDate}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-clock text-slate-500 w-4"></i>
                  <span class="text-slate-300">${t.time}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-rocket text-slate-500 w-4"></i>
                  <span class="text-slate-300">${trips[i].rocket.configuration.name}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                  <span class="text-slate-300 line-clamp-1">${trips[i].pad.location.name}</span>
                </div>
              </div>
              <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
                <button
                  class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
                  Details
                </button>
                <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                  <i class="far fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        
        
        `




  }



  document.getElementById("launches-grid").innerHTML = container


}




getLaunches()





// ====================== Section Today ===========================





async function getTodayPic() {



  try {

    // error

    var res = await fetch("https://api.nasa.gov/planetary/apod?api_key=n6Q6M9cFgCbpK8hGLczKdpp9rPdFPTWkbtdFqrQb");

    var data = await res.json();



    console.log(data);






  }



  catch (err) {

    console.log(err);

  }



}



async function getTodayDate() {



  try {


    var res = await fetch("https://api.nasa.gov/planetary/apod?api_key=n6Q6M9cFgCbpK8hGLczKdpp9rPdFPTWkbtdFqrQb&date=2025-12-01");

    var data = await res.json();




    displayDate(data);


  }



  catch (err) {

    console.log(err);

  }



}




function displayDate(dateToday) {


  var container = ``;


  container += `
    
    
    
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 class="text-xl md:text-2xl font-space font-bold mb-1">
              Today in Space
            </h2>
            <p id="apod-date" class="text-slate-400 text-xs md:text-sm">
              Astronomy Picture of the Day - ${dateToday.date}
            </p>
          </div>
          <div class="flex items-center space-x-2 md:space-x-3">
            <label for="apod-date-input" class="date-input-wrapper">
              <input type="date" id="apod-date-input" class="custom-date-input" value="${dateToday.date}" max=""
                min="1995-06-16" />
              <span class="text-sm">${dateToday.date}</span>
            </label>
            <button id="load-date-btn"
              class="px-3 md:px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-sm flex items-center space-x-1 md:space-x-2">
              <i class="fas fa-search"></i>
              <span class="hidden sm:inline">Load</span>
            </button>
            <button id="today-apod-btn"
              class="px-3 md:px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors font-semibold text-sm">
              Today
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <div class="xl:col-span-2">
            <div id="apod-image-container"
              class="relative rounded-2xl overflow-hidden group h-[300px] md:h-[400px] lg:h-[600px] bg-slate-800/50 flex items-center justify-center">
              <div id="apod-loading" class="text-center hidden">
                <i class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"></i>
                <p class="text-slate-400">Loading today's image...</p>
              </div>
              <!-- Using a placeholder image or one from assets if available. Using a reliable external placeholder for now or a relative path if we knew one. Sticking to a colored placeholder div if no image, but let's try a realistic placeholder or just the rocket icon style used elsewhere if we want to be safe. But user wants design. I'll use a relative path assuming assets exist or a generic space placeholder. -->
              <img id="apod-image" class="w-full h-full object-cover" src="${dateToday.url}"
                alt="Astronomy Picture of the Day" />
              <div
                class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div class="absolute bottom-6 left-6 right-6">
                  <button
                    class="w-full py-3 bg-white/10 backdrop-blur-md rounded-lg font-semibold hover:bg-white/20 transition-colors">
                    <i class="fas fa-expand mr-2"></i>View Full Resolution
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="space-y-4 md:space-y-6">
            <div class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6">
              <h3 id="apod-title" class="text-lg md:text-2xl font-semibold mb-3 md:mb-4">
                ${dateToday.title}
              </h3>
              <div class="flex items-center space-x-4 mb-4 text-sm text-slate-400">
                <span id="apod-date-detail"><i class="far fa-calendar mr-2"></i>2024-03-14</span>
              </div>
              <p id="apod-explanation" class="text-slate-300 leading-relaxed mb-4">
                The Rosette Nebula is a large spherical H II region located
                near one end of a giant molecular cloud in the Monoceros
                region of the Milky Way Galaxy. The open cluster NGC 2244
                (Caldwell 50) is closely associated with the nebulosity, the
                stars of the cluster having been formed from the nebula's
                matter.
              </p>
              <div id="apod-copyright" class="text-xs text-slate-400 italic mb-4">
                &copy; NASA/JPL
              </div>
            </div>
            <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h4 class="font-semibold mb-3 flex items-center">
                <i class="fas fa-info-circle text-blue-400 mr-2"></i>
                Image Details
              </h4>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-slate-400">Date</span>
                  <span id="apod-date-info" class="font-medium">${dateToday.date}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Media Type</span>
                  <span id="apod-media-type" class="font-medium">${dateToday.media_type}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Source</span>
                  <span class="font-medium">NASA APOD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    
    
    
    
    
    
    `




  document.getElementById("today-in-space").innerHTML = container;



}

// getTodayPic();

getTodayDate();
