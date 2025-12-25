import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { API_CATALOG } from '../data/api-definitions';
import { invokeApi, type ApiResponse } from '../services/apiClient';
import { Play, RotateCcw, Activity, CheckCircle2, Terminal, Smartphone, CreditCard, FileBadge } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'sonner';
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
    setParams({});
    setResponse(null);
  }, [apiId]);

  if (!api) return <div className="text-white p-8">API Not Found</div>;

  const handleParamChange = (key: string, value: any) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    // Basic Validation logic could go here
    const apiKey = localStorage.getItem('kra_api_key') || undefined;
    
    try {
      // Simulate "Working" state for UI delight
      const minLoaderTime = new Promise(resolve => setTimeout(resolve, 1200));
      const apiCall = invokeApi(api.id, params, isMock, apiKey);
      
      const [res] = await Promise.all([apiCall, minLoaderTime]);
      
      setResponse(res);
      if (res.success) {
        toast.success(`Request Successful: ${res.latency}ms`);
      } else {
        toast.error('Request Failed');
      }
    } catch (err: any) {
      console.error(err);
      toast.error('System Error');
    } finally {
      setLoading(false);
    }
  };

  const getResultCard = () => {
    if (!response || !response.success || !response.data) return null;

    // Specialized visualizers for different categories
    if (api.id === 'mpesa-express') { // STK Push
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-900/20 border border-green-500/30 rounded-xl p-6 text-center"
        >
          <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <Smartphone className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">STK Push Sent</h3>
          <p className="text-green-200/80 mb-4">{response.data.ResponseDescription}</p>
          <div className="text-xs font-mono bg-black/30 p-3 rounded text-green-300">
             Req ID: {response.data.CheckoutRequestID}
          </div>
        </motion.div>
      );
    }

    if (api.category === 'Checkers' && api.id === 'pin-checker') {
       return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/30 rounded-xl p-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FileBadge className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <h3 className="text-sm uppercase tracking-widest text-blue-300 font-bold mb-1">Taxpayer Details</h3>
            <div className="h-px bg-blue-500/50 w-12 mb-6" />
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 uppercase">PIN Number</label>
                <p className="text-2xl font-mono text-white tracking-wider">{response.data.pin}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-xs text-slate-400 uppercase">Status</label>
                   <div className="flex items-center text-green-400 font-bold mt-1">
                     <CheckCircle2 className="w-4 h-4 mr-1.5" />
                     {response.data.status}
                   </div>
                </div>
                <div>
                   <label className="text-xs text-slate-400 uppercase">Station</label>
                   <p className="text-white mt-1">{response.data.station}</p>
                </div>
              </div>
               <div>
                <label className="text-xs text-slate-400 uppercase">Owner</label>
                <p className="text-xl font-semibold text-white">{response.data.taxpayerName}</p>
              </div>
            </div>
          </div>
        </motion.div>
       );
    }

    // Default JSON Card
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-8rem)]">
      <Toaster position="bottom-right" theme="dark" />
      
      {/* Configuration Column */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-5 flex flex-col h-full overflow-hidden"
      >
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
             <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/20">
               {api.category === 'M-PESA' ? <Smartphone className="text-blue-400" /> : <CreditCard className="text-blue-400" />}
             </div>
             <h1 className="text-2xl font-bold text-white">{api.name}</h1>
          </div>
          <p className="text-gray-400 text-sm">{api.description}</p>
        </div>

        <div className="flex-1 bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
          <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
            <h3 className="font-semibold text-gray-200 flex items-center">
              <Terminal className="w-4 h-4 mr-2 text-indigo-400" />
              Request Parameters
            </h3>
            <span className="text-xs font-mono text-gray-500">{api.method} {api.endpoint}</span>
          </div>
          
          <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
            <form id="api-form" onSubmit={handleSubmit} className="space-y-5">
              {api.parameters.map((param) => (
                <div key={param.name} className="group">
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide group-focus-within:text-blue-400 transition-colors">
                    {param.label} {param.required && <span className="text-red-400">*</span>}
                  </label>
                  <input
                    type={param.type === 'date' ? 'date' : param.type === 'number' ? 'number' : 'text'}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all outline-none"
                    placeholder={param.placeholder || `Enter ${param.label}`}
                    pattern={param.pattern}
                    required={param.required}
                    onChange={(e) => handleParamChange(param.name, e.target.value)}
                  />
                  {param.description && <p className="text-xs text-gray-600 mt-1">{param.description}</p>}
                </div>
              ))}
            </form>
          </div>

          <div className="p-6 border-t border-white/5 bg-white/5">
            <button
              form="api-form"
              type="submit"
              disabled={loading}
              className={clsx(
                "w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-bold text-white transition-all shadow-lg active:scale-[0.98]",
                loading 
                  ? "bg-gray-700/50 cursor-wait text-gray-400" 
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-900/20 hover:shadow-blue-900/40"
              )}
            >
              {loading ? (
                <>
                  <RotateCcw className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>Execute Request</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Result Column */}
      <div className="lg:col-span-7 flex flex-col h-full overflow-hidden space-y-6">
         {/* Visual Result Area */}
         <AnimatePresence mode="wait">
            {response && response.success && getResultCard() ? (
              <div key="visual-result">
                 {getResultCard()}
              </div>
            ) : null}
         </AnimatePresence>

         {/* Raw Console */}
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 bg-[#1e1e1e] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-black/50">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <span className="text-xs text-gray-400 ml-2 font-mono">Response Output</span>
              </div>
              {response && (
                <div className="flex items-center space-x-2">
                   <span className={clsx(
                     "text-xs px-2 py-0.5 rounded font-mono",
                     response.success ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                   )}>
                     Status: {response.success ? '200 OK' : 'FAILED'}
                   </span>
                   <span className="text-xs text-gray-600 font-mono">
                     {response.latency}ms
                   </span>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-auto p-4 font-mono text-sm relative">
              {!response && !loading && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-700 pointer-events-none">
                   <Activity className="w-16 h-16 opacity-10 mb-4" />
                   <p>Waiting for request...</p>
                 </div>
              )}
              
              {loading && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] z-10">
                   <div className="flex flex-col items-center">
                     <span className="loader-dots text-blue-500 text-3xl">...</span>
                     <p className="text-blue-400 text-xs mt-2 animate-pulse">Connecting to Gateway</p>
                   </div>
                 </div>
              )}

              {response && (
                 <motion.pre 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={clsx("whitespace-pre-wrap break-all", response.success ? "text-green-300" : "text-red-400")}
                 >
                   {JSON.stringify(response.data || response.error, null, 2)}
                 </motion.pre>
              )}
            </div>
         </motion.div>
      </div>
    </div>
  );
};

export default ApiDetail;

