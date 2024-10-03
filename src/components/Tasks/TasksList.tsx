import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import '../../styles/components/TasksList.scss';

import { ThreeStateToggle } from './ThreeStateToggle';

type Task = {
  id: number;
  title: string;
  description: string;
};

export function TasksList() {
  const tasks: Task[] = [
    { id: 1, title: 'lalala', description: 'DSTQQSS' },
    { id: 2, title: 'uwuwuuw', description: 'DSTQQSS' },
    { id: 3, title: 'hellohellohello', description: 'DSTQQSS' },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const openModal = (task: Task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedTask(null);
  };








  return (
      <div id='TasksList'>
        <div className='controls'>
          <button>+ Nova tarefa</button>

        </div>
        <ul>

 
          {tasks.map((task) => (
            <li key={task.id}>
              <div className="cardTask" onClick={() => openModal(task)}>
                <div>
                  <h1>{task.title}</h1>
                  <p>{task.description}</p>
                </div>
              </div>
                <ThreeStateToggle />
            </li>
          ))}
        </ul>

      {/* Modal */}
      {selectedTask && (
        <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
              <DialogTitle className="font-bold">Configurações da tarefa</DialogTitle>
              <Description>
                Esta é a configuração da tarefa <strong>{selectedTask.title}</strong>.
              </Description>
              <p>
                Descrição: {selectedTask.description}
              </p>
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
