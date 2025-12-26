import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Terminal, Shield, Cpu, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_CATALOG } from '../data/api-definitions';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const terminalData = React.useMemo(() => ({
    logs: Array.from({length: 20}).map((_, i) => ({
      id: i,
      hex: Math.random().toString(16).substr(2, 8).toUpperCase()
    })),
    traces: Array.from({length: 15}).map((_, i) => ({
      id: i,
      bin: Math.random().toString(2).substr(2, 16)
    }))
  }), []);

  return (
    <div className="min-h-screen bg-[#020617] text-[#e2e8f0] font-mono relative overflow-hidden">
      {/* Background Grid Animation */}
      <div className="absolute inset-0 z-0 bg-cyber-grid pointer-events-none opacity-20"></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-20 pt-32 pb-20">
        
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
           >
             <div className="inline-flex items-center px-3 py-1 mb-6 border border-[#00ff41] bg-[#00ff41]/10 text-[#00ff41] text-xs font-bold tracking-widest uppercase">
               <span className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse mr-2"></span>
               System Status: Online
             </div>
             
             <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 uppercase tracking-tighter leading-none glow-text">
               Global<br />
               <span className="text-[#00ff41]">Secure</span><br />
               Protocol
             </h1>
             
             <p className="text-xl text-[#94a3b8] mb-8 leading-relaxed border-l-2 border-[#008f11] pl-6">
               &gt; INITIALIZING SECURE HANDSHAKE...<br />
               &gt; ESTABLISHING ENCRYPTED TUNNEL...<br />
               &gt; ACCESS GRANTED.
             </p>

             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => navigate('/api/mpesa-express')}
               className="btn-cyber text-lg"
             >
               <span className="mr-2">&gt;</span> INITIATE CONSOLE
             </motion.button>
           </motion.div>

           <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative flex justify-center items-center h-[400px] border border-[#008f11]/30 bg-[#0f172a]/30 rounded-lg overflow-hidden"
           >
              {/* Fake Terminal Visual */}
              <div className="absolute inset-4 font-mono text-xs text-[#00ff41]/50 overflow-hidden leading-tight opacity-50">
                 {terminalData.logs.map((line) => (
                   <div key={line.id}>0x7F{line.hex} :: ACCESSING NODE {line.id}</div>
                 ))}
                 <br />
                 {terminalData.traces.map((trace) => (
                   <div key={trace.id} className="text-[#00f3ff]/50">PACKET_TRACE :: {trace.bin}</div>
                 ))}
              </div>
              <Globe className="w-48 h-48 text-[#00ff41] relative z-10 animate-pulse drop-shadow-[0_0_30px_rgba(0,255,65,0.4)]" strokeWidth={0.5} />
           </motion.div>
        </div>


        {/* Capabilities Section */}
        <section className="mb-32">
           <div className="flex items-end justify-between border-b border-[#008f11] pb-4 mb-12">
             <h2 className="text-3xl font-bold text-white uppercase tracking-widest flex items-center">
               <Shield className="w-8 h-8 mr-4 text-[#00ff41]" />
               Capabilities
             </h2>
             <span className="text-xs text-[#008f11]">SYS.VER.2.0.4</span>
           </div>

           <div className="grid md:grid-cols-2 gap-8">
              <div className="cyber-panel p-8">
                 <Cpu className="w-12 h-12 text-[#00f3ff] mb-6" />
                 <h3 className="text-xl font-bold text-white mb-4 uppercase">Neural Connectivity</h3>
                 <p className="text-[#94a3b8] leading-relaxed">
                   Direct integration with government mainframes. Zero latency. 
                   Real-time synchronization with tax authority databases.
                 </p>
              </div>
              <div className="cyber-panel p-8">
                 <Terminal className="w-12 h-12 text-[#ff003c] mb-6" />
                 <h3 className="text-xl font-bold text-white mb-4 uppercase">Threat Mitigation</h3>
                 <p className="text-[#94a3b8] leading-relaxed">
                   Military-grade encryption on all transaction layers. 
                   Automatic fraud detection algorithms active.
                 </p>
              </div>
           </div>
        </section>

        {/* API Catalog Section */}
        <section>
          <div className="flex items-center mb-12">
             <div className="w-2 h-8 bg-[#00ff41] mr-4"></div>
             <h2 className="text-3xl font-bold text-white uppercase tracking-widest">
               Authorized Protocols
             </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {API_CATALOG.map((api, index) => (
              <motion.div
                key={api.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/api/${api.id}`)}
                className="group relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-[#00ff41]/5 transform skew-x-[-10deg] group-hover:bg-[#00ff41]/10 transition-colors"></div>
                <div className="relative border border-[#008f11] p-6 hover:border-[#00ff41] transition-colors h-full flex flex-col">
                   <div className="flex justify-between items-start mb-6">
                     <Activity className="w-8 h-8 text-[#008f11] group-hover:text-[#00ff41] transition-colors" />
                     <span className="text-[10px] font-bold border border-[#008f11] px-2 py-1 text-[#008f11] uppercase group-hover:text-[#00ff41] group-hover:border-[#00ff41]">
                       ID: {api.id.substring(0, 4).toUpperCase()}
                     </span>
                   </div>
                   
                   <h3 className="text-xl font-bold text-white mb-2 uppercase group-hover:text-[#00ff41] transition-colors">
                     {api.name}
                   </h3>
                   <p className="text-sm text-[#94a3b8] mb-6 flex-grow font-mono">
                     {api.description}
                   </p>
                   
                   <div className="flex items-center justify-end text-[#00ff41] text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                     Access Node <ArrowRight className="w-4 h-4 ml-2" />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
