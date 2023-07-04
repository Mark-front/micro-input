export interface Task {
    'id': number,
    'pause': number,
    'question': {
        'audio': null | string,
        'text': string | null
    },
    'time': number,
    'answer': null | string
}

export type Tasks = Task[]

