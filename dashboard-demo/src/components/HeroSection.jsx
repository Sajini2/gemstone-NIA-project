import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Network, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <header id="overview" className="h-full bg-[#292524]/80 backdrop-blur-3xl border border-stone-700/50 rounded-[40px] p-10 md:p-14 flex flex-col justify-center relative overflow-hidden scroll-mt-32 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
      
      {/* Soft warm glow */}
      <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-5xl md:text-6xl lg:text-7xl font-black text-stone-100 tracking-tight leading-[1.1] mb-6"
      >
        Nature-Inspired <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Feature Selection</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-xl text-stone-400 max-w-2xl font-medium leading-relaxed mb-10"
      >
        Evaluating the effectiveness of Genetic Algorithms and Particle Swarm Optimization in reducing dimensionality for Gemstone Price Prediction.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex flex-wrap gap-4"
      >
        <a href="#results" className="flex items-center gap-2 text-stone-200 bg-[#44403c]/50 hover:bg-[#57534e]/50 px-6 py-4 rounded-2xl border border-stone-600/50 transition-all cursor-pointer shadow-sm hover:shadow-md group">
          <Network className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm tracking-wide">View GA Performance</span>
        </a>
        <a href="#results" className="flex items-center gap-2 text-stone-200 bg-[#44403c]/50 hover:bg-[#57534e]/50 px-6 py-4 rounded-2xl border border-stone-600/50 transition-all cursor-pointer shadow-sm hover:shadow-md group">
          <Zap className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm tracking-wide">View PSO Performance</span>
        </a>
      </motion.div>
    </header>
  );
}
