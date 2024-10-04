import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'

// Definindo o tipo para as opções
type Option = {
  id: number;
  name: string;
  component: 'Tasks' | 'Progress' | 'Rest'; // Mudando o tipo aqui
};

// Atualizando as opções com o tipo 'Option'
const options: Option[] = [
  { id: 1, name: 'Tarefas', component: 'Tasks' },
  { id: 2, name: 'Progresso', component: 'Progress' },
  { id: 3, name: 'Descanso', component: 'Rest' }
];

// Definindo o tipo da prop 'onSelect' para garantir que o TypeScript o reconheça corretamente
type SelectorProps = {
  onSelect: (component: 'Tasks' | 'Progress' | 'Rest') => void; // O tipo aqui deve ser o mesmo
};

export function Selector({ onSelect }: SelectorProps) {
  const [selected, setSelected] = useState<Option>(options[0]);

  const handleChange = (option: Option) => {
    setSelected(option);
    onSelect(option.component);  // Agora isso é seguro
  }

  return (
    <div className="w-44">
      <Listbox value={selected} onChange={handleChange}>
        <ListboxButton
          className={clsx(
            'w-44 rounded-lg bg-white py-1.5 pr-8 pl-3 text-left text-sm/6 text-black gap-1 items-center flex'
          )}
        >
          {selected.name}
          <ChevronDownIcon
            className="group pointer-events-none top-2.5 right-2.5 size-4 fill-black/60"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-[var(--button-width)] rounded-xl  bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
          )}
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white"
            >
              <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
              <div className="text-sm/6 text-black">{option.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  )
}
