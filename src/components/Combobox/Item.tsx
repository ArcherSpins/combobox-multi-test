import React from 'react';

type Props = { id: number | string, title: string, onSelectItem: (id: string | number) => void, className: string }

export default ({ id, title, onSelectItem, className }: Props) => (
  <button className={className} onClick={() => onSelectItem(id)}>{title}</button>
);
