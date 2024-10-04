import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/components/TasksList.scss';
import { ThreeStateToggle } from './ThreeStateToggle';

import { TaskStateChart } from './TaskStateChart';


// estrutura da tarefa
type Task = {
  id: number;
  name: string;
  description: string;
  state: 'to do' | 'doing' | 'done';
  position: number; // Para controlar a ordem
};

type TasksListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export function TasksList({ tasks, setTasks }: TasksListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // abrir o modal
  const openModal = (task: Task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  // fechar modal
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







  const handleToggleChange = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].state = newTasks[index].state === 'to do' ? 'doing' : newTasks[index].state === 'doing' ? 'done' : 'to do';
    setTasks(newTasks);
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
              transition={{ duration: 0.3, ease: "easeInOut" }} 
            >
              <div className="cardTask" onClick={() => openModal(task)}>
                <div>
                  <h1>{task.name}</h1>
                  <p>{task.description}</p>
                </div>
              </div>

              <ThreeStateToggle 
  initialState={task.state} // Pass the current task state as initialState
  onToggle={() => handleToggleChange(index)} 
/>

              <div className="task-controls">
                <button onClick={() => moveUp(index)} disabled={index === 0}>
                  <FaChevronUp />
                </button>
                <button onClick={() => moveDown(index)} disabled={index === tasks.length - 1}>
                  <FaChevronDown />
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Modal */}
      {selectedTask && (
        <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
              <DialogTitle className="font-bold">Configurações da tarefa</DialogTitle>
              <Description>
                Esta é a configuração da tarefa <strong>{selectedTask.name}</strong>.
              </Description>
              <p>Descrição: {selectedTask.description}</p>
              <p>Estado: {selectedTask.state}</p>
              <div className="flex gap-4">
                <button onClick={closeModal}>Cancelar</button>
                <button onClick={closeModal}>Salvar</button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </div>
  );
}
