export interface Task {
    id: number;
    text: string;
    status: 'pending' | 'completed' | 'on progress';
    date: string;
  }
  