import React from 'react';

// Definindo a estrutura da tarefa
type Task = {
  id: number;
  name: string;
  description: string;
  state: 'to do' | 'doing' | 'done';
  position: number;
};

type TaskStateChartProps = {
  tasks: Task[];
};

export const TaskStateChart: React.FC<TaskStateChartProps> = ({ tasks }) => {


  // Função para contar os estados
  function countTaskStates(tasks: Task[]) {
    return tasks.reduce(
      (acc, task) => {
        acc[task.state] = (acc[task.state] || 0) + 1;
        return acc;
      },
      { 'to do': 0, 'doing': 0, 'done': 0 } as { [key: string]: number }
    );
  }

  // Função para calcular a porcentagem de cada estado
  const calculateStatePercentages = () => {
    const totalTasks = tasks.length;
    if (totalTasks === 0) return { 'To Do': 0, 'Doing': 0, 'Done': 0 }; // Para evitar divisão por zero

    const taskStateCounts = countTaskStates(tasks);
    console.log(tasks, taskStateCounts)

    return {
      // aqui dividi por 10 pois, o width padrão é class 'w-40', equivalente a 10rem.
      'To Do': taskStateCounts['to do'] * 10 / totalTasks,
      'Doing': taskStateCounts['doing'] * 10 / totalTasks,
      'Done': taskStateCounts['done'] * 10 / totalTasks,
    };
  };

  const percentages = calculateStatePercentages();

  return (
    <div className="flex w-40">
      <div className="h-2 bg-red-500" style={{ width: `${percentages['To Do']}rem` }}>f</div>
      <div className="h-2 bg-blue-500" style={{ width: `${percentages['Doing']}rem` }}>f</div>
      <div className="h-2 bg-green-500" style={{ width: `${percentages['Done']}rem` }}>f</div>
    </div>
  );
};
