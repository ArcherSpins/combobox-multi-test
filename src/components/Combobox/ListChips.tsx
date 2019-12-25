import React from 'react';
import Chip from './Chip';

type Props = {
  data: Array<{ id: number | string, title: string }>,
  onDeleteItem: (id: string | number) => void
}

export default ({ data, onDeleteItem }: Props) => (
  <>
    {
      data.map(item => (
        <Chip onDeleteItem={onDeleteItem} {...item} key={item.id} />
      ))
    }
  </>
);
