import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles.module.less'

const propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  filterBy: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]),
  placeholder: PropTypes.string,
  defaultSearch: PropTypes.string,
  listStyle: PropTypes.object,
  listItemStyle: PropTypes.object,
  listRenderer: PropTypes.func,
  listItemsRenderer: PropTypes.func,
};

const defaultProps = {
  data: [],
  placeholder: 'Search...',
  defaultSearch: '',
  listStyle: {},
  listItemStyle: {},
};


export const SearchableList = (props) => {
  const clearString = val => val?.trim().toLowerCase();
  const [search, changeSearch] = useState(props.defaultSearch);

  const isSearchIncluded = (item) => {
    if (!(item && search.length)) {
      return true;
    }

    const clearSearch = clearString(search);
    let { filterBy } = props;

    if (typeof item === 'string') {
      return clearString(item).includes(clearSearch);
    } else if (filterBy) {
      if (!Array.isArray(filterBy)) {
        filterBy = [filterBy];
      }
      return filterBy.find(filterKey =>
        clearString(item[filterKey]).includes(clearSearch));
    }
    return JSON.stringify(item).includes(search);
  };

  const getFilteredList = () => {
    if (!search.length) {
      return props.data;
    }
    return props.data.filter(isSearchIncluded).filter(fi => !!fi);
  };

  const filteredList = useMemo(getFilteredList);

  return (
    <div className={styles.SearchableListContainer}>
      <div id="search-box">
        <input
          type="text"
          placeholder={props.placeholder}
          value={search}
          onChange={newSearch => changeSearch(newSearch.target.value)}
          disabled={!props.data.length}
        />
      </div>
      {props.listRenderer ? (
        props.listRenderer(filteredList, search)
      ) : (
          <ul style={props.listStyle}>
            {filteredList.map((item, i) => (
              <li
                key={`searchable-${props.name}-item#${i}`}
                style={{ ...defaultProps.listItemStyle, ...props.listItemStyle }}
              >
                {props.valuesRenderer
                  ? props.valuesRenderer(item)
                  : item}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}

SearchableList.propTypes = propTypes;
SearchableList.defaultProps = defaultProps;
