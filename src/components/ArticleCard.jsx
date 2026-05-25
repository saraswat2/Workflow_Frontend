import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Eye, Bookmark } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export default function ArticleCard({ post, className }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (post.id) navigate(`/post/${post.id}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={twMerge(
        clsx(
          'flex flex-col h-full rounded-2xl overflow-hidden cursor-pointer',
          'border border-white/[0.05] bg-[#0c0c0c]/80',
          'transition-colors duration-300 hover:border-purple-500/30 hover:bg-[#111111] hover:shadow-[0_0_40px_rgba(99,102,241,0.08)]',
          className
        )
      )}
    >
      {/* Top Image Section */}
      <div className="relative h-48 w-full overflow-hidden p-2 pb-0 rounded-t-2xl">
        <div className="w-full h-full rounded-xl overflow-hidden relative">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-500"
            />
          ) : (
            /* Gradient placeholder for posts without a cover image */
            <div className="w-full h-full bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95] flex items-center justify-center">
              <span className="text-white/20 text-xs font-semibold uppercase tracking-widest">No Cover</span>
            </div>
          )}
          <motion.div
            whileHover={{ x: 2, y: -2 }}
            className="absolute bottom-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors cursor-pointer group"
          >
            <ArrowUpRight className="w-4 h-4 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-5 space-y-3">
        {/* Tag */}
        <div>
          <span className="text-[11px] font-semibold text-[#6366f1] tracking-wider uppercase">
            {post.tag || 'General'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white leading-tight mt-1">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-500 font-normal leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex-grow" />

        {/* Footer */}
        <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/[0.05]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {post.authorAvatar ? (
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-6 h-6 rounded-full object-cover border border-white/10"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[9px] font-bold">
                    {(post.authorName || '?')[0].toUpperCase()}
                  </span>
                </div>
              )}
              <span className="text-xs font-semibold text-gray-300">
                {post.authorName || 'Unknown'}
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {post.readTime}
            </span>
          </div>
          {/* Stable engagement stats — no Math.random() */}
          <div className="flex items-center justify-between text-gray-600 text-xs font-medium">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 hover:text-pink-400 transition-colors">
                <Heart className="w-3 h-3" />
                {post.likes ?? 0}
              </span>
              <span className="flex items-center gap-1 hover:text-sky-400 transition-colors">
                <Eye className="w-3 h-3" />
                {post.views ?? 0}
              </span>
            </div>
            <Bookmark className="w-3 h-3 hover:text-yellow-400 transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
