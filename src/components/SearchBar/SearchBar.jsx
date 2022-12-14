import { Formik, Form, Field } from 'formik';
import styled from '@emotion/styled';
import { Header, SearchButton } from './SearchBar.styled';
import { FaSearch } from 'react-icons/fa';
import * as yup from 'yup';
import PropTypes from 'prop-types';

let schema = yup.object().shape({
  search: yup.string().required(),
});

const Input = styled(Field)`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;
`;

const OurForm = styled(Form)`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`;

export const SearchBar = ({ onSubmit }) => {
  const submit = (values, actions) => {
    onSubmit(values.search);
  };
  return (
    <Header>
      <Formik
        initialValues={{ search: '' }}
        onSubmit={submit}
        validationSchema={schema}
      >
        <OurForm autoComplete="off">
          <SearchButton type="submit">
            <FaSearch />
          </SearchButton>

          <Input
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </OurForm>
      </Formik>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
