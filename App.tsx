import React, { useState } from 'react';
import { 
  MenuIcon, XIcon, TrendingUpIcon, UsersIcon, ShieldIcon, 
  MessageCircleIcon, CheckIcon, ChevronDownIcon, ArrowRightIcon,
  ClockIcon, TargetIcon, WhatsAppIcon, CalendarIcon, MapPinIcon,
  HandshakeIcon, PoundSignIcon
} from './components/Icons';
import { LegalModal } from './components/LegalModal';
import { TERMS_OF_USE, PRIVACY_POLICY, DISCLAIMER, COMPANY_INFO } from './data/legalContent';
import { FaqItem, ServiceItem, Testimonial } from './types';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Legal Modal State
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalContent, setLegalContent] = useState({ title: '', content: '' });

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openLegalDoc = (type: 'terms' | 'privacy' | 'disclaimer' | 'company') => {
    switch (type) {
      case 'terms':
        setLegalContent({ title: 'Terms of Use', content: TERMS_OF_USE });
        break;
      case 'privacy':
        setLegalContent({ title: 'Privacy Policy', content: PRIVACY_POLICY });
        break;
      case 'disclaimer':
        setLegalContent({ title: 'Disclaimer', content: DISCLAIMER });
        break;
      case 'company':
        setLegalContent({ title: 'Company Information', content: COMPANY_INFO });
        break;
    }
    setLegalModalOpen(true);
  };

  // Sound Effect for Referral Button
  const playCoinSound = () => {
    try {
      // Cross-browser audio context support
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      
      // Create oscillators for a rich metallic sound
      const osc1 = ctx.createOscillator(); // Main tone
      const osc2 = ctx.createOscillator(); // Overtone
      const gainNode = ctx.createGain();

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Simulating a heavy coin (Pound) sound
      // Frequency ramps up slightly to simulate the "ring"
      const now = ctx.currentTime;
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1200, now);
      osc1.frequency.exponentialRampToValueAtTime(1600, now + 0.1);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(2000, now);
      osc2.frequency.exponentialRampToValueAtTime(2400, now + 0.1);

      // Envelope: Fast attack, quick decay
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.02); // Attack
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8); // Decay

      osc1.start(now);
      osc2.start(now);
      
      osc1.stop(now + 0.8);
      osc2.stop(now + 0.8);
    } catch (e) {
      console.error("Audio playback failed", e);
    }
  };

  // Embedded SVG Logo - Updated to match the requested image with Network Icon and Red 'E'
  const logoUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 350 100' fill='none'%3E%3C!-- Icon --%3E%3Cpath d='M40 20 L20 70 H60 Z' stroke='white' stroke-width='3' stroke-linejoin='round'/%3E%3Cpath d='M40 20 L40 50 M20 70 L40 50 M60 70 L40 50' stroke='white' stroke-width='3'/%3E%3Ccircle cx='40' cy='20' r='5' fill='%23EF4444'/%3E%3Ccircle cx='20' cy='70' r='5' fill='%23EF4444'/%3E%3Ccircle cx='60' cy='70' r='5' fill='%23EF4444'/%3E%3Ccircle cx='40' cy='50' r='5' fill='%23EF4444'/%3E%3C!-- Text AV --%3E%3Ctext x='80' y='70' font-family='sans-serif' font-weight='bold' font-size='48' fill='white'%3EAV%3C/text%3E%3C!-- Red E --%3E%3Crect x='150' y='36' width='28' height='6' fill='%23EF4444'/%3E%3Crect x='150' y='50' width='28' height='6' fill='%23EF4444'/%3E%3Crect x='150' y='64' width='28' height='6' fill='%23EF4444'/%3E%3C!-- Text NTUS --%3E%3Ctext x='185' y='70' font-family='sans-serif' font-weight='bold' font-size='48' fill='white'%3ENTUS%3C/text%3E%3C!-- Subtext --%3E%3Ctext x='82' y='94' font-family='sans-serif' font-size='12' fill='white' letter-spacing='4'%3EDIGITAL MEDIA%3C/text%3E%3C/svg%3E";

  // Data
  const services: ServiceItem[] = [
    {
      title: "Dedicated Management",
      description: "From strategic content planning to consistent scheduling and pricing optimization, we handle every aspect of your business.",
      features: ["Content Strategy & Scheduling", "Pricing Strategy & PPV", "Analytics & Reporting", "24/7 Account Support"]
    },
    {
      title: "Expert Chatting",
      description: "Engage your fanbase around the clock. We build genuine connections, upsell premium content, and maximize tips.",
      features: ["24/7 Fan Engagement", "Upselling & PPV Promotion", "Gift & Tip Maximization", "Native English Speakers"]
    },
    {
      title: "Privacy & Infrastructure",
      description: "We protect your identity and personal life. Our infrastructure ensures you can work safely and receive gifts without exposure.",
      features: ["Registered Postal Address", "Privacy Shield Protocols", "Data & Content Protection", "Secure Gift Receiving"]
    }
  ];

  const faqs: FaqItem[] = [
    { question: "What are your fees?", answer: "We operate on a performance-based model, meaning we only make money when you do. Contact us for a specific breakdown based on your current account size." },
    { question: "How long until I see results?", answer: "Most creators see a significant uplift in engagement within the first 2 weeks, with revenue growth typically following in month 1 of our full strategy implementation." },
    { question: "Do I lose control over my content?", answer: "Absolutely not. You remain the owner of your content and brand. We act as your strategic partner to execute the vision we build together." },
    { question: "Is my information kept confidential?", answer: "Yes. Privacy and discretion are pillars of our agency. We utilize strict NDA agreements and secure data handling practices." },
  ];

  const testimonials: Testimonial[] = [
    { quote: "Before Aventus, I was burnt out and barely breaking even. Now, I'm earning more than ever, and I have my life back!", author: "Sarah J. - Top 0.5% Creator" },
    { quote: "Their marketing truly works. I saw a huge spike in subscribers within weeks of partnering with them.", author: "Michelle K. - Elite Model" },
    { quote: "The chatting service is a game-changer. My fans feel more connected, and my tips have skyrocketed.", author: "Alex R. - Content Creator" }
  ];

  return (
    <div className="font-sans text-slate-300 bg-slate-950 min-h-screen flex flex-col relative">
      
      {/* Legal Modal */}
      <LegalModal 
        isOpen={legalModalOpen} 
        onClose={() => setLegalModalOpen(false)} 
        title={legalContent.title} 
        content={legalContent.content} 
      />

      {/* Background Image Extraction */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(${logoUrl})`,
          backgroundSize: '80%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(80px) brightness(0.4) contrast(1.2)'
        }}
      ></div>
      <div className="fixed inset-0 z-0 bg-slate-950/80 pointer-events-none"></div>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/1234567890" // Replace with actual number
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-4 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8 text-gold-500" />
      </a>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <img src={logoUrl} alt="Aventus Digital Media" className="h-16 w-auto object-contain" />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-white transition-colors">Services</button>
              <button onClick={() => scrollToSection('process')} className="text-sm font-medium hover:text-white transition-colors">Process</button>
              <button onClick={() => scrollToSection('results')} className="text-sm font-medium hover:text-white transition-colors">Results</button>
              <button onClick={() => scrollToSection('referrals')} className="text-sm font-medium hover:text-white transition-colors">Partners</button>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:text-white transition-colors flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Book Consultation
              </button>
              <button onClick={() => scrollToSection('contact')} className="bg-gold-600 hover:bg-gold-500 text-white px-6 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-lg shadow-gold-900/20">
                Apply Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-white p-2">
                {isMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 absolute w-full">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium hover:bg-slate-800 hover:text-white">Services</button>
              <button onClick={() => scrollToSection('process')} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium hover:bg-slate-800 hover:text-white">Process</button>
              <button onClick={() => scrollToSection('results')} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium hover:bg-slate-800 hover:text-white">Results</button>
              <button onClick={() => scrollToSection('referrals')} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium hover:bg-slate-800 hover:text-white">Partners</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium hover:bg-slate-800 text-gold-500">Book Consultation</button>
              <div className="pt-4">
                 <button onClick={() => scrollToSection('contact')} className="w-full bg-gold-600 text-white px-6 py-3 rounded-lg font-bold">Apply Now</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-52 lg:pb-32 overflow-hidden z-10">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-sm font-medium mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-gold-500 mr-2"></span>
            Accepting New Creator Applications
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-tight">
            Unlock Your Full <br/>
            <span className="text-gradient">OnlyFans Potential.</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 mb-10">
            We provide comprehensive management, expert chatting, and proven marketing strategies to ensure your sustained growth and success.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
            <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-lg font-bold text-lg border border-slate-700 transition-all flex items-center justify-center group backdrop-blur-sm shadow-none">
              Apply for Partnership
              {/* Arrow rotated to face the other way as requested */}
              <ArrowRightIcon className="ml-2 w-5 h-5 rotate-180" />
            </button>
            <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-lg font-bold text-lg border border-slate-700 transition-all flex items-center justify-center group backdrop-blur-sm">
              <CalendarIcon className="mr-2 w-5 h-5 text-gold-500 group-hover:text-white transition-colors" />
              Book Consultation
            </button>
            <button onClick={() => { playCoinSound(); scrollToSection('referrals'); }} className="px-8 py-4 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-lg font-bold text-lg border border-slate-700 transition-all flex items-center justify-center group backdrop-blur-sm animate-pulse">
              <PoundSignIcon className="mr-2 w-5 h-5 text-gold-500 transition-colors" />
              Referral Scheme
            </button>
          </div>
          
          <div className="flex justify-center animate-fade-in-up delay-300">
            <img src={logoUrl} alt="Aventus" className="h-32 w-auto object-contain opacity-90 drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 bg-slate-900/80 border-y border-slate-800 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Are You Maximizing Your Earning Potential?</h2>
            <p className="text-lg text-slate-400 mb-6">
              Many creators struggle to juggle content creation, fan engagement, marketing, and the 24/7 demands of an OnlyFans business. It's time-consuming, stressful, and often limits your growth.
            </p>
            <p className="text-lg text-slate-400 mb-8">
              At <span className="text-white font-semibold">Aventus Digital Media</span>, we transform how creators operate. We step in as your dedicated partner, handling the complexities of management so you can focus on what you do best: creating.
            </p>
            <div className="flex items-center justify-center space-x-8 text-gold-500 font-medium text-lg">
              <div className="flex items-center"><TrendingUpIcon className="w-6 h-6 mr-2" /> Proven Growth</div>
              <div className="flex items-center"><ShieldIcon className="w-6 h-6 mr-2" /> Total Privacy</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-gold-500/5 to-transparent border-l-4 border-gold-500 bg-slate-800/50 border-t border-r border-b border-slate-700 p-10 rounded-r-2xl shadow-xl hover:border-r-gold-500/30 transition-all group min-h-[320px] flex flex-col justify-center">
               <div className="bg-slate-900 p-4 rounded-xl inline-block mb-6 w-16 h-16 flex items-center justify-center group-hover:bg-gold-600/20 transition-colors">
                  <ClockIcon className="w-8 h-8 text-slate-300 group-hover:text-gold-500 transition-colors"/>
               </div>
               <h4 className="text-2xl font-bold text-white mb-4">Reclaim Your Time</h4>
               <p className="text-slate-400 text-lg leading-relaxed">Stop spending 12 hours a day in DMs. We handle the grind so you can enjoy your life.</p>
            </div>

            <div className="bg-gradient-to-r from-gold-500/5 to-transparent border-l-4 border-gold-500 bg-slate-800/50 border-t border-r border-b border-slate-700 p-10 rounded-r-2xl shadow-xl hover:border-r-gold-500/30 transition-all group min-h-[320px] flex flex-col justify-center">
               <div className="bg-slate-900 p-4 rounded-xl inline-block mb-6 w-16 h-16 flex items-center justify-center group-hover:bg-gold-600/20 transition-colors">
                  <TrendingUpIcon className="w-8 h-8 text-gold-500 group-hover:text-gold-400 transition-colors"/>
               </div>
               <h4 className="text-2xl font-bold text-white mb-4">Scale Revenue</h4>
               <p className="text-slate-400 text-lg leading-relaxed">Professional upselling strategies and funnel optimization that drastically increase LTV.</p>
            </div>

            <div className="bg-gradient-to-r from-gold-500/5 to-transparent border-l-4 border-gold-500 bg-slate-800/50 border-t border-r border-b border-slate-700 p-10 rounded-r-2xl shadow-xl hover:border-r-gold-500/30 transition-all group min-h-[320px] flex flex-col justify-center">
               <div className="bg-slate-900 p-4 rounded-xl inline-block mb-6 w-16 h-16 flex items-center justify-center group-hover:bg-gold-600/20 transition-colors">
                  <TargetIcon className="w-8 h-8 text-gold-500 group-hover:text-gold-400 transition-colors"/>
               </div>
               <h4 className="text-2xl font-bold text-white mb-4">Strategic Marketing</h4>
               <p className="text-slate-400 text-lg leading-relaxed">Data-driven campaigns across multiple platforms to consistently bring in new high-value fans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-slate-950/90 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Your All-in-One Solution</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We provide the infrastructure you need to build an empire.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:border-gold-500/50 transition-colors group backdrop-blur-sm">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold-600 transition-colors">
                  {index === 0 && <UsersIcon className="text-white" />}
                  {index === 1 && <MessageCircleIcon className="text-white" />}
                  {index === 2 && <ShieldIcon className="text-white" />}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 mb-6 min-h-[80px]">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-sm text-slate-300">
                      <CheckIcon className="w-4 h-4 text-gold-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record & Graphs */}
      <section id="results" className="py-24 bg-slate-900/80 border-y border-slate-800 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Real Results, Real Growth</h2>
            <p className="text-slate-400">Join the top 0.1% of creators who trust Aventus.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16 text-center">
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2">315%</div>
              <div className="text-white font-medium">Avg. Revenue Increase</div>
              <div className="text-sm text-slate-500 mt-1">In first 6 months</div>
            </div>
            <div className="p-6 border-x border-slate-800/0 md:border-slate-800">
              <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2">98%</div>
              <div className="text-white font-medium">Client Retention Rate</div>
              <div className="text-sm text-slate-500 mt-1">Long-term partnerships</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2">24/7</div>
              <div className="text-white font-medium">Support & Operations</div>
              <div className="text-sm text-slate-500 mt-1">We never sleep</div>
            </div>
          </div>

          {/* Visual Graphs */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            
            {/* Revenue Growth Graph - 6 Month View */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 shadow-xl">
              <h3 className="text-white font-bold mb-6 flex items-center">
                <TrendingUpIcon className="text-gold-500 mr-2" /> Average Revenue Growth
              </h3>
              <div className="relative h-64 w-full flex items-end justify-between px-2 pb-6 border-b border-slate-800">
                 {/* Y-axis labels */}
                 <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-slate-500 h-full py-2 z-10">
                    <span>£12k</span>
                    <span>£9k</span>
                    <span>£6k</span>
                    <span>£3k</span>
                    <span>£0</span>
                 </div>
                 {/* Graph bars/line simulation */}
                 <div className="ml-10 w-full h-full relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,83.3 L20,70.8 L40,54.2 L60,37.5 L80,25 L100,16.6 L100,100 L0,100 Z" fill="url(#gradient)" />
                      <path d="M0,83.3 L20,70.8 L40,54.2 L60,37.5 L80,25 L100,16.6" fill="none" stroke="#EF4444" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    
                    {/* Points */}
                    <div className="absolute left-0 top-[83.3%] w-3 h-3 bg-gold-500 rounded-full border-2 border-slate-900 transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute left-[20%] top-[70.8%] w-3 h-3 bg-gold-500 rounded-full border-2 border-slate-900 transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute left-[40%] top-[54.2%] w-3 h-3 bg-gold-500 rounded-full border-2 border-slate-900 transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute left-[60%] top-[37.5%] w-3 h-3 bg-gold-500 rounded-full border-2 border-slate-900 transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute left-[80%] top-[25%] w-3 h-3 bg-gold-500 rounded-full border-2 border-slate-900 transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute left-[100%] top-[16.6%] w-3 h-3 bg-gold-500 rounded-full border-2 border-slate-900 transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-gold-500/50"></div>
                 </div>
              </div>
              <div className="flex justify-between ml-10 mt-2 text-xs text-slate-500">
                <span>Mo 1</span>
                <span>Mo 2</span>
                <span>Mo 3</span>
                <span>Mo 4</span>
                <span>Mo 5</span>
                <span>Mo 6</span>
              </div>
            </div>

            {/* Earnings Bar Chart - 6 Month View matching image */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 shadow-xl">
              <h3 className="text-white font-bold mb-2 flex items-center">
                <PoundSignIcon className="text-gold-500 mr-2" /> Average Creator Revenue Growth
              </h3>
              <p className="text-xs text-slate-500 mb-6 italic">Based on average performance of creators in our management program</p>
              
               <div className="relative h-64 w-full flex items-end justify-around px-2 pb-6 border-b border-slate-800">
                 {/* No Y-axis labels needed as per image style, values are on top */}
                 
                 <div className="flex items-end justify-between w-full h-full gap-2 md:gap-4">
                    {/* Month 1 */}
                    <div className="w-full bg-gold-600/40 rounded-t-sm h-[16.6%] relative group hover:bg-gold-500/60 transition-colors">
                       <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white font-bold text-xs md:text-sm whitespace-nowrap">£2k</div>
                    </div>

                    {/* Month 2 */}
                    <div className="w-full bg-gold-600/50 rounded-t-sm h-[29.1%] relative group hover:bg-gold-500/70 transition-colors">
                       <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white font-bold text-xs md:text-sm whitespace-nowrap">£3.5k</div>
                    </div>

                    {/* Month 3 */}
                    <div className="w-full bg-gold-600/60 rounded-t-sm h-[45.8%] relative group hover:bg-gold-500/80 transition-colors">
                       <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white font-bold text-xs md:text-sm whitespace-nowrap">£5.5k</div>
                    </div>

                    {/* Month 4 */}
                    <div className="w-full bg-gold-600/70 rounded-t-sm h-[62.5%] relative group hover:bg-gold-500/90 transition-colors">
                       <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white font-bold text-xs md:text-sm whitespace-nowrap">£7.5k</div>
                    </div>

                    {/* Month 5 */}
                    <div className="w-full bg-gold-600/80 rounded-t-sm h-[75%] relative group hover:bg-gold-500 transition-colors">
                       <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white font-bold text-xs md:text-sm whitespace-nowrap">£9k</div>
                    </div>

                    {/* Month 6 */}
                    <div className="w-full bg-gold-500 rounded-t-sm h-[83.3%] relative group hover:bg-gold-400 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                       <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white font-bold text-xs md:text-sm whitespace-nowrap">£10k+</div>
                    </div>
                 </div>
              </div>
              <div className="flex justify-between mt-4 text-xs text-slate-500 w-full px-1">
                <span className="text-center w-full">Month 1</span>
                <span className="text-center w-full">Month 2</span>
                <span className="text-center w-full">Month 3</span>
                <span className="text-center w-full">Month 4</span>
                <span className="text-center w-full">Month 5</span>
                <span className="text-center w-full">Month 6</span>
              </div>
            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gradient-to-r from-gold-500/5 to-transparent border-l-4 border-gold-500 bg-slate-950 p-6 rounded-r-xl border-t border-r border-b border-slate-800 relative shadow-lg">
                <div className="text-gold-600 text-4xl font-serif absolute top-4 left-4 opacity-30">"</div>
                <p className="text-slate-300 relative z-10 italic mb-4 pt-4">{t.quote}</p>
                <div className="text-white font-bold text-sm">— {t.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Updated to match the site's orange/gold branding */}
      <section id="process" className="py-24 bg-slate-950/90 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-20">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Your Path to Success</h2>
             <div className="h-1 w-24 bg-gold-500 mx-auto rounded-full"></div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
             {/* Steps */}
             {[
               {
                 step: 1,
                 title: "Initial Consultation",
                 description: "We analyze your current profile and create a customized growth strategy tailored to your unique brand."
               },
               {
                 step: 2,
                 title: "Profile Optimization",
                 description: "Complete profile makeover with professional copywriting, pricing strategy, and content scheduling."
               },
               {
                 step: 3,
                 title: "Marketing Launch",
                 description: "Strategic campaigns across all platforms to drive targeted traffic and quality subscribers."
               },
               {
                 step: 4,
                 title: "24/7 Management",
                 description: "Our team handles all chat interactions, maximizing engagement and revenue around the clock."
               },
               {
                 step: 5,
                 title: "Scale & Grow",
                 description: "Continuous optimization and expansion to multiply your income month after month."
               }
             ].map((item, index, array) => (
               <div key={index} className="relative flex flex-col items-center text-center group">
                 {/* Connecting Line (Desktop only) */}
                 {index < array.length - 1 && (
                   <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gold-500/30 -z-10"></div>
                 )}
                 {/* Circle */}
                 <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-gold-500 mb-6 shadow-lg shadow-gold-500/20 relative z-10 transition-transform duration-300 group-hover:scale-110">
                   {item.step}
                 </div>
                 {/* Text */}
                 <h3 className="text-lg font-bold text-white mb-3 min-h-[56px] flex items-center justify-center">{item.title}</h3>
                 <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                 {/* Mobile vertical line connector */}
                 {index < array.length - 1 && (
                    <div className="md:hidden h-8 w-0.5 bg-gold-500/30 my-4"></div>
                 )}
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Referral Program Section - Updated Center Layout */}
      <section id="referrals" className="py-24 bg-slate-900 border-y border-slate-800 relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gold-600/5 z-0 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          
          <div className="text-center max-w-3xl mb-12">
             <div className="inline-flex items-center px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-medium mb-6">
              <HandshakeIcon className="w-3 h-3 mr-2" />
              Referral Partner Program
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Partner with Aventus</h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Aventus is the top-paying referral partner in the OnlyFans arena—backed by our real payout data. We don’t race to the bottom; we reward the people who drive growth. 
              <br/><br/>
              If you know creators who are serious about earnings, send them to Aventus and get paid at a level that matches the value you deliver. Straightforward process. Premium payouts. A team that moves quickly and treats referrals like partners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => scrollToSection('contact')} className="px-8 py-3 bg-white text-gold-500 hover:bg-slate-200 rounded-lg font-bold transition-all shadow-lg drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                Join Referral Program
              </button>
              <button onClick={() => scrollToSection('contact')} className="px-8 py-3 border border-slate-600 text-gold-500 hover:bg-slate-800 rounded-lg font-bold transition-all drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                Book Partner Call
              </button>
            </div>
          </div>

          <div className="w-full max-w-4xl bg-gradient-to-r from-gold-500/5 to-transparent border-l-4 border-gold-500 bg-slate-950 p-8 rounded-r-2xl border-t border-r border-b border-slate-800 shadow-2xl relative">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gold-500/20 rounded-full blur-xl"></div>
            <h3 className="text-xl font-bold text-white mb-6 text-center md:text-left">Why Refer to Us?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                 <div className="w-10 h-10 rounded-full bg-gold-500/20 text-gold-500 flex items-center justify-center mb-3 font-bold text-lg">1</div>
                 <div>
                   <h4 className="font-bold text-white mb-2">Premium Payouts</h4>
                   <p className="text-sm text-slate-400">Competitive commission structures that beat industry standards.</p>
                 </div>
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                 <div className="w-10 h-10 rounded-full bg-gold-500/20 text-gold-500 flex items-center justify-center mb-3 font-bold text-lg">2</div>
                 <div>
                   <h4 className="font-bold text-white mb-2">Transparent Tracking</h4>
                   <p className="text-sm text-slate-400">Clear reporting on your referrals' performance and your earnings.</p>
                 </div>
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                 <div className="w-10 h-10 rounded-full bg-gold-500/20 text-gold-500 flex items-center justify-center mb-3 font-bold text-lg">3</div>
                 <div>
                   <h4 className="font-bold text-white mb-2">Long-term Value</h4>
                   <p className="text-sm text-slate-400">Our retention rate means your passive income stream lasts longer.</p>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-slate-900/90 relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-800 rounded-lg bg-slate-950 overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <ChevronDownIcon className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${openFaqIndex === index ? 'transform rotate-180' : ''}`} />
                </button>
                <div className={`px-6 text-slate-400 transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="py-24 bg-gradient-to-b from-slate-950/90 to-slate-900/95 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-slate-400 mb-10">Stop leaving money on the table. Partner with Aventus Digital Media.</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Contact Form */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl text-left">
              <h3 className="text-xl font-bold text-white mb-6">Application Form</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                  <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Social Handle</label>
                  <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none" placeholder="@yourhandle" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                  <input type="email" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none" placeholder="you@example.com" />
                </div>
                <button type="button" className="w-full bg-gold-600 hover:bg-gold-500 text-white font-bold py-4 rounded-lg transition-colors mt-4">
                  Submit Application
                </button>
              </form>
            </div>

            {/* Direct Contact & Booking */}
            <div className="space-y-6 flex flex-col justify-center">
               <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl hover:border-gold-500/30 transition-colors">
                  <div className="w-12 h-12 bg-slate-950 rounded-full flex items-center justify-center text-gold-500 mb-4 mx-auto">
                     <CalendarIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Book a Consultation</h3>
                  <p className="text-slate-400 text-sm mb-6">Schedule a free 15-minute discovery call to discuss your specific needs.</p>
                  <button className="w-full border border-gold-600 text-gold-500 hover:bg-gold-600 hover:text-white font-bold py-3 rounded-lg transition-all">
                    View Calendar
                  </button>
               </div>

               <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl hover:border-white/30 transition-colors">
                  <div className="w-12 h-12 bg-slate-950 rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                     <WhatsAppIcon className="w-6 h-6 text-gold-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Chat on WhatsApp</h3>
                  <p className="text-slate-400 text-sm mb-6">Have a quick question? Direct message our team.</p>
                  <button className="w-full border border-white text-white hover:bg-white hover:text-slate-900 font-bold py-3 rounded-lg transition-all">
                    Start Chat
                  </button>
               </div>
            </div>

          </div>
          <p className="text-xs text-slate-500 mt-12">Your privacy is our priority. All applications are confidential.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img src={logoUrl} alt="Aventus Digital Media" className="h-16 w-auto object-contain mb-2" />
            <p className="text-sm text-slate-500">© 2024 Aventus Digital Media. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <button onClick={() => openLegalDoc('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => openLegalDoc('terms')} className="hover:text-white transition-colors">Terms of Use</button>
            <button onClick={() => openLegalDoc('disclaimer')} className="hover:text-white transition-colors">Disclaimer</button>
            <button onClick={() => openLegalDoc('company')} className="hover:text-white transition-colors">Company Information</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;