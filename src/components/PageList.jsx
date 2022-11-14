import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faMagnifyingGlass,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons';
import PageListItem from './PageListItem';

export default function ({ pages, onSample, sample }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!pages) return <></>;

  const filteredPages = pages?.filter(
    (page) =>
      page.path.match(RegExp(`${searchTerm}`, 'i')) && !sample.includes(page)
  );

  return (
    <div>
      {filteredPages && (
        <>
          <label htmlFor="searchPages" className="me-2">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <span className="visually-hidden">Zoek</span>
          </label>
          <input
            id="searchPages"
            type="search"
            onChange={(e) => {
              const val = e.currentTarget.value;
              setSearchTerm(val);
            }}
            value={searchTerm}
          />
          <fieldset></fieldset>
          <ul className="list-group list-group-flush">
            {filteredPages?.map((page) => {
              const isInSample = sample.includes(page);
              return (
                <PageListItem
                  page={page}
                  isInSample={isInSample}
                  onSample={onSample}
                />
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
