export var cchdoPopupText = (feature) => {
  return (
    `
    <table class="table table-striped table-sm">
    <tbody>
    <tr>
      <th scope="row">Expocode</th><td><a href="https://cchdo.ucsd.edu/cruise/${feature['properties']['expocode']}" target="_blank">${feature['properties']['expocode']}</a></td>
    </tr>
    <tr>
      <th scope="row">Start Date</th><td>${feature['properties']['start_date']}</td>
    </tr>
    <tr>
      <th scope="row">End Date</th><td>${feature['properties']['end_date']}</td>
    </tr>
    </tbody>
    </table>
    `
    )
}



export var bcodmoPopupText = (feature) => {
  return (
    `
      <table class="table table-striped table-sm">
      <tbody>
      <tr>
        <th scope="row">Dataset ID</th><td><a href="https://www.bco-dmo.org/dataset/${feature['properties']['dataset_id']}" target="_blank">${feature['properties']['dataset_id']}</a></td>
      </tr>
      <tr>
        <th scope="row">Start Date</th><td>${feature['properties']['start_date']}</td>
      </tr>
      <tr>
        <th scope="row">End Date</th><td>${feature['properties']['end_date']}</td>
      </tr>
      </tbody>
      </table>
    `
    )
}
