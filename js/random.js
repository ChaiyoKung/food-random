// list of food
let imagesArray = [
    "images/food/01.jpg",
    "images/food/02.jpg",
    "images/food/03.jpg",
    "images/food/04.jpg",
    "images/food/05.jpg",
    "images/food/06.jpg",
    "images/food/07.jpg",
    "images/food/08.jpg",
    "images/food/09.jpg",
    "images/food/10.jpg",
    "images/food/11.jpg",
    "images/food/12.jpg",
    "images/food/13.jpg",
    "images/food/14.jpg",
    "images/food/15.jpg",
    "images/food/16.jpg",
    "images/food/17.jpg",
    "images/food/18.jpg",
    "images/food/19.jpg",
    "images/food/20.jpg",
    "images/food/21.jpg"
];

let cnt = 0;

// random food
function randomFood() {
    document.getElementById("map").style.display += "block";
    
    cnt += 1;
    let img_random = document.getElementById("img_random");
    let img = document.createElement("img");

    // random number 0 - 20
    let num = Math.floor(Math.random() * 21);

    // set attibute to image
    img.src = imagesArray[num];
    img.id = "food_img";
    img.alt = imagesArray[num];

    // first click and more
    if (cnt === 1) {
        img_random.appendChild(img);
    } else {
        let newImg = document.getElementById("food_img");
        newImg.src = imagesArray[num];
    }

    setFoodName(num);
}

// get and set food name
function setFoodName(idx) {
    let name;
    if (idx === 0) name = "ซูชิ";
    else if (idx === 1) name = "ก๋วยเตี๋ยว";
    else if (idx === 2) name = "ข้าวไข่เจียว";
    else if (idx === 3) name = "ชาบู";
    else if (idx === 4) name = "ผัดซีอิ๊ว";
    else if (idx === 5) name = "สเต็ก";
    else if (idx === 6) name = "ข้าวมันไก่";
    else if (idx === 7) name = "ข้าวหมกไก่";
    else if (idx === 8) name = "ข้าวคอหมูย่าง";
    else if (idx === 9) name = "ขนมจีนน้ำยา";
    else if (idx === 10) name = "กะเพราหมูสับไข่ดาว";
    else if (idx === 11) name = "ข้าวหมูแดง";
    else if (idx === 12) name = "ราดหน้า";
    else if (idx === 13) name = "โจ๊ก";
    else if (idx === 14) name = "ข้าวขาหมู";
    else if (idx === 15) name = "บะหมี่กึ่งสำเร็จรูป";
    else if (idx === 16) name = "ยำ";
    else if (idx === 17) name = "ส้มตำ";
    else if (idx === 18) name = "ข้าวยำไก่แซ่บ";
    else if (idx === 19) name = "แจ่วฮ้อน";
    else if (idx === 20) name = "หมูกระทะ";


    let fdname = document.getElementById("food_name");
    fdname.innerHTML = name;

    // search food in google map
    initMap(name);
}

let map;
let service;
let infowindow;

function initMap(searchText) {

    infoWindow = new google.maps.InfoWindow;

    // HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            initialize(pos.lat, pos.lng, searchText);

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        "Error: The Geolocation service failed." :
        "Error: Your browser doesn\'t support geolocation.");
    infoWindow.open(map);
}

function initialize(lat, lng, searchText) {
    let myLocation = new google.maps.LatLng(lat, lng);

    map = new google.maps.Map(document.getElementById("map"), {
        center: myLocation,
        zoom: 15
    });

    let marker = new google.maps.Marker({
        map: map,
        position: myLocation,
        title: "Me",
        icon: "images/icon/me_maker.png"
    });
    marker.setMap(map);

    let infowindow = new google.maps.InfoWindow({
        content: "I'm here"
    });
    infowindow.open(map, marker);

    let request = {
        location: myLocation,
        radius: "500",
        query: searchText
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    let marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        titile: place.name,
        icon: "images/icon/food_maker.png"
    });

    let content = "<b>" + place.name + "</b><br>Rating: "+place.rating+"/5<br>" + place.formatted_address
    let infowindow = new google.maps.InfoWindow({
        content: content
    });

    google.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.open(map, marker);
    });

    google.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close();
    });

    google.maps.event.addListener(marker, 'click', function () {
        map.setZoom(19);
        map.setCenter(marker.getPosition());
    });
}