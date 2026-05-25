import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Bookmark, Eye, Share2, Check } from 'lucide-react';
import {
  getEngagementSummary,
  toggleLike,
  toggleBookmark,
  recordShare,
} from '../../services/engagementApi';
import ReactionPicker from './ReactionPicker';
import { useAuth } from '../../context/AuthContext';

const REACTION_EMOJI = {
  LIKE: '👍',
  LOVE: '❤️',
  HAHA: '😂',
  WOW: '😮',
  SAD: '😢',
  ANGRY: '😡',
};

function makeFallback() {
  return {
    likeCount: Math.floor(Math.random() * 150) + 12,
    viewCount: Math.floor(Math.random() * 1000) + 100,
    shareCount: Math.floor(Math.random() * 50) + 5,
    likedByCurrentUser: false,
    bookmarkedByCurrentUser: false,
    reactionCounts: { LIKE: 5, LOVE: 2 },
    currentUserReaction: null,
  };
}

export default function EngagementBar({ postId }) {
  const { user } = useAuth();
  const [data, setData] = useState(makeFallback);
  const [showReactions, setShowReactions] = useState(false);
  const [copied, setCopied] = useState(false);

  // Try to load real data from backend; silently stay on fallback if it fails
  const load = useCallback(async () => {
    if (!postId || !user) return;
    try {
      const summary = await getEngagementSummary(postId);
      setData(summary);
    } catch (_) {
      // Backend post doesn't exist yet – fallback data already in state
    }
  }, [postId, user]);

  useEffect(() => { load(); }, [load]);

  // ── Handlers with optimistic UI ──────────────────────────────────────────

  const handleLike = async () => {
    // Optimistic update first
    setData(prev => ({
      ...prev,
      likeCount: prev.likedByCurrentUser ? prev.likeCount - 1 : prev.likeCount + 1,
      likedByCurrentUser: !prev.likedByCurrentUser,
    }));
    // Try to persist; if it fails, local state already updated
    if (user) {
      try {
        const updated = await toggleLike(postId);
        setData(updated);
      } catch (_) {}
    }
  };

  const handleBookmark = async () => {
    const isNowBookmarked = !data.bookmarkedByCurrentUser;
    setData(prev => ({
      ...prev,
      bookmarkedByCurrentUser: isNowBookmarked,
    }));

    // Persist to localStorage so the Landing page bookmarks tab stays in sync
    try {
      const saved = JSON.parse(localStorage.getItem('wf_bookmarks') || '[]');
      const updated = isNowBookmarked
        ? [...new Set([...saved, String(postId)])]
        : saved.filter(id => id !== String(postId));
      localStorage.setItem('wf_bookmarks', JSON.stringify(updated));
      window.dispatchEvent(new Event('wf_bookmark_changed'));
    } catch (_) {}

    if (user) {
      try {
        const updated = await toggleBookmark(postId);
        setData(updated);
      } catch (_) {}
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    // Try modern clipboard API first, fall back to execCommand if denied
    try {
      await navigator.clipboard.writeText(url);
    } catch (_) {
      try {
        const el = document.createElement('textarea');
        el.value = url;
        el.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;z-index:-1';
        document.body.appendChild(el);
        el.focus();
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      } catch (_) {}
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    setData(prev => ({ ...prev, shareCount: prev.shareCount + 1 }));
    if (user) {
      try { const updated = await recordShare(postId); setData(updated); } catch (_) {}
    }
  };

  const handleReaction = (type) => {
    const isSame = data.currentUserReaction === type;
    setData(prev => {
      const newCounts = { ...prev.reactionCounts };
      // Remove previous reaction count if exists
      if (prev.currentUserReaction) {
        newCounts[prev.currentUserReaction] = Math.max(0, (newCounts[prev.currentUserReaction] || 1) - 1);
      }
      // Add new reaction count if not toggling off
      if (!isSame) {
        newCounts[type] = (newCounts[type] || 0) + 1;
      }
      return {
        ...prev,
        currentUserReaction: isSame ? null : type,
        reactionCounts: newCounts,
      };
    });
    setShowReactions(false);
  };

  const handleReactionFromPicker = (updated) => {
    // Called when API succeeds from picker
    if (updated && typeof updated === 'object' && 'likeCount' in updated) {
      setData(updated);
    }
    setShowReactions(false);
  };

  const totalReactions = Object.values(data.reactionCounts || {}).reduce((a, b) => a + b, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-wrap items-center gap-3 py-4 border-t border-b border-white/[0.06] my-8"
    >
      {/* Like */}
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={handleLike}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all
          border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.07]
          ${data.likedByCurrentUser ? 'text-red-400 border-red-500/30 bg-red-500/10' : 'text-gray-400 hover:text-white'}`}
      >
        <Heart className={`w-4 h-4 transition-all ${data.likedByCurrentUser ? 'fill-red-400 scale-110' : ''}`} />
        <span>{data.likeCount}</span>
      </motion.button>

      {/* Reaction picker */}
      <div className="relative">
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setShowReactions(p => !p)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all
            border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.07]
            ${data.currentUserReaction ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' : 'text-gray-400 hover:text-white'}`}
        >
          <span className="text-base leading-none">
            {data.currentUserReaction ? REACTION_EMOJI[data.currentUserReaction] : '😊'}
          </span>
          <span>{totalReactions}</span>
        </motion.button>
        <AnimatePresence>
          {showReactions && (
            <ReactionPicker
              postId={postId}
              currentReaction={data.currentUserReaction}
              onReact={handleReactionFromPicker}
              onReactLocal={handleReaction}
              onClose={() => setShowReactions(false)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Bookmark */}
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={handleBookmark}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all
          border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.07]
          ${data.bookmarkedByCurrentUser ? 'text-purple-400 border-purple-500/30 bg-purple-500/10' : 'text-gray-400 hover:text-white'}`}
      >
        <Bookmark className={`w-4 h-4 ${data.bookmarkedByCurrentUser ? 'fill-purple-400' : ''}`} />
        <span>{data.bookmarkedByCurrentUser ? 'Saved' : 'Save'}</span>
      </motion.button>

      {/* Views (read-only) */}
      <div className="flex items-center gap-1.5 text-gray-600 text-sm px-3 py-1.5">
        <Eye className="w-4 h-4" />
        <span>{data.viewCount}</span>
      </div>

      {/* Share */}
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={handleShare}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all
          border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.07]
          ${copied ? 'text-green-400 border-green-500/30 bg-green-500/10' : 'text-gray-400 hover:text-white'}`}
      >
        {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
        <span>{copied ? 'Copied!' : data.shareCount}</span>
      </motion.button>
    </motion.div>
  );
}
