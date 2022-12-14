import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button, ButtonPerv } from './Button/Button';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    word: '',
    result: null,
    loading: false,
    page: 1,
    error: null,
    total: null,
  };

  handleSubmit = value => {
    this.setState({ word: value });
  };

  onLoadMoreClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };
  onLoadLessClick = () => {
    this.setState(({ page }) => ({ page: page - 1 }));
    if (this.state.page === 1) {
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { word, page } = this.state;
    if (prevState.word !== word || prevState.page !== page) {
      this.setState({
        loading: true,
        result: null,
      });

      if (prevState.word !== this.state.word) {
        this.setState({ page: 1 });
      }

      fetch(
        `https://pixabay.com/api/?key=30691958-6af913c4f83636a6243d9d3b7&q=${this.state.word}&page=${this.state.page}&image_type=photo&orientation=horizontal&per_page=12`
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
            this.setState({ result: result.hits });
          }
          if (result.total === 0) {
            toast.error('Try something else');
          }
          if (result.total > 11) {
            this.setState({ total: result.total });
          }
        })
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  render() {
    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        {this.state.error &&
          toast.error('Sorry, something is not OK. Try again')}
        {this.state.loading && <Loader />}
        {this.state.result && <ImageGallery images={this.state.result} />}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {this.state.word !== '' && this.state.page !== 1 && (
            <ButtonPerv onClick={this.onLoadLessClick} />
          )}
          {this.state.word !== '' &&
            this.state.result !== null &&
            this.state.total > 10 &&
            this.state.result.length === 12 && (
              <Button onClick={this.onLoadMoreClick} />
            )}
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </>
    );
  }
}
