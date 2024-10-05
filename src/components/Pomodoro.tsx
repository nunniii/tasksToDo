import React, { useEffect, useState } from 'react';
import '../styles/components/Pomodoro.scss'; 

import { VscDebugStart } from "react-icons/vsc";
import { CiPause1 } from "react-icons/ci";

const Pomodoro: React.FC = () => {
  const [minute, setMinute] = useState(25);
  const [second, setSecond] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [step, setStep] = useState("pomodoro");
  const [counter, setCounter] = useState(0);
  let chronometer: ReturnType<typeof setInterval>; // Alterado aqui

  const stepData = {
    pomodoro: { type: "pomodoro", time: 25 },
    short_break: { type: "short_break", time: 5 },
    long_break: { type: "long_break", time: 15 }
  };

  useEffect(() => {
    if (isActive) {
      chronometer = setInterval(() => {
        setSecond((prev) => {
          if (prev === 0) {
            if (minute === 0) {
              pause();
              relay(0, "");
              return 0;
            }
            setMinute((prev) => prev - 1);
            return 59;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(chronometer);
  }, [isActive, minute]);

  const start = () => {
    setIsActive(true);
  };

  const pause = () => {
    setIsActive(false);
  };

  const relay = (command_type: number, c?: string) => {
    if (command_type === 0) {
      if (step === stepData.pomodoro.type && counter === 3) {
        setStep(stepData.long_break.type);
        setMinute(stepData.long_break.time);
        setSecond(0);
        setCounter(0);
        new Audio("./assets/alarm.mp3").play();
      } else if (step === stepData.pomodoro.type && counter < 3) {
        setStep(stepData.short_break.type);
        setMinute(stepData.short_break.time);
        setSecond(0);
        setCounter((prev) => prev + 1);
        new Audio("./assets/alarm.mp3").play();
      } else if (step === stepData.short_break.type) {
        setStep(stepData.pomodoro.type);
        setMinute(stepData.pomodoro.time);
        setSecond(0);
        new Audio("./assets/alarm.mp3").play();
      } else if (step === stepData.long_break.type) {
        setStep(stepData.pomodoro.type);
        setMinute(stepData.pomodoro.time);
        setSecond(0);
        new Audio("./assets/alarm.mp3").play();
      }
    } else if (command_type === 1) {
      if (c === "pomodoro") {
        setStep(stepData.pomodoro.type);
        setMinute(stepData.pomodoro.time);
        setSecond(0);
        pause();
      } else if (c === "short_break") {
        setStep(stepData.short_break.type);
        setMinute(stepData.short_break.time);
        setSecond(0);
        pause();
      } else if (c === "long_break") {
        setStep(stepData.long_break.type);
        setMinute(stepData.long_break.time);
        setSecond(0);
        pause();
      }
    }
  };

  const formatTime = () => {
    return `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`;
  };

  const handlePomodoro = () => {
    relay(1, "pomodoro");
    setMinute(stepData.pomodoro.time);
    setSecond(0);
  };

  const handleShortBreak = () => {
    relay(1, "short_break");
    setMinute(stepData.short_break.time);
    setSecond(0);
  };

  const handleLongBreak = () => {
    relay(1, "long_break");
    setMinute(stepData.long_break.time);
    setSecond(0);
  };

  return (
    <div id="Pomodoro" className={`main ${isActive ? 'active' : ''}`}>
      <div className="pause">
      <button id="controller" onClick={isActive ? pause : start} className="start-btn">
          {isActive ? <CiPause1 /> /*Icone pause*/ : <VscDebugStart /> /*Icone start*/ }
        </button>
        <span id="clock" className={`clock ${isActive ? 'time' : 'pause'} `}>{formatTime()}</span>
        </div>
        <div id="indicators" className="">
          <button onClick={handlePomodoro} className={`btn ${step === stepData.pomodoro.type ? 'select' : ''}`}>Pomodoro</button>
          <button onClick={handleShortBreak} className={`btn ${step === stepData.short_break.type ? 'select' : ''}`}>Short break</button>
          <button onClick={handleLongBreak} className={`btn ${step === stepData.long_break.type ? 'select' : ''}`}>Long break</button>
        </div>
        
      
    </div>
  );
};

export default Pomodoro;
