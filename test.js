const fs = require('fs')
const Locations = JSON.parse(fs.readFileSync('./dev-data/locations.json', 'utf-8'))


function makeData() {
    let data = []
    for (let i = 0; i < Locations.length; i++) {
        data = data.concat(Locations[i].places)
    }
    return data
}

const data = makeData()


const query = 'Hà'
function compare(a, b) {
    if (a.title.indexOf(query) < b.title.indexOf(query)) return -1
    else if (a.title.indexOf(query) > b.title.indexOf(query)) return 1
    else return 0
}
function search(query) {
    let autoCompleteData = []
    data.map((value, index) => {
        if (value.title.includes(query)) {
            autoCompleteData.push(value)
        }
    })
    autoCompleteData.sort(compare)
    return autoCompleteData
}

console.log("search result:", search(query))

