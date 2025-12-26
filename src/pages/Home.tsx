import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Cpu, Code, Database, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-white/75">
      
      {/* Hero Section - Landed Style */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center bg-[#1c1d26] overflow-hidden text-center px-6">
        {/* Background Image/Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1d26]/0 via-[#1c1d26]/50 to-[#1c1d26] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto mt-[-5vh]">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-thin tracking-tight text-white mb-6"
          >
            The Future has Landed.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-white/70 mb-10 font-light"
          >
            There are no limits to what you can build with the new Akubrecah Ent. API. <br/>
            Secure, scalable, and ready for deployment.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => navigate('/api/mpesa-express')}
            className="btn-primary text-sm uppercase tracking-widest px-10 py-4"
          >
            Get Started
          </motion.button>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
           <ArrowRight className="w-6 h-6 rotate-90" />
        </div>
      </section>

      {/* Section 1: Introduction (One Column) */}
      <section className="py-24 bg-[#1c1d26] text-center px-6">
        <div className="max-w-3xl mx-auto">
           <h2 className="text-3xl font-thin text-white mb-6">Seamless Fiscal Integration</h2>
           <p className="mb-8">
             Akubrecah Entertainment provides a unified developer platform for all interactive services. 
             Integrate real-time PIN validation, automatic tax returns, and M-PESA payments directly into your application.
           </p>
           <div className="h-1 w-20 bg-landed-accent mx-auto rounded-full mb-8"></div>
           <div className="flex justify-center gap-4">
              <Zap className="w-12 h-12 text-landed-accent" />
           </div>
        </div>
      </section>

      {/* Section 2: Spotlights (Two Column Alternating) */}
      <section className="bg-[#22242b]">
        {/* Spotlight 1: PIN Checker */}
        <div className="grid md:grid-cols-2">
           <div className="h-96 md:h-auto bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
           <div className="p-12 md:p-20 flex flex-col justify-center items-start bg-[#272933]">
              <h3 className="text-2xl font-thin text-white mb-4">Validate Identity</h3>
              <p className="mb-8">
                <strong>PIN Checker API</strong> allows you to verify KRA PINs in real-time. 
                Ensure compliance by validating customer tax information before processing transactions. 
                Instant verify, secure data handling, and reliable up-time.
              </p>
              <button onClick={() => navigate('/api/pin-checker')} className="btn-secondary text-sm uppercase tracking-wider px-6 py-3">
                Verify Identity
              </button>
           </div>
        </div>
        
        {/* Spotlight 2: M-PESA Express */}
        <div className="grid md:grid-cols-2">
           <div className="p-12 md:p-20 flex flex-col justify-center items-start bg-[#232530] md:order-1 order-2">
              <h3 className="text-2xl font-thin text-white mb-4">Instant Payments</h3>
              <p className="mb-8">
                <strong>M-PESA Express (STK Push)</strong> facilitates seamless customer payments. 
                Trigger payment prompts directly on your customer's phone and receive instant confirmation. 
                Perfect for e-commerce, bill payments, and service fees.
              </p>
              <button onClick={() => navigate('/api/mpesa-express')} className="btn-secondary text-sm uppercase tracking-wider px-6 py-3">
                Process Payment
              </button>
           </div>
           <div className="h-96 md:h-auto bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center md:order-2 order-1"></div>
        </div>
        
        {/* Spotlight 3: Returns & Withholding */}
        <div className="grid md:grid-cols-2">
           <div className="h-96 md:h-auto bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
           <div className="p-12 md:p-20 flex flex-col justify-center items-start bg-[#272933]">
              <h3 className="text-2xl font-thin text-white mb-4">Automated Compliance</h3>
              <p className="mb-8">
                <strong>File NIL Returns & Generate PRNs</strong> automatically. 
                Avoid penalties with scheduled filing and simplify VAT withholding for your suppliers. 
                Full support for all major tax obligations.
              </p>
              <button onClick={() => navigate('/api/nill-return')} className="btn-secondary text-sm uppercase tracking-wider px-6 py-3">
                File Return
              </button>
           </div>
        </div>
      </section>

      {/* Section 3: Feature Grid */}
      <section className="py-24 bg-[#1c1d26] px-6">
         <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-thin text-white">Advanced Features</h2>
            <p>Everything you need to build the next generation of financial apps.</p>
         </div>
         
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Shield, title: 'Secure', text: 'Bank-grade encryption by default.' },
              { icon: Zap, title: 'Fast', text: 'Sub-millisecond latency globally.' },
              { icon: Cpu, title: 'AI Powered', text: 'Predictive anomaly detection.' },
              { icon: Globe, title: 'Global', text: 'Available in 190+ countries.' },
              { icon: Database, title: 'Reliable', text: '99.999% uptime SLA.' },
              { icon: Code, title: 'Developer First', text: 'Typed SDKs for every language.' },
            ].map((f, i) => (
              <div key={i} className="p-8 bg-[#22242b] rounded shadow-lg text-center hover:-translate-y-1 transition-transform">
                 <div className="w-16 h-16 rounded-full bg-[#1c1d26] flex items-center justify-center mx-auto mb-6 text-landed-accent shadow-inner">
                   <f.icon className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-medium text-white mb-3">{f.title}</h3>
                 <p className="text-sm">{f.text}</p>
              </div>
            ))}
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-landed-accent text-center px-6">
         <h2 className="text-3xl font-thin text-white mb-6">Ready to get started?</h2>
         <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
           Join thousands of developers building the future of finance today.
         </p>
         <button onClick={() => navigate('/api/mpesa-express')} className="bg-white text-landed-accent px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white/90 transition-colors shadow-lg">
           Access Console
         </button>
      </section>

      {/* Footer */}
      <footer className="bg-[#181920] py-16 px-6 text-center text-sm font-light">
         <div className="flex justify-center gap-6 mb-8 text-white/50">
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">GitHub</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
         </div>
         <p className="text-white/30">
           &copy; Untitled. All rights reserved. Design: <a href="http://html5up.net" className="hover:text-white">HTML5 UP</a>.
         </p>
      </footer>

    </div>
  );
};

export default Home;
