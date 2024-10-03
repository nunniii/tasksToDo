import '../../styles/components/ThreeStateToggle.scss';
import { useState } from 'react';

export function ThreeStateToggle() {
  const states = ['to do', 'in progress', 'done'];
  const [currentState, setCurrentState] = useState(states[0]);

  const toggleState = () => {
    const currentIndex = states.indexOf(currentState);
    const nextIndex = (currentIndex + 1) % states.length;
    setCurrentState(states[nextIndex]);
  };

  return (
    <div className={`toggle-container ${currentState.replace(' ', '-')}`} onClick={toggleState}>
      <span className="toggle-label">{currentState}</span>
    </div>
  );
};
