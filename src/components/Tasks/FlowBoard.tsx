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

export function FlowBoard({ tasks }: FlowBoardProps) {
  const initialNodes: Node[] = [];

  const taskStateColors: Record<'to do' | 'doing' | 'done', string> = {
    'to do': '#EB3A1C',
    'doing': '#4D84EB',
    'done': '#B7EB42',
  };

  // Definir a cor com base no estado da tarefa
  function getColorForTaskState(state: 'to do' | 'doing' | 'done'): string {
    return taskStateColors[state] || '#ffffff'; // Cor padrão
  }

  // Adicionando nós para cada tarefa
  let n = 0;
  tasks.forEach((task, index) => {
    // Alterna entre 100 e 10 com base no valor de n
    const nn = n === 0 ? 200 : 10;
  
    // Adiciona o nó à lista
    initialNodes.push({
      id: `${index}`,
      data: { label: task.name },
      position: { x: nn + index * 10, y: 100 + 2 * index * 35 },
      className: 'light',
      style: { backgroundColor: getColorForTaskState(task.state) },
    });
  
    // Alterna o valor de n entre 0 e 1
    n = 1 - n;
  });
  const initialEdges: Edge[] = [];

  tasks.forEach((task, index) => {
    if (index < tasks.length - 1) {
      initialEdges.push({
        id: `edge-${index}`,
        source: `${index}`,
        target: `${index + 1}`,
        animated: false,
      });
    }
    function i(t:any){
      t = t;
      return;
    } i(task);
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  function i(setNodes:any){
    setNodes = setNodes;
    return;
  } i(setNodes);

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
