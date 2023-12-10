
exports.generateDirectionQueryString = (start, end) => {
    const queryString = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?geometries=geojson&overview=full&access_token=pk.eyJ1IjoibWl0bmF4ZmV0IiwiYSI6ImNscGEydHRqMDAyenIyanJsZDIzZ2ptYnkifQ.lgAafxD6INU3ufH3N09Xcw`
    return queryString
}

exports.generateWaypointsDirectionQueryString = (waypoints) => {
    let waypointsString = ""
    for (let i = 0; i < waypoints.length; i++) {
        waypointsString += `${waypoints[i][0]},${waypoints[i][1]};`
    }
    waypointsString = waypointsString.substring(0, waypointsString.length - 1)

    const queryString = `https://api.mapbox.com/directions/v5/mapbox/driving/${waypointsString}?geometries=geojson&overview=full&access_token=pk.eyJ1IjoibWl0bmF4ZmV0IiwiYSI6ImNscGEydHRqMDAyenIyanJsZDIzZ2ptYnkifQ.lgAafxD6INU3ufH3N09Xcw`
    return queryString
}

exports.fetchDirection = async (queryString) => {
    try {
        console.log(queryString)
        let response = await fetch(queryString);
        let json = await response.json();
        return json
    } catch (e) {
        console.log("Fetch error", e)
    }
}

// const generateWaypointsDirectionQueryString = (waypoints) => {
//     let waypointsString = ""
//     for (let i = 0; i < waypoints.length; i++) {
//         console.log(waypoints[i])
//         waypointsString += `${waypoints[i][0]},${waypoints[i][1]};`
//     }
//     waypointsString = waypointsString.substring(0, waypointsString.length - 1)

//     const queryString = `https://api.mapbox.com/directions/v5/mapbox/driving/${waypointsString}?geometries=geojson&overview=full&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`
//     console.log(queryString)
// }

// const waypoints = [[105.83566933019767, 21.02812009959497], [105.84654627716178, 21.025306339636696], [105.84025749817256, 21.035225818810716], [105.83645898520308, 21.04301001256985], [105.82989289727384, 21.062625792052792]]
// generateWaypointsDirectionQueryString(waypoints)
