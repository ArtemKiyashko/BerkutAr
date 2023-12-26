import './App.css';

function App() {
  return (
    <a-scene vr-mode-ui='enabled: false' arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false'
      renderer='antialias: true; alpha: true'>
      <a-assets></a-assets>

      <a-camera look-controls-enabled='false' arjs-device-orientation-controls='smoothingFactor: 0.1'
        gps-new-camera='gpsMinDistance: 5'></a-camera>
    </a-scene>
  );
}

export default App;
