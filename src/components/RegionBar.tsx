import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { REGIONS_DATA } from '../data/academyData';
import { RegionId } from '../types';
import { Globe, Phone, Clock } from 'lucide-react';

export const RegionBar: React.FC = () => {
  const { region, setRegionById } = useAcademy();

  return (
    <div className="bg-[#14241E] text-[#E6E4DC] text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#23382F]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Region Switcher with Flag Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
          <span className="hidden sm:inline-flex items-center gap-1 text-stone-300 font-medium whitespace-nowrap text-[11px] sm:text-xs">
            <Globe className="w-3.5 h-3.5 text-[#D49A3D]" />
            <span>Region:</span>
          </span>
          <div className="flex items-center gap-1">
            {(Object.keys(REGIONS_DATA) as RegionId[]).map((regKey) => {
              const reg = REGIONS_DATA[regKey];
              const isActive = reg.id === region.id;
              return (
                <button
                  key={reg.id}
                  onClick={() => setRegionById(reg.id)}
                  className={`px-1.5 sm:px-2 py-0.5 rounded transition-all text-xs flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0E6245] text-white font-semibold shadow-xs ring-1 ring-[#D49A3D]/40'
                      : 'text-stone-300 hover:text-white hover:bg-[#23382F]'
                  }`}
                  title={`View pricing and schedules for ${reg.name}`}
                >
                  <span className="text-sm sm:text-xs">{reg.flag}</span>
                  <span className="hidden md:inline">{reg.name}</span>
                  <span className="text-[10px] sm:hidden font-mono font-medium">{reg.currencyCode}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: Live timezone notice (Desktop only) */}
        <div className="hidden lg:flex items-center gap-2 text-stone-300">
          <Clock className="w-3.5 h-3.5 text-[#D49A3D]" />
          <span>Local Times for {region.name}: <strong className="text-white font-medium">{region.primaryTimezone}</strong></span>
        </div>

        {/* Right: Phone / WhatsApp Hotline */}
        <div className="flex items-center gap-2 sm:gap-4 text-stone-300 shrink-0">
          <span className="hidden xl:inline text-[#D49A3D] font-medium text-[11px]">
            3 Free Classes · No Credit Card Required
          </span>
          <a
            href={`tel:${region.supportPhone.replace(/[^0-9+]/g, '')}`}
            className="flex items-center gap-1 text-stone-200 hover:text-white transition-colors text-[11px] sm:text-xs"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
            <span className="font-mono">{region.supportPhone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
