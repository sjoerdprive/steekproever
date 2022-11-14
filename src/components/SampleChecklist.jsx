import sampleTypes from 'src/data/sampleTypes.json';

export default function () {
  return (
    <ul className="list-unstyled">
      {sampleTypes.map((sampleType, i) => (
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
  );
}
