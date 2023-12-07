const locations = [
    {
        "name": "attractions",
        "icon": "fort-awesome",
        "places": [
            {
                "id": 0,
                "title": "Cổng nhà Bá Kiến",
                "type": "Historical landmark",
                "coordinate": [
                    105.79191505807296,
                    20.95790386229897
                ],
                "address:": "3R99+FP, Quảng An, Tây Hồ, Hà Nội, Việt Nam",
                "description": "",
                "slug": "West-Lake-Fish-Spa"
            },
            {
                "id": 1,
                "title": "Ô Quan Chưởng",
                "type": "Historical landmark",
                "coordinate": [
                    105.85212062060405,
                    21.037306547176506
                ],
                "address": "Km5+200, Đ. Lê Trọng Tấn, An Khánh, Hoài Đức, Hà Nội, Việt Nam",
                "description": "",
                "slug": "Cong-Vien-Thien-Duong-Bao-Son"
            },
            {
                "id": 2,
                "title": "Lăng Chủ Tịch",
                "type": "Historical landmark",
                "coordinate": [
                    105.83466839914279,
                    21.036912507764324
                ],
                "address": "Hùng Vương, Điện Biên, Ba Đình, Hà Nội, Việt Nam",
                "description": "",
                "slug": "HCM-Mausoleum"
            },
            {
                "id": 3,
                "title": "Chùa Một Cột",
                "type": "Buddhist temple",
                "coordinate": [
                    105.83361989333477,
                    21.035855844678977
                ],
                "address": "phố P. Chùa Một Cột, Đội Cấn, Ba Đình, Hà Nội 100000, Việt Nam",
                "description": "",
                "slug": "One-Pillar-Pagodar"
            },
            {
                "id": 4,
                "title": "Văn Miếu Quốc Tử Giám",
                "type": "Place of worship",
                "coordinate": [
                    105.83566933019767,
                    21.02812009959497
                ],
                "address": "58 P. Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội, Việt Nam",
                "description": "",
                "slug": "Temple-Of-Literature"
            },
            {
                "id": 5,
                "title": "Nhà Hát Lớn Hà Nội",
                "type": "Opera house",
                "coordinate": [
                    105.85748460411847,
                    21.024246579604206
                ],
                "address": "1 Tràng Tiền, Phan Chu Trinh, Hoàn Kiếm, Hà Nội, Việt Nam",
                "description": "",
                "slug": "Hanoi-Opera-House"
            },
            {
                "id": 6,
                "title": "Nhà Thờ Lớn Hà Nội",
                "type": "Catholic cathedral",
                "coordinate": [
                    105.84918800765573,
                    21.028811024395043
                ],
                "address": "40 P. Nhà Chung, Hàng Trống, Hoàn Kiếm, Hà Nội 100000, Việt Nam",
                "description": "",
                "slug": "St-Joseph-Cathedral"
            },
            {
                "id": 7,
                "title": "Di tích nhà Tù Hỏa Lò",
                "type": "History museum",
                "coordinate": [
                    105.84654627716178,
                    21.025306339636696
                ],
                "address": "1 P. Hoả Lò, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Việt Nam",
                "description": "",
                "slug": "Hoa-Lo-Prison-Relic"
            },
            {
                "id": 8,
                "title": "Bảo tàng lịch sử quốc gia",
                "type": "History museum",
                "coordinate": [
                    105.8587476748773,
                    21.02488517863446
                ],
                "address": "216 Đ. Trần Quang Khải, Tràng Tiền, Hoàn Kiếm, Hà Nội 110000, Việt Nam",
                "description": "",
                "slug": "Vietnam-National-Museum-of-History"
            },
            {
                "id": 9,
                "title": "Đền Quán Thánh",
                "type": "Taoist temple",
                "coordinate": [
                    105.83645898520308,
                    21.04301001256985
                ],
                "address": "Đ. Thanh Niên, Quán Thánh, Ba Đình, Hà Nội 118810, Việt Nam",
                "description": "",
                "slug": "Quan-Thanh-Temple"
            },
            {
                "id": 10,
                "title": "Hoàng Thành Thăng Long",
                "type": "Historical landmark",
                "coordinate": [
                    105.84025749817256,
                    21.035225818810716
                ],
                "address": "19C Hoàng Diệu, Quận Ba Đình, Hà Nội",
                "description": "",
                "slug": "Imperial-Citadel-of-Thang-Long"
            },
            {
                "id": 11,
                "title": "Chùa Trấn Quốc",
                "type": "Attraction",
                "coordinate": [
                    105.83673221420527,
                    21.047857744273028
                ],
                "address": "46 Đ. Thanh Niên, Trúc Bạch, Tây Hồ, Hà Nội, Việt Nam",
                "description": "",
                "slug": "Tran-Quoc-Pagoda"
            },
            {
                "id": 12,
                "title": "Đền Ngọc Sơn",
                "type": "Attraction",
                "coordinate": [
                    105.85237881350297,
                    21.030689225393292
                ],
                "address": "P. Đinh Tiên Hoàng, Hàng Trống, Hoàn Kiếm, Hà Nội 100000, Việt Nam",
                "description": "",
                "slug": "Ngoc-Son-Temple"
            },
            {
                "id": 13,
                "title": "Bảo Tàng Hồ Chí Minh",
                "type": "Museum",
                "coordinate": [
                    105.83241688480017,
                    21.035862606165214
                ],
                "address": "19 P. Ngọc Hà, Đội Cấn, Ba Đình, Hà Nội 100000, Việt Nam",
                "description": "",
                "slug": "HCM-Museum"
            },
            {
                "id": 14,
                "title": "Phủ Chủ Tịch",
                "type": "Government office",
                "coordinate": [
                    105.83456458566792,
                    21.039282512264414
                ],
                "address": "1 Đ. Hoàng Hoa Thám, Thuỵ Khuê, Hoàn Kiếm, Hà Nội, Việt Nam",
                "description": "",
                "slug": "Presidential-Palace"
            },
            {
                "id": 15,
                "title": "MỘ NỮ SĨ ĐOÀN THỊ ĐIỂM",
                "type": "Historical landmark",
                "coordinate": [
                    105.81334355148172,
                    21.085936640382283
                ],
                "address": "P. Duy Tân, Dịch Vọng, Cầu Giấy, Hà Nội 10000, Việt Nam",
                "description": "",
                "slug": "Cau-Giay-Park"
            },
            {
                "id": 16,
                "title": "Làng Gốm Bát Tràng",
                "type": "Attraction",
                "coordinate": [
                    105.9160031240369,
                    20.978887379173052
                ],
                "address": "204 Đ. Giang Cao, Bát Tràng, Gia Lâm, Hà Nội, Việt Nam",
                "description": "",
                "slug": "Bat-Trang-Pottery-Village"
            },
            {
                "id": 17,
                "title": "Bảo tàng dân tộc Việt Nam",
                "type": "Museum",
                "coordinate": [
                    105.79873424885892,
                    21.04033865364875
                ],
                "address": "Đ. Nguyễn Văn Huyên, Quan Hoa, Cầu Giấy, Hà Nội 100000, Vietnam",
                "description": "",
                "slug": "Vietnam-Museum-of-Ethnology"
            },
            {
                "id": 18,
                "title": "Di Tích Lịch Sử Cửa Bắc",
                "type": "Historical landmark",
                "coordinate": [
                    105.8409942332298,
                    21.04066758785975
                ],
                "address": "B1-R3 Floor, Royal City, 72A Đ. Nguyễn Trãi, Street, Thanh Xuân, Hà Nội, Vietnam",
                "description": "",
                "slug": "Vietnam-Museum-of-Ethnology"
            },
            {
                "id": 19,
                "title": "Bảo Tàng Lịch Sử Quân Sự Việt Nam",
                "type": "War Museum",
                "coordinate": [
                    105.75386658567554,
                    21.01051076465537
                ],
                "address": "B1-R3 Floor, Royal City, 72A Đ. Nguyễn Trãi, Street, Thanh Xuân, Hà Nội, Vietnam",
                "description": "",
                "slug": "Vietnam-Museum-of-Ethnology"
            },
            {
                "id": 20,
                "title": "Dấu tích lăng mộ Hoàng Cao Khải",
                "type": "Historical landmark",
                "coordinate": [
                    105.82366583165896,
                    21.011055874434774
                ],
                "address": "B1-R3 Floor, Royal City, 72A Đ. Nguyễn Trãi, Street, Thanh Xuân, Hà Nội, Vietnam",
                "description": "",
                "slug": "Vietnam-Museum-of-Ethnology"
            },
            {
                "id": 21,
                "title": "Bốt Nước Hàng Đậu",
                "type": "Historical landmark",
                "coordinate": [
                    105.8474508363576,
                    21.04000686605683
                ],
                "address": "B1-R3 Floor, Royal City, 72A Đ. Nguyễn Trãi, Street, Thanh Xuân, Hà Nội, Vietnam",
                "description": "",
                "slug": "Vietnam-Museum-of-Ethnology"
            }
        ]
    }
]


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

export default locations