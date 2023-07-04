export interface Step {
    'id': number,
    'pause': number,
    'question': {
        'audio': null | string,
        'text': string | null
    },
    'time': number,
    'answer': null | string
}

export interface Task {
    id: string,
    stepsId: string
}

export type Tasks = Task[]

