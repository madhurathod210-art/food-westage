/**
 * ==============================================================================
 * Food Bridge - Multi-Scene 3D WebGL Engine (Three.js)
 * Features:
 * 1. Full-Page 3D Background with Floating Rescued Food & Mouse Click 3D Sparkle Bursts
 * 2. 4 Switchable 3D Hero Scenes:
 *    - Scene 1: "Don't Waste Food" Rescue Plate & Trash Receptacle
 *    - Scene 2: "Global Zero-Waste Eco Planet" with Orbiting Food Satellites
 *    - Scene 3: "Smart IoT Community Chiller & Deep Freezer Vault"
 *    - Scene 4: "Volunteer Rescue Dispatch Van & Route"
 * ==============================================================================
 */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('Three.js not detected.');
    return;
  }

  let mouseNorm = { x: 0, y: 0 };
  let scrollProgress = 0;
  let bgScene, bgCamera, bgRenderer, bgSparkBurstGroup;

  // Global mouse & scroll tracking
  window.addEventListener('mousemove', (e) => {
    mouseNorm.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseNorm.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollProgress = window.scrollY / maxScroll;
  }, { passive: true });

  // Mouse Click Spawn 3D Sparkles anywhere on the page
  window.addEventListener('click', (e) => {
    if (!bgScene || !bgSparkBurstGroup) return;
    spawn3dClickBurst(mouseNorm.x * 30, mouseNorm.y * 20 - scrollProgress * 10);
  });

  function spawn3dClickBurst(x, y) {
    const sparkCount = 18;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(sparkCount * 3);
    const vel = [];

    for (let i = 0; i < sparkCount; i++) {
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = 5;

      vel.push({
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 + 0.1,
        vz: (Math.random() - 0.5) * 0.4,
        life: 1.0
      });
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x4caf50,
      size: 2.2,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending
    });

    const pSystem = new THREE.Points(geo, mat);
    pSystem.userData = { vel: vel, birth: Date.now() };
    bgSparkBurstGroup.add(pSystem);
  }

  
  // ============================================================================
  // 1. FULL-PAGE 3D FLOATING FRUITS & VEGETABLES BACKGROUND
  // ============================================================================
  function initFullPage3D() {
    const canvas = document.getElementById('fullPage3dCanvas');
    if (!canvas) return;

    bgScene = new THREE.Scene();
    bgCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    bgCamera.position.z = 42;

    bgRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const amb = new THREE.AmbientLight(0xffffff, 0.9);
    bgScene.add(amb);

    const dirLight1 = new THREE.DirectionalLight(0x81c784, 1.3);
    dirLight1.position.set(20, 35, 25);
    bgScene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffb74d, 0.8);
    dirLight2.position.set(-20, -20, 15);
    bgScene.add(dirLight2);

    bgSparkBurstGroup = new THREE.Group();
    bgScene.add(bgSparkBurstGroup);

    // Ambient Floating Freshness Bio-Sparkles (200 particles)
    const pCount = 200;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pCols = new Float32Array(pCount * 3);

    const c1 = new THREE.Color(0x4caf50); // Leaf Green
    const c2 = new THREE.Color(0x81c784); // Mint
    const c3 = new THREE.Color(0xffb74d); // Sun Orange
    const c4 = new THREE.Color(0xe53935); // Berry Red

    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 140;
      pPos[i + 1] = (Math.random() - 0.5) * 130;
      pPos[i + 2] = (Math.random() - 0.5) * 85;

      const pick = Math.random();
      const c = pick < 0.4 ? c1 : pick < 0.7 ? c2 : pick < 0.9 ? c3 : c4;
      pCols[i] = c.r;
      pCols[i + 1] = c.g;
      pCols[i + 2] = c.b;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCols, 3));

    const pMat = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(pGeo, pMat);
    bgScene.add(particles);

    // ==========================================================================
    // 3D PROCEDURAL FRUITS & VEGETABLES BUILDERS
    // ==========================================================================
    function build3DFruitVeg(type) {
      const g = new THREE.Group();

      if (type === 'apple') {
        // 🍎 Red Apple with stem & leaf
        const body = new THREE.Mesh(
          new THREE.SphereGeometry(0.75, 18, 18),
          new THREE.MeshStandardMaterial({ color: 0xd32f2f, roughness: 0.25 })
        );
        body.scale.set(1, 0.9, 1);
        g.add(body);
        const stem = new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.04, 0.35, 6),
          new THREE.MeshStandardMaterial({ color: 0x5d4037 })
        );
        stem.position.set(0, 0.75, 0);
        g.add(stem);
        const leaf = new THREE.Mesh(
          new THREE.ConeGeometry(0.18, 0.4, 5),
          new THREE.MeshStandardMaterial({ color: 0x4caf50 })
        );
        leaf.position.set(0.15, 0.75, 0);
        leaf.rotation.z = -Math.PI / 3;
        g.add(leaf);

      } else if (type === 'banana') {
        // 🍌 Curved Yellow Banana
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.8, 0.3, 0),
          new THREE.Vector3(0, -0.3, 0),
          new THREE.Vector3(0.8, 0.4, 0)
        ]);
        const tube = new THREE.Mesh(
          new THREE.TubeGeometry(curve, 16, 0.22, 8, false),
          new THREE.MeshStandardMaterial({ color: 0xfdd835, roughness: 0.4 })
        );
        g.add(tube);

      } else if (type === 'carrot') {
        // 🥕 Orange Carrot with green fronds
        const body = new THREE.Mesh(
          new THREE.ConeGeometry(0.45, 1.6, 14),
          new THREE.MeshStandardMaterial({ color: 0xf57c00, roughness: 0.5 })
        );
        body.rotation.x = Math.PI;
        g.add(body);
        const top = new THREE.Mesh(
          new THREE.ConeGeometry(0.2, 0.6, 6),
          new THREE.MeshStandardMaterial({ color: 0x2e7d32 })
        );
        top.position.set(0, 0.9, 0);
        g.add(top);

      } else if (type === 'broccoli') {
        // 🥦 Green Broccoli cluster
        const stalk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.22, 0.32, 0.8, 8),
          new THREE.MeshStandardMaterial({ color: 0x81c784, roughness: 0.6 })
        );
        stalk.position.y = -0.3;
        g.add(stalk);
        const head1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.55, 1), new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.8 }));
        head1.position.set(0, 0.35, 0);
        g.add(head1);
        const head2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.38, 1), new THREE.MeshStandardMaterial({ color: 0x388e3c, roughness: 0.8 }));
        head2.position.set(0.35, 0.25, 0.2);
        g.add(head2);
        const head3 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.38, 1), new THREE.MeshStandardMaterial({ color: 0x1b5e20, roughness: 0.8 }));
        head3.position.set(-0.35, 0.25, -0.15);
        g.add(head3);

      } else if (type === 'tomato') {
        // 🍅 Juicy Red Tomato
        const body = new THREE.Mesh(
          new THREE.SphereGeometry(0.7, 18, 18),
          new THREE.MeshStandardMaterial({ color: 0xe53935, roughness: 0.2 })
        );
        body.scale.set(1, 0.85, 1);
        g.add(body);
        const calyx = new THREE.Mesh(
          new THREE.ConeGeometry(0.25, 0.15, 6),
          new THREE.MeshStandardMaterial({ color: 0x2e7d32 })
        );
        calyx.position.set(0, 0.6, 0);
        g.add(calyx);

      } else if (type === 'eggplant') {
        // 🍆 Purple Eggplant / Brinjal
        const body = new THREE.Mesh(
          new THREE.SphereGeometry(0.65, 16, 16),
          new THREE.MeshStandardMaterial({ color: 0x4a148c, roughness: 0.25, metalness: 0.1 })
        );
        body.scale.set(0.85, 1.4, 0.85);
        g.add(body);
        const cap = new THREE.Mesh(
          new THREE.ConeGeometry(0.4, 0.35, 8),
          new THREE.MeshStandardMaterial({ color: 0x2e7d32 })
        );
        cap.position.set(0, 0.85, 0);
        g.add(cap);

      } else if (type === 'pear') {
        // 🍐 Golden Pear
        const base = new THREE.Mesh(new THREE.SphereGeometry(0.6, 16, 16), new THREE.MeshStandardMaterial({ color: 0xfbc02d, roughness: 0.3 }));
        const cone = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.8, 14), new THREE.MeshStandardMaterial({ color: 0xfbc02d, roughness: 0.3 }));
        cone.position.y = 0.4;
        g.add(base, cone);

      } else if (type === 'corn') {
        // 🌽 Golden Corn on the Cob
        const cob = new THREE.Mesh(
          new THREE.CylinderGeometry(0.3, 0.35, 1.4, 12),
          new THREE.MeshStandardMaterial({ color: 0xffb300, roughness: 0.4 })
        );
        g.add(cob);
        const leaf1 = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 1.2), new THREE.MeshStandardMaterial({ color: 0x4caf50, side: THREE.DoubleSide }));
        leaf1.position.set(0.25, -0.2, 0);
        leaf1.rotation.y = 0.3;
        g.add(leaf1);

      } else if (type === 'strawberry') {
        // 🍓 Fresh Strawberry
        const berry = new THREE.Mesh(
          new THREE.ConeGeometry(0.5, 0.9, 14),
          new THREE.MeshStandardMaterial({ color: 0xd81b60, roughness: 0.3 })
        );
        berry.rotation.x = Math.PI;
        g.add(berry);
        const cap = new THREE.Mesh(new THREE.DodecahedronGeometry(0.25, 0), new THREE.MeshStandardMaterial({ color: 0x4caf50 }));
        cap.position.y = 0.45;
        g.add(cap);

      } else if (type === 'avocado') {
        // 🥑 Fresh Avocado
        const outSkin = new THREE.Mesh(
          new THREE.SphereGeometry(0.65, 16, 16),
          new THREE.MeshStandardMaterial({ color: 0x1b5e20, roughness: 0.7 })
        );
        outSkin.scale.set(0.9, 1.3, 0.9);
        g.add(outSkin);
        const stone = new THREE.Mesh(
          new THREE.SphereGeometry(0.25, 12, 12),
          new THREE.MeshStandardMaterial({ color: 0x4e342e, roughness: 0.5 })
        );
        stone.position.set(0, 0, 0.4);
        g.add(stone);

      } else if (type === 'orange') {
        // 🍊 Citrus Orange
        const orangeMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.68, 16, 16),
          new THREE.MeshStandardMaterial({ color: 0xff9800, roughness: 0.4 })
        );
        g.add(orangeMesh);

      } else {
        // 🥬 Leafy Salad Greens
        const leafMesh = new THREE.Mesh(
          new THREE.DodecahedronGeometry(0.7, 1),
          new THREE.MeshStandardMaterial({ color: 0x388e3c, roughness: 0.6, wireframe: false })
        );
        g.add(leafMesh);
      }

      return g;
    }

    const fruitVegCatalog = [
      'apple', 'banana', 'carrot', 'broccoli', 'tomato', 
      'eggplant', 'pear', 'corn', 'strawberry', 'avocado', 'orange', 'leafy'
    ];

    // Instantiate 36 floating 3D produce items across screen volume
    const floatingProduce = [];

    for (let i = 0; i < 36; i++) {
      const type = fruitVegCatalog[i % fruitVegCatalog.length];
      const model = build3DFruitVeg(type);

      model.position.set(
        (Math.random() - 0.5) * 110,
        (Math.random() - 0.5) * 105,
        (Math.random() - 0.5) * 55
      );
      model.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      model.scale.setScalar(0.75 + Math.random() * 0.75);

      model.userData = {
        rx: (Math.random() - 0.5) * 0.015,
        ry: (Math.random() - 0.5) * 0.015,
        rz: (Math.random() - 0.5) * 0.01,
        baseY: model.position.y,
        floatSpeed: 1.0 + Math.random() * 1.2,
        offset: Math.random() * Math.PI * 2
      };

      bgScene.add(model);
      floatingProduce.push(model);
    }

    // Window Resize
    window.addEventListener('resize', () => {
      bgCamera.aspect = window.innerWidth / window.innerHeight;
      bgCamera.updateProjectionMatrix();
      bgRenderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop
    const bgClock = new THREE.Clock();
    function animateFullPage3D() {
      requestAnimationFrame(animateFullPage3D);
      const elapsed = bgClock.getElapsedTime();

      // Ambient particles slow rotation
      particles.rotation.y = elapsed * 0.018;
      particles.rotation.x = elapsed * 0.009;

      // Floating 3D Fruits and Vegetables continuous organic motion
      floatingProduce.forEach(m => {
        m.rotation.x += m.userData.rx;
        m.rotation.y += m.userData.ry;
        m.rotation.z += m.userData.rz;
        m.position.y = m.userData.baseY + Math.sin(elapsed * m.userData.floatSpeed + m.userData.offset) * 1.4;
      });

      // Update click shockwave sparks
      for (let i = bgSparkBurstGroup.children.length - 1; i >= 0; i--) {
        const pSys = bgSparkBurstGroup.children[i];
        const vels = pSys.userData.vel;
        const pArr = pSys.geometry.attributes.position.array;
        let alive = false;

        for (let j = 0; j < vels.length; j++) {
          const v = vels[j];
          if (v.life > 0) {
            pArr[j * 3] += v.vx;
            pArr[j * 3 + 1] += v.vy;
            pArr[j * 3 + 2] += v.vz;
            v.vy -= 0.004; // subtle gravity
            v.life -= 0.02;
            alive = true;
          }
        }
        pSys.geometry.attributes.position.needsUpdate = true;
        pSys.material.opacity = Math.max(0, pSys.material.opacity - 0.02);

        if (!alive || pSys.material.opacity <= 0) {
          bgSparkBurstGroup.remove(pSys);
        }
      }

      // Smooth Camera Parallax & Scroll Depth
      const targetX = mouseNorm.x * 7;
      const targetY = mouseNorm.y * 5 - scrollProgress * 20;
      bgCamera.position.x += (targetX - bgCamera.position.x) * 0.045;
      bgCamera.position.y += (targetY - bgCamera.position.y) * 0.045;
      bgCamera.lookAt(0, -scrollProgress * 15, 0);

      bgRenderer.render(bgScene, bgCamera);
    }
    animateFullPage3D();
  }

  // ============================================================================
  // 2. HERO MULTI-SCENE 3D ENGINE
  // ============================================================================
  let heroScene, heroCamera, heroRenderer;
  let activeSceneName = 'dont-waste';
  let sceneNodes = {};
  let currentActiveGroup = null;
  let heroAutoRotate = true;
  let targetRotY = 0.35, targetRotX = 0.12;
  let isDragging = false, prevM = { x: 0, y: 0 };
  let specialActionActive = true;
  let specialAnimState = 0;
  let heroInitialized = false;

  function initHeroMultiScene3D() {
    const container = document.getElementById('hero3dCanvasContainer');
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 440;

    if (heroInitialized && heroRenderer && heroCamera) {
      heroCamera.aspect = width / height;
      heroCamera.updateProjectionMatrix();
      heroRenderer.setSize(width, height);
      return;
    }

    heroInitialized = true;

    heroScene = new THREE.Scene();
    heroCamera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    heroCamera.position.set(0, 1.2, 13.5);

    heroRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    heroRenderer.setSize(width, height);
    heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    heroRenderer.shadowMap.enabled = true;

    const old = container.querySelector('canvas');
    if (old) old.remove();
    container.appendChild(heroRenderer.domElement);

    // Studio Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 0.85);
    heroScene.add(ambLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(8, 14, 10);
    keyLight.castShadow = true;
    heroScene.add(keyLight);

    const warmLight = new THREE.PointLight(0xffb74d, 1.6, 15);
    warmLight.position.set(-6, 3, 6);
    heroScene.add(warmLight);

    const coldLight = new THREE.PointLight(0x81c784, 1.8, 12);
    coldLight.position.set(4, -2, 4);
    heroScene.add(coldLight);

    // Root Group
    const root = new THREE.Group();
    heroScene.add(root);

    // Build all 4 3D Scenes
    sceneNodes['dont-waste'] = buildSceneDontWaste();
    sceneNodes['planet'] = buildSceneEcoPlanet();
    sceneNodes['fridge'] = buildSceneSmartFridge();
    sceneNodes['van'] = buildSceneRescueVan();

    // Attach all groups to root (only active visible)
    Object.values(sceneNodes).forEach(g => {
      g.visible = false;
      root.add(g);
    });

    switchHero3DScene('dont-waste');

    // Controls
    setupHeroControls(container, root);

    // Start loop
    animateHero(root);
  }

  // --- SCENE 1: "DON'T WASTE FOOD" RESCUE SCULPTURE ---
  function buildSceneDontWaste() {
    const group = new THREE.Group();

    // Waste Bin
    const binGroup = new THREE.Group();
    binGroup.position.set(0, -3.2, 0);
    const binMat = new THREE.MeshStandardMaterial({ color: 0x37474f, metalness: 0.5, roughness: 0.35 });
    const binMesh = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 1.8, 3.2, 28), binMat);
    binGroup.add(binMesh);

    // Plaque
    const plaqueCanvas = document.createElement('canvas');
    plaqueCanvas.width = 512;
    plaqueCanvas.height = 256;
    const ctx = plaqueCanvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 512, 256);
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#2e7d32';
    ctx.strokeRect(10, 10, 492, 236);
    ctx.fillStyle = '#1b5e20';
    ctx.font = 'bold 54px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("DON'T", 256, 68);
    ctx.fillText('WASTE', 256, 128);
    ctx.fillText('FOOD', 256, 188);

    const plaqueTex = new THREE.CanvasTexture(plaqueCanvas);
    const plaqueMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.05), new THREE.MeshStandardMaterial({ map: plaqueTex }));
    plaqueMesh.position.set(0, 0.1, 2.05);
    binGroup.add(plaqueMesh);
    group.add(binGroup);

    // Elevated Food Plate
    const plateGroup = new THREE.Group();
    plateGroup.position.set(0, 1.6, 0);

    const plateMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.15 });
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(3.0, 2.5, 0.22, 36), plateMat);
    plateGroup.add(plate);

    // Food on Plate
    const pizza = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.16, 3, 1, false, 0, Math.PI / 3), new THREE.MeshStandardMaterial({ color: 0xffb300 }));
    pizza.rotation.x = -Math.PI / 2;
    pizza.position.set(-1.1, 0.2, -0.9);
    plateGroup.add(pizza);

    const tomato = new THREE.Mesh(new THREE.SphereGeometry(0.65, 18, 18), new THREE.MeshStandardMaterial({ color: 0xe53935 }));
    tomato.position.set(0.1, 0.6, -0.9);
    plateGroup.add(tomato);

    const pear = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.2, 16), new THREE.MeshStandardMaterial({ color: 0xfbc02d }));
    pear.position.set(-1.2, 0.6, 0.6);
    plateGroup.add(pear);

    const drumstick = new THREE.Mesh(new THREE.SphereGeometry(0.65, 14, 14), new THREE.MeshStandardMaterial({ color: 0xe65100 }));
    drumstick.position.set(0.2, 0.5, 0.5);
    drumstick.scale.set(1.4, 0.8, 0.8);
    plateGroup.add(drumstick);

    const greens = new THREE.Mesh(new THREE.DodecahedronGeometry(0.65, 1), new THREE.MeshStandardMaterial({ color: 0x2e7d32 }));
    greens.position.set(1.3, 0.55, -0.3);
    plateGroup.add(greens);

    group.add(plateGroup);
    group.userData = { plateGroup: plateGroup, baseY: 1.6 };

    return group;
  }

  // --- SCENE 2: "GLOBAL ZERO-WASTE ECO PLANET" ---
  function buildSceneEcoPlanet() {
    const group = new THREE.Group();

    // Central Earth Sphere
    const earthGeo = new THREE.SphereGeometry(3.2, 32, 32);
    const earthMat = new THREE.MeshPhongMaterial({
      color: 0x2e7d32,
      emissive: 0x144a19,
      emissiveIntensity: 0.35,
      shininess: 90
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    group.add(earth);

    // Glowing Orbital Rings
    const ringGeo = new THREE.TorusGeometry(4.8, 0.08, 16, 64);
    const ring1 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0x81c784, transparent: true, opacity: 0.8 }));
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xffb74d, transparent: true, opacity: 0.6 }));
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    ring2.scale.setScalar(1.18);
    group.add(ring2);

    // Orbiting Food Satellites
    const orbitSatellites = new THREE.Group();
    const satApple = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), new THREE.MeshStandardMaterial({ color: 0xd32f2f }));
    satApple.position.set(5.0, 1.2, 0);
    orbitSatellites.add(satApple);

    const satBread = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.7, 0.8), new THREE.MeshStandardMaterial({ color: 0xc88a38 }));
    satBread.position.set(-4.8, -1.0, 1.2);
    orbitSatellites.add(satBread);

    const satBox = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.6, 1.1), new THREE.MeshStandardMaterial({ color: 0x4caf50 }));
    satBox.position.set(0, 4.5, -2.0);
    orbitSatellites.add(satBox);

    group.add(orbitSatellites);
    group.userData = { earth: earth, rings: [ring1, ring2], orbitSatellites: orbitSatellites };

    return group;
  }

  // --- SCENE 3: "SMART IOT CHILLER & DEEP FREEZER" ---
  function buildSceneSmartFridge() {
    const group = new THREE.Group();

    // Cabinet
    const bodyMesh = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 5.0, 2.4),
      new THREE.MeshStandardMaterial({ color: 0x1b5e20, metalness: 0.35, roughness: 0.3 })
    );
    group.add(bodyMesh);

    // Cavity
    const innerMesh = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 4.6, 2.0),
      new THREE.MeshStandardMaterial({ color: 0xf4faf4, roughness: 0.15 })
    );
    innerMesh.position.set(0, 0, 0.25);
    group.add(innerMesh);

    // Shelves
    [-1.0, 0.2, 1.3].forEach(y => {
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(2.75, 0.06, 1.7), new THREE.MeshStandardMaterial({ color: 0xc8e6c9, metalness: 0.5 }));
      shelf.position.set(0, y, 0.25);
      group.add(shelf);
    });

    // Pivot Door
    const doorPivot = new THREE.Group();
    doorPivot.position.set(-1.6, 0, 1.45);
    const doorMesh = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 5.0, 0.22),
      new THREE.MeshStandardMaterial({ color: 0x2e7d32, metalness: 0.4 })
    );
    doorMesh.position.set(1.6, 0, 0);
    doorPivot.add(doorMesh);

    // Inspection Glass
    const glass = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 2.2),
      new THREE.MeshPhysicalMaterial({ color: 0x81c784, transparent: true, opacity: 0.6, transmission: 0.8 })
    );
    glass.position.set(1.6, 0.6, 0.12);
    doorPivot.add(glass);

    group.add(doorPivot);
    group.userData = { doorPivot: doorPivot, isDoorOpen: true, targetAngle: -Math.PI / 2.3 };

    return group;
  }

  // --- SCENE 4: "VOLUNTEER RESCUE DISPATCH VAN" ---
  function buildSceneRescueVan() {
    const group = new THREE.Group();

    // Van Body
    const chassis = new THREE.Mesh(
      new THREE.BoxGeometry(4.4, 2.0, 2.2),
      new THREE.MeshStandardMaterial({ color: 0x2e7d32, metalness: 0.3, roughness: 0.3 })
    );
    chassis.position.set(0, 0.4, 0);
    group.add(chassis);

    // Cabin Windshield
    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 1.3, 2.18),
      new THREE.MeshStandardMaterial({ color: 0x1b5e20 })
    );
    cabin.position.set(1.4, 1.4, 0);
    group.add(cabin);

    const windshield = new THREE.Mesh(
      new THREE.PlaneGeometry(1.2, 1.0),
      new THREE.MeshBasicMaterial({ color: 0x81c784 })
    );
    windshield.position.set(2.21, 1.4, 0);
    windshield.rotation.y = Math.PI / 2;
    group.add(windshield);

    // 4 Wheels
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x212121, roughness: 0.8 });
    const wheelGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.4, 16);
    const wheels = [];

    [[-1.3, -0.6, 1.2], [1.3, -0.6, 1.2], [-1.3, -0.6, -1.2], [1.3, -0.6, -1.2]].forEach(([wx, wy, wz]) => {
      const w = new THREE.Mesh(wheelGeo, wheelMat);
      w.rotation.x = Math.PI / 2;
      w.position.set(wx, wy, wz);
      group.add(w);
      wheels.push(w);
    });

    group.position.set(0, -0.5, 0);
    group.userData = { wheels: wheels };

    return group;
  }

  // ============================================================================
  // SCENE SWITCHER & CONTROLS
  // ============================================================================
  function switchHero3DScene(name) {
    activeSceneName = name;

    // Update active group visibility
    Object.entries(sceneNodes).forEach(([key, grp]) => {
      grp.visible = (key === name);
    });
    currentActiveGroup = sceneNodes[name];

    // Update UI Badges & Buttons
    const titleEl = document.getElementById('active3dSceneTitle');
    const sLeftTitle = document.getElementById('statLeftTitle');
    const sLeftSub = document.getElementById('statLeftSub');
    const sRightTitle = document.getElementById('statRightTitle');
    const sRightSub = document.getElementById('statRightSub');

    document.querySelectorAll('.btn-3d-scene').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-scene') === name);
    });

    if (name === 'dont-waste') {
      if (titleEl) titleEl.textContent = "3D \"DON'T WASTE FOOD\" Rescue Diorama";
      if (sLeftTitle) sLeftTitle.textContent = "Rescued Food Plate";
      if (sLeftSub) sLeftSub.textContent = "Pizza, Tomato, Pear, Protein, Greens";
      if (sRightTitle) sRightTitle.textContent = "Zero-Waste Bin";
      if (sRightSub) sRightSub.textContent = "\"DON'T WASTE FOOD\" Pledge";
    } else if (name === 'planet') {
      if (titleEl) titleEl.textContent = "3D Global Zero-Waste Eco Planet";
      if (sLeftTitle) sLeftTitle.textContent = "Planet Sustainability Core";
      if (sLeftSub) sLeftSub.textContent = "Atmospheric Carbon Mitigation";
      if (sRightTitle) sRightTitle.textContent = "Orbiting Surplus Food";
      if (sRightSub) sRightSub.textContent = "Meals In Global Transit";
    } else if (name === 'fridge') {
      if (titleEl) titleEl.textContent = "3D Smart Refrigerator & Freezer Vault";
      if (sLeftTitle) sLeftTitle.textContent = "Dual Chiller (-18°C / 3.2°C)";
      if (sLeftSub) sLeftSub.textContent = "Sub-Zero Frozen & Chilled Trays";
      if (sRightTitle) sRightTitle.textContent = "IoT Telemetry Panel";
      if (sRightSub) sRightSub.textContent = "Door Sensors & Load Cells";
    } else if (name === 'van') {
      if (titleEl) titleEl.textContent = "3D Volunteer Rescue Dispatch Van";
      if (sLeftTitle) sLeftTitle.textContent = "Multi-Stop Dispatch Engine";
      if (sLeftSub) sLeftSub.textContent = "Real-time Route Optimization";
      if (sRightTitle) sRightTitle.textContent = "Rapid Food Transport";
      if (sRightSub) sRightSub.textContent = "< 35 min Average Pickup Run";
    }
  }

  function setupHeroControls(container, rootGroup) {
    // Scene Switcher Buttons
    document.querySelectorAll('.btn-3d-scene').forEach(btn => {
      btn.onclick = () => {
        const sceneName = btn.getAttribute('data-scene');
        if (sceneName) switchHero3DScene(sceneName);
      };
    });

    // Special Action Button (Lift plate / Open door / Turbo van)
    const btnAction = document.getElementById('btnActionSpecial3d');
    if (btnAction) {
      btnAction.onclick = () => {
        specialActionActive = !specialActionActive;
        btnAction.classList.toggle('active', specialActionActive);

        if (activeSceneName === 'dont-waste') {
          const g = sceneNodes['dont-waste'];
          if (g && g.userData.plateGroup) {
            g.userData.baseY = specialActionActive ? 1.6 : -0.4;
          }
        } else if (activeSceneName === 'fridge') {
          const g = sceneNodes['fridge'];
          if (g && g.userData.doorPivot) {
            g.userData.isDoorOpen = specialActionActive;
            g.userData.targetAngle = specialActionActive ? -Math.PI / 2.3 : 0;
          }
        }
      };
    }

    // Orbit Auto-Rotate Toggle Button
    const btnOrbit = document.getElementById('btnToggle3dOrbit');
    if (btnOrbit) {
      btnOrbit.onclick = () => {
        heroAutoRotate = !heroAutoRotate;
        btnOrbit.classList.toggle('active', heroAutoRotate);
      };
    }

    // Mouse Drag
    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevM = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dx = e.clientX - prevM.x;
        const dy = e.clientY - prevM.y;
        targetRotY += dx * 0.008;
        targetRotX += dy * 0.008;
        prevM = { x: e.clientX, y: e.clientY };
      }
    });

    window.addEventListener('resize', () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w && h) {
        heroCamera.aspect = w / h;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(w, h);
      }
    });
  }

  function animateHero(rootGroup) {
    const clock = new THREE.Clock();

    function loop() {
      requestAnimationFrame(loop);

      const homeView = document.getElementById('view-home');
      if (homeView && !homeView.classList.contains('active-view')) {
        return;
      }

      const elapsed = clock.getElapsedTime();

      // Continuous 360° Auto-rotation
      if (heroAutoRotate && !isDragging) {
        targetRotY += 0.004;
      }

      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.05;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.05;

      // Animate active scene specifics
      if (activeSceneName === 'dont-waste') {
        const g = sceneNodes['dont-waste'];
        if (g && g.userData.plateGroup) {
          const pg = g.userData.plateGroup;
          pg.position.y += ((g.userData.baseY || 1.6) - pg.position.y) * 0.06;
          pg.position.y += Math.sin(elapsed * 2.5) * 0.015;
        }
      } else if (activeSceneName === 'planet') {
        const g = sceneNodes['planet'];
        if (g && g.userData.earth) {
          g.userData.earth.rotation.y = elapsed * 0.15;
          g.userData.rings[0].rotation.z = elapsed * 0.2;
          g.userData.rings[1].rotation.z = -elapsed * 0.25;
          g.userData.orbitSatellites.rotation.y = elapsed * 0.35;
        }
      } else if (activeSceneName === 'fridge') {
        const g = sceneNodes['fridge'];
        if (g && g.userData.doorPivot) {
          const dp = g.userData.doorPivot;
          dp.rotation.y += (g.userData.targetAngle - dp.rotation.y) * 0.08;
        }
      } else if (activeSceneName === 'van') {
        const g = sceneNodes['van'];
        if (g && g.userData.wheels) {
          g.userData.wheels.forEach(w => {
            w.rotation.z += 0.08;
          });
          g.position.y = -0.5 + Math.sin(elapsed * 8) * 0.02; // Engine vibration
        }
      }

      heroRenderer.render(heroScene, heroCamera);
    }
    loop();
  }

  // ============================================================================
  // 3. INITIALIZER
  // ============================================================================
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      initFullPage3D();
      initHeroMultiScene3D();
    }, 200);
  });

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#home' || window.location.hash === '' || window.location.hash === '#') {
      setTimeout(initHeroMultiScene3D, 150);
    }
  });

})();
