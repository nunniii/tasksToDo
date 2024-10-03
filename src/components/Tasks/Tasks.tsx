import '../../styles/components/scope/Tasks.scss'

import { FlowBoard } from './FlowBoard'
import { TasksList } from './TasksList'

export function Tasks() {
    return (
        <div id="Tasks">
            <TasksList />
            <FlowBoard />
        </div>
    )
}