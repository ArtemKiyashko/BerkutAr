window.onload = () => {
    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", async (e) => {
        setArObjects(e.detail.position.latitude, e.detail.position.longitude)
    });
};

function removeOldMarkers() {
    let markers = document.querySelectorAll("[data='marker']");
    markers.forEach(marker => { marker.remove(); });

    let assets = document.querySelector("a-assets");
    assets.innerHTML = '';
}

async function setArObjects(lat, lon) {

    removeOldMarkers();

    let scene = document.querySelector("a-scene");
    let response = await fetch(`https://faweprivateberkutpoiservice.azurewebsites.net/api/FindNearestPoint?lat=${lat}&long=${lon}`);
    let pois = await response.json();

    pois.forEach(poi => {
        let container = document.createElement('a-entity');
        container.setAttribute("data", "marker");
        container.setAttribute("gps-new-entity-place", {
            latitude: poi.lat,
            longitude: poi.long
        });

        let assetsContainer = document.querySelector("a-assets");

        let nodes = createElementsFromHTML(poi.content);
        let assets = createElementsFromHTML(poi.assets);

        nodes.forEach(node => {
            container.appendChild(node);
        });

        assets.forEach(asset => {
            assetsContainer.appendChild(asset);
        })

        scene.appendChild(container);
    });
}

function createElementsFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.childNodes
}

function initArObjects() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // Success function
            async (position) => { await setArObjects(position.coords.latitude, position.coords.longitude); },
            // Error function
            null,
            // Options. See MDN for details.
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}