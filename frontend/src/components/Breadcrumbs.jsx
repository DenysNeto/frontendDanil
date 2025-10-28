import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="text-sm text-gray-600 flex gap-2">
      {segments.map((seg, i) => (
        <span key={i} className="flex items-center gap-2">
          {i!=0 && <span className="text-gray-400">\</span>}
          <span className={`${i==segments.length-1  && 'font-bold'}`}>{seg.toUpperCase()}</span>
        </span>
      ))}
    </nav>
  );
}