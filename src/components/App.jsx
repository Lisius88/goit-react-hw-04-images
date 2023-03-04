import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect, useLayoutEffect } from 'react';

export const App = () => {
  const [word, setWord] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const handleSubmit = value => {
    if (word !== value) {
      setResult([]);
    }

    if (word === value) {
      return;
    }

    setWord(value);
    setPage(1);
  };

  const onLoadMoreClick = () => {
    setPage(page => page + 1);
  };

  useEffect(() => {
    if (word === '') {
      return;
    }

    setLoading(true);
    fetch(
      `https://pixabay.com/api/?key=30691958-6af913c4f83636a6243d9d3b7&q=${word}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        Promise.reject(new Error('Sorry, something is not OK. Try again'));
      })
      .then(data => {
        if (data.hits.length > 0) {
          setResult(result => [...result, ...data.hits]);
          setTotal(total => data.total);
        }
        if (data.total === 0) {
          toast.error('Try something else');
        }
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [word, page]);

  useEffect(() => {
    if (total === 0) {
      return;
    }
    toast.success(`We have ${total} images for you!`);
  }, [total]);

  useLayoutEffect(() => {
    if (page < 2) {
      return;
    }

    const scrollHeight = 366 * 1.5;

    window.scrollBy({
      top: scrollHeight,
      behavior: 'smooth',
    });
  }, [page, word]);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {error && toast.error('Sorry, something is not OK. Try again')}
      {loading && <Loader />}
      {result && <ImageGallery images={result} />}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {word !== '' && result.length !== total && (
          <Button onClick={onLoadMoreClick} />
        )}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};
