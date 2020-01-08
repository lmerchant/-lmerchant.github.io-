

var map = L.map('mapid',{"preferCanvas": true}).setView([51.505, -0.09], 1);

var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)



L.Control.boxzoom({ position:'topleft' }).addTo(map);


let geojsonMarkerOptions1 = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };

  let geojsonMarkerOptions2 = {
    radius: 4,
    fillColor: "#00cc00",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };

var myFeatureGroup1 = L.featureGroup();
var myFeatureGroup2 = L.featureGroup();

Promise.all([
  fetch("data/cchdo_cruises.json"),
  fetch("data/bco-dmo_cruises.json")
]).then(function([group1, group2]) {

  return Promise.all([group1.json(), group2.json()]);

}).then(function([group1Json, group2Json]) {

  console.log(group1Json.length)
  console.log(group2Json.length)


    features = group1Json["features"]
  
    geoLayer = L.geoJson(features, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions1);
        },
        onEachFeature: function (feature, layer) {
        layer.bindPopup('<p>expocode: '+ '<expocode>' +'</p>');
      }
    }).addTo(map); 

    myFeatureGroup1.addLayer(geoLayer);


    features = group2Json["features"]
  
    geoLayer = L.geoJson(features, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions2);
        },
        onEachFeature: function (feature, layer) {
        layer.bindPopup('<p>expocode: '+ '<expocode>' +'</p>');
      }
    }).addTo(map); 

    myFeatureGroup2.addLayer(geoLayer);


})


    var group1 = L.layerGroup(myFeatureGroup1);

    var group2 = L.layerGroup(myFeatureGroup2);


    map.addLayer(myFeatureGroup1);
    map.addLayer(myFeatureGroup2);

    var baseMaps = {
      "base": OpenStreetMap_Mapnik
    };

    var overlayMaps = {
      "Group1": myFeatureGroup1,
      "Group2": myFeatureGroup2
    }

    L.control.layers(baseMaps, overlayMaps).addTo(map);








// const xhr = new XMLHttpRequest();

// xhr.open('GET', 'cchdo_cruises.json');
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.responseType = 'json';

// xhr.onload = function() {
//     if (xhr.status !== 200) return

//     data = xhr.response

//     features = data["features"]
  
//     //L.geoJSON(features).addTo(map);

//     geoLayer = L.geoJson(features, {
//         pointToLayer: function (feature, latlng) {
//             return L.circleMarker(latlng, geojsonMarkerOptions1);
//         },
//         onEachFeature: function (feature, layer) {
//         layer.bindPopup('<p>expocode: '+ '<expocode>' +'</p>');
//       }
//     }).addTo(map); 

// };
// xhr.send();



// const xhr = new XMLHttpRequest();

// xhr.open('GET', 'bco-dmo_cruises.json');
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.responseType = 'json';

// xhr.onload = function() {
//     if (xhr.status !== 200) return

//     data = xhr.response

//     features = data["features"]
  
//     //L.geoJSON(features).addTo(map);

//     geoLayer = L.geoJson(features, {
//         pointToLayer: function (feature, latlng) {
//             return L.circleMarker(latlng, geojsonMarkerOptions2);
//         },
//         onEachFeature: function (feature, layer) {
//         layer.bindPopup('<p>expocode: '+ '<expocode>' +'</p>');
//       }
//     }).addTo(map); 

// };
// xhr.send();








// var map is an instance of a Leaflet map
// this function assumes you have added markers as GeoJSON to the map
// it will return an array of all features currently shown in the
// active bounding region.

// function getFeaturesInView() {
//   var features = [];
//   map.eachLayer( function(layer) {
//     if(layer instanceof L.Marker) {
//       if(map.getBounds().contains(layer.getLatLng())) {
//         features.push(layer.feature);
//       }
//     }
//   });
//   return features;
// }


// function getFeaturesInView(myFeatures) {

//   var features = [];

//   var bbox = map.getBounds();

//   console.log(bbox)
//   console.log(bbox._northEast);
//   console.log(bbox._southWest);


// //   var bounds = [[X, Y], [X, Y]];

// // // create an orange rectangle
// // var boundingBox = L.rectangle(bounds, {color: "#ff7800", weight: 1});
// // map.addLayer(boundingBox);


//   // map.eachLayer( function(layer) {
//   //   if(layer instanceof L.Marker) {
//   //     if(map.getBounds().contains(layer.getLatLng())) {
//   //       features.push(layer.feature);
//   //     }
//   //   }
//   // });

//   // map.eachLayer( function(layer) {

//   //     if(map.getBounds().contains(layer.getLatLng())) {
//   //       features.push(layer.feature);
//   //     }
//   //   console.log('here')

//   // })


//     // // Loop through each point in JSON file
//     myFeatures.eachLayer(function (layer) {

//        newMap = map.getBounds().contains(layer.getLatLng())

//        console.log(newMap)

//     })

//   return features;
// }





// Promise.all([
//   fetch("cchdo_part1.json"),
//   fetch("cchdo_part2.json")
// ]).then(function([group1, group2]) {

//   return Promise.all([group1.json(), group2.json()]);

// }).then(function([group1Json, group2Json]) {

//   console.log(group1Json.length)
//   console.log(group2Json.length)



//   let coords
//   let type
//   let expocode
//   let group1GeoJson

//   let geojsonMarkerOptions1 = {
//     radius: 4,
//     fillColor: "#ff7800",
//     color: "#000",
//     weight: 1,
//     opacity: 1,
//     fillOpacity: 0.8
//   };



//   //var myFeatureGroup1 = L.featureGroup().addTo(map);
// var myFeatureGroup1 = L.featureGroup();


//   var geoLayer;

//   //group1Json.length = 200;
  
//   for (let i = 0; i < group1Json.length; i++) {

//     coords = group1Json[i].geometry.track.coordinates

//     //console.log(coords)

//     if (!coords) {
//       continue
//     }

//     coords = group1Json[i].geometry.track.coordinates
//     type = group1Json[i].geometry.track.type
//     expocode = group1Json[i].expocode
//     collection = group1Json[i].collections
//     ship = group1Json[i].ship
//     country = group1Json[i].country
//     startDate = group1Json[i].startDate
//     endDate = group1Json[i].endDate
//     participant = group1Json[i].participants

//     group1GeoJson = {}

//     group1GeoJson.type = "Feature"
//     group1GeoJson.geometry = {}
//     group1GeoJson.geometry.type = "MultiPoint"
//     group1GeoJson.geometry.coordinates = coords
//     group1GeoJson.properties = {}
//     group1GeoJson.properties.expocode = expocode
//     group1GeoJson.properties.collection = collection
//     group1GeoJson.properties.ship = ship
//     group1GeoJson.properties.country = country
//     group1GeoJson.properties.startDate = startDate
//     group1GeoJson.properties.endDate = endDate
//     group1GeoJson.properties.participant = participant

//     //myFeatures.features.push(group1GeoJson)


//     geoLayer = L.geoJson(group1GeoJson, {
//         pointToLayer: function (feature, latlng) {
//             return L.circleMarker(latlng, geojsonMarkerOptions1);
//         },
//         onEachFeature: function (feature, layer) {
//         //console.log(layer.feature)
//         layer.bindPopup('<p>expocode: '+ expocode +'</p>');
//       }
//     }).addTo(map);  

//     myFeatureGroup1.addLayer(geoLayer);

//   }



//   let group2GeoJson

//   let geojsonMarkerOptions2 = {
//     radius: 4,
//     fillColor: "#00cc00",
//     color: "#000",
//     weight: 1,
//     opacity: 1,
//     fillOpacity: 0.8
//   };


//   //var myFeatureGroup2 = L.featureGroup().addTo(map);
// var myFeatureGroup2 = L.featureGroup();


//   var geoLayer;

//   //group2Json.length = 200;
  
//   for (let i = 0; i < group2Json.length; i++) {

//     coords = group2Json[i].geometry.track.coordinates

//     //console.log(coords)

//     if (!coords) {
//       continue
//     }

//     coords = group2Json[i].geometry.track.coordinates
//     type = group2Json[i].geometry.track.type
//     expocode = group2Json[i].expocode
//     collection = group2Json[i].collections
//     ship = group2Json[i].ship
//     country = group2Json[i].country
//     startDate = group2Json[i].startDate
//     endDate = group2Json[i].endDate
//     participant = group2Json[i].participants

//     group2GeoJson = {}

//     group2GeoJson.type = "Feature"
//     group2GeoJson.geometry = {}
//     group2GeoJson.geometry.type = "MultiPoint"
//     group2GeoJson.geometry.coordinates = coords
//     group2GeoJson.properties = {}
//     group2GeoJson.properties.expocode = expocode
//     group2GeoJson.properties.collection = collection
//     group2GeoJson.properties.ship = ship
//     group2GeoJson.properties.country = country
//     group2GeoJson.properties.startDate = startDate
//     group2GeoJson.properties.endDate = endDate
//     group2GeoJson.properties.participant = participant

//     //myFeatures.features.push(group2GeoJson)


//     geoLayer = L.geoJson(group2GeoJson, {
//         pointToLayer: function (feature, latlng) {
//             return L.circleMarker(latlng, geojsonMarkerOptions2);
//         },
//         onEachFeature: function (feature, layer) {
//         //console.log(layer.feature)
//         layer.bindPopup('<p>expocode: '+ expocode +'</p>');
//       }
//     }).addTo(map);  

//     myFeatureGroup2.addLayer(geoLayer);

//   }


//     var group1 = L.layerGroup(myFeatureGroup1);

//     var group2 = L.layerGroup(myFeatureGroup2);


//     map.addLayer(myFeatureGroup1);
//     map.addLayer(myFeatureGroup2);

//     var baseMaps = {
//       "base": OpenStreetMap_Mapnik
//     };

//     var overlayMaps = {
//       "Group1": myFeatureGroup1,
//       "Group2": myFeatureGroup2
//     }

//     L.control.layers(baseMaps, overlayMaps).addTo(map);




//   var features;

//   map.on('zoomend', function() {

//     //features = []

//     var expocode
//     var parent
//     var element
//     var el_id


//     var expocodes1 = []
//     var collections1 = []
//     var ships1 = []
//     var countries1 = []
//     var startDates1 = []
//     var endDates1 = []
//     var participants1 = []

//     var expocodes2 = []
//     var collections2 = []
//     var ships2 = []
//     var countries2 = []
//     var startDates2 = []
//     var endDates2 = []
//     var participants2 = []    

//     var parents = []
//     var myLayers = []
//     //var myFeatureGroupLayers1 = []


//     myFeatureGroup1.eachLayer(function(layer) {

//       // layers in feature group
//       layer.eachLayer(function (layer) {

//         // markers in layer
//         layer.eachLayer(function (layer) {

//           if(map.getBounds().contains(layer.getLatLng())) {


//             parent = layer._eventParents

//             el_id = Object.keys(parent)[0]

//             expocode = parent[el_id].feature.properties.expocode
//             collection = parent[el_id].feature.properties.collection
//             ship = parent[el_id].feature.properties.ship
//             country = parent[el_id].feature.properties.country
//             startDate = parent[el_id].feature.properties.startDate
//             endDate = parent[el_id].feature.properties.endDate
//             participant = parent[el_id].feature.properties.participant

//             if(expocodes1.indexOf(expocode) === -1) {
//               expocodes1.push(expocode);
//               collections1.push(collection)
//               ships1.push(ship)
//               countries1.push(country)
//               startDates1.push(startDate)
//               endDates1.push(endDate)
//               participants1.push(participant)

//             }

//           }   
//         })

//       })

//     });  /// end featureGroup1


//     myFeatureGroup2.eachLayer(function(layer) {

//       // layers in feature group
//       layer.eachLayer(function (layer) {

//         // markers in layer
//         layer.eachLayer(function (layer) {

//           if(map.getBounds().contains(layer.getLatLng())) {

//             parent = layer._eventParents

//             el_id = Object.keys(parent)[0]

//             expocode = parent[el_id].feature.properties.expocode
//             collection = parent[el_id].feature.properties.collection
//             ship = parent[el_id].feature.properties.ship
//             country = parent[el_id].feature.properties.country
//             startDate = parent[el_id].feature.properties.startDate
//             endDate = parent[el_id].feature.properties.endDate
//             participant = parent[el_id].feature.properties.participant

//             if(expocodes2.indexOf(expocode) === -1) {
//               expocodes2.push(expocode);
//               collections2.push(collection)
//               ships2.push(ship)
//               countries2.push(country)
//               startDates2.push(startDate)
//               endDates2.push(endDate)
//               participants2.push(participant)

//             }


//           }   
//         })

//       })

//     }); /// end feature group2 

//     console.log(expocodes2)


//     // Datatable

//     var dataSet1 = []
//     var element

//     for (var k = 0; k < expocodes1.length; k++) {

//       element = [expocodes1[k], collections1[k], ships1[k], countries1[k],
//                  startDates1[k], endDates1[k], participants1[k]]
//       dataSet1.push(element)


//     }

    
//     var dataSet2 = []

//     for (var k = 0; k < expocodes2.length; k++) {

//       element = [expocodes2[k], collections2[k], ships2[k], countries2[k],
//                  startDates2[k], endDates2[k], participants2[k]]
//       dataSet2.push(element)


//     }


//     $(document).ready(function() {

//         $.fn.dataTable.moment( 'YYYY-MM-DD' );

//         $('#datatable1').DataTable( {
//             "destroy": true,
//             "paging": true,
//             "data": dataSet1,
//             "columns": [
//                 { title: "Expocode"},
//                 { title: "Line(s)"},
//                 { title: "Ship"},
//                 { title: "Country"},
//                 { title: "Start Date" },
//                 { title: "End Date" },
//                 { title: "PI" }
//             ],
//             "columnDefs": [ {
//               "targets": 0,
//               "render": function ( data, type, row, meta ) {
//                 return '<a href="https://cchdo.ucsd.edu/cruise/'+ data +'">'+ data + '</a>';
//               }
//             }, 
//             {
//               "targets": 1,
//               "render": function(data,type,row,meta) {
//                   var list = "<ul>";
//                   for (var i=0; i< data.woce_lines.length; i++){
//                     list += "<li>" + data.woce_lines[i] + "</li>";
//                   }
//                   list += "</ul>";
//                   return list}
//               },
//               {
//               "targets": 6,
//               "render": function(data, type, full, meta){
//                   var list = "<ul>";
//                   for (var i=0; i<data.length; i++){
//                     if (data[i].role == "Chief Scientist"){
//                       list += "<li>" + data[i].name + "</li>";
//                     }
//                   }
//                   list += "</ul>";
//                   return list}
//               }
          
//             ],

//             "order": [[ 1, "desc" ]]
//         } );
//     } ); // end datatable





//     $(document).ready(function() {

//         $.fn.dataTable.moment( 'YYYY-MM-DD' );

//         $('#datatable2').DataTable( {
//             "destroy": true,
//             "paging": true,
//             "data": dataSet2,
//             "columns": [
//                 { title: "Expocode"},
//                 { title: "Line(s)"},
//                 { title: "Ship"},
//                 { title: "Country"},
//                 { title: "Start Date" },
//                 { title: "End Date" },
//                 { title: "PI" }
//             ],
//             "columnDefs": [ {
//               "targets": 0,
//               "render": function ( data, type, row, meta ) {
//                 return '<a href="https://cchdo.ucsd.edu/cruise/'+ data +'">'+ data + '</a>';
//               }
//             }, 
//             {
//               "targets": 1,
//               "render": function(data,type,row,meta) {
//                   var list = "<ul>";
//                   for (var i=0; i< data.woce_lines.length; i++){
//                     list += "<li>" + data.woce_lines[i] + "</li>";
//                   }
//                   list += "</ul>";
//                   return list}
//               },
//               {
//               "targets": 6,
//               "render": function(data, type, full, meta){
//                   var list = "<ul>";
//                   for (var i=0; i<data.length; i++){
//                     if (data[i].role == "Chief Scientist"){
//                       list += "<li>" + data[i].name + "</li>";
//                     }
//                   }
//                   list += "</ul>";
//                   return list}
//               }
          
//             ],

//             "order": [[ 1, "desc" ]]
//         } );

//     }); // end datatable



//   }); // end on zoom





// })  // end promise




