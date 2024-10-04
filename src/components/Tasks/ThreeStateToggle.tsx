import '../../styles/components/ThreeStateToggle.scss';
import { useState } from 'react';


import { RiProgress5Line } from "react-icons/ri";
import { FaCalendarDay } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";

type ThreeStateToggleProps = {
  initialState: 'to do' | 'doing' | 'done';
  onToggle: () => void;
};

export function ThreeStateToggle({ initialState, onToggle }: ThreeStateToggleProps) {
  const states: ('to do' | 'doing' | 'done')[] = ['to do', 'doing', 'done'];
  const [currentState, setCurrentState] = useState(initialState); // Use initialState instead of a hardcoded default

  // Mapeamento dos estados para os ícones correspondentes
  const stateIcons: Record<'to do' | 'doing' | 'done', JSX.Element> = {
    'to do': <FaCalendarDay />,
    'doing': <RiProgress5Line />,
    'done': <IoIosStar  />,
  };

  const toggleState = () => {
    const currentIndex = states.indexOf(currentState);
    const nextIndex = (currentIndex + 1) % states.length;
    setCurrentState(states[nextIndex] as 'to do' | 'doing' | 'done');
    onToggle();
  };

  return (
    <div className={`toggle-container ${currentState.replace(' ', '-')}`} onClick={toggleState}>
      <span className="toggle-label flex gap-2 items-center justify-center">
        {currentState} {stateIcons[currentState]}
      </span>
    </div>
  );
}
