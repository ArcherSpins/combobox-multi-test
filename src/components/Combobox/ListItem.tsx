import React from 'react';

import Item from './Item';

type Props = {
  data: Array<{ id: number | string, title: string }>,
  onSelectItem: (id: string | number) => void,
  currentListItem: number
}

export default ({ data, onSelectItem, currentListItem }: Props) => (
  <div className="list-items">
    {console.log(currentListItem)}
    {
      data.length ? data.map((item, i) => (
        <Item className={currentListItem === i ? 'focus-item' : ''} onSelectItem={onSelectItem} {...item} key={item.id} />
      )) : <p>not found</p>
    }
  </div>
)
