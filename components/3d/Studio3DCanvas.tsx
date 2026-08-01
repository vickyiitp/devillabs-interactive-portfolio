'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { studioAudio } from '@/lib/audio';

export type RoomTarget = 'videos' | 'about' | 'projects' | 'shop' | 'podcast' | 'mediakit' | 'consultation' | 'ai';

interface Studio3DCanvasProps {
  activeTarget: RoomTarget | null;
  onSelectTarget: (target: RoomTarget) => void;
  lightingMode: 'golden' | 'neon' | 'daylight';
  isHoveringAny: boolean;
  setIsHoveringAny: (hovering: boolean) => void;
}

interface InteractiveMeshInfo {
  mesh: THREE.Object3D;
  target: RoomTarget;
  title: string;
  subtitle: string;
  initialPos: THREE.Vector3;
  targetCamPos: THREE.Vector3;
  targetCamLookAt: THREE.Vector3;
}

export const Studio3DCanvas: React.FC<Studio3DCanvasProps> = ({
  activeTarget,
  onSelectTarget,
  lightingMode,
  setIsHoveringAny,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredInfo, setHoveredInfo] = useState<{ title: string; subtitle: string; x: number; y: number } | null>(null);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(-999, -999));
  const interactiveObjectsRef = useRef<InteractiveMeshInfo[]>([]);

  // Camera flight interpolation state
  const defaultCamPos = useRef(new THREE.Vector3(0, 3.2, 8.5));
  const defaultLookAt = useRef(new THREE.Vector3(0, 1.2, 0));
  const currentCamPos = useRef(new THREE.Vector3(0, 3.2, 8.5));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 0));
  const targetCamPos = useRef(new THREE.Vector3(0, 3.2, 8.5));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.2, 0));

  // Mouse parallax
  const parallaxMouse = useRef({ x: 0, y: 0 });

  // Lighting references for mode switching
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const keySpotLightRef = useRef<THREE.SpotLight | null>(null);
  const neonLight1Ref = useRef<THREE.PointLight | null>(null);
  const neonLight2Ref = useRef<THREE.PointLight | null>(null);

  // Helper: Create Text Canvas Texture
  const createTextTexture = (text: string, bg: string, color: string, fontSize = 48) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.FogExp2(0x050505, 0.035);

    // 2. Camera Setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.copy(defaultCamPos.current);
    camera.lookAt(defaultLookAt.current);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights Setup
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.7);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const keySpotLight = new THREE.SpotLight(0xfff0dd, 4.5);
    keySpotLight.position.set(4, 7, 5);
    keySpotLight.angle = Math.PI / 4;
    keySpotLight.penumbra = 0.5;
    keySpotLight.castShadow = true;
    keySpotLight.shadow.mapSize.width = 1024;
    keySpotLight.shadow.mapSize.height = 1024;
    scene.add(keySpotLight);
    keySpotLightRef.current = keySpotLight;

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
    fillLight.position.set(-5, 4, 2);
    scene.add(fillLight);

    const neonLight1 = new THREE.PointLight(0x06b6d4, 2, 8);
    neonLight1.position.set(-3.5, 3.5, -1.8);
    scene.add(neonLight1);
    neonLight1Ref.current = neonLight1;

    const neonLight2 = new THREE.PointLight(0xec4899, 2.5, 8);
    neonLight2.position.set(3.5, 3, -1.8);
    scene.add(neonLight2);
    neonLight2Ref.current = neonLight2;

    // 5. Studio Environment Construction (Room & Furniture)
    const interactiveList: InteractiveMeshInfo[] = [];

    // Floor
    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x111318,
      roughness: 0.3,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Back Wall
    const wallGeo = new THREE.PlaneGeometry(16, 8);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x161922,
      roughness: 0.8,
    });
    const backWall = new THREE.Mesh(wallGeo, wallMat);
    backWall.position.set(0, 4, -3.5);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Studio Desk
    const deskGroup = new THREE.Group();
    const deskTopGeo = new THREE.BoxGeometry(5.2, 0.15, 2.2);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x221c17, roughness: 0.4, metalness: 0.1 });
    const deskTop = new THREE.Mesh(deskTopGeo, woodMat);
    deskTop.position.set(0, 1.4, 0);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    deskGroup.add(deskTop);

    // Desk Metal Legs
    const legGeo = new THREE.BoxGeometry(0.12, 1.4, 2.0);
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x090a0f, metalness: 0.9, roughness: 0.2 });
    const legLeft = new THREE.Mesh(legGeo, metalMat);
    legLeft.position.set(-2.4, 0.7, 0);
    legLeft.castShadow = true;
    deskGroup.add(legLeft);

    const legRight = new THREE.Mesh(legGeo, metalMat);
    legRight.position.set(2.4, 0.7, 0);
    legRight.castShadow = true;
    deskGroup.add(legRight);
    scene.add(deskGroup);

    // Bookshelf / Rack behind desk
    const shelfGroup = new THREE.Group();
    shelfGroup.position.set(-4, 0, -2.8);
    const shelfFrameGeo = new THREE.BoxGeometry(1.8, 5, 0.8);
    const shelfMat = new THREE.MeshStandardMaterial({ color: 0x181b22, roughness: 0.6 });
    const shelfFrame = new THREE.Mesh(shelfFrameGeo, shelfMat);
    shelfFrame.position.set(0, 2.5, 0);
    shelfGroup.add(shelfFrame);
    scene.add(shelfGroup);

    // --- INTERACTIVE OBJECT 1: CAMERA (Target: 'videos') ---
    const cameraGroup = new THREE.Group();
    cameraGroup.position.set(-1.6, 1.72, 0.2);

    // Camera Body
    const camBodyGeo = new THREE.BoxGeometry(0.45, 0.35, 0.55);
    const camBodyMat = new THREE.MeshStandardMaterial({ color: 0x1a1d24, metalness: 0.8, roughness: 0.3 });
    const camBody = new THREE.Mesh(camBodyGeo, camBodyMat);
    camBody.castShadow = true;
    cameraGroup.add(camBody);

    // Camera Lens
    const lensGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.45, 24);
    const lensMat = new THREE.MeshStandardMaterial({ color: 0x0d0e12, metalness: 0.9, roughness: 0.1 });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(0, 0, 0.4);
    lens.castShadow = true;
    cameraGroup.add(lens);

    // Glowing Lens Reflection
    const lensGlassGeo = new THREE.CircleGeometry(0.17, 24);
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.05, metalness: 1, emissive: 0x0284c7, emissiveIntensity: 0.6 });
    const glass = new THREE.Mesh(lensGlassGeo, glassMat);
    glass.position.set(0, 0, 0.628);
    cameraGroup.add(glass);

    // Red Tally Recording Light
    const tallyGeo = new THREE.SphereGeometry(0.03, 12, 12);
    const tallyMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 2 });
    const tally = new THREE.Mesh(tallyGeo, tallyMat);
    tally.position.set(0.18, 0.15, 0.28);
    cameraGroup.add(tally);

    scene.add(cameraGroup);
    interactiveList.push({
      mesh: cameraGroup,
      target: 'videos',
      title: 'CINEMA CAMERA',
      subtitle: 'Click to view Videos & Short Films',
      initialPos: cameraGroup.position.clone(),
      targetCamPos: new THREE.Vector3(-1.6, 1.72, 1.4),
      targetCamLookAt: new THREE.Vector3(-1.6, 1.72, 0.2),
    });

    // --- INTERACTIVE OBJECT 2: BOOK (Target: 'about') ---
    const bookGroup = new THREE.Group();
    bookGroup.position.set(-0.6, 1.48, 0.5);
    bookGroup.rotation.y = 0.2;

    const bookCoverGeo = new THREE.BoxGeometry(0.55, 0.08, 0.75);
    const bookMat = new THREE.MeshStandardMaterial({ color: 0x7f1d1d, roughness: 0.5, metalness: 0.2 });
    const bookCover = new THREE.Mesh(bookCoverGeo, bookMat);
    bookCover.castShadow = true;
    bookGroup.add(bookCover);

    // Gold Title Texture on Book
    const titleTex = createTextTexture('MOTION', '#7f1d1d', '#fef08a', 64);
    const titleMat = new THREE.MeshStandardMaterial({ map: titleTex, roughness: 0.3, metalness: 0.6 });
    const titlePlane = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 0.22), titleMat);
    titlePlane.rotation.x = -Math.PI / 2;
    titlePlane.position.set(0, 0.042, 0);
    bookGroup.add(titlePlane);

    scene.add(bookGroup);
    interactiveList.push({
      mesh: bookGroup,
      target: 'about',
      title: 'CREATOR MONOGRAPH',
      subtitle: "Click to read Julian's Story & Gear Vault",
      initialPos: bookGroup.position.clone(),
      targetCamPos: new THREE.Vector3(-0.6, 2.5, 0.7),
      targetCamLookAt: new THREE.Vector3(-0.6, 1.48, 0.5),
    });

    // --- INTERACTIVE OBJECT 3: LAPTOP / MONITOR (Target: 'projects') ---
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0.3, 1.48, 0.1);

    // Laptop Base
    const baseGeo = new THREE.BoxGeometry(0.85, 0.03, 0.6);
    const aluminumMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
    const laptopBase = new THREE.Mesh(baseGeo, aluminumMat);
    laptopBase.castShadow = true;
    laptopGroup.add(laptopBase);

    // Laptop Screen
    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 0.015, -0.28);

    const screenFrameGeo = new THREE.BoxGeometry(0.85, 0.58, 0.02);
    const screenFrame = new THREE.Mesh(screenFrameGeo, aluminumMat);
    screenFrame.position.set(0, 0.29, 0);
    screenFrame.rotation.x = -0.15;
    screenGroup.add(screenFrame);

    // Screen Display Texture
    const screenTex = createTextTexture('PROJECTS PORTFOLIO', '#090d16', '#38bdf8', 42);
    const screenMat = new THREE.MeshStandardMaterial({ map: screenTex, emissive: 0x0284c7, emissiveIntensity: 0.4 });
    const displayPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.52), screenMat);
    displayPlane.position.set(0, 0.29, 0.012);
    displayPlane.rotation.x = -0.15;
    screenGroup.add(displayPlane);

    laptopGroup.add(screenGroup);
    scene.add(laptopGroup);
    interactiveList.push({
      mesh: laptopGroup,
      target: 'projects',
      title: 'STUDIO LAPTOP',
      subtitle: 'Click to explore Commercial Projects & Portfolio',
      initialPos: laptopGroup.position.clone(),
      targetCamPos: new THREE.Vector3(0.3, 1.8, 1.0),
      targetCamLookAt: new THREE.Vector3(0.3, 1.7, 0.1),
    });

    // --- INTERACTIVE OBJECT 4: SHOPPING BAG / PRODUCT BOX (Target: 'shop') ---
    const bagGroup = new THREE.Group();
    bagGroup.position.set(1.5, 1.48, 0.4);
    bagGroup.rotation.y = -0.3;

    const bagGeo = new THREE.BoxGeometry(0.48, 0.65, 0.35);
    const bagMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.2 });
    const bag = new THREE.Mesh(bagGeo, bagMat);
    bag.castShadow = true;
    bagGroup.add(bag);

    // Gold Logo on Bag
    const bagTex = createTextTexture('MOTION STORE', '#0f172a', '#f59e0b', 38);
    const bagPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.25), new THREE.MeshStandardMaterial({ map: bagTex, emissive: 0xd97706, emissiveIntensity: 0.2 }));
    bagPlane.position.set(0, 0, 0.176);
    bagGroup.add(bagPlane);

    scene.add(bagGroup);
    interactiveList.push({
      mesh: bagGroup,
      target: 'shop',
      title: 'DIGITAL PRODUCTS SHOP',
      subtitle: 'Click to browse LUTs, Courses, Notion OS & Tools',
      initialPos: bagGroup.position.clone(),
      targetCamPos: new THREE.Vector3(1.5, 1.8, 1.3),
      targetCamLookAt: new THREE.Vector3(1.5, 1.78, 0.4),
    });

    // --- INTERACTIVE OBJECT 5: MICROPHONE (Target: 'podcast') ---
    const micGroup = new THREE.Group();
    micGroup.position.set(-0.2, 2.05, 0.3);

    // Boom arm tube
    const armGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.8);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.9, roughness: 0.1 });
    const arm = new THREE.Mesh(armGeo, armMat);
    arm.rotation.z = Math.PI / 3;
    arm.position.set(-0.3, 0.2, 0);
    micGroup.add(arm);

    // Mic Body
    const micBodyGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.32, 16);
    const micBodyMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
    const micBody = new THREE.Mesh(micBodyGeo, micBodyMat);
    micBody.castShadow = true;
    micGroup.add(micBody);

    // Foam Windscreen
    const foamGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.2, 16);
    const foamMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.9 });
    const foam = new THREE.Mesh(foamGeo, foamMat);
    foam.position.set(0, 0.18, 0);
    micGroup.add(foam);

    // Audio Light Ring
    const ringGeo = new THREE.TorusGeometry(0.092, 0.012, 12, 24);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 2 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, 0.08, 0);
    micGroup.add(ring);

    scene.add(micGroup);
    interactiveList.push({
      mesh: micGroup,
      target: 'podcast',
      title: 'MIND OF MOTION PODCAST',
      subtitle: 'Click to listen to Podcast Episodes & Audio Notes',
      initialPos: micGroup.position.clone(),
      targetCamPos: new THREE.Vector3(-0.2, 2.05, 1.2),
      targetCamLookAt: new THREE.Vector3(-0.2, 2.05, 0.3),
    });

    // --- INTERACTIVE OBJECT 6: POSTER (Target: 'mediakit') ---
    const posterGroup = new THREE.Group();
    posterGroup.position.set(0, 4.2, -3.42);

    const posterFrameGeo = new THREE.BoxGeometry(2.2, 1.5, 0.04);
    const posterFrameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });
    const posterFrame = new THREE.Mesh(posterFrameGeo, posterFrameMat);
    posterGroup.add(posterFrame);

    const posterTex = createTextTexture('MEDIA KIT & BRAND PARTNERSHIPS', '#090d16', '#ec4899', 36);
    const posterPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 1.4), new THREE.MeshStandardMaterial({ map: posterTex, emissive: 0xbe185d, emissiveIntensity: 0.3 }));
    posterPlane.position.set(0, 0, 0.022);
    posterGroup.add(posterPlane);

    scene.add(posterGroup);
    interactiveList.push({
      mesh: posterGroup,
      target: 'mediakit',
      title: 'COLLABORATIONS & MEDIA KIT',
      subtitle: 'Click to view Audience Stats & Partner Inquiry',
      initialPos: posterGroup.position.clone(),
      targetCamPos: new THREE.Vector3(0, 4.2, -1.0),
      targetCamLookAt: new THREE.Vector3(0, 4.2, -3.42),
    });

    // --- INTERACTIVE OBJECT 7: CALENDAR (Target: 'consultation') ---
    const calendarGroup = new THREE.Group();
    calendarGroup.position.set(-2.1, 1.48, 0.4);
    calendarGroup.rotation.y = 0.4;

    const calBaseGeo = new THREE.BoxGeometry(0.35, 0.28, 0.2);
    const calMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 });
    const calBase = new THREE.Mesh(calBaseGeo, calMat);
    calBase.castShadow = true;
    calendarGroup.add(calBase);

    const calTex = createTextTexture('2026\nBOOK CALL', '#ffffff', '#0f172a', 40);
    const calPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.24), new THREE.MeshStandardMaterial({ map: calTex }));
    calPlane.position.set(0, 0, 0.102);
    calendarGroup.add(calPlane);

    scene.add(calendarGroup);
    interactiveList.push({
      mesh: calendarGroup,
      target: 'consultation',
      title: 'DESK CALENDAR',
      subtitle: 'Click to Book 1:1 Creative Strategy Call',
      initialPos: calendarGroup.position.clone(),
      targetCamPos: new THREE.Vector3(-2.1, 1.8, 1.1),
      targetCamLookAt: new THREE.Vector3(-2.1, 1.5, 0.4),
    });

    // --- INTERACTIVE OBJECT 8: AI ASSISTANT CONSOLE (Target: 'ai') ---
    const aiGroup = new THREE.Group();
    aiGroup.position.set(2.2, 1.48, -0.3);
    aiGroup.rotation.y = -0.4;

    const aiBoxGeo = new THREE.BoxGeometry(0.4, 0.3, 0.3);
    const aiBoxMat = new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.2, metalness: 0.8 });
    const aiBox = new THREE.Mesh(aiBoxGeo, aiBoxMat);
    aiGroup.add(aiBox);

    const aiTex = createTextTexture('AI ASSISTANT\nASK JULIAN', '#1e1b4b', '#a78bfa', 32);
    const aiPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.24), new THREE.MeshStandardMaterial({ map: aiTex, emissive: 0x6d28d9, emissiveIntensity: 0.8 }));
    aiPlane.position.set(0, 0, 0.152);
    aiGroup.add(aiPlane);

    scene.add(aiGroup);
    interactiveList.push({
      mesh: aiGroup,
      target: 'ai',
      title: 'STUDIO AI ASSISTANT',
      subtitle: 'Click to ask Julian AI about work, gear & projects',
      initialPos: aiGroup.position.clone(),
      targetCamPos: new THREE.Vector3(2.2, 1.8, 0.6),
      targetCamLookAt: new THREE.Vector3(2.2, 1.5, -0.3),
    });

    interactiveObjectsRef.current = interactiveList;

    // 6. Window Resize Listener
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle subtle levitation for studio ambient objects
      interactiveList.forEach((item, index) => {
        item.mesh.position.y = item.initialPos.y + Math.sin(elapsedTime * 2 + index) * 0.015;
      });

      // Smooth Camera Flight Lerp
      currentCamPos.current.lerp(targetCamPos.current, 0.05);
      currentLookAt.current.lerp(targetLookAt.current, 0.05);

      // Add mouse parallax on default position
      if (!activeTarget && cameraRef.current) {
        const px = parallaxMouse.current.x * 0.3;
        const py = parallaxMouse.current.y * 0.2;
        cameraRef.current.position.x = currentCamPos.current.x + px;
        cameraRef.current.position.y = currentCamPos.current.y + py;
        cameraRef.current.position.z = currentCamPos.current.z;
      } else if (cameraRef.current) {
        cameraRef.current.position.copy(currentCamPos.current);
      }

      if (cameraRef.current) {
        cameraRef.current.lookAt(currentLookAt.current);
      }

      // Raycasting for object hover detection
      if (cameraRef.current && raycasterRef.current) {
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const meshesToCheck = interactiveList.map((i) => i.mesh);
        const intersects = raycasterRef.current.intersectObjects(meshesToCheck, true);

        if (intersects.length > 0) {
          let topGroup = intersects[0].object;
          while (topGroup.parent && topGroup.parent.type !== 'Scene') {
            topGroup = topGroup.parent;
          }

          const foundInfo = interactiveList.find((i) => i.mesh === topGroup);
          if (foundInfo) {
            setIsHoveringAny(true);
            // Highlight mesh scale slightly
            foundInfo.mesh.scale.set(1.04, 1.04, 1.04);
          }
        } else {
          setIsHoveringAny(false);
          interactiveList.forEach((i) => i.mesh.scale.set(1, 1, 1));
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [setIsHoveringAny]);

  // Lighting Mode Updates
  useEffect(() => {
    if (!ambientLightRef.current || !keySpotLightRef.current || !neonLight1Ref.current || !neonLight2Ref.current) return;

    if (lightingMode === 'golden') {
      ambientLightRef.current.color.setHex(0xfff5ea);
      ambientLightRef.current.intensity = 0.8;
      keySpotLightRef.current.color.setHex(0xf59e0b);
      keySpotLightRef.current.intensity = 4.5;
      neonLight1Ref.current.color.setHex(0x06b6d4);
      neonLight1Ref.current.intensity = 1.5;
      neonLight2Ref.current.color.setHex(0xec4899);
      neonLight2Ref.current.intensity = 1.8;
    } else if (lightingMode === 'neon') {
      ambientLightRef.current.color.setHex(0x0f172a);
      ambientLightRef.current.intensity = 0.3;
      keySpotLightRef.current.color.setHex(0x38bdf8);
      keySpotLightRef.current.intensity = 3.0;
      neonLight1Ref.current.color.setHex(0x06b6d4);
      neonLight1Ref.current.intensity = 5.0;
      neonLight2Ref.current.color.setHex(0xec4899);
      neonLight2Ref.current.intensity = 6.0;
    } else if (lightingMode === 'daylight') {
      ambientLightRef.current.color.setHex(0xffffff);
      ambientLightRef.current.intensity = 1.2;
      keySpotLightRef.current.color.setHex(0xffffff);
      keySpotLightRef.current.intensity = 5.0;
      neonLight1Ref.current.intensity = 0.5;
      neonLight2Ref.current.intensity = 0.5;
    }
  }, [lightingMode]);

  // Handle activeTarget camera positioning
  useEffect(() => {
    if (!activeTarget) {
      targetCamPos.current.copy(defaultCamPos.current);
      targetLookAt.current.copy(defaultLookAt.current);
      return;
    }

    const matched = interactiveObjectsRef.current.find((i) => i.target === activeTarget);
    if (matched) {
      targetCamPos.current.copy(matched.targetCamPos);
      targetLookAt.current.copy(matched.targetCamLookAt);
    }
  }, [activeTarget]);

  // Pointer Movement Handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    mouseRef.current.set(x, y);
    parallaxMouse.current = { x, y };

    // Check hover info position for UI label tooltip
    if (cameraRef.current && raycasterRef.current) {
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const meshes = interactiveObjectsRef.current.map((i) => i.mesh);
      const intersects = raycasterRef.current.intersectObjects(meshes, true);

      if (intersects.length > 0) {
        let topGroup = intersects[0].object;
        while (topGroup.parent && topGroup.parent.type !== 'Scene') {
          topGroup = topGroup.parent;
        }
        const info = interactiveObjectsRef.current.find((i) => i.mesh === topGroup);
        if (info) {
          setHoveredInfo({
            title: info.title,
            subtitle: info.subtitle,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
          return;
        }
      }
    }
    setHoveredInfo(null);
  };

  const handlePointerClick = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || !cameraRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const meshes = interactiveObjectsRef.current.map((i) => i.mesh);
    const intersects = raycaster.intersectObjects(meshes, true);

    if (intersects.length > 0) {
      let topGroup = intersects[0].object;
      while (topGroup.parent && topGroup.parent.type !== 'Scene') {
        topGroup = topGroup.parent;
      }
      const matched = interactiveObjectsRef.current.find((i) => i.mesh === topGroup);
      if (matched) {
        if (matched.target === 'videos') studioAudio.playCameraShutter();
        else studioAudio.playWhoosh();

        onSelectTarget(matched.target);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onClick={handlePointerClick}
      className="relative w-full h-full cursor-pointer select-none overflow-hidden touch-none"
    >
      {/* Floating Geometric Balance Tooltip Label on Object Hover */}
      {hoveredInfo && !activeTarget && (
        <div
          style={{
            left: `${hoveredInfo.x}px`,
            top: `${hoveredInfo.y - 65}px`,
          }}
          className="pointer-events-none absolute -translate-x-1/2 z-20 flex flex-col items-center bg-[#111111]/95 backdrop-blur-md border border-white/20 px-4 py-2 rounded-none shadow-2xl transition-opacity duration-150 animate-in fade-in zoom-in-95"
        >
          <span className="text-[10px] font-black tracking-[0.3em] text-white uppercase">
            {hoveredInfo.title}
          </span>
          <span className="text-[9px] text-white/50 tracking-widest uppercase font-mono mt-0.5">
            {hoveredInfo.subtitle}
          </span>
          <div className="mt-1 flex items-center gap-1">
            <div className="w-12 h-[1px] bg-white/20" />
            <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
            <div className="w-12 h-[1px] bg-white/20" />
          </div>
        </div>
      )}
    </div>
  );
};
