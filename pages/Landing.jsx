import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, LogOut, Zap, Shield, BookOpen, Rss, TrendingUp, User } from 'lucide-react';
import Button from '../components/Button';
import ArticleCard from '../components/ArticleCard';
import ProfileModal from '../components/ProfileModal';
import { useAuth } from '../context/AuthContext';
import { dummyArticles, categories } from '../services/dummyData';

/* ─────────────────────────────────────────────────────── */
/* Floating background orbs                                */
/* ─────────────────────────────────────────────────────── */
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-[#4f46e5] rounded-full opacity-[0.06] blur-[120px]" />
      <div className="absolute top-1/2 -right-60 w-[600px] h-[600px] bg-[#7c3aed] rounded-full opacity-[0.05] blur-[120px]" />
      <div className="absolute -bottom-60 left-1/3 w-[500px] h-[500px] bg-[#6366f1] rounded-full opacity-[0.04] blur-[100px]" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */
/* Top Nav                                                 */
/* ─────────────────────────────────────────────────────── */
function NavBar({ user, logout }) {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b border-white/[0.04] bg-[#030303]/80 backdrop-blur-xl">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-900/40">
          <Rss className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-sm font-bold text-white tracking-tight">WriteFlow</span>
      </Link>

      {/* Auth Actions */}
      {user ? (
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-profile'))}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20 transition-all group"
            title="Edit Profile"
          >
            {user.profileImageUrl ? (
              <img 
                src={user.profileImageUrl} 
                alt={user.name || user.username} 
                className="w-5 h-5 rounded-full object-cover border border-white/10 group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center group-hover:scale-105 transition-transform">
                <User className="w-3 h-3 text-white" />
              </div>
            )}
            <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
              {user.name || user.username}
            </span>
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Log In
          </Link>
          <Link to="/signup">
            <Button className="!rounded-full px-5 py-2 text-sm font-semibold shadow-none !from-[#4f46e5] !to-[#7c3aed] border border-white/10 hover:border-white/20">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────────────── */
/* LOGGED-OUT VIEW: Cinematic Marketing Landing            */
/* ─────────────────────────────────────────────────────── */
function LoggedOutView() {
  const navigate = useNavigate();
  const trendingArticles = dummyArticles.slice(0, 3);

  const features = [
    { icon: <BookOpen className="w-5 h-5" />, title: 'Curated Reading', desc: 'Handpicked articles from top engineers and designers.' },
    { icon: <Zap className="w-5 h-5" />, title: 'Instant Publishing', desc: 'Write and publish to a global audience in seconds.' },
    { icon: <Shield className="w-5 h-5" />, title: 'Secure & Private', desc: 'JWT-secured, encrypted at rest. Your data is yours.' },
    { icon: <TrendingUp className="w-5 h-5" />, title: 'Grow Your Reach', desc: 'SEO-optimised posts that get discovered organically.' },
  ];

  return (
    <div className="pt-24">
      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-28 md:py-36 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-[#4f46e5]/10 text-[#818cf8] text-xs font-semibold tracking-wider uppercase border border-[#4f46e5]/20">
            <Zap className="w-3 h-3" /> The Modern Developer Blog Platform
          </span>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6 max-w-4xl mx-auto">
            Write. Share.{' '}
            <span className="bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent">
              Inspire.
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed mb-10">
            WriteFlow is a premium blogging platform built for engineers, designers, and makers
            who take their craft seriously.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/signup">
              <Button className="!rounded-full px-8 py-3.5 text-base font-bold shadow-none !from-[#4f46e5] !to-[#7c3aed] border border-white/10 hover:border-white/20 shadow-lg shadow-purple-900/30">
                Start Writing for Free
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </Button>
            </Link>
            <Link to="/login">
              <button className="px-8 py-3.5 rounded-full text-base font-semibold text-gray-300 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200">
                Log In
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-purple-500/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-xl bg-[#4f46e5]/10 border border-[#4f46e5]/20 flex items-center justify-center text-[#818cf8] mb-4">
                {f.icon}
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Trending Articles ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="inline-block px-3 py-1 mb-2 rounded-full bg-[#4f46e5]/10 text-[#6366f1] text-[10px] font-bold tracking-wider uppercase border border-[#4f46e5]/20">
                Trending Now
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                What engineers are reading
              </h2>
            </div>
            <Link to="/signup">
              <Button className="!rounded-full shadow-none pl-5 pr-4 py-2.5 text-sm font-bold whitespace-nowrap !from-[#4f46e5] !to-[#6366f1]">
                See All <ArrowRight className="w-4 h-4 ml-1 inline" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingArticles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <ArticleCard post={article} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */
/* LOGGED-IN VIEW: Personalized Feed Dashboard            */
/* ─────────────────────────────────────────────────────── */
function LoggedInView({ user }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? dummyArticles
      : dummyArticles.filter((a) => a.category === activeCategory);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="pt-24 max-w-5xl mx-auto px-6 pb-24">
      {/* ── Greeting ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 pt-8"
      >
        <p className="text-[#818cf8] text-sm font-semibold tracking-wider uppercase mb-1">
          {greeting()},
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
          {user.name || user.username}
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Here's what's trending in your feed today.
        </p>
      </motion.div>

      {/* ── Category Pills ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-10"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
              activeCategory === cat
                ? 'bg-[#4f46e5] border-[#4f46e5] text-white shadow-lg shadow-purple-900/30'
                : 'border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05]'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* ── Article Grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((article) => (
            <ArticleCard key={article.id} post={article} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */
/* Root Export                                             */
/* ─────────────────────────────────────────────────────── */
export default function Landing() {
  const { user, logout, updateUserSession } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  React.useEffect(() => {
    const handleOpen = () => setIsProfileOpen(true);
    window.addEventListener('open-profile', handleOpen);
    return () => window.removeEventListener('open-profile', handleOpen);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030303] selection:bg-purple-500/30">
      <BackgroundOrbs />
      <NavBar user={user} logout={logout} />

      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        user={user} 
        onUpdate={updateUserSession} 
      />

      <AnimatePresence mode="wait">
        {user ? (
          <motion.div
            key="logged-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoggedInView user={user} />
          </motion.div>
        ) : (
          <motion.div
            key="logged-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoggedOutView />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
