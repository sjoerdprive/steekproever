import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle';

import { useState } from 'react';
import PageList from 'src/components/PageList';
import Sampler from 'src/components/Sampler';
import SiteFinder from '../components/SiteFinder';
import SampleChecklist from 'src/components/SampleChecklist';

export default function Home() {
  const [pages, setPages] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [sample, setSample] = useState([]);

  const addToSample = (item) => {
    setSample((prev) => prev.concat(item));
  };

  const removeFromSample = (item) => {
    setSample((prev) => prev.filter((o) => o !== item));
  };

  return (
    <main className="container">
      <h1>Steekproever</h1>
      <p>Kleine steun voor het maken van een goede steekproef</p>
      <div className="row w-100">
        <div className="col-6 d-flex flex-column gap-3">
          <SiteFinder
            onSubmit={() => setLoading(true)}
            onLoad={async (loadedPages) => {
              setLoading(false);
              setPages(await loadedPages);
            }}
          />

          <h2>Pagina's</h2>

          {pages ? (
            <PageList onSample={addToSample} sample={sample} pages={pages} />
          ) : (
            <p>
              Nog geen pagina's gevonden. Voer een URL in om pagina's te zoeken
            </p>
          )}
          {loading && (
            <span className="spinner-border" role="status">
              <span className="visually-hidden">Laden...</span>
            </span>
          )}
        </div>
        <div className="col-6">
          <aside className="p-5 border">
            <h2>Checklist</h2>
            <SampleChecklist />
            <h2>Steekproef</h2>
            <Sampler onRemove={removeFromSample} sample={sample} />
          </aside>
        </div>
      </div>
    </main>
  );
}
