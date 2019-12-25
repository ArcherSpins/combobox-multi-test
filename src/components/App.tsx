import React from 'react';
import Combobox from './Combobox';

import './style.scss';

const dataD = [
  {
    id: 1,
    title: 'Петя'
  },
  {
    id: 2,
    title: 'Никита'
  },
  {
    id: 3,
    title: 'Павел'
  },
  {
    id: 4,
    title: 'Анна'
  },
  {
    id: 5,
    title: 'Милана'
  },
  {
    id: 6,
    title: 'Алёна'
  },
];

const App: React.FC = () => {
  const [list, toggleList] = React.useState<Array<number>>([0]);

  return (
    <div className="App">
      <button style={{ margin: 40, padding: 10 }} onClick={() => toggleList([...list, list.length])}>Добавить Combobox</button>
      <div className="combobox-list d-flex">
        {
          list.map(item => (
            <div key={item} className="item">
              <div className="d-flex padding-10">
                <p>Индекс комбобокса: {item}</p>
                <button className="delete-combobox" onClick={() => toggleList(list.filter(i => i !== item))}>Удалить комбобокс</button>
              </div>
              <div className="combobox-item_container">
                <Combobox
                  defaultData={dataD}
                  deleteditem={(id: string | number) => {
                    const d = dataD.find(item => item.id === id);
                    if (d)
                      console.log('Удалён чип: ' + d.title + ' из комбобокса под индексом: ' + item);
                  }}
                />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
