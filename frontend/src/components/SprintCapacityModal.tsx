import { useState } from "react";

export default function SprintCapacityModal({ onCancel , onConfirm }:any) {
  const [capacity, setCapacity] = useState(20);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Set Sprint Capacity</h3>

        <label>Story points available</label>
        <input
          type="number"
          value={capacity}
          min={1}
          onChange={(e) => setCapacity(Number(e.target.value))}
        />

        <div className="modal-buttons">
          <button onClick={() => onConfirm(capacity)} className="primary-btn">
            Continue
          </button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
