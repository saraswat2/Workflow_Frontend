import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Rss, Edit3, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { getArticleById, dummyArticles } from '../services/dummyData';
import ArticleCard from '../components/ArticleCard';
import EngagementBar from '../components/engagement/EngagementBar';
import { recordView } from '../services/engagementApi';
import { getPostFromApi, deletePost, normalizeBackendPost } from '../services/postsApi';
import { useAuth } from '../context/AuthContext';

/* ── Reading progress bar ── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-white/[0.06]">
      <motion.div
        className="h-full bg-gradient-to-r from-[#4f46e5] to-[#a78bfa]"
        style={{ width: `${progress}%` }}
        transition={{ ease: 'linear', duration: 0.05 }}
      />
    </div>
  );
}

/* ── Render plain-text content with markdown-ish formatting ── */
function PlainTextContent({ text = '' }) {
  const paras = text
    .split(/\n{2,}/)
    .map((p) =>
      p
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br/>')
    );
  return (
    <div className="prose-content">
      {paras.map((p, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
      ))}
    </div>
  );
}

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const heroRef = useRef(null);

  // State: either a normalized backend post OR a dummy article OR null
  const [article, setArticle] = useState(null);
  const [isBackendPost, setIsBackendPost] = useState(false);
  const [loadingPost, setLoadingPost] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* Load post — backend first, then fall back to dummy data if backend has no match */
  useEffect(() => {
    setLoadingPost(true);
    setNotFound(false);
    setArticle(null);
    setIsBackendPost(false);

    const numericId = Number(id);
    const isNumeric = !isNaN(numericId) && numericId > 0;

    if (isNumeric) {
      // Try the backend first
      getPostFromApi(id)
        .then((res) => {
          // Backend has this post — always show it (even if ID collides with a dummy)
          setArticle(normalizeBackendPost(res.data));
          setIsBackendPost(true);
        })
        .catch(() => {
          // Backend doesn't have it — fall back to dummy data (e.g. user clicked a demo card)
          const dummy = getArticleById(id);
          if (dummy) {
            setArticle(dummy);
            setIsBackendPost(false);
          } else {
            setNotFound(true);
          }
        })
        .finally(() => setLoadingPost(false));
    } else {
      // Non-numeric slug → dummy articles only
      const dummy = getArticleById(id);
      if (dummy) {
        setArticle(dummy);
        setIsBackendPost(false);
      } else {
        setNotFound(true);
      }
      setLoadingPost(false);
    }
  }, [id]);

  /* Record a view */
  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (id) recordView(id).catch(() => {});
  }, [id]);

  /* Delete handler */
  const handleDelete = async () => {
    if (!deleteConfirm) { setDeleteConfirm(true); return; }
    setDeleting(true);
    try {
      await deletePost(id);
      navigate('/', { replace: true });
    } catch {
      setDeleteError('Failed to delete. Try again.');
      setDeleting(false);
      setDeleteConfirm(false);
    }
  };

  /* Loading state */
  if (loadingPost) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#6366f1] animate-spin" />
      </div>
    );
  }

  /* Not found */
  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-white gap-4">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-2">
          <AlertCircle className="w-7 h-7 text-gray-600" />
        </div>
        <h1 className="text-2xl font-bold">Article not found</h1>
        <p className="text-gray-500 text-sm">This post may have been deleted or doesn't exist.</p>
        <Link to="/" className="text-[#818cf8] hover:underline text-sm mt-2">← Back to home</Link>
      </div>
    );
  }

  const isAuthor = user && isBackendPost && article.authorUsername === user.username;

  /* Related articles — always dummy for now, filtered so current dummy doesn't appear */
  const related = dummyArticles.filter((a) => a.id !== id).slice(0, 3);

  /* Determine if we have a hero image */
  const heroImage = article.image || article.coverImageUrl || null;

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-purple-500/30">
      <ReadingProgress />

      {/* ── Fixed Top Nav ── */}
      <nav className="fixed top-[2px] w-full z-50 px-6 py-4 flex items-center justify-between border-b border-white/[0.04] bg-[#030303]/90 backdrop-blur-xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>

        <Link to="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center">
            <Rss className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-bold text-white tracking-tight">WriteFlow</span>
        </Link>

        {/* Author actions (edit / delete) */}
        {isAuthor ? (
          <div className="flex items-center gap-2">
            <Link
              to={`/post/${id}/edit`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20 transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                deleteConfirm
                  ? 'border-red-500/60 bg-red-500/10 text-red-400'
                  : 'border-white/[0.08] text-gray-400 hover:text-red-400 hover:border-red-500/30'
              }`}
            >
              {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
              {deleteConfirm ? 'Confirm?' : 'Delete'}
            </button>
          </div>
        ) : (
          <div className="w-24" />
        )}
      </nav>

      {/* Delete error toast */}
      <AnimatePresence>
        {deleteError && (
          <motion.div
            initial={{ opacity: 0, y: -16, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0 }}
            className="fixed top-20 left-1/2 z-[60] flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold border border-red-500/30 bg-red-500/10 text-red-400 backdrop-blur-xl"
          >
            <AlertCircle className="w-4 h-4" />
            {deleteError}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      {heroImage ? (
        /* Full parallax hero image — same for both backend and dummy articles */
        <div ref={heroRef} className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden mt-[57px]">
          <motion.img
            src={heroImage}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ y: heroY, opacity: heroOpacity }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/60 via-transparent to-[#030303]/60" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 px-6 pb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-[#4f46e5]/20 text-[#818cf8] text-[10px] font-bold tracking-wider uppercase border border-[#4f46e5]/30">
              {article.tag}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4 max-w-3xl">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                {article.authorAvatar ? (
                  <img src={article.authorAvatar} alt={article.authorName} className="w-7 h-7 rounded-full object-cover border border-white/10" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{(article.authorName || '?')[0].toUpperCase()}</span>
                  </div>
                )}
                <span className="font-semibold text-gray-300">{article.authorName}</span>
              </div>
              {article.date && <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /><span>{article.date}</span></div>}
              <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /><span>{article.readTime}</span></div>
            </div>
          </motion.div>
        </div>
      ) : (
        /* No image — gradient header banner, same cohesive style */
        <div className="mt-[57px] w-full pt-16 pb-12 px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-[#4f46e5]/20 text-[#818cf8] text-[10px] font-bold tracking-wider uppercase border border-[#4f46e5]/30">
              {article.tag || 'Blog'}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6 max-w-3xl">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                {article.authorAvatar ? (
                  <img src={article.authorAvatar} alt={article.authorName} className="w-7 h-7 rounded-full object-cover border border-white/10" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{(article.authorName || '?')[0].toUpperCase()}</span>
                  </div>
                )}
                <span className="font-semibold text-gray-300">{article.authorName}</span>
              </div>
              {article.date && <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /><span>{article.date}</span></div>}
              <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /><span>{article.readTime}</span></div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── Article Body ── */}
      <motion.div
        className="max-w-3xl mx-auto px-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Excerpt / intro — only if there's a distinct excerpt (dummy articles) */}
        {article.excerpt && !isBackendPost && (
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-medium border-l-2 border-[#4f46e5] pl-5 mb-10 italic">
            {article.excerpt}
          </p>
        )}

        {/* Content */}
        {isBackendPost ? (
          <PlainTextContent text={article.content} />
        ) : (
          <div className="prose-content" dangerouslySetInnerHTML={{ __html: article.content }} />
        )}

        {/* Engagement Bar — for ALL articles (backend gets real data, dummy gets fallback) */}
        <EngagementBar postId={id} />
      </motion.div>

      {/* ── Continue Reading ── */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="border-t border-white/[0.06] pt-12">
          <h2 className="text-xl font-extrabold text-white tracking-tight mb-6">Continue Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <ArticleCard key={rel.id} post={rel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
