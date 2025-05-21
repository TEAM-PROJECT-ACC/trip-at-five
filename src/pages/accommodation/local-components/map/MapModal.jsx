import "./MapModal.style.scss";
import { KakaoMap } from "./KakaoMap";

const MapModal = ({ onClose }) => {
  return (
    <div className="map-modal-overlay">
      <div className="map-modal-content">
        <button className="map-modal-close" onClick={onClose}>
          ✕
        </button>
        <KakaoMap />
      </div>
    </div>
  );
};

export default MapModal;
