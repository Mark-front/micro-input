export interface Step {
    'id': string,
    'pause': number,
    'question': {
        'audio': null | string,
        'text': string | null
    },
    'timeForAnswer': number,
    'answer': null | string
}

export interface Task {
    id: string,
    stepsId: string
}

export interface Answer {
    id: string,
    stepId: string,
    taskId: string,
    audio: string
}

export type Tasks = Task[]

