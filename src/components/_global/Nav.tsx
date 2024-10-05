import '../../styles/components/Nav.scss';
import { Selector } from './Selector';

import Pomodoro from '../Pomodoro';



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
        <Pomodoro />
    </nav>
  );
}
