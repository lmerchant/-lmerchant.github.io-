import axios from 'axios'
import {cchdoPopupText, bcodmoPopupText} from './popUpText'
import {showTables} from './showTables'


var map = L.map('mapid',{"preferCanvas": true, zoomSnap: 0.25, zoomControl: false}).setView([0, 0], 1.25);

var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)


var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);


map.spin(true);


  let cchdo_markers = {
      radius: 5,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };

    let bcodmo_markers = {
      radius: 5,
      fillColor: "#00cc00",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };

  L.Control.boxzoom({ position:'topleft' }).addTo(map);

  var myFeatureCCHDO = L.featureGroup();
  var myFeatureBCODMO = L.featureGroup();




// basemap.on('loading', function (event) {
//   console.log('start loading tiles');
  
// });

// basemap.on('load', function (event) {
//   console.log('all tiles loaded');
// });




Promise.all([
  fetch("data/cchdo_cruises.json"),
  fetch("data/bco-dmo_cruises.json")
]).then(function([cchdo, bcodmo]) {

  return Promise.all([cchdo.json(), bcodmo.json()]);

}).then(function([cchdoJson, bcodmoJson]) {

    console.log(cchdoJson.features.length)
    console.log(bcodmoJson.features.length)

    map.spin(false)


    var cchdoFeatures = cchdoJson["features"]
  
    var cchdoGeoLayer = L.geoJson(cchdoFeatures, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, cchdo_markers);
        },
        onEachFeature: function (feature, layer) {

        layer.bindPopup(cchdoPopupText(feature))

      }
    }).addTo(map); 

    myFeatureCCHDO.addLayer(cchdoGeoLayer);


    var bcodmoFeatures = bcodmoJson["features"]
  
    var bcodmoGeoLayer = L.geoJson(bcodmoFeatures, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, bcodmo_markers);
        },
        onEachFeature: function (feature, layer) {
                layer.bindPopup(bcodmoPopupText(feature))
      }
    }).addTo(map); 

    myFeatureBCODMO.addLayer(bcodmoGeoLayer);


    map.addLayer(myFeatureCCHDO);
    map.addLayer(myFeatureBCODMO);

    var baseMaps = {
      "base": basemap
    };

    var overlayMaps = {
      "<span class='cchdo_legend'>CCHDO</span>": myFeatureCCHDO,
      "<span class='bcodmo_legend'>BCO-DMO</span>": myFeatureBCODMO
    }

    //var layerscontrol = L.control.layers(baseMaps, overlayMaps).addTo(map);

    var layerscontrol = L.control.layers(baseMaps, overlayMaps,{collapsed:false, hideSingleBase:true}).addTo(map);


  showTables(map, myFeatureCCHDO, myFeatureBCODMO)


  var sliderElement = document.getElementById('slider');
  noUiSlider.create(slider, {
      connect: true,
      start: [ 1950, 2020 ],
      range: {
          min: 1950,
          max: 2020
      }
  });


  var minDateEl = document.querySelector('.min_date')
  var maxDateEl = document.querySelector('.max_date')

  slider.noUiSlider.on('update', function() {

      var sliderVal = slider.noUiSlider.get()
      var minDate = parseInt(sliderVal[0])
      var maxDate = parseInt(sliderVal[1])

      minDateEl.innerHTML = minDate
      maxDateEl.innerHTML = maxDate
  })


  //sliderElement.addEventListener('click', function () {
  slider.noUiSlider.on('change', function() {

      var sliderVal = slider.noUiSlider.get()
      var minDate = parseInt(sliderVal[0])
      var maxDate = parseInt(sliderVal[1])

      console.log('start', cchdoFeatures.length)

      minDateEl.innerHTML = minDate
      maxDateEl.innerHTML = maxDate

      function filterByDate(feature) {
        var startDate = feature['properties']['start_date']
        var endDate = feature['properties']['end_date']

        if (startDate) {
          var startYear = parseInt(startDate.slice(0,4))
        } 

        if (endDate) {
          var endYear = parseInt(endDate.slice(0,4))
        } 

        if (!startDate) {
          return false
        }

        if (startYear >= minDate && startYear <= maxDate) {
          return true
        } else if (endDate && (endYear >= minDate && endYear <= maxDate)) {
          return true
        } else {
          return false
        }        
      }

      var cchdoFeaturesFiltered = cchdoFeatures.filter(function(feature) {
          return filterByDate(feature)
      })

      var bcodmoFeaturesFiltered = bcodmoFeatures.filter(function(feature) {
        return filterByDate(feature)
       })


    map.removeLayer(myFeatureCCHDO)
    map.removeLayer(myFeatureBCODMO)


    myFeatureCCHDO = L.featureGroup();
    myFeatureBCODMO = L.featureGroup();


    cchdoGeoLayer = L.geoJson(cchdoFeaturesFiltered, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, cchdo_markers);
        },
        onEachFeature: function (feature, layer) {
        layer.bindPopup(cchdoPopupText(feature))
      }

    }).addTo(map); 

    myFeatureCCHDO.addLayer(cchdoGeoLayer);

  
    var bcodmoGeoLayer = L.geoJson(bcodmoFeaturesFiltered, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, bcodmo_markers);
        },
        onEachFeature: function (feature, layer) {
                layer.bindPopup(bcodmoPopupText(feature))
      }
    }).addTo(map); 

    myFeatureBCODMO.addLayer(bcodmoGeoLayer);


    map.addLayer(myFeatureCCHDO);
    map.addLayer(myFeatureBCODMO);

    baseMaps = {
      "base": basemap
    };

    overlayMaps = {
      "<span class='cchdo_legend'>CCHDO</span>": myFeatureCCHDO,
      "<span class='bcodmo_legend'>BCO-DMO</span>": myFeatureBCODMO
    }

     layerscontrol.remove()


    layerscontrol = L.control.layers(baseMaps, overlayMaps,{collapsed:false, hideSingleBase:true}).addTo(map);


    // Set tables innerHTML to nothing
    var cchdoTable = document.querySelector('#datatable1')
    var bcodmoTable = document.querySelector('#datatable2')

    cchdoTable.innerHTML = ''
    bcodmoTable.innerHTML = ''

    showTables(map, myFeatureCCHDO, myFeatureBCODMO)

  });

})


map.on('zoomend', function() {

  showTables(map, myFeatureCCHDO, myFeatureBCODMO)

}); 





