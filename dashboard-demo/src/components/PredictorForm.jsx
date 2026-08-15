import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, DollarSign, Activity } from 'lucide-react';

const RangeSlider = ({ label, name, min, max, step, value, onChange }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center text-sm font-bold text-stone-400">
      <label>{label}</label>
      <span className="font-mono bg-stone-800/50 px-3 py-1 rounded-full text-stone-300 border border-stone-700/50">{value}</span>
    </div>
    <div className="relative w-full h-2.5 bg-[#1c1917] rounded-full overflow-hidden border border-stone-800/50">
      <div 
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-400 to-orange-400 transition-all duration-150"
        style={{ width: `${((value - min) / (max - min)) * 100}%` }}
      ></div>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  </div>
);

export default function PredictorForm() {
  const [formData, setFormData] = useState({
    carat: 1.0, cut: 5, color: 1, clarity: 1, x: 6.5, y: 6.5, z: 4.0
  });
  const [predicting, setPredicting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [thinkingStep, setThinkingStep] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setPredicting(true);
    setError(null);
    setResult(null);

    const steps = [
      "Extracting inputs...",
      "Normalizing vectors...",
      "Traversing decision trees...",
      "Finalizing prediction..."
    ];
    
    for (let i = 0; i < steps.length; i++) {
      setThinkingStep(steps[i]);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Could not connect to Prediction API.');
    }
    setPredicting(false);
  };

  return (
    <div className="bg-[#292524]/80 backdrop-blur-3xl border border-stone-700/50 rounded-[40px] p-8 lg:p-12 relative overflow-hidden flex flex-col md:flex-row gap-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
      <div className="absolute top-0 right-0 p-32 bg-rose-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      {/* Form Side */}
      <div className="flex-1 space-y-10 z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-rose-500/10 rounded-2xl border border-rose-500/20 flex items-center justify-center shadow-sm">
            <Calculator className="w-6 h-6 text-rose-400" />
          </div>
          <h3 className="text-2xl font-black text-stone-100 tracking-tight">Live Model Predictor</h3>
        </div>

        <form onSubmit={handlePredict} className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
            <RangeSlider label="Carat Weight" name="carat" min="0.2" max="5.0" step="0.01" value={formData.carat} onChange={handleInputChange} />
            <RangeSlider label="Cut Quality" name="cut" min="1" max="5" step="1" value={formData.cut} onChange={handleInputChange} />
            <RangeSlider label="Color Grade" name="color" min="1" max="7" step="1" value={formData.color} onChange={handleInputChange} />
            <RangeSlider label="Clarity Grade" name="clarity" min="1" max="8" step="1" value={formData.clarity} onChange={handleInputChange} />
            <RangeSlider label="Length (x)" name="x" min="0" max="15" step="0.1" value={formData.x} onChange={handleInputChange} />
            <RangeSlider label="Width (y)" name="y" min="0" max="15" step="0.1" value={formData.y} onChange={handleInputChange} />
            <div className="sm:col-span-2">
              <RangeSlider label="Depth (z)" name="z" min="0" max="10" step="0.1" value={formData.z} onChange={handleInputChange} />
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={predicting}
            className="w-full py-5 bg-stone-100 text-stone-900 rounded-[24px] font-bold text-lg tracking-wide shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:bg-white hover:shadow-2xl hover:shadow-white/10"
          >
            {predicting ? (
              <><Activity className="w-5 h-5 animate-pulse text-rose-500" /> Processing</>
            ) : (
              <>Run Prediction <ArrowRight className="w-5 h-5 text-rose-500" /></>
            )}
          </motion.button>
        </form>
      </div>

      {/* Result Side */}
      <div className="w-full md:w-[450px] bg-[#1c1917] rounded-[32px] border border-stone-800 p-10 flex flex-col justify-center min-h-[350px] z-10 relative shadow-inner">
        <AnimatePresence mode="wait">
          {predicting && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center space-y-6 text-center h-full"
            >
              <div className="w-12 h-12 border-4 border-rose-500/20 border-t-rose-400 rounded-full animate-spin"></div>
              <p className="text-stone-400 font-bold">{thinkingStep}</p>
            </motion.div>
          )}

          {!predicting && result && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col justify-center space-y-8"
            >
              <div>
                <p className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-3">Predicted Asset Class</p>
                <div className="inline-block bg-[#292524] px-6 py-3 rounded-2xl border border-stone-700 shadow-sm">
                  <h4 className="text-3xl font-black text-stone-100">{result.gem_name}</h4>
                </div>
              </div>
              
              <div className="h-px w-full bg-stone-800"></div>
              
              <div>
                <p className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-3">Estimated Market Value</p>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-8 h-8 text-rose-400" />
                  <h4 className="text-5xl font-black text-stone-100 tracking-tighter">
                    {result.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h4>
                </div>
              </div>
            </motion.div>
          )}

          {!predicting && !result && !error && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center text-stone-600"
            >
              <Calculator className="w-16 h-16 mb-6 opacity-30 text-rose-400" />
              <p className="text-sm font-bold max-w-[200px]">Adjust parameters and run prediction to see results</p>
            </motion.div>
          )}

          {error && (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center text-red-400 font-bold text-center bg-red-500/10 rounded-2xl p-6 border border-red-500/20"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
