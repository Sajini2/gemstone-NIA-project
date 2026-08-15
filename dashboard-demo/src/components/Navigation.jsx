import React from 'react';
import { motion } from 'framer-motion';
import { Gem } from 'lucide-react';

const NavLink = ({ href, children }) => (
  <a href={href} className="text-stone-400 hover:text-stone-100 hover:bg-stone-800 px-5 py-2.5 rounded-2xl transition-all duration-300 text-sm font-bold tracking-wide">
    {children}
  </a>
);

export default function Navigation() {
  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#292524]/80 backdrop-blur-2xl border border-stone-700/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] rounded-full pointer-events-auto p-2"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 pr-5 pl-3 border-r border-stone-700/50 cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
              <Gem className="w-5 h-5 text-rose-400" />
            </div>
            <span className="font-extrabold tracking-widest text-stone-200 text-sm">NIA<span className="text-orange-400">Engine</span></span>
          </div>
          <div className="flex gap-1 pr-2">
            <NavLink href="#overview">Overview</NavLink>
            <NavLink href="#predictor">Predictor</NavLink>
            <NavLink href="#convergence">Convergence</NavLink>
            <NavLink href="#results">Results</NavLink>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
