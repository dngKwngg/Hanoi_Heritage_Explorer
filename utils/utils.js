
exports.generateDirectionQueryString = (start, end) => {
    const queryString = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?geometries=geojson&overview=full&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`
    return queryString
}
exports.fetchDirection = async (queryString) => {
    try {
        console.log(queryString)
        let response = await fetch(queryString);
        let json = await response.json();
        return json

        // let coordinates = json['routes'][0]['geometry']['coordinates'];
        // setRouteDirections({
        //     type: 'FeatureCollection',
        //     features: [
        //         {
        //             type: 'Feature',
        //             properties: {},
        //             geometry: {
        //                 type: 'LineString',
        //                 coordinates: coordinates,
        //             }
        //         }
        //     ]
        // })
    } catch (e) {
        console.log("Fetch error", e)
    }
}