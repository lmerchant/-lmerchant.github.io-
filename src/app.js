import axios from 'axios'
import {cchdoPopupText, bcodmoPopupText} from './popUpText'
import {showTables} from './showTables'

// //function cchdoPopupText(feature) {
//   return (
//     `
//     <table class="table table-striped table-sm">
//     <tbody>
//     <tr>
//       <th scope="row">Expocode</th><td><a href="https://cchdo.ucsd.edu/cruise/${feature['properties']['expocode']}" target="_blank">${feature['properties']['expocode']}</a></td>
//     </tr>
//     <tr>
//       <th scope="row">Start Date</th><td>${feature['properties']['start_date']}</td>
//     </tr>
//     <tr>
//       <th scope="row">End Date</th><td>${feature['properties']['end_date']}</td>
//     </tr>
//     <tr>
//       <th scope="row">Platform</th><td>${feature['properties']['platform']}</td>
//     </tr>
//     <tr>
//       <th scope="row">Chief Scientist</th><td>${feature['properties']['chief_scientist']}</td>
//     </tr>
//     </tbody>
//     </table>
//     `
//     )
// }



// function bcodmoPopupText(feature) {
//   return (
//     `
//       <table class="table table-striped table-sm">
//       <tbody>
//       <tr>
//         <th scope="row">Dataset ID</th><td><a href="https://www.bco-dmo.org/dataset/${feature['properties']['dataset_id']}" target="_blank">${feature['properties']['dataset_id']}</a></td>
//       </tr>
//       <tr>
//         <th scope="row">Start Date</th><td>${feature['properties']['start_date']}</td>
//       </tr>
//       <tr>
//         <th scope="row">End Date</th><td>${feature['properties']['end_date']}</td>
//       </tr>
//       <tr>
//         <th scope="row">Platform</th><td>${feature['properties']['platforms']}</td>
//       </tr>
//       <tr>
//         <th scope="row">Chief Scientist</th><td>${feature['properties']['chief_scientist']}</td>
//       </tr>
//       </tbody>
//       </table>
//     `
//     )
// }


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

      //var minDateEl = document.querySelector('.min_date')
      //var maxDateEl = document.querySelector('.max_date')

      minDateEl.innerHTML = minDate
      maxDateEl.innerHTML = maxDate



      var cchdoFeaturesFiltered = cchdoFeatures.filter(function(feature) {
          var startDate = feature['properties']['start_date']
          var endDate = feature['properties']['end_date']

          if (startDate) {
            var startYear = parseInt(startDate.slice(0,4))
          } else {
            return false
          }

          if (endDate) {
            var endYear = parseInt(endDate.slice(0,4))
          } else {
            return false
          }

          return startYear > minDate && endYear < maxDate

        })

      var bcodmoFeaturesFiltered = bcodmoFeatures.filter(function(feature) {
          var startDate = feature['properties']['start_date']
          var endDate = feature['properties']['end_date']

          if (startDate) {
            var startYear = parseInt(startDate.slice(0,4))
          } else {
            return false
          }

          if (endDate) {
            var endYear = parseInt(endDate.slice(0,4))
          } else {
            return false
          }

          if (startDate && endDate) {
            var endYear = parseInt(endDate.slice(0,4))
            return startYear >= minDate && endYear <= maxDate
          } else {
            return startYear >= minDate && startYear <= maxDate
          }
        
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


// function showTables(myFeatureCCHDO, myFeatureBCODMO) {

//   var parent
//   var element
//   var el_id

//   var parents = []
//   var myLayers = []

//   var expocode
//   var datasetId
//   var platform
//   var platforms
//   var startDate
//   var endDate
//   var chiefScientist

//   var cchdoExpocodes = []
//   var cchdoPlatforms = []
//   var cchdoStartDates = []
//   var cchdoEndDates = []
//   var cchdoChiefScientists = []

//   var bcodmoDatasetIds = []
//   var bcodmoPlatforms = []
//   var bcodmoStartDates = []
//   var bcodmoEndDates = []
//   var bcodmoChiefScientists = []    

//   myFeatureCCHDO.eachLayer(function(layer) {

//       // markers in layer
//       layer.eachLayer(function (layer) {

//         if(map.getBounds().contains(layer.getLatLng())) {


//           parent = layer._eventParents
//           el_id = Object.keys(parent)[0]
          

//           expocode = layer.feature.properties.expocode
//           platform = layer.feature.properties.platform
//           startDate = layer.feature.properties.start_date
//           endDate = layer.feature.properties.end_date
//           chiefScientist = layer.feature.properties.chief_scientist

//           if(cchdoExpocodes.indexOf(expocode) === -1) {
//             cchdoExpocodes.push(expocode)
//             cchdoPlatforms.push(platform)
//             cchdoStartDates.push(startDate)
//             cchdoEndDates.push(endDate)
//             cchdoChiefScientists.push(chiefScientist)

//           }

//         }   
//       })

//   });  /// end feature cchdo


//   myFeatureBCODMO.eachLayer(function(layer) {

//       // markers in layer
//       layer.eachLayer(function (layer) {

//         if(map.getBounds().contains(layer.getLatLng())) {

//           parent = layer._eventParents
//           el_id = Object.keys(parent)[0]

//           datasetId = layer.feature.properties.dataset_id
//           platforms = layer.feature.properties.platforms
//           startDate = layer.feature.properties.start_date
//           endDate = layer.feature.properties.end_date
//           chiefScientist = layer.feature.properties.chief_scientist

//           if(bcodmoDatasetIds.indexOf(datasetId) === -1) {
//             bcodmoDatasetIds.push(datasetId)
//             bcodmoPlatforms.push(platforms)
//             bcodmoStartDates.push(startDate)
//             bcodmoEndDates.push(endDate)
//             bcodmoChiefScientists.push(chiefScientist)

//           }

//         }   
//       })

//   }); // end feature bcodmo 



//   // Datatable

//   var dataSet1 = []
//   var element

//   for (var k = 0; k < cchdoExpocodes.length; k++) {

//     element = [cchdoExpocodes[k], cchdoPlatforms[k],
//                cchdoStartDates[k], cchdoEndDates[k], cchdoChiefScientists[k]]
//     dataSet1.push(element)


//   }

  
//   var dataSet2 = []

//   for (var k = 0; k < bcodmoDatasetIds.length; k++) {

//     element = [bcodmoDatasetIds[k], bcodmoPlatforms[k],
//                bcodmoStartDates[k], bcodmoEndDates[k], bcodmoChiefScientists[k]]
//     dataSet2.push(element)


//   }


//   $(document).ready(function() {

//       $.fn.dataTable.moment( 'YYYY-MM-DD' );

//       $('#datatable1').DataTable( {
//           "destroy": true,
//           "paging": true,
//           "pagingType": "full_numbers",
//           "data": dataSet1,
//           "columns": [
//               { title: "Expocode"},
//               { title: "Platform"},
//               { title: "Start Date" },
//               { title: "End Date" },
//               { title: "PI" }
//           ],
//           "columnDefs": [ {
//             "targets": 0,
//             "render": function ( data, type, row, meta ) {
//               return '<a href="https://cchdo.ucsd.edu/cruise/'+ data +'">'+ data + '</a>';
//             }
//           }
//           ],

//           "order": [[ 1, "desc" ]]
//       } );

//   } ); // end datatable





//   $(document).ready(function() {

//       $.fn.dataTable.moment( 'YYYY-MM-DD' );

//       $('#datatable2').DataTable( {
//           "destroy": true,
//           "paging": true,
//           "pagingType": "full_numbers",
//           "data": dataSet2,
//           "columns": [
//               { title: "Dataset Id"},
//               { title: "Platforms"},
//               { title: "Start Date" },
//               { title: "End Date" },
//               { title: "PI" }
//           ],
//           "columnDefs": [ {
//             "targets": 0,
//             "render": function ( data, type, row, meta ) {
//               return '<a href="https://www.bco-dmo.org/dataset/'+ data +'">'+ data + '</a>';
//             }
//           }, 
//           {
//             "targets": 1,
//             "render": function(data,type,row,meta) {
//                 var list = "<ul>";
//                 for (var i=0; i< data.length; i++){
//                   list += "<li>" + data[i] + "</li>";
//                 }
//                 list += "</ul>";
//                 return list}
//             }
//           ],

//           "order": [[ 1, "desc" ]]
//       } );

//   }); // end datatable


// }


map.on('zoomend', function() {

  showTables(map, myFeatureCCHDO, myFeatureBCODMO)

}); // end on zoom





