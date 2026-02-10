import React, { useState } from 'react';
import { javaFiles } from './codebase';
import { FileCode, FolderOpen, Copy, Check, Menu, Terminal } from 'lucide-react';

const App = () => {
  const [activeFile, setActiveFile] = useState(javaFiles[0]);
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Group files by path for the sidebar
  const groupedFiles = javaFiles.reduce((acc, file) => {
    const path = file.path;
    if (!acc[path]) acc[path] = [];
    acc[path].push(file);
    return acc;
  }, {} as Record<string, typeof javaFiles>);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-300 font-sans overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-gray-950 border-r border-gray-800 flex-shrink-0 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="font-bold text-gray-100 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-green-500" />
            CorePlan Backend
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
           {/* Structure Explanation */}
           <div className="text-xs text-gray-500 mb-4 bg-gray-900 p-3 rounded border border-gray-800">
              <p className="font-semibold text-gray-400 mb-1">Architecture:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Spring Boot 3.2.2</li>
                <li>Java 17 (Records)</li>
                <li>Spring Data JPA</li>
                <li>ProblemDetail (Error Handling)</li>
              </ul>
           </div>

           {Object.entries(groupedFiles).map(([path, files]) => (
             <div key={path} className="space-y-1">
               <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                 <FolderOpen className="w-3 h-3" />
                 {path.replace('src/main/java/com/coreplan/', '.../')}
               </div>
               <div className="pl-4 border-l border-gray-800 ml-1.5 space-y-1 mt-1">
                 {files.map(file => (
                   <button
                     key={file.name}
                     onClick={() => setActiveFile(file)}
                     className={`w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 transition-colors ${
                       activeFile.name === file.name 
                         ? 'bg-blue-900/30 text-blue-400' 
                         : 'hover:bg-gray-800 text-gray-400 hover:text-gray-200'
                     }`}
                   >
                     <FileCode className="w-4 h-4" />
                     {file.name}
                   </button>
                 ))}
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* Main Content (Code Editor Look) */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 hover:bg-gray-800 rounded text-gray-400"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-sm text-gray-400 font-mono">
              {activeFile.path}/{activeFile.name}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded text-xs font-medium transition-colors border border-gray-700"
          >
            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied!' : 'Copy File'}
          </button>
        </div>

        <div className="flex-1 overflow-auto bg-[#0d1117] p-6">
          <pre className="font-mono text-sm leading-relaxed">
            <code className="block text-gray-300">
              {activeFile.content}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default App;