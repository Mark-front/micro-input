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
    steps: Step[]
}

export type Tasks = Task[]

