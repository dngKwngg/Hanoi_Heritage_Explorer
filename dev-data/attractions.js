const locations = [
    {
        name: "attractions",
        icon: "fort-awesome",
        places: [
            {
                id: 0,
                title: "Hoàng Thành Thăng Long",
                type: "Historical landmark",
                coordinate: [105.84025749817256, 21.035225818810716],
                address: "19C Hoàng Diệu, Quận Ba Đình, Hà Nội",
                description: "",
                slug: "Imperial-Citadel-of-Thang-Long",
            },
            {
                id: 1,
                title: "Di tích nhà Tù Hỏa Lò",
                type: "History museum",
                coordinate: [105.84654627716178, 21.025306339636696],
                address:
                    "1 P. Hoả Lò, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Việt Nam",
                description: "",
                slug: "Hoa-Lo-Prison-Relic",
            },
            {
                id: 2,
                title: "Quảng trường Ba Đình",
                type: "Town square",
                coordinate: [105.83600139535449, 21.037443677698437],
                address: "Ba Đình, Hanoi, Vietnam",
                description: "",
                slug: "Ba-Dinh-Square",
            },
            {
                id: 3,
                title: "Lăng Chủ Tịch",
                type: "Historical landmark",
                coordinate: [105.83466839914279, 21.036912507764324],
                address: "Hùng Vương, Điện Biên, Ba Đình, Hà Nội, Việt Nam",
                description: "",
                slug: "HCM-Mausoleum",
            },
            {
                id: 4,
                title: "Chùa Một Cột",
                type: "Buddhist temple",
                coordinate: [105.83361989333477, 21.035855844678977],
                address:
                    "phố P. Chùa Một Cột, Đội Cấn, Ba Đình, Hà Nội 100000, Việt Nam",
                description: "",
                slug: "One-Pillar-Pagodar",
            },
            {
                id: 5,
                title: "Văn Miếu Quốc Tử Giám",
                type: "Place of worship",
                coordinate: [105.83566933019767, 21.02812009959497],
                address:
                    "58 P. Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội, Việt Nam",
                description: "",
                slug: "Temple-Of-Literature",
            },
            {
                id: 6,
                title: "Nhà Hát Lớn Hà Nội",
                type: "Opera house",
                coordinate: [105.85748460411847, 21.024246579604206],
                address:
                    "1 Tràng Tiền, Phan Chu Trinh, Hoàn Kiếm, Hà Nội, Việt Nam",
                description: "",
                slug: "Hanoi-Opera-House",
            },
            {
                id: 7,
                title: "Nhà Thờ Lớn Hà Nội",
                type: "Catholic cathedral",
                coordinate: [105.84918800765573, 21.028811024395043],
                address:
                    "40 P. Nhà Chung, Hàng Trống, Hoàn Kiếm, Hà Nội 100000, Việt Nam",
                description: "",
                slug: "St-Joseph-Cathedral",
            },

            {
                id: 8,
                title: "Bảo tàng lịch sử quốc gia",
                type: "History museum",
                coordinate: [105.8587476748773, 21.02488517863446],
                address:
                    "216 Đ. Trần Quang Khải, Tràng Tiền, Hoàn Kiếm, Hà Nội 110000, Việt Nam",
                description: "",
                slug: "Vietnam-National-Museum-of-History",
            },
            {
                id: 9,
                title: "Chùa Trấn Quốc",
                type: "Attraction",
                coordinate: [105.83673221420527, 21.047857744273028],
                address:
                    "46 Đ. Thanh Niên, Trúc Bạch, Tây Hồ, Hà Nội, Việt Nam",
                description: "",
                slug: "Tran-Quoc-Pagoda",
            },
            {
                id: 10,
                title: "Đền Ngọc Sơn",
                type: "Attraction",
                coordinate: [105.85237881350297, 21.030689225393292],
                address:
                    "P. Đinh Tiên Hoàng, Hàng Trống, Hoàn Kiếm, Hà Nội 100000, Việt Nam",
                description: "",
                slug: "Ngoc-Son-Temple",
            },
            {
                id: 11,
                title: "Bảo Tàng Hồ Chí Minh",
                type: "Museum",
                coordinate: [105.83241688480017, 21.035862606165214],
                address:
                    "19 P. Ngọc Hà, Đội Cấn, Ba Đình, Hà Nội 100000, Việt Nam",
                description: "",
                slug: "HCM-Museum",
            },
        ],
    },
];

// const locationss = [
//     {
//         id: 1,
//         name: "Hoàng Thành Thăng Long",

//     },
// ];
// for (let i = 0; i < locations[0].places.length; i++) {
//     locations[0].places[i].id = i
// }

// const fs = require('fs')
// fs.writeFileSync(`${__dirname}/attractions-modified.json`, JSON.stringify(locations))

export default locations;
