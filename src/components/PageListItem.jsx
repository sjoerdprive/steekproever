import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function ({ page, isInSample, onSample }) {
  const [pageInfo, setPageInfo] = useState(page);
  console.log(page);
  console.log(pageInfo);
  useEffect(() => {
    setPageInfo(page);
  }, [page.title]);

  return (
    <li className="d-flex list-group-item">
      <a
        className="flex-grow-1 me-2 d-flex align-items-center text-break"
        href={pageInfo.baseUrl + pageInfo.path}
        target="_blank"
      >
        {pageInfo.url}
      </a>
      <button
        title="Voeg toe aan steekproef"
        className="btn btn-light"
        onClick={() => onSample(pageInfo)}
        disabled={isInSample}
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <span className="visually-hidden">Voeg toe aan steekproef</span>
      </button>
    </li>
  );
}
