
var filterMap = (slider, cchdoFeatures, bcodmoFeatures) => {

  var minDateEl = document.querySelector('.min_date')
  var maxDateEl = document.querySelector('.max_date')

  var sliderVal = slider.noUiSlider.get()
  var minDate = parseInt(sliderVal[0])
  var maxDate = parseInt(sliderVal[1])

  console.log('start', cchdoFeatures.length)

  minDateEl.innerHTML = minDate
  maxDateEl.innerHTML = maxDate      

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
      return true
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

  return [cchdoFeaturesFiltered, bcodmoFeaturesFiltered]

}


export default filterMap
