import React from 'react';
import { motion } from 'framer-motion';
import { reactToPost, removeReaction } from '../../services/engagementApi';

const REACTIONS = [
  { type: 'LIKE', emoji: '👍', label: 'Like' },
  { type: 'LOVE', emoji: '❤️', label: 'Love' },
  { type: 'HAHA', emoji: '😂', label: 'Haha' },
  { type: 'WOW', emoji: '😮', label: 'Wow' },
  { type: 'SAD', emoji: '😢', label: 'Sad' },
  { type: 'ANGRY', emoji: '😡', label: 'Angry' },
];

export default function ReactionPicker({ postId, currentReaction, onReact, onReactLocal, onClose }) {
  const handleSelect = async (type) => {
    // Always update local state immediately (optimistic)
    if (onReactLocal) onReactLocal(type);

    // Try to persist to backend
    try {
      let updated;
      if (currentReaction === type) {
        updated = await removeReaction(postId);
      } else {
        updated = await reactToPost(postId, type);
      }
      // If backend succeeds, sync with real data
      if (onReact) onReact(updated);
    } catch (_) {
      // Local state already updated above — silently ignore API failure
      if (onClose) onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="absolute bottom-full left-0 mb-2 z-50 flex gap-1 p-2 rounded-2xl
        bg-[#111] border border-white/[0.08] shadow-xl shadow-black/40"
    >
      {REACTIONS.map(({ type, emoji, label }) => (
        <motion.button
          key={type}
          whileHover={{ scale: 1.3, y: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSelect(type)}
          title={label}
          className={`text-xl p-1.5 rounded-xl transition-colors
            ${currentReaction === type ? 'bg-white/10' : 'hover:bg-white/[0.06]'}`}
        >
          {emoji}
        </motion.button>
      ))}
    </motion.div>
  );
}
