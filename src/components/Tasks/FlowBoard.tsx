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
};

export function FlowBoard({ tasks }: FlowBoardProps) {
  const initialNodes: Node[] = [
   
  ];

  // Adicionando nós para cada tarefa
  tasks.forEach((task, index) => {
    initialNodes.push({
      id: `${index}`,
      data: { label: task.name },
      position: { x: 100 + index * 10, y: 100 + (2*index) * 35 }, // Ajuste a posição conforme necessário
      className: 'light',
    });
  });

  const initialEdges: Edge[] = [
  ];

  tasks.forEach((task, index) => {
      initialEdges.push({
        id: `${index}`,
        source: `${index}`,
        target: `${index + 1}`,
        animated: true,
      })
  
    }
  )


  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  return (
    <div id="FlowBoard">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        className="react-flow"
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};
