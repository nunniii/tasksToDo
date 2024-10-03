import { useState, useEffect } from 'react';

export function CurrentTime() {
  // Estado para armazenar a hora atual
  const [time, setTime] = useState(new Date());

  // useEffect para atualizar o estado a cada segundo
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Limpar o intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, []);

  // Formatando a hora para exibição
  const formattedTime = time.toLocaleTimeString();

  return <p id="CurrentTime" className='text-white'>{formattedTime}</p>
}

