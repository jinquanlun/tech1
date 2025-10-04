import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 只有当切换到详情页时才滚动到顶部
    // 主页有自己的滚动逻辑处理
    if (pathname.startsWith('/tech/') || pathname.startsWith('/video/')) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}