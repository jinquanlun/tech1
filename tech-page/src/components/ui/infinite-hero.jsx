import { useEffect, useRef, useState } from 'react';
import {
  Mesh,
  PlaneGeometry,
  RawShaderMaterial,
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Clock,
  Vector3
} from 'three';

const GLSLHills = ({ width = '100vw', height = '100vh', cameraZ = 125, planeSize = 256, speed = 0.5 }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Early exit if canvas is not available
    if (!canvasRef.current) {
      console.warn('Canvas ref not available for WebGL initialization');
      return;
    }

    // Check WebGL support before proceeding
    const testCanvas = document.createElement('canvas');
    const testGl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');

    if (!testGl) {
      console.warn('WebGL not supported, skipping 3D background');
      return;
    }

    // Clean up test canvas
    testCanvas.remove();

    // 性能检测：根据设备能力调整精度，但保持原始效果
    const getOptimalSettings = () => {
      const isMobile = /Mobile|Android|iPhone|iPad/.test(navigator.userAgent);
      const isLowEnd = isMobile;

      if (isLowEnd) {
        return { segments: planeSize / 4, quality: 'low' }; // 减少顶点但保持比例
      } else {
        return { segments: planeSize / 3, quality: 'medium' }; // 平衡精度
      }
    };

    const settings = getOptimalSettings();

    // Plane class - 保持原始结构
    class Plane {
      constructor() {
        this.uniforms = {
          time: { type: 'f', value: 0 },
        };
        this.mesh = this.createMesh();
        this.time = speed * 0.5; // 减慢整体动画速度
        this.shaderProgram = null;
      }

      createMesh() {
        const material = new RawShaderMaterial({
          uniforms: this.uniforms,
          vertexShader: `
              #define GLSLIFY 1
              attribute vec3 position;
              uniform mat4 projectionMatrix;
              uniform mat4 modelViewMatrix;
              uniform float time;
              varying vec3 vPosition;

              mat4 rotateMatrixX(float radian) {
                return mat4(
                  1.0, 0.0, 0.0, 0.0,
                  0.0, cos(radian), -sin(radian), 0.0,
                  0.0, sin(radian), cos(radian), 0.0,
                  0.0, 0.0, 0.0, 1.0
                );
              }

              vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
              vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
              vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
              vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
              vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

              float cnoise(vec3 P) {
                vec3 Pi0 = floor(P);
                vec3 Pi1 = Pi0 + vec3(1.0);
                Pi0 = mod289(Pi0);
                Pi1 = mod289(Pi1);
                vec3 Pf0 = fract(P);
                vec3 Pf1 = Pf0 - vec3(1.0);
                vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
                vec4 iy = vec4(Pi0.yy, Pi1.yy);
                vec4 iz0 = Pi0.zzzz;
                vec4 iz1 = Pi1.zzzz;

                vec4 ixy = permute(permute(ix) + iy);
                vec4 ixy0 = permute(ixy + iz0);
                vec4 ixy1 = permute(ixy + iz1);

                vec4 gx0 = ixy0 * (1.0 / 7.0);
                vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
                gx0 = fract(gx0);
                vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
                vec4 sz0 = step(gz0, vec4(0.0));
                gx0 -= sz0 * (step(0.0, gx0) - 0.5);
                gy0 -= sz0 * (step(0.0, gy0) - 0.5);

                vec4 gx1 = ixy1 * (1.0 / 7.0);
                vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
                gx1 = fract(gx1);
                vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
                vec4 sz1 = step(gz1, vec4(0.0));
                gx1 -= sz1 * (step(0.0, gx1) - 0.5);
                gy1 -= sz1 * (step(0.0, gy1) - 0.5);

                vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
                vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
                vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
                vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
                vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
                vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
                vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
                vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

                vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
                g000 *= norm0.x;
                g010 *= norm0.y;
                g100 *= norm0.z;
                g110 *= norm0.w;
                vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
                g001 *= norm1.x;
                g011 *= norm1.y;
                g101 *= norm1.z;
                g111 *= norm1.w;

                float n000 = dot(g000, Pf0);
                float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
                float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
                float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
                float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
                float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
                float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
                float n111 = dot(g111, Pf1);

                vec3 fade_xyz = fade(Pf0);
                vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
                vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
                float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
                return 2.2 * n_xyz;
              }

              void main(void) {
                vec3 updatePosition = (rotateMatrixX(radians(90.0)) * vec4(position, 1.0)).xyz;
                float sin1 = sin(radians(updatePosition.x / 128.0 * 90.0));
                vec3 noisePosition = updatePosition + vec3(0.0, 0.0, time * -8.0);
                float noise1 = cnoise(noisePosition * 0.08);
                float noise2 = cnoise(noisePosition * 0.06);
                float noise3 = cnoise(noisePosition * 0.4);
                vec3 lastPosition = updatePosition + vec3(0.0,
                  noise1 * sin1 * 8.0
                  + noise2 * sin1 * 8.0
                  + noise3 * (abs(sin1) * 2.0 + 0.5)
                  + pow(sin1, 2.0) * 40.0, 0.0);

                vPosition = lastPosition;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(lastPosition, 1.0);
              }
            `,
            fragmentShader: `
              precision highp float;
              #define GLSLIFY 1
              varying vec3 vPosition;

              void main(void) {
                float opacity = (96.0 - length(vPosition)) / 256.0 * 0.6;
                vec3 color = vec3(0.6);
                gl_FragColor = vec4(color, opacity);
              }
            `,
            transparent: true
          });

        // Store material reference for cleanup
        this.material = material;

        return new Mesh(
          new PlaneGeometry(planeSize, planeSize, settings.segments, settings.segments),
          material
        );
      }

      render(time) {
        // Simplified and more reliable uniform update
        try {
          if (this.uniforms && this.uniforms.time && typeof this.uniforms.time.value === 'number') {
            this.uniforms.time.value += time * this.time;
          }
        } catch (error) {
          // Silently continue if uniform update fails
          console.warn('Uniform update failed:', error.message);
        }
      }

      dispose() {
        // Properly dispose of geometry and material
        if (this.mesh) {
          if (this.mesh.geometry) {
            this.mesh.geometry.dispose();
          }
          if (this.mesh.material) {
            this.mesh.material.dispose();
          }
        }
      }
    }

    // Three.js setup with comprehensive error handling
    let renderer;
    let webglContext;

    try {
      const canvas = canvasRef.current;

      // More thorough canvas validation
      if (!canvas || !canvas.parentNode) {
        console.warn('Canvas element not properly mounted');
        return;
      }

      // Check if canvas already has a context without creating one
      let hasExistingContext = false;
      try {
        // Check if canvas has a rendering context without creating one
        if (canvas.width !== undefined && canvas.height !== undefined) {
          // Canvas dimensions suggest it might have been used
          hasExistingContext = canvas.width > 0 || canvas.height > 0;
        }
      } catch (e) {
        // If any error, assume canvas is clean
        hasExistingContext = false;
      }

      // Always use a fresh canvas to avoid context conflicts
      const newCanvas = document.createElement('canvas');
      newCanvas.style.cssText = canvas.style.cssText;
      newCanvas.className = canvas.className;
      canvas.parentNode.replaceChild(newCanvas, canvas);
      canvasRef.current = newCanvas;

      // Validate WebGL support with more checks
      const testCanvas = document.createElement('canvas');
      webglContext = testCanvas.getContext('webgl', { failIfMajorPerformanceCaveat: false }) ||
                     testCanvas.getContext('experimental-webgl', { failIfMajorPerformanceCaveat: false });

      if (!webglContext) {
        console.warn('WebGL not supported on this device/browser');
        testCanvas.remove();
        return;
      }

      // Test WebGL capabilities
      const maxTextureSize = webglContext.getParameter(webglContext.MAX_TEXTURE_SIZE);
      const maxVertexAttribs = webglContext.getParameter(webglContext.MAX_VERTEX_ATTRIBS);

      if (maxTextureSize < 1024 || maxVertexAttribs < 8) {
        console.warn('WebGL capabilities insufficient for this scene');
        testCanvas.remove();
        return;
      }

      testCanvas.remove();

      // Create renderer with safer settings
      renderer = new WebGLRenderer({
        canvas: canvasRef.current,
        antialias: false,
        powerPreference: "default", // Changed from high-performance for compatibility
        stencil: false,
        depth: true,
        alpha: true,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false
      });

      // Validate renderer creation
      if (!renderer || !renderer.getContext()) {
        throw new Error('WebGL renderer creation failed');
      }

    } catch (error) {
      console.warn('Failed to create WebGL renderer:', error.message);
      return; // Exit early if renderer creation fails
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    const clock = new Clock();
    const plane = new Plane();

    // Visibility API - 页面不可见时停止渲染
    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const resize = () => {
      try {
        const canvas = canvasRef.current;
        if (canvas && renderer && camera) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }
      } catch (error) {
        console.warn('Resize error:', error.message);
      }
    };

    const render = () => {
      try {
        // Validate all components before rendering
        if (!renderer || !scene || !camera || !plane || !clock) {
          return;
        }

        const deltaTime = clock.getDelta();
        // Clamp delta time to prevent large jumps
        const clampedDelta = Math.min(deltaTime, 0.1);

        // Update plane animation
        plane.render(clampedDelta);

        // Render the scene
        renderer.render(scene, camera);
      } catch (error) {
        console.warn('WebGL render error caught and handled:', error.message);
        // Continue with next frame instead of crashing
      }
    };

    let animationId;
    const renderLoop = () => {
      // Check visibility first
      if (!isVisible) {
        animationId = requestAnimationFrame(renderLoop);
        return;
      }

      // Only render if all components are available
      if (renderer && scene && camera && plane) {
        render();
      }

      animationId = requestAnimationFrame(renderLoop);
    };

    const init = () => {
      try {
        // Validate renderer before proceeding
        if (!renderer || !renderer.getContext()) {
          console.warn('WebGL renderer not available');
          return;
        }

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // 保持原始透明背景
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // 限制像素比例

        camera.position.set(0, 16, cameraZ);
        camera.lookAt(new Vector3(0, 28, 0));
        scene.add(plane.mesh);
        window.addEventListener('resize', resize);
        resize();
        renderLoop();
      } catch (error) {
        console.warn('Failed to initialize WebGL scene:', error.message);
        return;
      }
    };

    init();

    return () => {
      // Cancel animation frame
      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      // Clean up event listeners
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Proper cleanup with error handling
      try {
        if (plane) {
          plane.dispose();
        }

        if (scene) {
          scene.clear();
        }

        if (renderer) {
          // Get context before disposing
          const gl = renderer.getContext();

          // Dispose renderer first
          renderer.dispose();

          // Then force context loss if extension is available
          if (gl) {
            const loseContextExt = gl.getExtension('WEBGL_lose_context');
            if (loseContextExt) {
              loseContextExt.loseContext();
            }
          }
        }
      } catch (error) {
        console.warn('Error during WebGL cleanup:', error.message);
      }
    };
  }, []); // 移除依赖项避免重复初始化

  return (
    <div ref={containerRef} style={{ position: 'relative', width, height }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1
        }}
      />
    </div>
  );
};

export default function InfiniteHero() {
    const [webglSupported, setWebglSupported] = useState(true);

    // Test WebGL support
    useEffect(() => {
        const testCanvas = document.createElement('canvas');
        const testGl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
        if (!testGl) {
            setWebglSupported(false);
        }
        testCanvas.remove();
    }, []);

    return (
        <div style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            backgroundColor: '#000000',
            color: '#ffffff'
        }}>
            {/* 背景动画 */}
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }}>
                {webglSupported ? (
                    <GLSLHills />
                ) : (
                    // CSS fallback animation
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(45deg, #1a1a1a, #2d2d2d, #1a1a1a)',
                        backgroundSize: '400% 400%',
                        animation: 'gradientShift 8s ease-in-out infinite'
                    }}>
                        <style>{`
                            @keyframes gradientShift {
                                0%, 100% { background-position: 0% 50%; }
                                50% { background-position: 100% 50%; }
                            }
                        `}</style>
                    </div>
                )}
            </div>

            {/* 文字内容 */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                height: '100vh',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem'
            }}>
                <div style={{
                    textAlign: 'center',
                    maxWidth: '72rem'
                }}>
                    <div
                        style={{
                            color: '#ffffff',
                            fontFamily: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif",
                            letterSpacing: '0.08em',
                            lineHeight: '2.4',
                            textShadow: '0 2px 10px rgba(255, 255, 255, 0.1)',
                            fontSize: 'clamp(1.8rem, 2.5vw, 1.8rem)',
                            fontWeight: 'normal',
                            WebkitFontSmoothing: 'antialiased',
                            MozOsxFontSmoothing: 'grayscale'
                        }}
                    >
                        在PRISM瓴境双核技术的协同赋能下<br />
                        既攻克了 高品质短保产品 的多个瓶颈<br />
                        <span style={{ letterSpacing: '0.15em' }}>保质期·损耗·成本</span><br />
                        同时又赋予了产品和品牌全新维度的<br />
                        <span style={{ letterSpacing: '0.15em' }}>可能性·生命力·竞争力·影响力</span><br />
                        为您构建起难以逾越的技术壁垒
                    </div>
                </div>
            </div>
        </div>
    );
}