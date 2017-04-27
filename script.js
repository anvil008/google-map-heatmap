/**
 * Created by Anvil on 3/10/2017.
 */

var poly;
var map;
var markers = [];
var heatmap;
var currentPath = [];
var path1 = [];
var path2 = [];
var path3 = [];
var path4 = [];
var path5 = [];
var path6 = [];
var path7 = [];
var path8 = [];
var path9 = [];
var path10 = [];
var table = document.createElement("table");
var select = document.createElement("select");
var option = document.createElement("option");

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: 60.1675, lng: 24.9311},
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false,
        draggable: false,
        disableDoubleClickZoom: true
    });

    poly = new google.maps.Polyline({
        strokeColor: '#121769',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    poly.setMap(map);

    map.addListener('click', addLatLng);

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });
}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

function getPoints() {
    return [
        new google.maps.LatLng(60.1675,24.9311)
        // new google.maps.LatLng(path1.valueOf())
    ]
}

function addLatLng(event) {
    var path = poly.getPath();

    if (markers.length < 10){
    path.push(event.latLng);
    var marker = new google.maps.Marker({
        position: event.latLng,
        title: '#' + path.getLength(),
        map: map
        });
        markers.push(marker);
    }
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function showMarkers() {
    setMapOnAll(map);
}

function deleteMarkers() {
    clearMarkers();
    markers = [];
}

function removeLine() {
    var path = poly.getPath();
    path.clear();
}

function clearPath() {
    removeLine();
    setMapOnAll();
    clearMarkers();
    markers = [];

}

function savePath() {
    for (var i = 0; i < markers.length; i++) {
        var lat = markers[i].getPosition().lat();
        var lng = markers[i].getPosition().lng();
        currentPath.push([lat, lng]);
    }
    if (path1.length < 1) {
        path1 = currentPath.slice();
    }
    else if (path2.length < 1){
        path2 = currentPath.slice();
    }
    else if (path3.length < 1){
        path3 = currentPath.slice();
    }
    else if (path4.length < 1){
        path4 = currentPath.slice();
    }
    else if (path5.length < 1){
        path5 = currentPath.slice();
    }
    else if (path6.length < 1){
        path6 = currentPath.slice();
    }
    else if (path7.length < 1) {
        path7 = currentPath.slice();
    }
    else if (path8.length < 1) {
        path8 = currentPath.slice();
    }
    else if (path9.length < 1) {
        path9 = currentPath.slice();
    }
    else if (path10.length < 1) {
        path10 = currentPath.slice();
    }
    else  {
        window.alert("Max Paths reached");
    }
    clearPath();
    markers = [];
    currentPath = [];
};


function download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}

function downloadButton() {
    var exportedJSON = JSON.stringify({path1, path2, path3, path4, path5, path6, path7, path8, path9, path10});
    download(exportedJSON, 'exportedpath.json', 'application/json');
}

function addCombo() {
    var textb = document.getElementById("txtCombo");
    var combo = document.getElementById("combo");
    var option = document.createElement("option");
    option.text = textb.value;
    option.value = textb.value;
    try {
        combo.add(option, null);
    }catch(error) {
        combo.add(option);
    }
    textb.value = "";
}