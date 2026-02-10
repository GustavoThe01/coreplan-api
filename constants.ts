import { Task, TaskPriority, TaskStatus, User } from './types';

export const INITIAL_USERS: User[] = [
  { id: '1', name: 'Ana Silva', email: 'ana.silva@company.com', role: 'Frontend Dev' },
  { id: '2', name: 'Carlos Santos', email: 'carlos.santos@company.com', role: 'Backend Dev' },
  { id: '3', name: 'Mariana Costa', email: 'mariana.costa@company.com', role: 'Product Owner' },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: '101',
    title: 'Implementar autenticação JWT',
    description: 'Configurar Spring Security e gerar tokens JWT para login.',
    status: TaskStatus.PENDENTE,
    priority: TaskPriority.ALTA,
    userId: '2',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: '102',
    title: 'Criar dashboard de tarefas',
    description: 'Desenvolver a interface principal com React e Tailwind.',
    status: TaskStatus.CONCLUIDA,
    priority: TaskPriority.MEDIA,
    userId: '1',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    completedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '103',
    title: 'Revisar documentação da API',
    description: 'Atualizar Swagger com os novos endpoints de usuários.',
    status: TaskStatus.PENDENTE,
    priority: TaskPriority.BAIXA,
    userId: '2',
    createdAt: new Date().toISOString(),
  },
];