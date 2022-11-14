import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function ({ sample, onRemove }) {
  return (
    <div>
      {sample.length > 0 ? (
        <ul className="list-group list-group-flush">
          {sample.map((page, i) => (
            <li
              className="d-flex align-items-center gap-2 list-group-item"
              key={i}
            >
              <span className="flex-grow-1 text-break d-flex align-items-center">{page.url}</span>
              <button
                title="Verwijder uit steekproef"
                className="btn btn-light"
                onClick={() => onRemove(page)}
              >
                <FontAwesomeIcon color="red" icon={faXmark} />
                <span className="visually-hidden">
                  Verwijder uit steekproef
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          Nog geen pagina's in steekproef. Voeg met de pijltjes pagina's toe
          vanuit de lijst
        </p>
      )}
    </div>
  );
}
