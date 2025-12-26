import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { API_CATALOG } from '../data/api-definitions';
import { invokeApi, type ApiResponse } from '../services/apiClient';
import { Play, RotateCcw, Activity, Smartphone, FileBadge, Terminal, Shield, Download } from 'lucide-react';
import { generateKraCertificate } from '../utils/pdfGenerator';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'sonner';
import clsx from 'clsx';

interface DashboardContext {
  isMock: boolean;
}

// --- Visualizer Components ---
const VisualizerSection = ({ apiId, result, loading }: { apiId: string, result: any, loading: boolean }) => {
  if (apiId === 'mpesa-express') {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-8 font-mono">
        <div className="w-[300px] bg-[#020617] border-2 border-[#00ff41] p-4 relative shadow-[0_0_20px_rgba(0,255,65,0.2)]">
          {/* Signal bars */}
           <div className="flex justify-between text-[#00ff41] text-[10px] mb-8 border-b border-[#00ff41]/30 pb-2">
             <span>SIGNAL: STRONG</span>
             <span>ENCRYPTED_GSM</span>
           </div>
           
           <AnimatePresence>
             {(result || loading) && (
               <motion.div 
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0 }}
                 className="bg-[#0f172a] border border-[#00ff41] p-4 relative overflow-hidden"
               >
                 <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00ff41] animate-pulse" />
                 
                 <div className="flex items-center space-x-3 mb-4">
                   <div className="w-8 h-8 bg-[#00ff41]/20 flex items-center justify-center border border-[#00ff41]">
                     <span className="font-bold text-[#00ff41]">M</span>
                   </div>
                   <div>
                     <p className="text-[10px] text-[#00ff41] uppercase tracking-wider">Incoming Request</p>
                     <p className="text-white font-bold text-xs">M-PESA SECURE GATEWAY</p>
                   </div>
                 </div>
                 
                 <p className="text-[#94a3b8] text-xs mb-4 border-l-2 border-[#00ff41] pl-3">
                   Confirm payment of <span className="text-white">Ksh {result?.Amount || '100'}</span> to KRA_TAX_COLLECTOR?
                 </p>
                 
                 <div className="flex space-x-2">
                    <div className="flex-1 bg-[#0f172a] border border-[#00ff41]/50 py-2 text-center text-[#00ff41] text-[10px] cursor-pointer hover:bg-[#00ff41] hover:text-black">
                      [ AUTHENTICATE ]
                    </div>
                    <div className="flex-1 bg-[#0f172a] border border-[#ff003c]/50 py-2 text-center text-[#ff003c] text-[10px] cursor-pointer hover:bg-[#ff003c] hover:text-white">
                      [ ABORT ]
                    </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
           
           {!result && !loading && (
             <div className="text-center py-10 opacity-50">
               <div className="w-16 h-16 border border-dashed border-[#00ff41] rounded-full mx-auto mb-4 flex items-center justify-center animate-spin-slow">
                 <Activity className="text-[#00ff41]" />
               </div>
               <p className="text-[#00ff41] text-xs animate-pulse">WAITING FOR SIGNAL...</p>
             </div>
           )}
        </div>
      </div>
    );
  }

  if (apiId === 'pin-checker') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-8 font-mono">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          key={result ? 'result' : 'empty'}
          className={clsx(
            "w-[400px] border relative p-6 bg-[#020617]",
            result ? "border-[#00ff41]" : "border-[#008f11]/30"
          )}
        >
          {/* Decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-current text-[#00ff41]"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-current text-[#00ff41]"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-current text-[#00ff41]"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-current text-[#00ff41]"></div>

          <div className="text-center mb-8">
             <Shield className={clsx("w-12 h-12 mx-auto mb-4", result ? "text-[#00ff41]" : "text-[#008f11]/50")} />
             <h3 className="text-lg font-bold text-white tracking-[0.2em] uppercase">Identity Verification</h3>
          </div>
          
          {result ? (
            <div className="space-y-4">
              <div className="border border-[#00ff41]/50 bg-[#00ff41]/5 p-4">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="block text-[#008f11] uppercase">Subject</span>
                    <span className="text-white font-bold">{result.taxpayerName}</span>
                  </div>
                  <div>
                    <span className="block text-[#008f11] uppercase">PIN ID</span>
                    <span className="text-[#00ff41] font-bold">{result.pin}</span>
                  </div>
                   <div>
                    <span className="block text-[#008f11] uppercase">Status</span>
                    <span className="text-[#00ff41] font-bold animate-pulse">ACTIVE / CLEARED</span>
                  </div>
                  <div>
                    <span className="block text-[#008f11] uppercase">Obligation</span>
                    <span className="text-white">VAT_INCOME</span>
                  </div>
                </div>
              </div>

              <div className="text-center text-[10px] text-[#00ff41] mb-2">
                &gt;&gt; RECORD VERIFIED IN MAINFRAME
              </div>
            </div>
          ) : (
             <div className="text-center py-8 border border-dashed border-[#008f11]/30">
               <span className="text-[#008f11] text-xs blink">_ INSERT_DATA_STREAM</span>
             </div>
          )}
        </motion.div>
      </div>
    );
  }

  // Default Console View
  return (
    <div className="h-full flex flex-col bg-[#020617] font-mono text-xs border border-[#008f11]">
        <div className="px-4 py-2 bg-[#0f172a] border-b border-[#008f11] flex justify-between">
           <span className="text-[#008f11]">&gt;&gt; TERMINAL_OUTPUT</span>
           <div className="flex space-x-2">
             <span className="w-2 h-2 bg-[#ff003c] rounded-full"></span>
             <span className="w-2 h-2 bg-[#00f3ff] rounded-full"></span>
           </div>
        </div>
        <div className="flex-1 p-4 overflow-auto custom-scrollbar text-[#00ff41]">
           {loading ? (
             <div className="animate-pulse">
               &gt; INITIATING REQUEST...<br/>
               &gt; HANDSHAKE... OK<br/>
               &gt; AWAITING BYTES...
             </div>
           ) : result ? (
             <pre className="whitespace-pre-wrap font-mono">
               {JSON.stringify(result, null, 2)}
             </pre>
           ) : (
             <div className="opacity-50">
               &gt; SYSTEM READY.<br/>
               &gt; WAITING FOR COMMAND.
             </div>
           )}
        </div>
    </div>
  );
};

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

  if (!api) return <div className="text-[#ff003c] p-8 font-mono text-xl">ERROR: API_DEF_NOT_FOUND</div>;

  const handleParamChange = (key: string, value: any) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    const apiKey = localStorage.getItem('kra_api_key') || undefined;
    
    try {
      const minLoaderTime = new Promise(resolve => setTimeout(resolve, 800));
      const apiCall = invokeApi(api.id, params, isMock, apiKey);
      const [res] = await Promise.all([apiCall, minLoaderTime]);
      setResponse(res);
      if (res.success) toast.success(`ACK RECEIVED: ${res.latency}ms`);
      else toast.error('NACK: CONNECTION_REFUSED');
    } catch (err: any) {
      console.error(err);
      toast.error('FATAL: SYSTEM_CRASH');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 lg:p-8 h-full flex flex-col font-mono text-[#e2e8f0]">
       <Toaster position="bottom-right" theme="dark" toastOptions={{
         style: { background: '#020617', border: '1px solid #00ff41', color: '#00ff41', fontFamily: 'monospace' }
       }} />
       
      <div className="flex items-center space-x-4 mb-8 border-b border-[#008f11] pb-6">
        <div className="w-12 h-12 flex items-center justify-center border border-[#00ff41] bg-[#00ff41]/10">
           {api.category === 'M-PESA' ? <Smartphone className="text-[#00ff41]" /> : <Activity className="text-[#00ff41]" />}
        </div>
        <div>
           <h1 className="text-2xl font-bold uppercase tracking-widest text-white">{api.name}</h1>
           <div className="flex items-center space-x-2 mt-1">
             <span className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse"></span>
             <p className="text-[#008f11] text-xs font-bold">{api.endpoint}</p>
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Left Column: Command Input */}
        <div className="flex-1 flex flex-col max-w-xl">
          <div className="cyber-panel p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <span className="text-[#00ff41] font-bold uppercase tracking-wider text-sm flex items-center">
                 <Terminal className="w-4 h-4 mr-2" />
                 Parameter_Input
               </span>
               <span className="text-[10px] bg-[#008f11]/20 text-[#00ff41] px-2 py-1 border border-[#008f11]">
                 {api.method}
               </span>
            </div>
            
            <form id="api-form" onSubmit={handleSubmit} className="space-y-6 flex-1 overflow-y-auto">
              {api.parameters.map((param) => (
                <div key={param.name} className="group">
                  <label className="block text-[10px] font-bold text-[#008f11] mb-2 uppercase tracking-wide">
                    {param.label} {param.required && '*'}
                  </label>
                  <input
                    className="input-cyber"
                    placeholder={`&gt; ENTER ${param.label.toUpperCase()}...`}
                    required={param.required}
                    onChange={(e) => handleParamChange(param.name, e.target.value)}
                  />
                </div>
              ))}
            </form>

            <button
              form="api-form"
              type="submit"
              disabled={loading}
              className={clsx(
                "w-full mt-6 flex items-center justify-center space-x-2 py-3 px-6 font-bold uppercase tracking-widest transition-all clip-path-polygon",
                loading 
                  ? "bg-[#1e293b] text-[#64748b] border border-[#64748b] cursor-wait" 
                  : "bg-[#00ff41] text-black hover:bg-[#00cc33]"
              )}
            >
              {loading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              <span>{loading ? 'EXECUTING...' : 'RUN PROTOCOL'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Visualizer */}
        <div className="flex-1 cyber-panel min-h-[400px] flex flex-col overflow-hidden relative">
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff41]/50 to-transparent"></div>
             <VisualizerSection apiId={api.id} result={response?.data} loading={loading} />
        </div>
      </div>
      
      {/* Result Action Area */}
       <div className="mt-6">
          <AnimatePresence>
             {response && response.success && api.id === 'pin-checker' && (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="cyber-panel p-4 flex justify-between items-center bg-[#020617] border-[#00ff41] border-l-4"
               >
                 <div>
                    <h4 className="text-[#00ff41] font-bold uppercase tracking-wider text-sm flex items-center">
                      <FileBadge className="w-4 h-4 mr-2" />
                      Certificate Available
                    </h4>
                    <p className="text-xs text-[#94a3b8] mt-1">SECURE DOCUMENT GENERATED FOR {response.data.taxpayerName}</p>
                 </div>
                 <button 
                  onClick={() => {
                   try {
                     toast.loading('EXTRACTING DOCUMENT...');
                     // Add minimal delay for effect
                     setTimeout(() => {
                        generateKraCertificate({
                         pin: response.data.pin || 'A000000000Z',
                         name: response.data.taxpayerName || 'UNKNOWN SUBJECT',
                         email: 'REDACTED'
                       });
                       toast.dismiss();
                       toast.success('DOCUMENT EXTRACTED');
                     }, 1000);
                   } catch (err) {
                     console.error(err);
                     toast.error('EXTRACTION FAILED');
                   }
                  }}
                  className="btn-cyber text-xs py-2 px-4 flex items-center"
                 >
                   <Download className="w-4 h-4 mr-2" />
                   DOWNLOAD.PDF
                 </button>
               </motion.div>
             )}
          </AnimatePresence>
       </div>
    </div>
  );
};

export default ApiDetail;
