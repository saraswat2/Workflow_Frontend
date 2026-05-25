import React, { useEffect, useState } from 'react';

const LINES = [
  '> Initializing WriteFlow...',
  '> Loading articles...',
  '> Authenticating session...',
  '> Rendering interface...',
];

export default function Loader({ onDone }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= LINES.length) {
      const t = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onDone?.(), 400);
      }, 400);
      return () => clearTimeout(t);
    }

    const line = LINES[currentLineIndex];

    if (currentCharIndex < line.length) {
      const t = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLineIndex] = (updated[currentLineIndex] || '') + line[currentCharIndex];
          return updated;
        });
        setCurrentCharIndex((c) => c + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCurrentLineIndex((i) => i + 1);
        setCurrentCharIndex(0);
      }, 220);
      return () => clearTimeout(t);
    }
  }, [currentLineIndex, currentCharIndex, onDone]);

  if (!visible) return null;

  const progress = Math.min((currentLineIndex / LINES.length) * 100, 100);

  return (
    <div
      className="loader-overlay"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}
    >
      <div className="loader-terminal">
        {/* Title bar */}
        <div className="loader-header">
          <span className="loader-dot" style={{ background: '#ff5f57' }} />
          <span className="loader-dot" style={{ background: '#febc2e' }} />
          <span className="loader-dot" style={{ background: '#28c840' }} />
          <span className="loader-header-label">terminal — writeflow</span>
        </div>

        {/* Typed lines */}
        <div className="loader-body">
          {displayedLines.map((line, i) => (
            <div key={i} className="loader-line">
              <span className="loader-line-text">{line}</span>
              {i === displayedLines.length - 1 && currentLineIndex < LINES.length && (
                <span className="loader-cursor" />
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="loader-progress-track">
          <div className="loader-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
