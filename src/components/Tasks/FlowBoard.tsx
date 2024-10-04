import { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  Controls,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '../../styles/components/FlowBoard.scss';

type Task = {
  id: number;
  name: string;
  description: string;
  state: 'to do' | 'doing' | 'done';
  position: number;
};

type FlowBoardProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export function FlowBoard({ tasks, setTasks }: FlowBoardProps) {
  const initialNodes: Node[] = [];

  const taskStateColors: Record<'to do' | 'doing' | 'done', string> = {
    'to do': '#FF0000',
    'doing': '#0000FF',
    'done': '#00FF00',
  };

  // Definir a cor com base no estado da tarefa
  function getColorForTaskState(state: 'to do' | 'doing' | 'done'): string {
    return taskStateColors[state] || '#ffffff'; // Cor padrão
  }

  // Adicionando nós para cada tarefa
  tasks.forEach((task, index) => {
    initialNodes.push({
      id: `${index}`,
      data: { label: task.name },
      position: { x: 100 + index * 10, y: 100 + 2 * index * 35 },
      className: 'light',
      style: { backgroundColor: getColorForTaskState(task.state) },
    });
  });

  const initialEdges: Edge[] = [];

  tasks.forEach((task, index) => {
    if (index < tasks.length - 1) {
      initialEdges.push({
        id: `edge-${index}`,
        source: `${index}`,
        target: `${index + 1}`,
        animated: true,
      });
    }
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: any) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  return (
    <div id='FlowBoard'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        className='react-flow'
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
