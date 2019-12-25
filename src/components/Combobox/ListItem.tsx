import React from 'react';

import Item from './Item';

type Props = {
  data: Array<{ id: number | string, title: string }>,
  onSelectItem: (id: string | number) => void,
}

export default ({ data, onSelectItem }: Props) => (
  <div className="list-items">
    {
      data.length ? data.map(item => (
        <Item onSelectItem={onSelectItem} {...item} key={item.id} />
      )) : <p>not found</p>
    }
  </div>
)
