import '../../styles/components/ThreeStateToggle.scss';
import { useState } from 'react';

type ThreeStateToggleProps = {
  initialState: 'to do' | 'doing' | 'done';
  onToggle: () => void;
};

export function ThreeStateToggle({ initialState, onToggle }: ThreeStateToggleProps) {
  const states = ['to do', 'doing', 'done'];
  const [currentState, setCurrentState] = useState(initialState); // Use initialState instead of a hardcoded default

  const toggleState = () => {
    const currentIndex = states.indexOf(currentState);
    const nextIndex = (currentIndex + 1) % states.length;
    setCurrentState(states[nextIndex] as 'to do' | 'doing' | 'done');
    onToggle();
  };

  return (
    <div className={`toggle-container ${currentState.replace(' ', '-')}`} onClick={toggleState}>
      <span className="toggle-label">{currentState}</span>
    </div>
  );
}
