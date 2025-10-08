import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 只有当切换到详情页时才滚动到顶部
    // 主页有自己的滚动逻辑处理
    if (pathname.startsWith('/tech/') || pathname.startsWith('/video/')) {
      // 使用多种方法确保滚动到顶部
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // 延迟执行以确保覆盖其他滚动行为
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}