import React, { useState, useRef } from 'react';
import ListChips from './ListChips';
import ListItem from './ListItem';
import useOnClickOutside from './useOutsideClick';
import './style.scss';

type Props = Array<{ id: number | string, title: string }>


export default ({ defaultData, deleteditem }: { defaultData: Props, deleteditem: (id: string | number) => void }) => {
  const [data] = useState<Props>(defaultData);
  const [selecteditems, toggleSelecteditems] = useState<Props>([]);
  const [value, onChange] = useState<string>('');
  const [isOpen, toggleOpen] = useState<boolean>(false);

  const ref = useRef(null);

  useOnClickOutside(ref, () => toggleOpen(false));


  const onSelectItem = (id: string | number) => {
    const searchItem = data.find(item => item.id === id);
    if (searchItem) {
      toggleSelecteditems([...selecteditems, searchItem]);
      onChange('');
      toggleOpen(false);
    }
  }

  const onDeleteItem = (id: string | number) => {
    toggleSelecteditems(selecteditems.filter(item => item.id !== id));
    deleteditem(id);
  }

  return (
    <div ref={ref} className="combobox">
      <ListChips onDeleteItem={onDeleteItem} data={selecteditems} />
      <input onFocus={() => toggleOpen(true)} value={value} onChange={(e) => onChange(e.target.value)} className="chip-input" />
      <button onClick={() => toggleOpen(true)} type="button" className="drop-down-button">&#8744;</button>
      {
        value || isOpen ?
          <ListItem
            onSelectItem={onSelectItem}
            data={data.filter(item =>
              item.title.toLowerCase().includes(value.toLowerCase()) && !selecteditems.find((it: { id: string | number }) => it.id === item.id))}
          /> : null
      }
    </div>
  );
}
