import React from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import PredictorForm from './components/PredictorForm';
import MetricsDashboard from './components/MetricsDashboard';

function App() {
  return (
    <div className="min-h-screen bg-[#1c1917] text-stone-300 font-nunito selection:bg-rose-500/30">
      <Navigation />

      {/* Soft floating background blob (dark comfy version) */}
      <div className="fixed top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-rose-900/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-orange-900/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <main className="max-w-[1400px] mx-auto p-4 md:p-8 lg:p-12 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-min">
          
          <div className="lg:col-span-8">
            <HeroSection />
          </div>

          <div className="lg:col-span-4 bg-[#292524]/80 backdrop-blur-3xl rounded-[40px] border border-stone-700/50 p-10 flex flex-col justify-center items-center text-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
            <h4 className="text-stone-400 text-sm font-bold uppercase tracking-widest mb-4">Total Features</h4>
            <div className="text-8xl font-black text-stone-100 tracking-tighter">9 <span className="text-4xl text-stone-500 font-light mx-2">→</span> <span className="text-rose-400">4</span></div>
            <p className="text-stone-400 mt-6 text-sm leading-relaxed font-medium">Reduced dimensionality for faster, highly accurate predictions</p>
          </div>

          <section id="predictor" className="lg:col-span-12 scroll-mt-32">
            <PredictorForm />
          </section>

          <div className="lg:col-span-12">
            <MetricsDashboard />
          </div>
          
        </div>
      </main>
      
      <footer className="py-12 text-center text-stone-500 text-sm font-medium">
        <p>Gemstone Price Prediction Engine &copy; 2026. Made with dark comfy vibes.</p>
      </footer>
    </div>
  );
}

export default App;
