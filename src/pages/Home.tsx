import React from 'react';
import { motion } from 'framer-motion';
import { Activity, DollarSign, Bitcoin, Apple, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_CATALOG } from '../data/api-definitions';
import featureConnectivity from '../assets/feature_connectivity.png';
import featureSecurity from '../assets/feature_security.png';

// Coin Components mimicking the Ballo style - Defined OUTSIDE the component
const BlueCoin = ({ delay }: { delay: number }) => (
  <motion.div 
    initial={{ y: 200, opacity: 0, rotateZ: -20 }}
    animate={{ y: 0, opacity: 1, rotateZ: -15 }}
    transition={{ 
      delay, 
      type: "spring", 
      stiffness: 70, 
      damping: 15,
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      } 
    }}
    className="landing-coin coin-blue"
    style={{ top: '10%' }}
  >
    <div className="coin-inner">
      <DollarSign className="coin-icon" />
    </div>
    <div className="coin-edge"></div>
  </motion.div>
);

const GoldCoin = ({ delay }: { delay: number }) => (
  <motion.div 
    initial={{ y: 200, opacity: 0, rotateZ: 10 }}
    animate={{ y: 0, opacity: 1, rotateZ: 10 }}
    transition={{ 
      delay, 
      type: "spring", 
      stiffness: 60,
      damping: 12,
      y: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }}
    className="landing-coin coin-gold"
    style={{ bottom: '15%' }}
  >
    <div className="coin-inner">
      <Activity className="coin-icon" />
    </div>
  </motion.div>
);

const PinkCoin = ({ delay }: { delay: number }) => (
  <motion.div 
    initial={{ y: 200, opacity: 0, rotateZ: 25 }}
    animate={{ y: 0, opacity: 1, rotateZ: 25 }}
    transition={{ 
      delay, 
      type: "spring", 
      stiffness: 80,
      damping: 18,
      y: {
        duration: 1.8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }}
    className="landing-coin coin-pink"
    style={{ top: '20%' }}
  >
    <div className="coin-inner">
      <Bitcoin className="coin-icon" />
    </div>
  </motion.div>
);

const SilverCoin = ({ delay }: { delay: number }) => (
  <motion.div 
    initial={{ y: 200, opacity: 0, rotateZ: -5 }}
    animate={{ y: 0, opacity: 1, rotateZ: -5 }}
    transition={{ 
      delay, 
      type: "spring", 
      stiffness: 60,
      damping: 20,
      y: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      } 
    }}
    className="landing-coin coin-silver"
    style={{ bottom: '25%' }}
  >
    <div className="coin-inner">
      <Apple className="coin-icon" />
    </div>
  </motion.div>
);

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Hero Text */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="landing-hero"
      >
        <h1 className="landing-title">
          WHERE<br />
          DEVELOPERS<br />
          BUILD
        </h1>
        <p className="landing-subtitle">
          Payments? Identity? Taxes? It doesn't matter. You can<br />
          integrate whatever, whenever, wherever. You do you.
        </p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-coral landing-cta"
        >
          Get started
        </motion.button>
      </motion.div>

      {/* 3D Track Visual */}
      <div className="landing-track-container">
        {/* The Curved Track */}
        <div className="track-curve">
           <div className="track-grid"></div>
        </div>

        {/* Floating Coins */}
        <BlueCoin delay={0.2} />
        <GoldCoin delay={0.4} />
        <PinkCoin delay={0.6} />
        <SilverCoin delay={0.8} />

      </div>

      {/* Features Section - Zig Zag Layout */}
      <section className="features-section">
        <div className="container">
           {/* Feature 1: Connectivity */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="feature-row"
           >
              <div className="feature-text">
                <h3 className="feature-title">Seamless <span className="gradient-text-coral">Connectivity</span></h3>
                <p className="feature-desc">
                  Connect your applications to government services with unprecedented ease. 
                  Our modern REST APIs are designed for developers who build the future.
                </p>
              </div>
              <div className="feature-image-wrapper">
                <img src={featureConnectivity} alt="API Connectivity" className="feature-img floating-animation" />
              </div>
           </motion.div>

           {/* Feature 2: Security */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="feature-row reverse"
           >
              <div className="feature-text">
                <h3 className="feature-title">Bank-Grade <span className="gradient-text-coral">Security</span></h3>
                <p className="feature-desc">
                  Built on a fortress of trust. We handle millions of sensitive transactions 
                  using state-of-the-art encryption and fraud detection protocols.
                </p>
              </div>
              <div className="feature-image-wrapper">
                <img src={featureSecurity} alt="Secure Shield" className="feature-img floating-animation-delay" />
              </div>
           </motion.div>
        </div>
      </section>

      {/* API Catalog Section - Restored and Styled */}
      <section className="api-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore our APIs</h2>
            <p className="section-subtitle">
              Comprehensive tools for payments, identity, and compliance.
            </p>
          </div>

          <div className="api-grid">
            {API_CATALOG.map((api, index) => (
              <motion.div
                key={api.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="api-card"
                onClick={() => navigate(`/api/${api.id}`)}
              >
                <div className="api-card-content">
                  <div className="api-icon-wrapper">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="api-card-title">{api.name}</h3>
                  <p className="api-card-desc">{api.description}</p>
                  
                  <div className="api-card-footer">
                    <span className="api-link">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
