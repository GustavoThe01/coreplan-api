import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { TaskStatus, TaskPriority } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { CheckCircle2, Clock, AlertTriangle, ListTodo } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { tasks } = useTaskContext();

  // Calculate stats
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === TaskStatus.CONCLUIDA).length;
  const pending = tasks.filter(t => t.status === TaskStatus.PENDENTE).length;
  const highPriority = tasks.filter(t => t.priority === TaskPriority.ALTA && t.status === TaskStatus.PENDENTE).length;

  const statusData = [
    { name: 'Pendente', value: pending },
    { name: 'Concluída', value: completed },
  ];

  const priorityData = [
    { name: 'Alta', count: tasks.filter(t => t.priority === TaskPriority.ALTA).length },
    { name: 'Média', count: tasks.filter(t => t.priority === TaskPriority.MEDIA).length },
    { name: 'Baixa', count: tasks.filter(t => t.priority === TaskPriority.BAIXA).length },
  ];

  const COLORS = ['#F59E0B', '#10B981']; // Yellow, Green

  const StatCard = ({ title, value, icon: Icon, colorClass }: any) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${colorClass}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-semibold text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Visão geral do gerenciamento de tarefas</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total de Tarefas" value={total} icon={ListTodo} colorClass="bg-indigo-500" />
        <StatCard title="Pendentes" value={pending} icon={Clock} colorClass="bg-yellow-500" />
        <StatCard title="Concluídas" value={completed} icon={CheckCircle2} colorClass="bg-green-500" />
        <StatCard title="Prioridade Alta" value={highPriority} icon={AlertTriangle} colorClass="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Status das Tarefas</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Distribuição por Prioridade</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};