import React from 'react'

import { SearchableList } from 'react-searchable-list'
import 'react-searchable-list/dist/index.css'

const App = () => {
  const stringData = ["Lucy", "is", "the", "best", "dog", "ever!", "Mamas", "EMPIRE"];
  const objectData = [
    { name: "Lucy", value: "lucy", },
    { name: "is", value: "is", },
    { name: "the", value: "the", },
    { name: "best", value: "best", },
    { name: "dog", value: "dog", },
    { name: "ever!", value: "ever!", }
  ];
  // return <SearchableList text="Create React Library Example 😄" />
  return (
    <div className="App">
      <div style={{ height: '50%' }}>
        <SearchableList
          name="string-list"
          data={stringData}
        />
      </div>
      {/* <div style={{ height: '30%' }}>
        <SearchableList
          name="object-list-one-filterby"
          data={objectData}
          filterBy="value"
        />
      </div>
      <div style={{ height: '30%' }}>
        <SearchableList
          name="object-list-multi-filterby"
          data={objectData}
          filterBy={Object.keys(objectData[0])}
        />
      </div> */}
    </div>
  );
}

export default App
