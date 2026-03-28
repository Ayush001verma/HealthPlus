import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldPlus,
  Stethoscope,
  ClipboardCheck,
  CalendarCheck,
  Users,
  Database,
  ArrowRight,
  Activity,
  ChevronRight,
  Plus,
  Zap,
  Lock,
  Globe,
  MessageCircle
} from 'lucide-react';
import NearbyStores from './NearbyStores';

const HomePage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm' : 'bg-white border-b border-transparent py-6'}`}>
        <div className="container mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
            <div className="w-8 h-8 bg-blue-700 rounded-sm flex items-center justify-center transition-colors duration-300 group-hover:bg-blue-800">
              <ShieldPlus className="text-white w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 brand-font transition-colors duration-300 group-hover:text-blue-700">Health<span className="text-blue-700">Plus</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'X-Ray AI', path: '/xray-diagnosis' },
              { label: 'Health Plans', path: '/health-plans' },
              { label: 'Appointments', path: '/appointments' },
              { label: 'Mental Health', path: '/mental-health' }
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button className="text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors duration-300">Sign In</button>
            <button className="bg-blue-700 text-white px-6 py-2.5 rounded-sm text-sm font-semibold hover:bg-blue-800 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95">
              Emergency
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-40 pb-24 lg:pt-48 lg:pb-32 border-b border-slate-200">
          <div className="container mx-auto px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-block text-xs font-bold tracking-widest text-slate-400 uppercase animate-fade-in-up">
                  Clinical-Grade Healthcare Intelligence
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900 brand-font animate-fade-in-up animation-delay-100">
                  Precision AI for your <br />
                  <span className="text-blue-700">Health journey.</span>
                </h1>

                <p className="text-lg text-slate-500 leading-relaxed max-w-lg font-medium animate-fade-in-up animation-delay-200">
                  HealthPlus redefines the boundary between complex medical data and personal wellness. Experience diagnostic accuracy and personalized care powered by enterprise-grade infrastructure.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4 animate-fade-in-up animation-delay-300">
                  <button className="bg-blue-700 text-white px-8 py-4 rounded-sm text-sm font-semibold hover:bg-blue-800 transition-all duration-300 flex items-center gap-2 group shadow-sm hover:shadow-md active:scale-95">
                    Get Started <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <button className="px-8 py-4 rounded-sm text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all duration-300 border border-slate-200 active:scale-95 hover:border-slate-300">
                    Clinical Standards
                  </button>
                </div>
              </div>

              <div className="relative group animate-fade-in-up animation-delay-400">
                <div className="relative h-full aspect-[4/3] rounded-sm overflow-hidden border border-slate-200 bg-slate-100 shadow-sm transition-all duration-700 group-hover:shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                    alt="HealthPlus AI"
                    className="w-full h-full object-cover grayscale-[40%] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  
                  {/* Floating Elements */}
                  <div className="absolute top-8 right-8 bg-white border border-slate-200 p-4 rounded-sm shadow-sm transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-sm bg-blue-50 flex items-center justify-center transition-colors duration-300 group-hover:bg-blue-100">
                        <Activity className="text-blue-700 w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Vitals</p>
                        <p className="text-xs font-semibold text-slate-800 leading-none">Optimal Status</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-24 lg:py-32 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-fade-in-up">
              <div className="max-w-2xl space-y-3">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 brand-font tracking-tight">Ecosystem Architecture</h2>
                <p className="text-slate-500 font-medium leading-relaxed">Advanced medical technology reimagined for clinical precision and enterprise-scale operations.</p>
              </div>
              <button className="flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800 transition-all duration-300 group">
                Explore All Services <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* X-Ray */}
              <div className="lg:col-span-2 bg-white p-10 lg:p-12 rounded-sm border border-slate-200 transition-all duration-500 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 group animate-fade-in-up animation-delay-100">
                <div className="flex flex-col md:flex-row gap-10 items-center">
                  <div className="flex-1 space-y-5">
                    <div className="w-12 h-12 rounded-sm bg-slate-50 flex items-center justify-center border border-slate-100 transition-colors duration-300 group-hover:bg-blue-50 group-hover:border-blue-100">
                      <Stethoscope className="w-6 h-6 text-blue-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 brand-font">Clinical Vision AI</h3>
                    <p className="text-slate-500 font-medium leading-relaxed text-sm">Our proprietary RAG-based engine processes diagnostic imaging and medical history with 99.4% recorded accuracy.</p>
                    <div className="flex gap-2 pt-2">
                      {['DICOM READY', 'HIPAA SECURE'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-sm text-[10px] font-bold text-slate-500 tracking-wider transition-colors duration-300 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-56 aspect-[4/5] rounded-sm overflow-hidden border border-slate-200 transition-all duration-500 group-hover:shadow-md">
                    <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-[20%]" alt="Diagnostic imaging" />
                  </div>
                </div>
              </div>

              {/* Health Plan - Featured */}
              <div className="bg-blue-700 p-10 lg:p-12 rounded-sm text-white flex flex-col justify-between transition-all duration-500 hover:bg-blue-800 hover:shadow-lg hover:-translate-y-1 group cursor-pointer animate-fade-in-up animation-delay-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-sm bg-white/10 flex items-center justify-center mb-12 transition-transform duration-500 group-hover:scale-110">
                    <ClipboardCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold brand-font mb-3">Custom <br />Health Plans</h3>
                  <p className="text-blue-100 text-sm font-medium leading-relaxed">Biometric-driven protocols strictly generated from your unique DNA and marker profile data.</p>
                </div>
                <div className="relative z-10 pt-8 flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3">
                  Generate Protocol <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Appointments */}
              <div className="bg-white p-10 lg:p-12 rounded-sm border border-slate-200 transition-all duration-500 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 group animate-fade-in-up animation-delay-300">
                <div className="w-12 h-12 rounded-sm bg-slate-50 flex items-center justify-center border border-slate-100 mb-8 transition-colors duration-300 group-hover:bg-blue-50 group-hover:border-blue-100">
                  <CalendarCheck className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 brand-font mb-3">Swift Scheduling</h3>
                <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">Direct systemic access to worldwide specialist pipelines with prioritized routing.</p>
                <div className="text-sm font-bold text-slate-900 border-t border-slate-100 pt-4 transition-colors duration-300 group-hover:border-blue-100 group-hover:text-blue-700">
                  +200 Verified Specialists
                </div>
              </div>

              {/* Mental Health */}
              <div className="lg:col-span-2 bg-white p-10 lg:p-12 rounded-sm border border-slate-200 transition-all duration-500 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 group animate-fade-in-up animation-delay-400">
                <div className="flex flex-col md:flex-row gap-10 items-center">
                  <div className="flex-1 space-y-5">
                    <div className="w-12 h-12 rounded-sm bg-slate-50 flex items-center justify-center border border-slate-100 transition-colors duration-300 group-hover:bg-blue-50 group-hover:border-blue-100">
                      <Users className="w-6 h-6 text-blue-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 brand-font">Mental Support</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">Evidence-based counseling modules and structured continuous stress-management tools.</p>
                  </div>
                  <div className="w-full md:w-72 p-6 bg-slate-50 rounded-sm border border-slate-200 transition-all duration-500 group-hover:bg-white group-hover:shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Channels</span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-slate-200 rounded-sm transition-colors duration-300 group-hover:bg-slate-100"></div>
                      <div className="h-2 w-3/4 bg-slate-200 rounded-sm transition-colors duration-300 group-hover:bg-slate-100"></div>
                      <div className="h-2 w-1/2 bg-slate-200 rounded-sm transition-colors duration-300 group-hover:bg-slate-100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Stores Section */}
        <section className="py-12 bg-white">
          <NearbyStores />
        </section>

        {/* Ethics Section */}
        <section className="py-24 lg:py-32 bg-white border-b border-slate-200">
          <div className="container mx-auto px-8">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="relative group animate-fade-in-up">
                <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden border border-slate-200 transition-all duration-500 group-hover:shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80"
                    alt="Ethics AI"
                    className="w-full h-full object-cover grayscale opacity-90 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute top-8 right-8 bg-white border border-slate-200 p-6 rounded-sm w-48 hidden sm:block transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-md">
                    <div className="text-3xl font-bold text-slate-900 mb-1 brand-font">99.9%</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">SLA Guarantee</div>
                    <div className="h-1 w-full bg-slate-100 rounded-sm overflow-hidden">
                      <div className="h-full bg-blue-700 w-[99.9%] rounded-sm origin-left transition-transform duration-1000 scale-x-0 group-hover:scale-x-100 delay-300"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-10 animate-fade-in-up animation-delay-200">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 brand-font tracking-tight">
                  Security. Privacy. <br />
                  <span className="text-blue-700">Standards.</span>
                </h2>

                <div className="space-y-8">
                  <div className="flex gap-6 group/item cursor-pointer">
                    <div className="w-12 h-12 flex-shrink-0 rounded-sm bg-slate-50 flex items-center justify-center border border-slate-200 text-blue-700 transition-colors duration-300 group-hover/item:bg-blue-700 group-hover/item:text-white group-hover/item:border-blue-700">
                      <Lock className="w-5 h-5 transition-transform duration-300 group-hover/item:scale-110" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-slate-900 brand-font transition-colors duration-300 group-hover/item:text-blue-700">E2E Privacy Encryption</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">Zero-knowledge infrastructure using industry-leading AES-256 protocols.</p>
                    </div>
                  </div>

                  <div className="flex gap-6 group/item cursor-pointer">
                    <div className="w-12 h-12 flex-shrink-0 rounded-sm bg-slate-50 flex items-center justify-center border border-slate-200 text-blue-700 transition-colors duration-300 group-hover/item:bg-blue-700 group-hover/item:text-white group-hover/item:border-blue-700">
                      <Database className="w-5 h-5 transition-transform duration-300 group-hover/item:scale-110" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-slate-900 brand-font transition-colors duration-300 group-hover/item:text-blue-700">Data Integrity Engine</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">Strict adherence to clinical guidelines, parsed from purely verified medical journals.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32 bg-slate-50">
          <div className="container mx-auto px-8">
            <div className="bg-slate-900 rounded-sm p-16 text-center border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-xl group animate-fade-in-up">
              <div className="space-y-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-white brand-font tracking-tight transition-transform duration-500 group-hover:scale-[1.02]">Deploy HealthPlus Framework</h2>
                <p className="text-slate-400 text-sm font-medium w-full max-w-xl mx-auto transition-colors duration-500 group-hover:text-slate-300">Integrate state-of-the-art predictive healthcare processing and precision intelligence immediately.</p>
                <div className="flex justify-center pt-4">
                  <button className="bg-white text-slate-900 px-8 py-3.5 rounded-sm text-sm font-bold hover:bg-slate-100 transition-all duration-300 flex items-center gap-2 active:scale-95 shadow-lg shadow-black/20 hover:shadow-xl">
                    Create Implementation <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-16 border-t border-slate-200 relative overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-16">
            <div className="col-span-2 md:col-span-1 lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2 group cursor-pointer inline-flex">
                <div className="w-6 h-6 bg-blue-700 rounded-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <ShieldPlus className="text-white w-3 h-3 transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-900 brand-font transition-colors duration-300 group-hover:text-blue-700">HealthPlus</span>
              </div>
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs transition-colors duration-300 hover:text-slate-600">
                Enterprise medical software infrastructure and diagnostic intelligence tools.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 mb-6 text-xs uppercase tracking-widest">Platform</h5>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/xray-diagnosis" className="text-slate-500 hover:text-blue-700 transition-colors duration-300 inline-block hover:translate-x-1">Vision Systems</Link></li>
                <li><Link to="/health-plans" className="text-slate-500 hover:text-blue-700 transition-colors duration-300 inline-block hover:translate-x-1">Documentation</Link></li>
                <li><Link to="/security" className="text-slate-500 hover:text-blue-700 transition-colors duration-300 inline-block hover:translate-x-1">Security Overview</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 mb-6 text-xs uppercase tracking-widest">Company</h5>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/about" className="text-slate-500 hover:text-blue-700 transition-colors duration-300 inline-block hover:translate-x-1">Corporate Info</Link></li>
                <li><Link to="/careers" className="text-slate-500 hover:text-blue-700 transition-colors duration-300 inline-block hover:translate-x-1">Careers</Link></li>
                <li><Link to="/contact" className="text-slate-500 hover:text-blue-700 transition-colors duration-300 inline-block hover:translate-x-1">Contact Press</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 mb-6 text-xs uppercase tracking-widest">Connect</h5>
              <div className="flex gap-3">
                <Link to="#" className="w-8 h-8 rounded-sm bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-100 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1"><Globe className="w-4 h-4 text-slate-600" /></Link>
                <Link to="#" className="w-8 h-8 rounded-sm bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-100 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1"><MessageCircle className="w-4 h-4 text-slate-600" /></Link>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">© 2024 HEALTHPLUS PRECISION INC.</p>
            <div className="flex items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <Link to="/privacy" className="hover:text-blue-700 transition-colors duration-300">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-blue-700 transition-colors duration-300">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;