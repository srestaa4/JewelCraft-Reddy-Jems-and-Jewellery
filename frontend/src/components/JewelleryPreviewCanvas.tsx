import React from 'react';
import { CustomizationState } from '../context/CustomizationContext';
import { Sparkles, ShieldCheck, Gem } from 'lucide-react';

interface Props {
  customization: CustomizationState;
}

export const JewelleryPreviewCanvas: React.FC<Props> = ({ customization }) => {
  const getMetalColor = (name: string) => {
    if (!name) return '#D4AF37';
    if (name.includes('Rose')) return '#C98D83';
    if (name.includes('White')) return '#D9D9D9';
    if (name.includes('Platinum')) return '#E0DFDB';
    if (name.includes('22K')) return '#E5A93C';
    return '#D4AF37';
  };

  const metalColor = getMetalColor(customization.metalName);

  return (
    <div className="bg-[#FAF7F0] border border-[#E8DEC8] rounded-md p-6 flex flex-col items-center justify-between shadow-xs relative overflow-hidden min-h-[460px]">
      {/* Top watermark / trust mark */}
      <div className="w-full flex items-center justify-between text-xs text-[#7A6E5E] border-b border-[#EDE4D2] pb-3">
        <span className="font-serif tracking-wider uppercase font-semibold text-[#8B5E20]">
          REDDY ATELIER STUDIO PREVIEW
        </span>
        <div className="flex items-center gap-1.5 text-[11px] text-[#8B5E20]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Natural Certified</span>
        </div>
      </div>

      {/* Main Visual Representation */}
      <div className="relative w-full max-w-xs aspect-square my-auto flex items-center justify-center">
        {/* Soft radial backdrop halo */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: metalColor }}
        />

        {/* Base Jewellery Graphic Container */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Base Ring / Jewellery Silhouette SVG with dynamic metal color and diamond */}
          <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md">
            <defs>
              {/* Dynamic Metal Gradient */}
              <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="35%" stopColor={metalColor} />
                <stop offset="70%" stopColor="#6E4A15" stopOpacity="0.85" />
                <stop offset="100%" stopColor={metalColor} />
              </linearGradient>

              {/* Diamond Sparkle Gradient */}
              <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#F4F8FA" />
                <stop offset="70%" stopColor="#D9ECF7" />
                <stop offset="100%" stopColor="#BCD8EA" />
              </linearGradient>

              <radialGradient id="sparkleReflect" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#A8D8F0" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#80B8D9" stopOpacity="0.1" />
              </radialGradient>
            </defs>

            {customization.jewelleryType === 'Necklace' ? (
              // Necklace representation
              <g>
                <path
                  d="M 50 60 C 50 180, 190 180, 190 60"
                  fill="none"
                  stroke="url(#metalGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <circle cx="120" cy="145" r="14" fill="url(#metalGrad)" />
                <circle cx="120" cy="145" r="9" fill="url(#diamondGrad)" stroke="#FFFFFF" strokeWidth="1" />
              </g>
            ) : customization.jewelleryType === 'Earrings' ? (
              // Earrings representation
              <g>
                <circle cx="85" cy="90" r="10" fill="url(#metalGrad)" />
                <circle cx="85" cy="130" r="16" fill="url(#diamondGrad)" stroke="url(#metalGrad)" strokeWidth="3" />
                <circle cx="155" cy="90" r="10" fill="url(#metalGrad)" />
                <circle cx="155" cy="130" r="16" fill="url(#diamondGrad)" stroke="url(#metalGrad)" strokeWidth="3" />
              </g>
            ) : customization.jewelleryType === 'Bracelet' ? (
              // Bracelet representation
              <g>
                <ellipse cx="120" cy="120" rx="75" ry="60" fill="none" stroke="url(#metalGrad)" strokeWidth="10" />
                <circle cx="120" cy="60" r="8" fill="url(#diamondGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="160" cy="75" r="6" fill="url(#diamondGrad)" stroke="#FFFFFF" strokeWidth="1" />
                <circle cx="80" cy="75" r="6" fill="url(#diamondGrad)" stroke="#FFFFFF" strokeWidth="1" />
              </g>
            ) : customization.jewelleryType === 'Pendant' ? (
              // Pendant representation
              <g>
                <path d="M 120 40 L 120 90" stroke="url(#metalGrad)" strokeWidth="3" />
                <polygon points="115,85 125,85 120,95" fill="url(#metalGrad)" />
                <circle cx="120" cy="130" r="24" fill="url(#diamondGrad)" stroke="url(#metalGrad)" strokeWidth="5" />
              </g>
            ) : (
              // Ring representation (Default)
              <g>
                {/* Main Outer Shank */}
                <ellipse
                  cx="120"
                  cy="140"
                  rx="68"
                  ry="58"
                  fill="none"
                  stroke="url(#metalGrad)"
                  strokeWidth="15"
                />
                {/* Inner Shank shadow for depth */}
                <ellipse
                  cx="120"
                  cy="140"
                  rx="58"
                  ry="48"
                  fill="none"
                  stroke="#5A4018"
                  strokeWidth="1.5"
                  opacity="0.35"
                />

                {/* Prongs / Crown Mount */}
                <path
                  d="M 100 85 L 108 55 L 114 62 L 120 52 L 126 62 L 132 55 L 140 85 Z"
                  fill="url(#metalGrad)"
                  stroke="#4E330C"
                  strokeWidth="1"
                />

                {/* Diamond Silhouette according to selected shape */}
                {customization.diamondShape === 'Princess' ? (
                  <rect
                    x="105"
                    y="45"
                    width="30"
                    height="30"
                    transform="rotate(45 120 60)"
                    fill="url(#diamondGrad)"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                ) : customization.diamondShape === 'Emerald' ? (
                  <rect
                    x="108"
                    y="46"
                    width="24"
                    height="32"
                    rx="3"
                    fill="url(#diamondGrad)"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                ) : customization.diamondShape === 'Oval' ? (
                  <ellipse
                    cx="120"
                    cy="60"
                    rx="16"
                    ry="22"
                    fill="url(#diamondGrad)"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                ) : customization.diamondShape === 'Heart' ? (
                  <path
                    d="M 120 74 C 115 65 102 58 102 48 C 102 40 108 34 116 34 C 118 34 120 36 120 37 C 120 36 122 34 124 34 C 132 34 138 40 138 48 C 138 58 125 65 120 74 Z"
                    fill="url(#diamondGrad)"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                ) : customization.diamondShape === 'Pear' ? (
                  <path
                    d="M 120 40 C 132 55 136 68 120 78 C 104 68 108 55 120 40 Z"
                    fill="url(#diamondGrad)"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                ) : (
                  // Brilliant Round Diamond
                  <circle
                    cx="120"
                    cy="60"
                    r={18 + Math.min(customization.carat * 3, 10)}
                    fill="url(#diamondGrad)"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                )}

                {/* Diamond Internal Facet Lines */}
                <polygon
                  points="120,50 128,58 120,68 112,58"
                  fill="url(#sparkleReflect)"
                  stroke="#FFFFFF"
                  strokeWidth="0.75"
                />
              </g>
            )}
          </svg>

          {/* Sparkle micro-badge */}
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs border border-[#E8DEC8] px-2 py-1 rounded shadow-xs flex items-center gap-1 text-[11px] text-[#8B5E20]">
            <Sparkles className="w-3 h-3 text-[#B8863B]" />
            <span className="font-semibold">{customization.carat} ct {customization.diamondShape}</span>
          </div>

          {/* Engraving Tag if defined */}
          {customization.engraving && (
            <div className="absolute -bottom-2 bg-white/95 border border-[#D5C2A5] px-3 py-1 rounded shadow-sm text-center">
              <span className="text-[10px] uppercase tracking-wider text-[#8A7D6B] block">Engraved Inscription</span>
              <span className="font-serif italic text-xs text-[#171717] font-semibold">"{customization.engraving}"</span>
            </div>
          )}
        </div>
      </div>

      {/* Configuration Highlights Footer */}
      <div className="w-full pt-4 border-t border-[#EDE4D2] grid grid-cols-3 gap-2 text-center text-xs">
        <div>
          <span className="text-[10px] text-[#8A7D6B] block uppercase tracking-wider">Metal</span>
          <span className="font-medium text-[#171717] truncate block">{customization.metalName || '18K Yellow Gold'}</span>
        </div>
        <div>
          <span className="text-[10px] text-[#8A7D6B] block uppercase tracking-wider">Diamond</span>
          <span className="font-medium text-[#171717] truncate block">{customization.carat} ct · {customization.diamondShape}</span>
        </div>
        <div>
          <span className="text-[10px] text-[#8A7D6B] block uppercase tracking-wider">Size</span>
          <span className="font-medium text-[#171717] truncate block">{customization.size ? `Size ${customization.size}` : 'Standard'}</span>
        </div>
      </div>
    </div>
  );
};
