import { AppContent } from "./components/AppContent";
import { Nav } from "./components/_global/Nav";
import { useState } from "react";

function App() {
  // Gerencia o estado do componente selecionado
  const [selectedComponent, setSelectedComponent] = useState<string>('Tasks');

  return (
    <>
      {/* Passa a função para alterar o estado para o Nav */}
      <Nav onSelect={setSelectedComponent} />  
      
      {/* Passa o estado atual para o AppContent */}
      <AppContent selectedComponent={selectedComponent} />
    </>
  );
}

export default App;
