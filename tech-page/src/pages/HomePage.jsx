import { useEffect, useRef, useState } from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Group,
  LineSegments,
  CylinderGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  OctahedronGeometry,
  MeshPhongMaterial,
  Mesh,
  DirectionalLight
} from 'three';
import '../styles/pages/HomePage.css';

const HomePage = ({ onAnimationComplete }) => {
  const canvasRef = useRef(null);
  const [animationStage, setAnimationStage] = useState(0);
  const [swipeCount, setSwipeCount] = useState(0);
  const lastScrollTime = useRef(0);
  const sceneRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    cubeGroup: null,
    ring0: null,
    ring1: null,
    ring2: null,
    cylinder: null,
    animationId: null
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize scene
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, (window.innerWidth / 2) / window.innerHeight, 0.1, 1000);
    const renderer = new WebGLRenderer({ canvas: canvasRef.current, alpha: true });

    // Set canvas to proper size to maintain aspect ratio
    const canvasWidth = window.innerWidth / 2;
    const canvasHeight = window.innerHeight;

    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 0);

    // Create groups
    const cubeGroup = new Group();
    scene.add(cubeGroup);

    // Create rings function
    function makeRing(radius, parent) {
      const geometry = new CylinderGeometry(radius, radius, 0.1, 64);
      const edges = new EdgesGeometry(geometry);
      const line = new LineSegments(edges, new LineBasicMaterial({ color: 0xebe3c7 }));
      parent.add(line);
      return line;
    }

    // Create rings
    const ring0 = makeRing(3, scene);
    const ring1 = makeRing(3.3, ring0);
    const ring2 = makeRing(3.6, ring1);

    // Create octahedron (main globe)
    const geometry = new OctahedronGeometry(2, 3);
    const material = new MeshPhongMaterial({ color: 0x999999, opacity: 0.6, transparent: true });
    const cube = new Mesh(geometry, material);
    cubeGroup.add(cube);

    const edges = new EdgesGeometry(geometry);
    const line = new LineSegments(edges, new LineBasicMaterial({ color: 0xE5E4E2 }));
    line.scale.set(1.1, 1.1, 1.1);
    cubeGroup.add(line);

    // Create cylinder
    const cylinderGeometry = new CylinderGeometry(8, 8, 1000, 3);
    const cylinderEdges = new EdgesGeometry(cylinderGeometry);
    const cylinder = new LineSegments(cylinderEdges, new LineBasicMaterial({ color: 0x888888 }));
    cylinder.rotation.set(Math.PI / 2, 0, 0);
    scene.add(cylinder);

    // Add lighting
    const light = new DirectionalLight(0xFFFFFF, 1);
    scene.add(light);

    // Position camera
    camera.position.z = 8;

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      cubeGroup,
      ring0,
      ring1,
      ring2,
      cylinder
    };

    // Animation loop
    function animate() {
      if (!sceneRef.current.cubeGroup || !sceneRef.current.ring0 || !sceneRef.current.ring1 || !sceneRef.current.ring2 || !sceneRef.current.cylinder || !sceneRef.current.renderer) return;

      sceneRef.current.cubeGroup.rotation.x += 0.005;
      sceneRef.current.cubeGroup.rotation.y += 0.015;
      sceneRef.current.ring0.rotation.x += 0.006;
      sceneRef.current.ring0.rotation.y += 0.016;
      sceneRef.current.ring1.rotation.z += 0.007;
      sceneRef.current.ring1.rotation.y += 0.017;
      sceneRef.current.ring2.rotation.x += 0.008;
      sceneRef.current.ring2.rotation.y += 0.018;
      sceneRef.current.cylinder.rotation.y += 0.001;
      sceneRef.current.cylinder.rotation.x -= 0.0005;
      sceneRef.current.cylinder.rotation.z += 0.0015;

      sceneRef.current.animationId = requestAnimationFrame(animate);
      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
    }

    animate();

    // Handle window resize
    function handleResize() {
      if (!sceneRef.current.camera || !sceneRef.current.renderer) return;

      const canvasWidth = window.innerWidth / 2;
      const canvasHeight = window.innerHeight;

      sceneRef.current.camera.aspect = canvasWidth / canvasHeight;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(canvasWidth, canvasHeight);
    }

    window.addEventListener('resize', handleResize);

    // 强力滚动阻止函数 - 在前两次滑动期间完全控制滚动
    function handleScroll(event) {
      const now = Date.now();

      // Throttle scrolling to prevent too fast transitions
      if (now - lastScrollTime.current < 300) {
        // 如果还在前两次动画阶段，继续阻止滚动
        if (swipeCount < 2) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
        }
        return;
      }

      if (event.deltaY > 0) { // Scrolling down
        // 前两次滑动：完全阻止页面滚动，只触发文字动画
        if (swipeCount < 2) {
          // 强力阻止所有滚动行为
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();

          setSwipeCount(prev => prev + 1);
          setAnimationStage(prev => {
            const newStage = prev + 1;
            // 当动画完成时通知父组件
            if (newStage >= 2 && onAnimationComplete) {
              setTimeout(() => {
                onAnimationComplete(true);
              }, 800); // 延迟通知确保动画完成
            }
            return newStage;
          });
          lastScrollTime.current = now;
          return; // 确保不执行后续逻辑
        }
        // 第三次及以后的滑动：允许正常页面滚动
      }
    }

    // 添加多层滚动阻止机制
    const preventScroll = (e) => {
      if (swipeCount < 2) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    };

    // 使用多个事件监听器确保完全控制
    window.addEventListener('wheel', handleScroll, { passive: false, capture: true });
    window.addEventListener('scroll', preventScroll, { passive: false, capture: true });
    document.addEventListener('wheel', preventScroll, { passive: false, capture: true });
    document.addEventListener('scroll', preventScroll, { passive: false, capture: true });

    // 物理阻止滚动 - 在前两次动画期间完全禁用body滚动
    const updateBodyScroll = () => {
      if (swipeCount < 2) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
      }
    };

    updateBodyScroll();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleScroll, { capture: true });
      window.removeEventListener('scroll', preventScroll, { capture: true });
      document.removeEventListener('wheel', preventScroll, { capture: true });
      document.removeEventListener('scroll', preventScroll, { capture: true });
      // 恢复页面滚动
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose();
      }
    };
  }, [animationStage, swipeCount]);

  // 专门处理滚动状态更新的useEffect
  useEffect(() => {
    if (swipeCount < 2) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
  }, [swipeCount]);

  return (
    <div className="homepage">
      {/* 左侧文字内容 */}
      <div className="left-content">
        <div className="text-content">
          <h1 className={`main-title ${animationStage >= 1 ? 'animate-in' : ''}`}>独家科技</h1>
          <h1 className={`main-title ${animationStage >= 1 ? 'animate-in' : ''}`}>双核赋能</h1>
          <h1 className={`main-title long-title ${animationStage >= 1 ? 'animate-in' : ''}`}>革新产品全球竞争力</h1>

          <div className={`description ${animationStage >= 2 ? 'animate-in' : ''}`}>
            <p>我们拥有2项世界领先的专利技术</p>
            <p>它们并非普通的量变工具</p>
            <p>而是能够实现从 产品力本质 到 商业模式</p>
            <p>价值重塑+规则重构的质变武器</p>
          </div>
        </div>
      </div>

      {/* 右侧3D动画区域 */}
      <div className="right-content">
        <canvas ref={canvasRef} className="globe-canvas" />
        <div className={`bottom-text ${animationStage >= 2 ? 'animate-in' : ''}`}>穿越周期·双核无界</div>
      </div>
    </div>
  );
};

export default HomePage;