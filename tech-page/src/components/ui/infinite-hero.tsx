import { useGSAP } from "@gsap/react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface ShaderPlaneProps {
    vertexShader: string;
    fragmentShader: string;
    uniforms: { [key: string]: { value: unknown } };
}

function ShaderPlane({
    vertexShader,
    fragmentShader,
    uniforms,
}: ShaderPlaneProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const { size, viewport } = useThree();

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.u_time.value = state.clock.elapsedTime * 0.5;
            material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
        }
    });

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    );
}

interface ShaderBackgroundProps {
    vertexShader?: string;
    fragmentShader?: string;
    uniforms?: { [key: string]: { value: unknown } };
    className?: string;
}

function ShaderBackground({
    vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader = `
    precision highp float;

    varying vec2 vUv;
    uniform float u_time;
    uniform vec3 u_resolution;
    uniform sampler2D iChannel0;

    #define STEP 128
    #define EPS .005

    float smin( float a, float b, float k )
    {
        float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
        return mix( b, a, h ) - k*h*(1.0-h);
    }

    const mat2 m = mat2(.8,.6,-.6,.8);

    float noise( in vec2 x )
    {
      return sin(1.5*x.x)*sin(1.5*x.y);
    }

    float fbm6( vec2 p )
    {
        float f = 0.0;
        f += 0.500000*(0.5+0.5*noise( p )); p = m*p*2.02;
        f += 0.250000*(0.5+0.5*noise( p )); p = m*p*2.03;
        f += 0.125000*(0.5+0.5*noise( p )); p = m*p*2.01;
        f += 0.062500*(0.5+0.5*noise( p )); p = m*p*2.04;
        //f += 0.031250*(0.5+0.5*noise( p )); p = m*p*2.01;
        f += 0.015625*(0.5+0.5*noise( p ));
        return f/0.96875;
    }


    mat2 getRot(float a)
    {
        float sa = sin(a), ca = cos(a);
        return mat2(ca,-sa,sa,ca);
    }


    vec3 _position;

    float sphere(vec3 center, float radius)
    {
        return distance(_position,center) - radius;
    }

    float swingPlane(float height)
    {
        vec3 pos = _position + vec3(0.,0.,u_time * 5.5);
        float def =  fbm6(pos.xz * .25) * 0.5;

        float way = pow(abs(pos.x) * 34. ,2.5) *.0000125;
        def *= way;

        float ch = height + def;
        return max(pos.y - ch,0.);
    }

    float map(vec3 pos)
    {
        _position = pos;

        float dist;
        dist = swingPlane(0.);

        float sminFactor = 5.25;
        dist = smin(dist,sphere(vec3(0.,-15.,80.),60.),sminFactor);
        return dist;
    }


    vec3 getNormal(vec3 pos)
    {
        vec3 nor = vec3(0.);
        vec3 vv = vec3(0.,1.,-1.)*.01;
        nor.x = map(pos + vv.zxx) - map(pos + vv.yxx);
        nor.y = map(pos + vv.xzx) - map(pos + vv.xyx);
        nor.z = map(pos + vv.xxz) - map(pos + vv.xxy);
        nor /= 2.;
        return normalize(nor);
    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 uv = (fragCoord.xy-.5*u_resolution.xy)/u_resolution.y;

        vec3 rayOrigin = vec3(uv + vec2(0.,6.), -1. );

        vec3 rayDir = normalize(vec3(uv , 1.));

        rayDir.zy = getRot(.15) * rayDir.zy;

        vec3 position = rayOrigin;


        float curDist;
        int nbStep = 0;

        for(; nbStep < STEP;++nbStep)
        {
            curDist = map(position + (texture(iChannel0, position.xz) - .5).xyz * .005);

            if(curDist < EPS)
                break;
            position += rayDir * curDist * .5;
        }

        float f;

        float dist = distance(rayOrigin,position);
        f = dist /(98.);
        f = float(nbStep) / float(STEP);

        f *= .9;
        vec3 col = vec3(f);

        fragColor = vec4(col,1.0);
    }
    void main() {
      vec4 fragColor;
      vec2 fragCoord = vUv * u_resolution.xy;
      mainImage(fragColor, fragCoord);
      gl_FragColor = fragColor;
    }
  `,
    uniforms = {},
    className = "w-full h-full",
}: ShaderBackgroundProps) {
    const shaderUniforms = useMemo(
        () => ({
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector3(1, 1, 1) },
            ...uniforms,
        }),
        [uniforms],
    );

    return (
        <div className={className} style={{ width: '100%', height: '100%' }}>
            <Canvas
                className={className}
                style={{ width: '100%', height: '100%', display: 'block' }}
                camera={{ position: [0, 0, 1], fov: 45, near: 0.1, far: 1000 }}
                dpr={Math.min(window.devicePixelRatio, 2)}
                gl={{
                    preserveDrawingBuffer: false,
                    powerPreference: "high-performance",
                    antialias: false,
                    alpha: false,
                    stencil: false,
                    depth: false
                }}
                frameloop="always"
            >
                <ShaderPlane
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={shaderUniforms}
                />
            </Canvas>
        </div>
    );
}

export default function InfiniteHero() {
    const rootRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useGSAP(
        () => {
            if (!mounted) return;

            // 简单的淡入动画，不使用SplitText
            gsap.set(bgRef.current, { filter: "blur(28px)" });
            gsap.set([h1Ref.current, pRef.current], {
                opacity: 0,
                y: 30,
            });

            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
            tl.to(bgRef.current, { filter: "blur(0px)", duration: 1.2 }, 0)
                .to(h1Ref.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                }, 0.3)
                .to(pRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                }, 0.6);
        },
        { scope: rootRef, dependencies: [mounted] },
    );

    return (
        <div
            ref={rootRef}
            className="relative h-screen w-full overflow-hidden bg-black text-white"
        >
            <div className="absolute inset-0" ref={bgRef} style={{ width: '100%', height: '100%' }}>
                <ShaderBackground className="h-full w-full" />
            </div>

            <div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_80%_at_50%_50%,_transparent_40%,_black_100%)]" />

            <div className="relative z-10 flex h-screen w-full items-center justify-center px-6">
                <div className="text-center">
                    <h1
                        ref={h1Ref}
                        style={{
                            color: '#ffffff',
                            fontFamily: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif",
                            textShadow: '0 2px 10px rgba(255, 255, 255, 0.1)',
                            letterSpacing: '0.02em'
                        }}
                        className="mx-auto max-w-5xl text-[clamp(1.8rem,4.5vw,3.2rem)] font-normal leading-[1.35] antialiased"
                    >
                        在这双核技术的协同赋能下<br />
                        不仅可以攻克高品质短保产品全球化的多个瓶颈<br />
                        <span style={{ color: '#e6e6e6', fontSize: '0.95em' }}>保质期 损耗与成本</span><br />
                        同时赋予了产品和品牌全新维度的
                    </h1>
                    <p
                        ref={pRef}
                        style={{
                            color: '#ffffff',
                            fontFamily: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif",
                            textShadow: '0 1px 5px rgba(255, 255, 255, 0.1)',
                            letterSpacing: '0.03em'
                        }}
                        className="mx-auto mt-10 max-w-4xl text-[clamp(1.4rem,3.2vw,2.2rem)] font-light leading-[1.6] antialiased"
                    >
                        <span style={{ fontWeight: '400' }}>可能性，生命力，竞争力，和影响力</span><br />
                        <span style={{ fontSize: '0.9em', color: '#f0f0f0' }}>为您构建起难以逾越的技术强垒</span>
                    </p>
                </div>
            </div>
        </div>
    );
}