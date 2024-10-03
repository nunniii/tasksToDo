import { useState, useEffect } from 'react';
import '../../styles/components/scope/Tasks.scss';
import { FlowBoard } from './FlowBoard';
import { TasksList } from './TasksList';
import { TaskStateChart } from './TaskStateChart';

// Definindo a estrutura da tarefa
type Task = {
  id: number;
  name: string;
  description: string;
  state: 'to do' | 'doing' | 'done';
  position: number; // Para controlar a ordem
};

export function Tasks() {
  // Estado da lista de tarefas
  const initialTasks: Task[] = [
    { id: 1, name: 'Task One', description: 'Description for Task One', state: 'to do', position: 1 },
    { id: 2, name: 'Task Two', description: 'Description for Task Two', state: 'doing', position: 2 },
    { id: 3, name: 'Task Three', description: 'Description for Task Three', state: 'done', position: 3 },
    { id: 4, name: 'Task Four', description: 'Description for Task Four', state: 'done', position: 4 },
    { id: 5, name: 'Task Five', description: 'Description for Task Five', state: 'done', position: 5 },
    { id: 6, name: 'Task Six', description: 'Description for Task Six', state: 'done', position: 6 },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  // Função para simular mudanças periódicas no estado das tarefas
  const updateTasksPeriodically = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({
        ...task,
        state:
          task.state === 'to do'
            ? 'doing'
            : task.state === 'doing'
            ? 'done'
            : 'to do', // alterna os estados entre to do doing e done
      }))
    );
  };

  // useEffect para atualizar periodicamente as tarefas a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(updateTasksPeriodically, 5000);

    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
  }, []);

  return (
    <div id="Tasks">
      <TasksList tasks={tasks} setTasks={setTasks} />
      <FlowBoard tasks={tasks} />
    </div>
  );
}
