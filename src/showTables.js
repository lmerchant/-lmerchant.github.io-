export var showTables = (map, myFeatureCCHDO, myFeatureBCODMO) => {

  var parent
  var element
  var el_id

  var parents = []
  var myLayers = []

  var expocode
  var datasetId
  var platform
  var platforms
  var startDate
  var endDate
  var chiefScientist

  var cchdoExpocodes = []
  var cchdoPlatforms = []
  var cchdoStartDates = []
  var cchdoEndDates = []
  var cchdoChiefScientists = []

  var bcodmoDatasetIds = []
  var bcodmoPlatforms = []
  var bcodmoStartDates = []
  var bcodmoEndDates = []
  var bcodmoChiefScientists = []    

  myFeatureCCHDO.eachLayer(function(layer) {

      // markers in layer
      layer.eachLayer(function (layer) {

        if(map.getBounds().contains(layer.getLatLng())) {


          parent = layer._eventParents
          el_id = Object.keys(parent)[0]
          

          expocode = layer.feature.properties.expocode
          //platform = layer.feature.properties.platform
          startDate = layer.feature.properties.start_date
          endDate = layer.feature.properties.end_date
          //chiefScientist = layer.feature.properties.chief_scientist

          if(cchdoExpocodes.indexOf(expocode) === -1) {
            cchdoExpocodes.push(expocode)
            //cchdoPlatforms.push(platform)
            cchdoStartDates.push(startDate)
            cchdoEndDates.push(endDate)
            //cchdoChiefScientists.push(chiefScientist)

          }

        }   
      })

  });  /// end feature cchdo


  myFeatureBCODMO.eachLayer(function(layer) {

      // markers in layer
      layer.eachLayer(function (layer) {

        if(map.getBounds().contains(layer.getLatLng())) {

          parent = layer._eventParents
          el_id = Object.keys(parent)[0]

          datasetId = layer.feature.properties.dataset_id
          //platforms = layer.feature.properties.platforms
          startDate = layer.feature.properties.start_date
          endDate = layer.feature.properties.end_date
          //chiefScientist = layer.feature.properties.chief_scientist

          if(bcodmoDatasetIds.indexOf(datasetId) === -1) {
            bcodmoDatasetIds.push(datasetId)
            //bcodmoPlatforms.push(platforms)
            bcodmoStartDates.push(startDate)
            bcodmoEndDates.push(endDate)
            //bcodmoChiefScientists.push(chiefScientist)

          }

        }   
      })

  }); // end feature bcodmo 



  // Datatable

  var dataSet1 = []
  var element

  for (var k = 0; k < cchdoExpocodes.length; k++) {

    // element = [cchdoExpocodes[k], cchdoPlatforms[k],
    //            cchdoStartDates[k], cchdoEndDates[k],  cchdoChiefScientists[k]]
    element = [cchdoExpocodes[k],
               cchdoStartDates[k], cchdoEndDates[k]]              
    dataSet1.push(element)


  }

  
  var dataSet2 = []

  for (var k = 0; k < bcodmoDatasetIds.length; k++) {

    // element = [bcodmoDatasetIds[k], bcodmoPlatforms[k],
    //            bcodmoStartDates[k], bcodmoEndDates[k], bcodmoChiefScientists[k]]
    element = [bcodmoDatasetIds[k],
               bcodmoStartDates[k], bcodmoEndDates[k]]               
    dataSet2.push(element)


  }


  $(document).ready(function() {

      $.fn.dataTable.moment( 'YYYY-MM-DD' );

      $('#datatable1').DataTable( {
          "destroy": true,
          "paging": true,
          "pagingType": "simple",
          "data": dataSet1,
          "columns": [
              { title: "Expocode"},
              //{ title: "Platform"},
              { title: "Start Date" },
              { title: "End Date" },
              //{ title: "PI" }
          ],
          "columnDefs": [ {
            "targets": 0,
            "render": function ( data, type, row, meta ) {
              return '<a target="_blank" href="https://cchdo.ucsd.edu/cruise/'+ data +'">'+ data + '</a>';
            }
          }
          ],

          "order": [[ 1, "desc" ]]
      } );

  } ); // end datatable





  $(document).ready(function() {

      $.fn.dataTable.moment( 'YYYY-MM-DD' );

      $('#datatable2').DataTable( {
          "destroy": true,
          "paging": true,
          "pagingType": "simple",
          "data": dataSet2,
          "columns": [
              { title: "Dataset Id"},
              //{ title: "Platforms"},
              { title: "Start Date" },
              { title: "End Date" },
              //{ title: "PI" }
          ],
          "columnDefs": [ {
            "targets": 0,
            "render": function ( data, type, row, meta ) {
              return '<a target="_blank" href="https://www.bco-dmo.org/dataset/'+ data +'">'+ data + '</a>';
            }
          }, 
          // {
          //   "targets": 1,
          //   "render": function(data,type,row,meta) {
          //       var list = "<ul>";
          //       for (var i=0; i< data.length; i++){
          //         list += "<li>" + data[i] + "</li>";
          //       }
          //       list += "</ul>";
          //       return list}
          //   }
          ],

          "order": [[ 1, "desc" ]]
      } );

  }); // end datatable


}

