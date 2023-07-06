export interface Step {
    'id': string,
    'pause': number,
    'question': {
        'audio': string,
        'text': string
    },
    'timeForAnswer': number,
    'answer': null | string
}

export interface Task {
    id: string,
    steps: Step[]
}

export type Tasks = Task[]

