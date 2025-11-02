import { useLocation } from 'react-router-dom';
import { useModelStore1 } from '../store/useModelStore1';

export default function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  const selectedModelBenchmark = useModelStore1((s) => s.selectedModelBenchmark);

  const getSegmentLabel = (seg, index) => {
    // If this is the last segment and it's "prompt", replace with task name
    if (index === segments.length - 1 && seg === 'prompt' && selectedModelBenchmark?.title) {
      return selectedModelBenchmark.title.toUpperCase();
    }
    return seg.toUpperCase();
  };

  return (
    <nav className="text-sm text-gray-600 flex gap-2">
      {segments.map((seg, i) => (
        <span key={i} className="flex items-center gap-2">
          {i!=0 && <span className="text-gray-400">\</span>}
          <span className={`${i==segments.length-1  && 'font-bold'}`}>{getSegmentLabel(seg, i)}</span>
        </span>
      ))}
    </nav>
  );
}