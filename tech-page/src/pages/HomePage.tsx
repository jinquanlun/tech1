import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationStage, setAnimationStage] = useState(0);
  const [swipeCount, setSwipeCount] = useState(0);
  const lastScrollTime = useRef(0);
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    composer?: any;
    cubeGroup?: THREE.Group;
    ring0?: THREE.LineSegments;
    ring1?: THREE.LineSegments;
    ring2?: THREE.LineSegments;
    cylinder?: THREE.LineSegments;
    animationId?: number;
  }>({});

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, (window.innerWidth / 2) / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });

    // Set canvas to proper size to maintain aspect ratio
    const canvasWidth = window.innerWidth / 2;
    const canvasHeight = window.innerHeight;

    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 0);

    // Create groups
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    // Create rings function
    function makeRing(radius: number, parent: THREE.Object3D) {
      const geometry = new THREE.CylinderGeometry(radius, radius, 0.1, 64);
      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xebe3c7 }));
      parent.add(line);
      return line;
    }

    // Create rings
    const ring0 = makeRing(3, scene);
    const ring1 = makeRing(3.3, ring0);
    const ring2 = makeRing(3.6, ring1);

    // Create octahedron (main globe)
    const geometry = new THREE.OctahedronGeometry(2, 3);
    const material = new THREE.MeshPhongMaterial({ color: 0x999999, opacity: 0.6, transparent: true });
    const cube = new THREE.Mesh(geometry, material);
    cubeGroup.add(cube);

    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xE5E4E2 }));
    line.scale.set(1.1, 1.1, 1.1);
    cubeGroup.add(line);

    // Create cylinder
    const cylinderGeometry = new THREE.CylinderGeometry(8, 8, 1000, 3);
    const cylinderEdges = new THREE.EdgesGeometry(cylinderGeometry);
    const cylinder = new THREE.LineSegments(cylinderEdges, new THREE.LineBasicMaterial({ color: 0x888888 }));
    cylinder.rotation.set(Math.PI / 2, 0, 0);
    scene.add(cylinder);

    // Add lighting
    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
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
      sceneRef.current.renderer.render(sceneRef.current.scene!, sceneRef.current.camera!);
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

    // Scroll animation logic - 只处理文字动画，不拦截页面切换
    function handleScroll(event: WheelEvent) {
      const now = Date.now();

      // Throttle scrolling to prevent too fast transitions
      if (now - lastScrollTime.current < 300) {
        return;
      }

      if (event.deltaY > 0) { // Scrolling down
        // 只在前两次滑动时更新动画和计数
        if (swipeCount < 2) {
          setSwipeCount(prev => prev + 1);
          if (animationStage < 2) {
            setAnimationStage(prev => prev + 1);
          }
          lastScrollTime.current = now;
        }
        // 不阻止默认滚动行为，让正常的页面切换发生
      }
    }

    window.addEventListener('wheel', handleScroll, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleScroll);
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose();
      }
    };
  }, [animationStage, swipeCount]);

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