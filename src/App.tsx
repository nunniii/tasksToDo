import { AppContent } from "./components/AppContent";
import { Nav } from "./components/_global/Nav";
import { useState } from "react";
import useDeviceDimensions from './hooks/useDeviceDimensions';

function App() {
  // Para gerenciar o estado do componente selecionado
  const [selectedComponent, setSelectedComponent] = useState<'Tasks' | 'Progress' | 'Rest'>('Tasks');

  // Verifica se o dispositivo é celular ou tablet em modo vertical
  const isMobileOrTabletPortrait = useDeviceDimensions();

  // Componente de aviso
  const WarningComponent = () => (
    <div style={{ padding: '20px', textAlign: 'center', background: '#ffdddd' }}>
      <h2>Aviso!</h2>
      <p>
        ;-; Oops, vamos precisar de uma tela maior. Por favor, gire seu dispositivo ou acesse de um tablet em
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
