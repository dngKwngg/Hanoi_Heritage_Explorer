const locations = [
    {
        "name": "attractions",
        "icon": "fort-awesome",
        "places": [
            {
                "id": 0,
                "title": "West Lake Fish Spa",
                "type": "Tourist attraction",
                "coordinate": [
                    105.81930776901906, 21.068732227634992
                ],
                "address:": "3R99+FP, Quảng An, Tây Hồ, Hà Nội, Việt Nam",
                "description": "",
                "slug": "West-Lake-Fish-Spa"
            },
            {
                "id": 1,
                "title": "Công Viên Thiên Đường Bảo Sơn",
                "type": "Amusement park",
                "coordinate": [
                    105.73353987744257, 20.998759736380745
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
                "categories": [
                    {
                        "id": 1,
                        "title": "Tổng quan",
                        "titleContent": "Hoàng Thành Thăng Long: Biểu tượng lịch sử và văn hóa Hà Nội",
                        "content": "Hoàng thành Thăng Long là quần thể di tích gắn liền với lịch sử kinh thành Thăng Long Hà Nội. Công trình này được xây dựng từ thế kỷ VII đến triều đại Đinh – Tiền Lê. Vào năm 1010, dưới triều đại nhà Lý, kinh thành được dời từ Đại La về Thăng Long. Trải qua các vương triều Lý – Trần – Lê – Nguyễn… nơi đây trở thành chứng nhân lịch sử cho các cuộc đấu tranh giữ nước của dân tộc. Đồng thời kinh thành cũng là minh chứng cho sự tiếp nối văn hóa giữa các triều đại. Vào ngày 31/7/2010, tại Brazil, Ủy ban Di sản Thế giới đã thông qua Nghị quyết công nhận khu trung tâm Hoàng thành Thăng Long – Hà Nội là Di sản Văn hóa Thế giới. Đây là niềm tự hào của không chỉ Hà Nội mà cả đất nước Việt Nam. Với kiến trúc độc đáo cùng ý nghĩa đặc biệt, ngày nay Hoàng thành là khu di tích lịch sử và là địa điểm du lịch nổi tiếng Hà Nội. Đến đây, du khách sẽ được tận mắt chiêm ngưỡng một số phần di tích còn sót lại đã được bảo tồn, từ đó hiểu hơn về lịch sử, văn hóa của thế hệ cha ông đi trước.",
                        "timeReading": "3 min"
                    },
                    {
                        "id": 2,
                        "title": "Lịch sử",
                        "titleContent": "Hoàng Thành Thăng Long: Hòn Ngọc Lịch Sử Việt Nam",
                        "content": "Xuất phát từ Chiếu dời đô của vua Lý Thái Tổ vào năm 1010, kinh thành chính thức dời về Thăng Long (tên trước đó là Đại La) và các công trình dần được xây dựng. Trong đó nổi bật nhất là đại công trình hoàng thành với mô hình “Tam trùng thành quách”. Theo đó thành gồm có 3 vòng: La thành, Hoàng thành, Tử cấm thành. Giữa La Thành và Hoàng thành là nơi sinh sống của người dân, vòng trong cùng là nơi sinh sống của vua và gia đình hoàng gia. Sau hơn 1000 năm, trải qua thời đại Lý, Trần, Lê, Mạc, Nguyễn… Hoàng Thành Thăng Long đã bị thời gian và các cuộc tấn công phá hoại nghiêm trọng. Hiện nay phần lớn kiến trúc được bảo tồn, phục dựng trên nền di tích cũ. Bên cạnh phần công trình trên bề mặt, khu khảo cổ cũng dần được khai quật bài bản và mở cửa cho công chúng tham quan. Vào ngày 31/07/2010, Hoàng Thành Thăng Long được UNESCO công nhận là Di sản văn hóa thế giới. Trong vòng 10 năm trở lại đây, các hoạt động du lịch tại Hoàng Thành Thăng Long dần được đầu tư bài bản, chú trọng công tác bảo tồn, lồng ghép yếu tố văn hóa thông qua các hoạt động thực tế phong phú… giúp du khách không những được tận mắt chiêm ngưỡng những cổ vật quý hiếm mà còn được trải nghiệm không gian đậm chất truyền thống, cổ xưa.",
                        "timeReading": "4 min"
                    },
                    {
                        "id": 3,
                        "title": "Kiến trúc",
                        "titleContent": "Hành Trình Kiến Trúc Đỉnh Cao: Khám Phá Hoàng Thành Thăng Long",
                        "content": "Hiện nay, khu vực di sản Hoàng Thành Thăng Long đang được nghiên cứu, bảo tồn bao gồm khu di tích khảo cổ 18 Hoàng Diệu và khu Thành cổ Hà Nội. Khu vực khảo cổ 18 Hoàng Diệu được phát lộ năm 2002, với nhiều tầng di vật phong phú, liên tục; thể hiện rõ nét các giá trị văn hóa – lịch sử qua thời gian các triều đại; từ thời tiền Thăng Long, qua các thời Lý – Trần – Lê – Nguyễn về sau. Tại đây những nhà nghiên cứu đã tìm thấy nhiều nền móng kiến trúc, các chi tiết kiến trúc, điêu khắc bị chôn vùi dưới đất. Tất cả phản ánh cả một quần thể thống nhất, đa dạng và có giá trị cao về nghệ thuật. Tuy nhiên, do vẫn còn đang trong thời gian nghiên cứu thực địa và đưa ra giải pháp bảo tồn lâu dài; nên khu vực này chưa thể trở thành một trung tâm tham quan phổ biến. Khu vực Thành cổ Hà Nội: Là khu trung tâm thành Hà Nội thời Nguyễn, trải dài theo trục Nam – Bắc của thành. Hiện nay, khu vực này còn có các di tích lộ thiên sau: \n    Cột cờ (Kỳ đài): Xây dựng cùng với thành Hà Nội thời Nguyễn, nằm phía trước thành trên trục thần đạo, giữa 2 cửa Đông Nam và Tây Nam. \n    Đoan Môn: Là cổng chính ra vào Cấm thành của Hoàng Thành Thăng Long, xây dựng từ thời Lý. Kiến trúc hiện nay là của thời Lê và được tu sửa thêm vào thời Nguyễn. \n    Thềm điện Kính Thiên: Điện Kính Thiên, cung điện trung tâm, xây dựng thời Lê trên nền cũ của điện Càn Nguyên, Thiên An thời Lý – Trần. Hiện chỉ còn lại thềm điện và đôi rồng đá. \n    Hậu Lâu (Lầu công chúa): Thời Lê gọi là Tĩnh Bắc lâu, thời Nguyễn gọi là Hậu điện. Đây là nơi ở của cung tần mỹ nữ theo vua từ Phú Xuân ra ngự giá Bắc Thành. Hậu Lâu đã bị hư hỏng khi Pháp chiếm thành Hà Nội và được người Pháp tu sửa như hiện nay. \n    Cửa Bắc (Bắc Môn, Chính Bắc Môn): Là cổng thành Hà Nội phía Bắc, xây dựng trên cơ sở của Cửa Bắc Thành Thăng Long thời Lê. Khi người Pháp chiếm thành Hà Nội, họ giữ lại Cửa Bắc để làm đài quan sát, có hai vết đạn đại bác bắn trên cổng, là biểu tượng của sức mạnh quân sự.",
                        "timeReading": "5 min"
                    },
                    {
                        "id": 4,
                        "title": "Ảnh",
                        "content": "Ảnh Hoàng thành Thăng Long"
                    },
                    {
                        "id": 5,
                        "title": "Video",
                        "content": "Video Hoàng thành Thăng Long"
                    },
                    {
                        "id": 6,
                        "title": "Đặt vé",
                        "content": "Đặt vé Hoàng thành Thăng Long"
                    },
                    {
                        "id": 7,
                        "title": "Đánh giá",
                        "content": "Đánh giá Hoàng thành Thăng Long"
                    }
                ],
                "address": "19C Hoàng Diệu, Quận Ba Đình, Hà Nội",
                "phone": "+84-24-37345926",
                "time": "8:00 đến 17:00 hàng ngày",
                "carouselData": [],
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
                "title": "Vincom Center Phạm Ngọc Thạch",
                "type": "Shopping mall",
                "coordinate": [
                    105.83195578790375,
                    21.00629834531049
                ],
                "address": "02 P.Phạm Ngọc Thạch, Kim Liên, Đống Đa, Hà Nội 11000, Việt Nam",
                "description": "",
                "slug": "Vincom-Center-Pham-Ngoc-Thach"
            },
            {
                "id": 16,
                "title": "Công viên cầu giấy",
                "type": "Park",
                "coordinate": [
                    105.79083879604285,
                    21.028284609421526
                ],
                "address": "P. Duy Tân, Dịch Vọng, Cầu Giấy, Hà Nội 10000, Việt Nam",
                "description": "",
                "slug": "Cau-Giay-Park"
            },
            {
                "id": 17,
                "title": "Aeon Mall Hà Đông",
                "type": "Shopping mall",
                "coordinate": [
                    105.7517170179332,
                    20.989700958388884
                ],
                "address": "Dương Nội, Hà Đông, Hanoi, Vietnam",
                "description": "",
                "slug": "Aeon-Mall-Ha-Đong"
            },
            {
                "id": 18,
                "title": "Làng Gốm Bát Tràng",
                "type": "Attraction",
                "coordinate": [
                    105.9160031240369, 20.978887379173052
                ],
                "address": "204 Đ. Giang Cao, Bát Tràng, Gia Lâm, Hà Nội, Việt Nam",
                "description": "",
                "slug": "Bat-Trang-Pottery-Village"
            },
            {
                "id": 19,
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

                "id": 20,
                "title": "Trung tâm Nghệ thuật đương đại Vincom",
                "type": "Art gallery",
                "coordinate": [
                    105.81481058717804,  21.003143749864048
                ],
                "address": "B1-R3 Floor, Royal City, 72A Đ. Nguyễn Trãi, Street, Thanh Xuân, Hà Nội, Vietnam",
                "description": "",
                "slug": "Vincom-Center-for-Contemporary-Art-(VCCA)"

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

export default locations
// const fs = require('fs')
// fs.writeFileSync(`${__dirname}/locations-modified.json`, JSON.stringify(locations))