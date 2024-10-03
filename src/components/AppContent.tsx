import '../styles/components/AppContent.scss'

// Importar todos os componentes possíveis
import { Tasks } from './Tasks/Tasks';
import { Progress } from './Progress';
import { Rest } from './Rest';

export function AppContent({ selectedComponent }) {
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
  }

  return (
    <main id="AppContent">
      {renderComponent()}
    </main>
  )
}
