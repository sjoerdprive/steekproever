import { useState } from "react";
import auditTypes from "src/data/auditTypes.json";

export default function () {
  const [auditType, setAuditType] = useState("Volledig");
  const auditTypeKeys = Object.keys(auditTypes);

  return (
    <div>
      <fieldset className="mb-1">
        <legend>Type onderzoek</legend>
        {auditTypeKeys.map((entry, i) => (
          <label className="me-2" key={i}>
            <input
              className="me-1"
              type="radio"
              name="audit-type"
              checked={entry === auditType}
              onChange={(e) => setAuditType(entry)}
            />
            {entry}
          </label>
        ))}
      </fieldset>
      <ul className="list-unstyled">
        {auditTypes[auditType].map((sampleType, i) => (
          <li key={i}>
            <label>
              <input
                className="form-check-input me-2"
                type="checkbox"
                name={sampleType.toLowerCase()}
                id=""
              />
              {sampleType}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
