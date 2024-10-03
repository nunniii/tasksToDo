import '../styles/components/AppContent.scss'

// Importar todos os componentes possíveis
import { Tasks } from './Tasks/Tasks';
import { Progress } from './Progress';777
0
import { Rest } from './Rest';

// Definir o tipo da propriedade
type AppContentProps = {
  selectedComponent: 'Tasks' | 'Progress' | 'Rest';
};

export function AppContent({ selectedComponent }: AppContentProps) {
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Tasks':
        return <Tasks />;
      case 'Progress':
        return <Progress />;
      case 'Rest':
        return <Rest />;
      default:
        return null;
    }
  };

  return (
    <main id="AppContent">
      {renderComponent()}
    </main>
  );
}
