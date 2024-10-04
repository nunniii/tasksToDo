import { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/components/TasksList.scss';
import { ThreeStateToggle } from './ThreeStateToggle';
import { TaskStateChart } from './TaskStateChart';

type Task = {
  id: number;
  name: string;
  description: string;
  state: 'to do' | 'doing' | 'done';
  position: number;
};

type TasksListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export function TasksList({ tasks, setTasks }: TasksListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Abrir o modal
  const openModal = (task: Task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  // Fechar modal
  const closeModal = () => {
    setIsOpen(false);
    setSelectedTask(null);
  };

  // Função para mover a tarefa para cima
  const moveUp = (index: number) => {
    if (index === 0) return; // Se já estiver no topo
    const newTasks = [...tasks];
    [newTasks[index], newTasks[index - 1]] = [newTasks[index - 1], newTasks[index]]; // Troca a posição
    setTasks(newTasks);
  };

  // Função para mover a tarefa para baixo
  const moveDown = (index: number) => {
    if (index === tasks.length - 1) return; // Se já estiver na parte inferior
    const newTasks = [...tasks];
    [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]]; // Troca a posição
    setTasks(newTasks);
  };

  // Função para alternar o estado da tarefa
  const handleToggleChange = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].state =
      newTasks[index].state === 'to do'
        ? 'doing'
        : newTasks[index].state === 'doing'
        ? 'done'
        : 'to do';

    setTasks(newTasks); // Isso garantirá que FlowBoard também seja re-renderizado
  };

  return (
    <div id='TasksList'>
      <div className='controls flex justify-between items-center'>
        <button>+ Nova tarefa</button>
        <TaskStateChart tasks={tasks} />
      </div>
      <ul className='scrollable-container'>
        <AnimatePresence>
          {tasks.map((task, index) => (
            <motion.li
              key={task.id}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className='cardTask' onClick={() => openModal(task)}>
                <div>
                  <h1>{task.name}</h1>
                  <p>{task.description}</p>
                </div>
              </div>

              {/* Componente de alternância de estado */}
              <ThreeStateToggle
                initialState={task.state}
                onToggle={() => handleToggleChange(index)} // Quando alternar, altera o estado
              />

              <div className='task-controls'>
                <button onClick={() => moveUp(index)} disabled={index === 0}>
                  <FaChevronUp />
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === tasks.length - 1}
                >
                  <FaChevronDown />
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Modal */}
      {selectedTask && (
        <div className="modal">
          {/* Exibir informações da tarefa selecionada */}
        </div>
      )}
    </div>
  );
}
