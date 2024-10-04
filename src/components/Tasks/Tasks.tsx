import { useState, useEffect } from 'react';
import '../../styles/components/scope/Tasks.scss';
import { FlowBoard } from './FlowBoard';
import { TasksList } from './TasksList';


type Task = {
  id: number;
  name: string;
  description: string;
  state: 'to do' | 'doing' | 'done';
  position: number; // Para controlar a ordem
};

export function Tasks() {
  // Dados fictícios 
  const initialTasks: Task[] = [
    { id: 1, name: 'Task One', description: 'Description for Task One', state: 'to do', position: 1 },
    { id: 2, name: 'Task Two', description: 'Description for Task Two', state: 'doing', position: 2 },
    { id: 3, name: 'Task Three', description: 'Description for Task Three', state: 'done', position: 3 },
    { id: 4, name: 'Task Four', description: 'Description for Task Four', state: 'done', position: 4 },
    { id: 5, name: 'Task Five', description: 'Description for Task Five', state: 'done', position: 5 },
    { id: 6, name: 'Task Six', description: 'Description for Task Six', state: 'done', position: 6 },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [refreshKey, setRefreshKey] = useState(0); // Estado para controlar a re-renderização

  // monitorar alterações na lista de tarefas
  useEffect(() => {
    console.log('As tarefas foram atualizadas:', tasks);

    // Atualiza a chave de renderização sempre que as tarefas mudarem
    setRefreshKey(prevKey => prevKey + 1);
  }, [tasks]); // Este useEffect dispara sempre que o array 'tasks' mudar

  return (
    <div id="Tasks">
      <TasksList tasks={tasks} setTasks={setTasks} />
      
      {/* Forçando o FlowBoard a re-renderizar ao mudar a chave */}
      <FlowBoard key={refreshKey} tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
