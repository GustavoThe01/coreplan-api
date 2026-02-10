import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { User } from '../types';
import { Plus, Trash2, User as UserIcon, Mail, Briefcase } from 'lucide-react';

export const Users: React.FC = () => {
  const { users, addUser, deleteUser, tasks } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New User Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({ name, email, role });
    setIsModalOpen(false);
    setName('');
    setEmail('');
    setRole('');
  };

  const getTaskCount = (userId: string) => {
    return tasks.filter(t => t.userId === userId).length;
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usuários</h1>
          <p className="mt-1 text-sm text-gray-500">Gerencie a equipe e atribuições</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Novo Usuário
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div key={user.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xl font-bold">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900 truncate">{user.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{user.role}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm space-y-2">
                <div className="flex items-center text-gray-500">
                  <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500">
                        <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <span>{getTaskCount(user.id)} tarefas</span>
                    </div>
                    <button 
                        onClick={() => {
                            if(window.confirm(`Remover ${user.name}? Tarefas serão desatribuídas.`)) {
                                deleteUser(user.id);
                            }
                        }}
                        className="text-red-400 hover:text-red-600 text-sm font-medium"
                    >
                        Remover
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 overflow-y-auto">
           <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
             <div className="fixed inset-0 transition-opacity" onClick={() => setIsModalOpen(false)}>
               <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
             </div>
             <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
               <form onSubmit={handleSubmit} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                 <h3 className="text-lg font-medium text-gray-900 mb-4">Adicionar Usuário</h3>
                 <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700">Nome</label>
                     <input
                       type="text"
                       required
                       value={name}
                       onChange={e => setName(e.target.value)}
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700">Email</label>
                     <input
                       type="email"
                       required
                       value={email}
                       onChange={e => setEmail(e.target.value)}
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700">Cargo</label>
                     <input
                       type="text"
                       required
                       value={role}
                       onChange={e => setRole(e.target.value)}
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     />
                   </div>
                 </div>
                 <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                   <button
                     type="submit"
                     className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                   >
                     Adicionar
                   </button>
                   <button
                     type="button"
                     onClick={() => setIsModalOpen(false)}
                     className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                   >
                     Cancelar
                   </button>
                 </div>
               </form>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};