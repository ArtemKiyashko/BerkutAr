import React from 'react';
import './Scene.css';

class Scene extends React.Component {

  componentDidMount() {
    this.Camera.addEventListener("gps-camera-update-position", async (e) => {
      this.setArObjects(e.detail.position.latitude, e.detail.position.longitude)
    })
  }

  componentWillUnmount() {
    this.Camera.removeEventListener("gps-camera-update-position", async (e) => {
      this.setArObjects(e.detail.position.latitude, e.detail.position.longitude)
    })
  }

  setArObjects = async (lat, lon) => {

    this.removeOldMarkers();

    let response = await fetch(`https://faweprivateberkutpoiservice.azurewebsites.net/api/FindNearestPoint?lat=${lat}&long=${lon}`);
    let pois = await response.json();

    pois.forEach(poi => {
      let container = document.createElement('a-entity');
      container.setAttribute("data", "marker");
      container.setAttribute("gps-new-entity-place", {
        latitude: poi.lat,
        longitude: poi.long
      });

      let nodes = this.createElementsFromHTML(poi.content);
      let assets = this.createElementsFromHTML(poi.assets);

      nodes.forEach(node => {
        container.appendChild(node);
      });

      assets.forEach(asset => {
        this.Assets.appendChild(asset);
      })

      this.Scene.appendChild(container);
    });

  };

  createElementsFromHTML = (htmlString) => {
    var div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.childNodes
  };

  removeOldMarkers = () => {
    let markers = document.querySelectorAll("[data='marker']");
    markers.forEach(marker => { marker.remove(); });

    let assets = document.querySelector("a-assets");
    assets.innerHTML = '';
  };

  render() {
    return (
      <a-scene ref={elem => this.Scene = elem} vr-mode-ui='enabled: false' arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false'
        renderer='antialias: true; alpha: true'>
        <a-assets ref={elem => this.Assets = elem}></a-assets>

        <a-camera ref={elem => this.Camera = elem} look-controls-enabled='false' arjs-device-orientation-controls='smoothingFactor: 0.1'
          gps-new-camera='gpsMinDistance: 5'></a-camera>
      </a-scene>
    )
  }
};

export default Scene;
