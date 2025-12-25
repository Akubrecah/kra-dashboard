import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { API_CATALOG } from '../data/api-definitions';
import { invokeApi, type ApiResponse } from '../services/apiClient';
import { Play, RefreshCw, AlertTriangle, Code, Server } from 'lucide-react';
import clsx from 'clsx';

interface DashboardContext {
  isMock: boolean;
}

const ApiDetail: React.FC = () => {
  const { apiId } = useParams();
  const { isMock } = useOutletContext<DashboardContext>();
  const api = API_CATALOG.find(a => a.id === apiId);

  const [params, setParams] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  useEffect(() => {
    // Reset state when API changes
    setParams({});
    setResponse(null);
  }, [apiId]);

  if (!api) return <div className="text-white">API Not Found</div>;

  const handleParamChange = (key: string, value: any) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    const apiKey = localStorage.getItem('kra_api_key') || undefined;
    
    try {
      const res = await invokeApi(api.id, params, isMock, apiKey);
      setResponse(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
      {/* Left Column: Configuration */}
      <div className="flex flex-col space-y-6 overflow-y-auto pr-2">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{api.name}</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
            <span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-600 font-mono text-xs">{api.method}</span>
            <span className="font-mono">{api.endpoint}</span>
          </div>
          <p className="text-gray-300">{api.description}</p>
        </div>

        {isMock && (
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-400">Simulation Mode Active</h4>
              <p className="text-xs text-blue-300/70 mt-1">
                Requests will return static mock data. No network calls are made to government servers.
                Switch to 'LIVE' in the top bar to make real requests.
              </p>
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700 bg-gray-800/50">
            <h3 className="text-lg font-semibold text-white">Parameters</h3>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {api.parameters.map((param) => (
              <div key={param.name}>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  {param.label} {param.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={param.type === 'date' ? 'date' : param.type === 'number' ? 'number' : 'text'}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={`Enter ${param.label}`}
                  required={param.required}
                  onChange={(e) => handleParamChange(param.name, e.target.value)}
                />
              </div>
            ))}
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={clsx(
                  "w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-bold text-white transition-all shadow-lg",
                  loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/20"
                )}
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    <span>Send Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column: Console */}
      <div className="flex flex-col bg-[#1e1e1e] rounded-xl border border-gray-700 shadow-2xl overflow-hidden h-full">
        <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-gray-800">
          <div className="flex items-center space-x-2 text-sm">
             <Code className="w-4 h-4 text-gray-500" />
             <span className="text-gray-300 font-medium">Response Console</span>
          </div>
          {response && (
             <span className={clsx(
               "text-xs px-2 py-0.5 rounded",
               response.success ? "bg-green-900/50 text-green-400" : "bg-red-900/50 text-red-400"
             )}>
               {response.latency}ms
             </span>
          )}
        </div>
        
        <div className="flex-1 overflow-auto p-4 font-mono text-sm">
          {!response && !loading && (
             <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4">
               <Server className="w-12 h-12 opacity-20" />
               <p>Ready to dispatch request...</p>
             </div>
          )}

          {loading && (
             <div className="h-full flex flex-col items-center justify-center text-gray-500">
               <div className="w-2 h-24 bg-gradient-to-b from-blue-500 to-transparent opacity-50 blur-sm animate-pulse mb-8" />
               <p className="animate-pulse">Communicating with {isMock ? 'Mock Server' : 'eCitizen Gateway'}...</p>
             </div>
          )}

          {response && (
            <div className="space-y-4">
               <div className="flex items-center space-x-2 mb-2">
                 <span className={clsx(
                   "text-xs font-bold px-1.5 py-0.5 rounded",
                   response.success ? "bg-green-500 text-black" : "bg-red-500 text-black"
                 )}>
                   {response.success ? '200 OK' : 'ERROR'}
                 </span>
                 <span className="text-xs text-gray-500">Source: {response.source}</span>
               </div>
               <pre className={clsx("whitespace-pre-wrap break-all", response.success ? "text-green-300" : "text-red-300")}>
                 {JSON.stringify(response.data || response.error, null, 2)}
               </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiDetail;
