import { useState } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchbarStyle,
} from './Searchbar.styled';

import { HiMagnifyingGlass } from 'react-icons/hi2';

export const paramsForNotify = {
  position: 'center-center',
  timeout: 3000,
  width: '400px',
  fontSize: '24px',
};

const Searchbar = ({onSubmit}) => {
  const [query, setQuery] = useState('');
 

  const handleChange = e => {
    setQuery(e.target.value) ;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      Notify.info('Enter your request, please!', paramsForNotify);
      return;
    }

    onSubmit(query);
  };


    return (
      <SearchbarStyle>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton>
            <HiMagnifyingGlass size="24" />
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
        </SearchForm>
      </SearchbarStyle>
    );
}
  
export default Searchbar;

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};