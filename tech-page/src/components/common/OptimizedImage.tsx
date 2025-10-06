import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 优化的图片组件，自动支持WebP格式并提供PNG fallback
 * 使用HTML5 <picture> 元素实现浏览器自动选择最佳格式
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className, style }) => {
  // 生成WebP版本的路径（将.png替换为.webp）
  const webpSrc = src.replace(/\.png$/i, '.webp');

  return (
    <picture>
      {/* 现代浏览器优先使用WebP格式 */}
      <source srcSet={webpSrc} type="image/webp" />
      {/* 不支持WebP的浏览器fallback到原始PNG */}
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading="lazy" // 添加懒加载以进一步优化性能
      />
    </picture>
  );
};

export default OptimizedImage;