import { AppContent } from "./components/AppContent";
import { Nav } from "./components/_global/Nav";
import { useState } from "react";
import useDeviceDimensions from './hooks/useDeviceDimensions';

function App() {
  // para gerenciar o estado do componente selecionado
  const [selectedComponent, setSelectedComponent] = useState<string>('Tasks');

  // verifica se o dispositivo é celular ou tablet em modo vertical
  const isMobileOrTabletPortrait = useDeviceDimensions();

  // componente de aviso
  const WarningComponent = () => (
    <div style={{ padding: '20px', textAlign: 'center', background: '#ffdddd' }}>
      <h2>Aviso!</h2>
      <p>
        ;-; O aplicativo não está otimizado para dispositivos móveis ou tablets em
        modo retrato. Por favor, gire seu dispositivo ou acesse de um tablet em
        modo horizontal ou desktop. &#40;┬┬﹏┬┬&#41;
      </p>
    </div>
  );

  return (
    <>
      {isMobileOrTabletPortrait ? (
        <WarningComponent />
      ) : (
        <> 
          <Nav onSelect={setSelectedComponent} />
          <AppContent selectedComponent={selectedComponent} />
        </>
      )}
    </>
  );
}

export default App;
