import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Bookmark, Eye } from 'lucide-react';
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
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-500"
          />
          {/* Arrow icon in bottom-right of image */}
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

        {/* Footer: Author & Engagement */}
        <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/[0.05]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={post.authorAvatar}
                alt={post.authorName}
                className="w-6 h-6 rounded-full object-cover border border-white/10"
              />
              <span className="text-xs font-semibold text-gray-300">
                {post.authorName}
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {post.readTime}
            </span>
          </div>
          
          {/* Engagement Metrics (Mocked for visual feedback on landing page) */}
          <div className="flex items-center justify-between text-gray-500">
            <div className="flex items-center space-x-4 text-xs font-medium">
              <div className="flex items-center gap-1.5 hover:text-pink-400 transition-colors">
                <Heart className="w-3.5 h-3.5" />
                <span>{post.likes || Math.floor(Math.random() * 150) + 12}</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                <Eye className="w-3.5 h-3.5" />
                <span>{post.views || Math.floor(Math.random() * 1000) + 100}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors">
              <Bookmark className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
