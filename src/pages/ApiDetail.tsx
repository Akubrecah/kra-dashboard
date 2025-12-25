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

  if (!api) return <div className="text-slate-900 p-8 font-bold text-xl">API Not Found</div>;

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
          className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center shadow-lg"
        >
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Smartphone className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">STK Push Sent</h3>
          <p className="text-green-700/80 mb-4">{response.data.ResponseDescription}</p>
          <div className="text-xs font-mono bg-white p-3 rounded-lg text-green-700 border border-green-200">
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
          className="bg-white border border-slate-100 rounded-2xl p-8 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <FileBadge className="w-40 h-40 text-blue-600" />
          </div>
          <div className="relative z-10">
            <h3 className="text-sm uppercase tracking-widest text-[#ff4d6d] font-bold mb-1">Taxpayer Details</h3>
            <div className="h-1 bg-[#ff4d6d] w-12 mb-6 rounded-full" />
            
            <div className="space-y-6">
              <div>
                <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">PIN Number</label>
                <p className="text-3xl font-mono text-slate-900 font-bold tracking-tight">{response.data.pin}</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                   <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Status</label>
                   <div className="flex items-center text-green-600 font-bold mt-1 bg-green-50 px-3 py-1 rounded-full w-fit">
                     <CheckCircle2 className="w-4 h-4 mr-1.5" />
                     {response.data.status}
                   </div>
                </div>
                <div>
                   <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Station</label>
                   <p className="text-slate-700 mt-1 font-medium">{response.data.station}</p>
                </div>
              </div>
               <div>
                <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Owner</label>
                <p className="text-xl font-bold text-slate-900">{response.data.taxpayerName}</p>
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
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-3">
             <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
               {api.category === 'M-PESA' ? <Smartphone className="text-green-600 w-6 h-6" /> : <CreditCard className="text-[#ff4d6d] w-6 h-6" />}
             </div>
             <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{api.name}</h1>
          </div>
          <p className="text-slate-500 text-base leading-relaxed">{api.description}</p>
        </div>

        <div className="card-modern p-1 flex-1 flex flex-col">
          <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 flex items-center">
              <Terminal className="w-5 h-5 mr-2 text-slate-400" />
              Request Parameters
            </h3>
            <span className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">{api.method} {api.endpoint}</span>
          </div>
          
          <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
            <form id="api-form" onSubmit={handleSubmit} className="space-y-6">
              {api.parameters.map((param) => (
                <div key={param.name} className="group">
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">
                    {param.label} {param.required && <span className="text-[#ff4d6d]">*</span>}
                  </label>
                  <input
                    type={param.type === 'date' ? 'date' : param.type === 'number' ? 'number' : 'text'}
                    className="input-modern"
                    placeholder={param.placeholder || `Enter ${param.label}`}
                    pattern={param.pattern}
                    required={param.required}
                    onChange={(e) => handleParamChange(param.name, e.target.value)}
                  />
                  {param.description && <p className="text-xs text-slate-400 mt-2 font-medium">{param.description}</p>}
                </div>
              ))}
            </form>
          </div>

          <div className="p-8 border-t border-slate-50">
            <button
              form="api-form"
              type="submit"
              disabled={loading}
              className={clsx(
                "w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-full font-bold text-white transition-all shadow-lg active:scale-[0.98]",
                loading 
                  ? "bg-slate-200 cursor-wait text-slate-400 shadow-none" 
                  : "btn-coral"
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
            className="flex-1 bg-[#1e1e1e] rounded-[2rem] shadow-xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 bg-[#252526] border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-xs text-gray-400 ml-2 font-mono font-bold">Response Output</span>
              </div>
              {response && (
                <div className="flex items-center space-x-3">
                   <span className={clsx(
                     "text-xs px-2 py-1 rounded font-mono font-bold",
                     response.success ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                   )}>
                     Status: {response.success ? '200 OK' : 'FAILED'}
                   </span>
                   <span className="text-xs text-gray-500 font-mono">
                     {response.latency}ms
                   </span>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-auto p-6 font-mono text-sm relative custom-scrollbar">
              {!response && !loading && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-700 pointer-events-none">
                   <Activity className="w-12 h-12 opacity-10 mb-4" />
                   <p className="font-medium opacity-50">Waiting for request...</p>
                 </div>
              )}
              
              {loading && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] z-10">
                   <div className="flex flex-col items-center">
                     <span className="loader-dots text-[#ff4d6d] text-4xl font-bold tracking-widest">...</span>
                     <p className="text-gray-400 text-xs mt-4 font-bold tracking-wide uppercase">Processing</p>
                   </div>
                 </div>
              )}

              {response && (
                 <motion.pre 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={clsx("whitespace-pre-wrap break-all leading-relaxed", response.success ? "text-green-300" : "text-red-400")}
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

