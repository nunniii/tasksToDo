import '../../styles/components/Nav.scss';
import { Selector } from './Selector';


// Definir o tipo das props do Nav
// interface NavProps {
//   onSelect: (component: string) => void;  // Tipagem da função onSelect
// }

type NavProps = {
  onSelect: (component: 'Tasks' | 'Progress' | 'Rest') => void; // Tipo ajustado para aceitar apenas esses três valores
};


export function Nav({ onSelect }: NavProps) {
  return (
    <nav id="Nav">
      <div id="Controls">
        {/* O seletor recebe a função onSelect para atualizar a seleção */}
        <Selector onSelect={onSelect} />
      </div>
    </nav>
  );
}
