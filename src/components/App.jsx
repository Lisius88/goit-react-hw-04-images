import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button, ButtonPerv } from './Button/Button';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';

export const App = () => {
  const [word, setWord] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const handleSubmit = value => {
    setWord(value);
    setPage(1);
  };

  const onLoadMoreClick = () => {
    setPage(page => page + 1);
  };
  const onLoadLessClick = () => {
    setPage(page => page - 1);
    if (page === 1) {
    }
  };
  useEffect(() => {
    if (word === '') {
      return;
    }

    setLoading(true);
    setResult(null);

    fetch(
      `https://pixabay.com/api/?key=30691958-6af913c4f83636a6243d9d3b7&q=${word}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        Promise.reject(new Error('Sorry, something is not OK. Try again'));
      })
      .then(result => {
        console.log(result);
        if (result.hits.length > 0) {
          setResult(result.hits);
        }
        if (result.total === 0) {
          toast.error('Try something else');
        }
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, word]);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {error && toast.error('Sorry, something is not OK. Try again')}
      {loading && <Loader />}
      {result && <ImageGallery images={result} />}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {word !== '' && result !== null && page !== 1 && (
          <ButtonPerv onClick={onLoadLessClick} />
        )}
        {word !== '' && result !== null && result.length === 12 && (
          <Button onClick={onLoadMoreClick} />
        )}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};
