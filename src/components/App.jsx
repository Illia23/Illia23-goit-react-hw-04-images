import React, { useState, useEffect } from 'react';
import getImages from 'services/apiService';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { Button } from './Button/Button';
const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotal] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;

      setIsLoading(true);
      try {
        const { hits: photos, totalHits: total_images } = await getImages(
          query,
          page
        );

        if (!photos.length) {
          setError(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        setImages(prevImages => [...prevImages, ...photos]);
        setIsLoadMore(page < Math.ceil(total_images / 12));
        setTotal(total_images);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleSubmit = query => {
    if (query === '') return;

    setQuery(query);
    setImages([]);
    setPage(1);
    setTotal(0);
  };

  const openModal = url => {
    setUrl(url);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      {isLoadMore && <Button onClick={loadMore}>Load more</Button>}
      {url && <Modal closeModal={() => setUrl('')} url={url} />}
    </>
  );
};

export default App;

// export class App extends Component {
//   state = {
//     images: [],
//     query: '',
//     page: 1,
//     isLoadMore: false,
//     isLoading: false,
//     url: '',
//   };

//   componentDidUpdate(_, prevState) {
//     const { query, page } = this.state;
//     if (query !== prevState.query || page !== prevState.page) {
//       this.setState({ isLoading: true, isLoadMore: false });
//       getImages(this.state)
//         .then(({ hits: photos, totalHits, hits }) => {
//           if (!photos.length) {
//             return Notify.failure(
//               'Sorry, there are no images matching your search query. Please try again.',
//               paramsForNotify
//             );
//           }

//           this.setState(prevState => ({
//             images: [...prevState.images, ...hits],

//             isLoadMore: page < Math.ceil(totalHits / 12),
//           }));
//         })
//         .catch(error => {
//           Notify.failure(
//             'Oops! Something went wrong! Try reloading the page or make another choice!',
//             paramsForNotify
//           );
//         })
//         .finally(() => {
//           this.setState({ isLoading: false });
//         });
//     }
//   }

//   handleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   handleSubmit = query => {
//     if (this.state.query === query) {
//       return;
//     }
//     this.setState({ query, page: 1, images: [] });
//   };

//   openModal = url => {
//     this.setState({ url });
//   };

//   render() {
//     const { images, isLoadMore, isLoading, url } = this.state;
//     return (
//       <AppStyle>
//         <Searchbar onSubmit={this.handleSubmit} />
//         {isLoading && <Loader />}
//         <ImageGallery images={images} openModal={this.openModal} />
//         {url && <Modal closeModal={this.openModal} url={url} />}
//         {isLoadMore && <Button onClick={() => this.handleLoadMore()} />}
//       </AppStyle>
//     );
//   }
// }