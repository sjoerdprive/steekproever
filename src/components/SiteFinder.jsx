import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthEurope } from '@fortawesome/free-solid-svg-icons';

export default function ({ onLoad, onSubmit }) {
  const submitHandler = async (e) => {
    e.preventDefault();
    onSubmit();
    const form = new FormData(e.currentTarget);
    const url = form.get('url');

    const res = await fetch('/api/getSite', {
      method: 'POST',
      body: JSON.stringify({
        url,
      }),
    });

    onLoad(res.json());
  };

  return (
    <div>
      <form
        method="POST"
        className="w-100 d-flex align-items-stretch gap-2"
        onSubmit={submitHandler}
      >
        <label className="my-auto" htmlFor="urlInput">
          <FontAwesomeIcon icon={faEarthEurope} />
          <span className="visually-hidden">Website URL</span>
        </label>
        <input
          id="urlInput"
          type="text"
          name="url"
          className="flex-grow-1"
          placeholder="URL"
        />
        <button className="btn btn-primary">Check</button>
      </form>
    </div>
  );
}
