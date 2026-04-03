import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Sparkles, Target, Zap, Rocket } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Discovery & Strategia',
    description: 'Analizzo il tuo brand, il mercato e gli obiettivi. Costruisco fondamenta solide prima di scrivere una singola riga di codice.',
    icon: Target,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: '02',
    title: 'Design & Prototipazione',
    description: 'Traduco la strategia in un\'esperienza visiva unica. Wireframe, UI/UX design e prototipi interattivi per darti un\'idea chiara del risultato.',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: '03',
    title: 'Sviluppo & Lancio',
    description: 'Sviluppo pixel-perfect con le tecnologie più moderne. Performance estreme, animazioni fluide e un go-live senza stress.',
    icon: Zap,
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: '04',
    title: 'Supporto & Crescita',
    description: 'Non sparisco dopo il lancio. Monitoriamo insieme i risultato per ottimizzare le performance e far evolvere il tuo prodotto nel tempo.',
    icon: Rocket,
    color: 'from-emerald-400 to-teal-500'
  }
];

const ProcessStep: React.FC<{ 
  step: typeof steps[0], 
  index: number, 
  isEven: boolean 
}> = ({ step, index, isEven }) => {
  const Icon = step.icon;

  const contentVariants = {
    hidden: { opacity: 0, x: isEven ? 40 : -40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" as const } 
    }
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        type: "spring" as const, 
        stiffness: 260, 
        damping: 20,
        delay: 0.2 // Slight delay after content starts
      } 
    }
  };

  return (
    <motion.div 
      variants={{
        visible: { transition: { staggerChildren: 0.1 } }
      }}
      className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      
      {/* Content */}
      <motion.div 
        variants={contentVariants}
        className={`flex-1 w-full md:w-1/2 ${isEven ? 'md:text-left' : 'md:text-right'} pl-20 md:pl-0`}
      >
        <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-sans tracking-widest text-gray-400 mb-6">
          FASE {step.id}
        </div>
        <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tight mb-4">
          {step.title}
        </h3>
        <p className="font-sans text-gray-400 text-lg leading-relaxed">
          {step.description}
        </p>
      </motion.div>

      {/* Node */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-[#050505] border-2 border-white/20 z-10 overflow-hidden">
        {/* The colored background that "pops" in */}
        <motion.div 
          variants={nodeVariants}
          className={`absolute inset-0 bg-gradient-to-br ${step.color} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
      </div>

      {/* Empty space for alignment */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
};

const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 bg-transparent text-white relative overflow-hidden">
      {/* Top Gradient Overlay for smooth transition from Portfolio */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#030303] to-transparent z-0 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="font-sans text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] block mb-4">
            METODO
          </span>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter">
            Processo Operativo
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2" />
          <motion.div 
            className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-emerald-400 md:-translate-x-1/2 origin-top"
            style={{ scaleY: lineHeight }}
          />

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="space-y-24"
          >
            {steps.map((step, index) => (
              <ProcessStep 
                key={step.id} 
                step={step} 
                index={index} 
                isEven={index % 2 === 0}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
