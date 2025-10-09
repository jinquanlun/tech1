import { useEffect, useRef, useState, useMemo, useCallback, memo } from 'react';
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
  const isInitialized = useRef(false);
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

  // Memoize geometry creation with balanced optimization
  const geometries = useMemo(() => {
    console.log('Creating balanced geometries...');

    // Moderate optimization - maintain visual quality while reducing memory
    const cylinderGeom = new CylinderGeometry(8, 8, 1000, 8); // Slightly reduced segments
    const octahedronGeom = new OctahedronGeometry(2, 2); // Reduced from 3 to 2 for balance

    // Individual ring geometries with moderate reduction
    const ringGeom1 = new CylinderGeometry(3, 3, 0.1, 32); // Reduced from 64 to 32
    const ringGeom2 = new CylinderGeometry(3.3, 3.3, 0.1, 32);
    const ringGeom3 = new CylinderGeometry(3.6, 3.6, 0.1, 32);

    return {
      cylinder: cylinderGeom,
      octahedron: octahedronGeom,
      ring1: ringGeom1,
      ring2: ringGeom2,
      ring3: ringGeom3
    };
  }, []);

  // Memoize materials to avoid recreating - create separate materials for each use
  const materials = useMemo(() => ({
    ringLine1: new LineBasicMaterial({ color: 0xebe3c7 }),
    ringLine2: new LineBasicMaterial({ color: 0xebe3c7 }),
    ringLine3: new LineBasicMaterial({ color: 0xebe3c7 }),
    octahedronMesh: new MeshPhongMaterial({ color: 0x999999, opacity: 0.6, transparent: true }),
    octahedronLine: new LineBasicMaterial({ color: 0xE5E4E2 }),
    cylinderLine: new LineBasicMaterial({ color: 0x888888 })
  }), []);

  // Optimized scene initialization function
  const initializeScene = useCallback(() => {
    if (!canvasRef.current || isInitialized.current) return;

    console.log('Initializing Three.js scene...');
    const startTime = performance.now();

    // Initialize scene
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, (window.innerWidth / 2) / window.innerHeight, 0.1, 1000);
    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false, // Disable for better performance
      powerPreference: "high-performance"
    });

    // Set canvas to proper size to maintain aspect ratio
    const canvasWidth = window.innerWidth / 2;
    const canvasHeight = window.innerHeight;

    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Restore better pixel ratio for quality

    // Additional performance settings
    renderer.shadowMap.enabled = false; // Disable shadows to save memory
    renderer.outputColorSpace = 'srgb'; // Modern Three.js color space setting

    // Create groups
    const cubeGroup = new Group();
    scene.add(cubeGroup);

    // Create rings using individual geometries for proper visual quality
    function makeRing(geometry, material, parent) {
      const edges = new EdgesGeometry(geometry);
      const line = new LineSegments(edges, material);
      parent.add(line);
      return line;
    }

    // Create rings with individual geometries
    const ring0 = makeRing(geometries.ring1, materials.ringLine1, scene);
    const ring1 = makeRing(geometries.ring2, materials.ringLine2, ring0);
    const ring2 = makeRing(geometries.ring3, materials.ringLine3, ring1);

    // Create octahedron (main globe)
    const cube = new Mesh(geometries.octahedron, materials.octahedronMesh);
    cubeGroup.add(cube);

    const edges = new EdgesGeometry(geometries.octahedron);
    const line = new LineSegments(edges, materials.octahedronLine);
    line.scale.set(1.1, 1.1, 1.1);
    cubeGroup.add(line);

    // Create cylinder
    const cylinderEdges = new EdgesGeometry(geometries.cylinder);
    const cylinder = new LineSegments(cylinderEdges, materials.cylinderLine);
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

    isInitialized.current = true;
    const initTime = performance.now() - startTime;
    console.log(`Three.js scene initialized in ${initTime.toFixed(2)}ms`);

    // Memory usage monitoring
    if (performance.memory) {
      const memory = performance.memory;
      console.log(`Memory usage - Used: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(1)}MB, Total: ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(1)}MB`);
    }
  }, [geometries, materials]);

  // Separate useEffect for scene initialization - runs only once
  useEffect(() => {
    if (!canvasRef.current) return;

    initializeScene();

    // Optimized animation loop with performance tracking
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    function animate() {
      const scene = sceneRef.current;
      if (!scene.cubeGroup || !scene.ring0 || !scene.ring1 || !scene.ring2 || !scene.cylinder || !scene.renderer) return;

      // Batch rotation updates for better performance
      const cube = scene.cubeGroup;
      const rings = [scene.ring0, scene.ring1, scene.ring2];
      const cylinder = scene.cylinder;

      // Update rotations (pre-calculated values)
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.015;

      rings[0].rotation.x += 0.006;
      rings[0].rotation.y += 0.016;
      rings[1].rotation.z += 0.007;
      rings[1].rotation.y += 0.017;
      rings[2].rotation.x += 0.008;
      rings[2].rotation.y += 0.018;

      cylinder.rotation.y += 0.001;
      cylinder.rotation.x -= 0.0005;
      cylinder.rotation.z += 0.0015;

      // Render scene
      scene.renderer.render(scene.scene, scene.camera);

      // Performance and memory monitoring
      frameCount++;
      const now = performance.now();
      if (now - lastFpsUpdate > 5000) { // Check every 5 seconds instead of 1
        const fps = frameCount / ((now - lastFpsUpdate) / 1000);
        if (fps < 30) console.warn(`Low FPS detected: ${fps.toFixed(1)}`);

        // Memory monitoring
        if (performance.memory) {
          const memory = performance.memory;
          const usedMB = (memory.usedJSHeapSize / 1024 / 1024).toFixed(1);
          if (memory.usedJSHeapSize > 200 * 1024 * 1024) { // Warn if > 200MB
            console.warn(`High memory usage detected: ${usedMB}MB`);
          }
        }

        frameCount = 0;
        lastFpsUpdate = now;
      }

      scene.animationId = requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize with throttling
    let resizeTimeout;
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!sceneRef.current.camera || !sceneRef.current.renderer) return;

        const canvasWidth = window.innerWidth / 2;
        const canvasHeight = window.innerHeight;

        sceneRef.current.camera.aspect = canvasWidth / canvasHeight;
        sceneRef.current.camera.updateProjectionMatrix();
        sceneRef.current.renderer.setSize(canvasWidth, canvasHeight);
      }, 100); // Throttle resize events
    }

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []); // Remove dependencies to prevent re-initialization

  // Separate useEffect for scroll handling to avoid scene re-creation
  useEffect(() => {
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

    return () => {
      window.removeEventListener('wheel', handleScroll, { capture: true });
      window.removeEventListener('scroll', preventScroll, { capture: true });
      document.removeEventListener('wheel', preventScroll, { capture: true });
      document.removeEventListener('scroll', preventScroll, { capture: true });
      // 恢复页面滚动
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [animationStage, swipeCount, onAnimationComplete]);

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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose();
      }
      // Comprehensive cleanup for memory management
      if (sceneRef.current.scene) {
        sceneRef.current.scene.traverse((object) => {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }

      // Dispose geometries and materials
      Object.values(geometries).forEach(geom => {
        if (geom && typeof geom.dispose === 'function') geom.dispose();
      });
      Object.values(materials).forEach(mat => {
        if (mat && typeof mat.dispose === 'function') mat.dispose();
      });

      console.log('Three.js scene and resources disposed');
      isInitialized.current = false;
    };
  }, [geometries, materials]);

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

export default memo(HomePage);