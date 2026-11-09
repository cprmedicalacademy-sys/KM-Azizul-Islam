import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Eye, RotateCcw, Sparkles, Layers, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';

export type MeshStyle = 'crystal' | 'chrome' | 'wireframe';

export const ThreeHeroScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [meshStyle, setMeshStyle] = useState<MeshStyle>('crystal');
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // References to communicate with render loop without remounting canvas
  const sceneStateRef = useRef({
    meshStyle: 'crystal' as MeshStyle,
    rotationSpeed: 1,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
  });

  useEffect(() => {
    sceneStateRef.current.meshStyle = meshStyle;
    sceneStateRef.current.rotationSpeed = rotationSpeed;
  }, [meshStyle, rotationSpeed]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software GL Detection
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Renderer Setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // 4. Studio Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x030712, 1.0);
    scene.add(hemiLight);

    // Key Light (Electric Cyan)
    const keyLight = new THREE.DirectionalLight(0x00e5ff, 3.5);
    keyLight.position.set(5, 5, 6);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Rim Light (Neon Purple)
    const rimLight = new THREE.PointLight(0xa855f7, 4.0, 15);
    rimLight.position.set(-5, -3, 3);
    scene.add(rimLight);

    // Backlight for edge glow
    const backLight = new THREE.DirectionalLight(0x3b82f6, 2.0);
    backLight.position.set(0, -6, -4);
    scene.add(backLight);

    // 6. Master Procedural Composite 3D Object Group (Azizul's Creative Core)
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Material definitions
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0f2b48,
      emissive: 0x002244,
      metalness: 0.1,
      roughness: 0.12,
      transmission: isSoftwareGl ? 0 : 0.88,
      transparent: true,
      opacity: isSoftwareGl ? 0.6 : 0.95,
      ior: 1.52,
      thickness: 1.2,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x031c34,
      metalness: 0.95,
      roughness: 0.15,
      envMapIntensity: 2.0,
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });

    // 6a. Main Icosahedron Core
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMesh: THREE.Mesh = new THREE.Mesh(coreGeometry, glassMaterial);
    coreMesh.castShadow = !isSoftwareGl;
    masterGroup.add(coreMesh);

    // 6b. Inner Glowing Octahedron
    const innerGeometry = new THREE.OctahedronGeometry(0.9, 0);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x6d28d9,
      emissiveIntensity: 1.5,
      metalness: 0.8,
      roughness: 0.2,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    masterGroup.add(innerMesh);

    // 6c. Nested Orbiting Vector Bezier Rings
    const ring1Geom = new THREE.TorusGeometry(2.3, 0.035, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x007799,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    masterGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(2.8, 0.025, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x4c1d95,
      metalness: 0.85,
      roughness: 0.25,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    masterGroup.add(ring2);

    // 6d. Orbiting Satellite Geometric Prisms
    const satellitesGroup = new THREE.Group();
    masterGroup.add(satellitesGroup);

    const satGeom1 = new THREE.OctahedronGeometry(0.28, 0);
    const satMat1 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.8,
      roughness: 0.2,
    });

    const satGeom2 = new THREE.TetrahedronGeometry(0.26, 0);
    const satMat2 = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      metalness: 0.85,
      roughness: 0.2,
    });

    const satCount = 4;
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < satCount; i++) {
      const isEven = i % 2 === 0;
      const mesh = new THREE.Mesh(isEven ? satGeom1 : satGeom2, isEven ? satMat1 : satMat2);
      const angle = (i / satCount) * Math.PI * 2;
      const dist = 3.3;
      mesh.position.set(Math.cos(angle) * dist, Math.sin(angle) * 0.8, Math.sin(angle) * dist);
      satellitesGroup.add(mesh);
      satellites.push(mesh);
    }

    // 7. Swirling Particle Starfield / Vector Nodes
    const particleCount = isSoftwareGl ? 350 : 1200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colCyan = new THREE.Color(0x00e5ff);
    const colPurple = new THREE.Color(0x8b5cf6);
    const colBlue = new THREE.Color(0x3b82f6);

    for (let i = 0; i < particleCount; i++) {
      // Cylinder distribution
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 5.0;
      const y = (Math.random() - 0.5) * 8.0;

      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * radius;

      // Color variation
      const rRatio = Math.random();
      const pColor = rRatio < 0.4 ? colCyan : rRatio < 0.75 ? colPurple : colBlue;
      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 8. Ground Soft Contact Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.8;
    scene.add(shadowMesh);

    // 9. Pointer / Mouse Interaction Event Listeners
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      sceneStateRef.current.targetMouseX = x * 0.8;
      sceneStateRef.current.targetMouseY = y * 0.5;
    };

    container.addEventListener('mousemove', handlePointerMove);

    // 10. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 11. Render Loop
    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      const delta = clock.getDelta();
      const speed = sceneStateRef.current.rotationSpeed;

      // Update material based on user selection
      const currentStyle = sceneStateRef.current.meshStyle;
      if (currentStyle === 'wireframe') {
        coreMesh.material = wireframeMaterial;
      } else if (currentStyle === 'chrome') {
        coreMesh.material = chromeMaterial;
      } else {
        coreMesh.material = glassMaterial;
      }

      // Smooth mouse interpolation
      sceneStateRef.current.mouseX = THREE.MathUtils.damp(
        sceneStateRef.current.mouseX,
        sceneStateRef.current.targetMouseX,
        4,
        delta
      );
      sceneStateRef.current.mouseY = THREE.MathUtils.damp(
        sceneStateRef.current.mouseY,
        sceneStateRef.current.targetMouseY,
        4,
        delta
      );

      // Core rotation
      masterGroup.rotation.y += delta * 0.45 * speed;
      masterGroup.rotation.x = sceneStateRef.current.mouseY * 0.4;
      masterGroup.rotation.z = -sceneStateRef.current.mouseX * 0.3;

      // Inner octahedron reverse spin
      innerMesh.rotation.y -= delta * 0.8 * speed;
      innerMesh.rotation.x += delta * 0.4 * speed;

      // Orbiting rings
      ring1.rotation.z += delta * 0.35 * speed;
      ring2.rotation.x += delta * 0.28 * speed;

      // Satellites orbital motion
      satellitesGroup.rotation.y += delta * 0.5 * speed;
      satellites.forEach((sat, idx) => {
        sat.rotation.x += delta * (1.2 + idx * 0.2);
        sat.rotation.y += delta * 0.8;
      });

      // Swirling particle field
      particleSystem.rotation.y += delta * 0.08 * speed;
      particleSystem.rotation.x = sceneStateRef.current.mouseY * 0.15;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    tick();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      container.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      // Clean up geometries & materials
      coreGeometry.dispose();
      innerGeometry.dispose();
      ring1Geom.dispose();
      ring2Geom.dispose();
      satGeom1.dispose();
      satGeom2.dispose();
      particleGeometry.dispose();
      shadowGeo.dispose();

      glassMaterial.dispose();
      chromeMaterial.dispose();
      wireframeMaterial.dispose();
      innerMaterial.dispose();
      ring1Mat.dispose();
      ring2Mat.dispose();
      satMat1.dispose();
      satMat2.dispose();
      particleMaterial.dispose();
      shadowMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full h-[520px] sm:h-[620px] lg:h-[720px] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing" />

      {/* Unified Ergonomic Bottom Control Dock (Following SKILL.md rules) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center w-full max-w-[min(680px,94vw)] px-2">
        {/* Dock Collapse / Expand Toggle Button */}
        <button
          onClick={() => setShowControls(prev => !prev)}
          className="mb-1.5 px-3 py-1 rounded-t-lg bg-[#0e131d] border border-b-0 border-white/10 hover:border-white/20 text-[11px] font-sans-ui text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
          title="Toggle 3D Viewport Controls"
        >
          {showControls ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          <span>{showControls ? 'Hide Controls' : 'Examine 3D Form'}</span>
        </button>

        {/* Collapsible Dock Container */}
        {showControls && (
          <div className="w-full p-2.5 sm:p-3 rounded-xl bg-[#0c1017]/95 border border-white/10 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Style Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-sans-ui text-[11px] flex items-center gap-1">
                <Layers size={13} className="text-cyan-400" />
                <span className="hidden xs:inline">Material:</span>
              </span>
              <div className="flex bg-[#111622] p-0.5 rounded-lg border border-white/10">
                <button
                  onClick={() => setMeshStyle('crystal')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-sans-ui font-medium transition-all ${
                    meshStyle === 'crystal'
                      ? 'bg-white text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Glass
                </button>
                <button
                  onClick={() => setMeshStyle('chrome')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-sans-ui font-medium transition-all ${
                    meshStyle === 'chrome'
                      ? 'bg-white text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Chrome
                </button>
                <button
                  onClick={() => setMeshStyle('wireframe')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-sans-ui font-medium transition-all ${
                    meshStyle === 'wireframe'
                      ? 'bg-white text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Wireframe
                </button>
              </div>
            </div>

            {/* Rotation Speed Slider */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-sans-ui text-[11px] flex items-center gap-1">
                <SlidersHorizontal size={13} className="text-cyan-400" />
                <span className="hidden sm:inline">Speed:</span>
              </span>
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.2"
                value={rotationSpeed}
                onChange={e => setRotationSpeed(parseFloat(e.target.value))}
                className="w-16 sm:w-24 accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <span className="font-mono-numbers text-[11px] text-white w-7">
                {rotationSpeed.toFixed(1)}x
              </span>
            </div>

            {/* Reset Camera / Motion */}
            <button
              onClick={() => {
                setRotationSpeed(1);
                setMeshStyle('crystal');
              }}
              className="px-2.5 py-1 rounded-lg bg-[#111622] hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white text-[11px] font-sans-ui flex items-center gap-1 transition-colors"
              title="Reset 3D settings"
            >
              <RotateCcw size={12} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
