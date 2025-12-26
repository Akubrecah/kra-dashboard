import React, { useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { API_CATALOG } from '../data/api-definitions';
import { invokeApi, type ApiResponse } from '../services/apiClient';
import { Play, RotateCcw, Activity, Smartphone, FileBadge, Terminal as TerminalIcon, Shield, Download } from 'lucide-react';
import { generateKraCertificate } from '../utils/pdfGenerator';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'sonner';

const ApiDetail: React.FC = () => {
  const { apiId } = useParams();
  const { isMock } = useOutletContext<{ isMock: boolean }>();
  const apiDef = API_CATALOG.find(a => a.id === apiId);

  const [params, setParams] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  if (!apiDef) return <div className="text-slate-400 font-sans">API Protocol Not Found</div>;

  const handleExecute = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await invokeApi(apiDef.id, params, isMock);
      setResponse(res);
      if (res.success) {
        toast.success('Successfully executed request');
      } else {
        toast.error('Request failed');
      }
    } catch (err) {
      toast.error('System error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCert = () => {
    if (response?.data?.name) {
      generateKraCertificate({ 
        pin: response.data.pin || 'A000000000Z', 
        name: response.data.name 
      });
      toast.success('Downloading Certificate...');
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 font-sans animate-in fade-in duration-500">
      <Toaster position="bottom-right" theme="dark" />
      
      {/* Left Column: Input Panel */}
      <div className="space-y-6">
        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="glass-panel p-8"
        >
           <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 border border-blue-500/20">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{apiDef.name}</h1>
                <p className="text-slate-400 text-sm">Endpoint: <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded text-xs font-mono">/v1/{apiId}</code></p>
              </div>
           </div>

           <div className="space-y-4">
             {apiDef.parameters.map((param: any) => (
               <div key={param.name}>
                 <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                   {param.name} {param.required && <span className="text-red-400">*</span>}
                 </label>
                 <input
                   type={param.type === 'number' ? 'number' : 'text'}
                   className="input-modern"
                   placeholder={`Enter ${param.name}...`}
                   onChange={(e) => setParams(prev => ({ ...prev, [param.name]: e.target.value }))}
                 />
               </div>
             ))}
           </div>

           <div className="flex gap-4 mt-8">
             <button
               onClick={handleExecute}
               disabled={loading}
               className="btn-primary flex-1 py-3 group"
             >
               {loading ? (
                 <span className="animate-pulse">Processing...</span>
               ) : (
                 <>
                   <Play className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" /> Execute Request
                 </>
               )}
             </button>
             <button 
               onClick={() => { setParams({}); setResponse(null); }}
               className="btn-secondary px-4"
             >
               <RotateCcw className="w-4 h-4" />
             </button>
           </div>
        </motion.div>
        
        {/* Response Console */}
        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="glass-panel p-6 bg-[#0f172a] border-slate-700/50 min-h-[300px] flex flex-col"
        >
           <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
              <div className="flex items-center text-xs font-mono text-slate-500">
                <TerminalIcon className="w-3 h-3 mr-2" />
                <span>RESPONSE_LOG</span>
              </div>
              <div className="flex gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20"></div>
              </div>
           </div>
           
           <div className="flex-1 font-mono text-xs overflow-auto">
             {response ? (
                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                  <div className="text-emerald-500">HTTP/1.1 {response.success ? '200' : '400'} OK</div>
                  <div className="text-slate-500">Date: {new Date().toUTCString()}</div>
                  <div className="text-slate-500">Content-Type: application/json</div>
                  <br/>
                  <pre className="text-blue-300">
                    {JSON.stringify(response.data, null, 2)}
                  </pre>
                </div>
             ) : (
               <div className="h-full flex items-center justify-center text-slate-700">
                 // Waiting for input stream...
               </div>
             )}
           </div>
        </motion.div>
      </div>

      {/* Right Column: Visualizer */}
      <div className="relative">
         <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
           className="sticky top-28"
         >
           <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 blur-3xl rounded-full -z-10"></div>
           
           <div className="glass-panel p-8 border-slate-700/50 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center text-center">
             
             {apiId === 'mpesa-express' && (
                <div className="w-64 h-[500px] bg-black rounded-[3rem] border-4 border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>
                  
                  {/* Screen */}
                  <div className="flex-1 bg-slate-900 pt-12 px-4 pb-8 flex flex-col relative">
                     {loading && (
                        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center backdrop-blur-sm">
                           <div className="text-white text-xs font-medium animate-pulse">Processing STK...</div>
                        </div>
                     )}
                     
                     {response?.success ? (
                        <div className="flex-1 flex flex-col items-center justify-center">
                           <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                              <Smartphone className="w-8 h-8 text-white" />
                           </div>
                           <h3 className="text-white font-bold text-lg mb-1">Confirmed</h3>
                           <p className="text-slate-400 text-xs mb-8">KSh {params.amount || '0.00'} sent to KRA.</p>
                           <div className="w-full bg-slate-800 rounded-lg p-3 text-[10px] text-slate-500 text-left">
                             <div className="flex justify-between mb-1"><span>Ref:</span> <span className="text-white">{response.data.checkoutRequestID?.substr(0,10)}...</span></div>
                             <div className="flex justify-between"><span>Time:</span> <span className="text-white">Now</span></div>
                           </div>
                        </div>
                     ) : (
                        <div className="flex-1 flex flex-col items-center justify-center opacity-30">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png" className="w-24 mb-4 grayscale" alt="M-Pesa" />
                           <p className="text-slate-500 text-xs text-center">Waiting for transaction trigger...</p>
                        </div>
                     )}
                  </div>
                </div>
             )}

             {apiId === 'pin-checker' && (
                <div className="w-full max-w-sm">
                   <div className="bg-white text-slate-900 mx-auto rounded-lg shadow-2xl overflow-hidden relative">
                      {/* Cert Header */}
                      <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                           <Shield className="w-4 h-4 text-emerald-500" />
                           <span className="text-xs font-bold tracking-wider uppercase">KRA Identity Secure</span>
                         </div>
                         <div className="text-[10px] text-slate-500">VERIFIED</div>
                      </div>
                      
                      <div className="p-8 text-center relative">
                        {/* Watermark */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                           <Shield className="w-48 h-48" />
                        </div>

                        {response?.success ? (
                          <div className="relative z-10 animate-in zoom-in duration-300">
                             <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                               <FileBadge className="w-10 h-10 text-emerald-600" />
                             </div>
                             <h3 className="text-xl font-bold text-slate-900 mb-1">{response.data.name}</h3>
                             <p className="text-xs text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">
                               PIN: {response.data.pin || 'Unknown'}
                             </p>
                             
                             <div className="grid grid-cols-2 gap-4 text-left text-xs text-slate-600 mb-6">
                                <div>
                                  <span className="block text-slate-400 text-[10px] uppercase">Status</span>
                                  <span className="font-semibold text-emerald-600">Active</span>
                                </div>
                                <div>
                                  <span className="block text-slate-400 text-[10px] uppercase">Compliance</span>
                                  <span className="font-semibold text-emerald-600">Verified</span>
                                </div>
                             </div>

                             <button 
                               onClick={handleDownloadCert}
                               className="w-full bg-slate-900 text-white py-3 rounded-lg text-xs font-bold flex items-center justify-center hover:bg-slate-800 transition-colors"
                             >
                               <Download className="w-3 h-3 mr-2" /> Download Certificate
                             </button>
                          </div>
                        ) : (
                          <div className="py-12 opacity-40">
                             <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                             <p className="text-sm font-medium text-slate-400">Enter PIN to Verify Identity</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-slate-50 p-3 text-[10px] text-center text-slate-400 border-t border-slate-100">
                         Official KRA Verification System
                      </div>
                   </div>
                </div>
             )}

           </div>
         </motion.div>
      </div>

    </div>
  );
};

export default ApiDetail;
