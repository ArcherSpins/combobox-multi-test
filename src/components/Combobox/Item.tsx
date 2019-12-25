import React from 'react';

type Props = { id: number | string, title: string, onSelectItem: (id: string | number) => void }

export default ({ id, title, onSelectItem }: Props) => (
  <button onClick={() => onSelectItem(id)}>{title}</button>
);
