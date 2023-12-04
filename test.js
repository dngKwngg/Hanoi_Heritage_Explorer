// const fs = require('fs')
// const Locations = JSON.parse(fs.readFileSync('./dev-data/locations.js', 'utf-8'))


// function makeData() {
//     let data = []
//     for (let i = 0; i < Locations.length; i++) {
//         data = data.concat(Locations[i].places)
//     }
//     return data
// }

// const data = makeData()


// const query = 'Hà'
// function compare(a, b) {
//     if (a.title.indexOf(query) < b.title.indexOf(query)) return -1
//     else if (a.title.indexOf(query) > b.title.indexOf(query)) return 1
//     else return 0
// }
// function search(query) {
//     let autoCompleteData = []
//     data.map((value, index) => {
//         if (value.title.includes(query)) {
//             autoCompleteData.push(value)
//         }
//     })
//     autoCompleteData.sort(compare)
//     return autoCompleteData
// }

const waypoints = [[105.83566933019767, 21.02812009959497], [105.84654627716178, 21.025306339636696], [105.84025749817256, 21.035225818810716], [105.83645898520308, 21.04301001256985], [105.82989289727384, 21.062625792052792]]
function generateWaypointsDirectionQueryString (waypoints) {
    let waypointsString = ""
    for (let i = 0; i < waypoints.length; i++) {
        console.log(waypoints[i])
        waypointsString += `${waypoints[i][0]},${waypoints[i][1]};`
    }
    waypointsString = waypointsString.substring(0, waypointsString.length - 1)

    
    console.log(waypointsString)
    
}

generateWaypointsDirectionQueryString(waypoints)
