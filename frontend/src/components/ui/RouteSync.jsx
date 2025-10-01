// пример: src/components/RouteSync.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useNavigationStore from "../../store/useNavStore";

export default function RouteSync() {
  const location = useLocation();
  const setMainNavFromPath = useNavigationStore((s) => s.setMainNavFromPath);

  useEffect(() => {
    setMainNavFromPath(location.pathname + location.search);
  }, [location.pathname, location.search, setMainNavFromPath]);

  return null; // компонент ничего не рендерит — только синхронизирует
}