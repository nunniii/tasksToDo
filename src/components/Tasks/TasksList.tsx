import { useState } from 'react';
import { FaChevronUp, FaChevronDown, FaTrash } from 'react-icons/fa'; // Ícone de lixeira
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/components/TasksList.scss';
import { ThreeStateToggle } from './ThreeStateToggle';
import { TaskStateChart } from './TaskStateChart';

import '../../styles/components/ModalNewTask.scss'

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
  // Estados para controlar o modal e os inputs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  // Função para deletar uma tarefa pelo ID
  const deleteTask = (id: number) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks); // Atualiza o array de tarefas
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

  // Função para abrir/fechar o modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewTaskName('');
    setNewTaskDescription('');
  };

  // Função para adicionar uma nova tarefa
  const addNewTask = () => {
    if (newTaskName.trim() === '' || newTaskDescription.trim() === '') return; // Validação simples

    const newTask: Task = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1, // Gerar um novo ID
      name: newTaskName,
      description: newTaskDescription,
      state: 'to do', // Tarefa sempre começa com estado "to do"
      position: 1 // A nova tarefa sempre começa na posição 1
    };

    // Atualizar as posições das tarefas existentes
    const updatedTasks = [
      newTask,
      ...tasks.map(task => ({ ...task, position: task.position + 1 })) // Atualiza a posição das tarefas
    ];

    setTasks(updatedTasks); // Adiciona a nova tarefa e atualiza as posições
    closeModal(); // Fecha o modal após adicionar a tarefa
  };

  return (
    <div id='TasksList'>
      <div className='controls flex justify-between items-center'>
        <button onClick={openModal}>+ Nova tarefa</button>
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
              <div className='cardTask'>
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
                <button id='MovUp' onClick={() => moveUp(index)} disabled={index === 0}>
                  <FaChevronUp />
                </button>
                <button id='MovDown' onClick={() => moveDown(index)} disabled={index === tasks.length - 1}>
                  <FaChevronDown />
                </button>

                {/* Botão Deletar */}
                <button id='DeleteTask' className='ml-1' onClick={() => deleteTask(task.id)}>
                  <FaTrash /> {/* Ícone de lixeira */}
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Modal para adicionar uma nova tarefa */}
      {isModalOpen && (
        <div id="ModalNewTask" className="modal-overlay">
          <div className="modal-content">
            <h2>Criar Nova Tarefa</h2>

            <input
              type="text"
              placeholder="Nome da tarefa"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />

            <textarea
              placeholder="Descrição da tarefa"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={addNewTask}>Adicionar Tarefa</button>
              <button onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
