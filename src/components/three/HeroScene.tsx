import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type Props = {
  /** The 300svh wrapper whose scroll progress drives the camera. */
  sectionRef: React.RefObject<HTMLElement | null>
  /** Hero copy, faded out gently over the first slice of the scroll. */
  contentRef: React.RefObject<HTMLDivElement | null>
  /** Freeze the camera on its opening frame (prefers-reduced-motion). */
  staticFrame?: boolean
  /** Called when WebGL is unavailable — the hero falls back to the image scene. */
  onFailed?: () => void
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

/** Deterministic PRNG so the city is identical on every visit (and in tests). */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Canvas texture: a grid of randomly lit warm windows used as the tower emissive map. */
function createWindowTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 256
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#050b12'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const warm = ['#ffd9a0', '#c6a56a', '#e8b877', '#8fa8bd']
  for (let y = 8; y < canvas.height - 6; y += 12) {
    for (let x = 6; x < canvas.width - 6; x += 10) {
      if (Math.random() > 0.62) {
        ctx.fillStyle = warm[Math.floor(Math.random() * warm.length)]
        ctx.globalAlpha = 0.35 + Math.random() * 0.65
        ctx.fillRect(x, y, 6, 7)
      }
    }
  }
  ctx.globalAlpha = 1
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  return texture
}

/** Soft radial sprite used for the moon glow hanging over the horizon. */
function createGlowTexture(inner: string, outer: string): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 128
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  gradient.addColorStop(0, inner)
  gradient.addColorStop(0.35, outer)
  gradient.addColorStop(1, 'rgba(7, 23, 38, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 128, 128)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

/**
 * Procedural cinematic Dubai — a WebGL corridor of lit towers the camera flies
 * through as the user scrolls.
 *
 * No 3D model ships with the project, so the scene is procedural (per the
 * brief). If a GLTF model is added later, load it here with GLTFLoader /
 * useGLTF and drop it into the corridor instead of the instanced towers.
 *
 * Performance notes:
 *  - towers are two InstancedMeshes (≈210 draw calls collapsed into 2),
 *  - the shadow map is rendered once (scene is static), then frozen,
 *  - the pixel ratio is capped at 2, geometry is low-poly boxes,
 *  - React never re-renders during scroll: everything is refs + one rAF loop
 *    that only runs while the hero is on screen (IntersectionObserver).
 */
export function HeroScene({ sectionRef, contentRef, staticFrame = false, onFailed }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const section = sectionRef.current
    const content = contentRef.current
    if (!container || !section || typeof window === 'undefined') return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
      })
    } catch {
      onFailed?.()
      return
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(dpr)
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    // The city never moves — render the shadow map exactly once.
    renderer.shadowMap.autoUpdate = false
    renderer.shadowMap.needsUpdate = true
    container.appendChild(renderer.domElement)
    // Premium reveal: fade the canvas in over the loading backdrop.
    renderer.domElement.style.opacity = '0'
    renderer.domElement.style.transition = 'opacity 900ms ease'

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x071726)
    scene.fog = new THREE.FogExp2(0x071726, 0.011)

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      600,
    )

    /* ---------------------------------- lighting --------------------------------- */

    scene.add(new THREE.AmbientLight(0x24425c, 0.55))
    scene.add(new THREE.HemisphereLight(0x2a4a66, 0x1f1810, 0.5))

    const moonlight = new THREE.DirectionalLight(0xbdd3e6, 1.15)
    moonlight.position.set(-60, 80, -40)
    moonlight.castShadow = true
    moonlight.shadow.mapSize.set(1024, 1024)
    moonlight.shadow.camera.left = -90
    moonlight.shadow.camera.right = 90
    moonlight.shadow.camera.top = 90
    moonlight.shadow.camera.bottom = -90
    moonlight.shadow.camera.far = 260
    moonlight.shadow.bias = -0.0004
    scene.add(moonlight)

    // Warm gold street lighting along the flight corridor.
    const corridorLights = [new THREE.Vector3(0, 7, 55), new THREE.Vector3(0, 9, 0), new THREE.Vector3(0, 8, -55)]
    corridorLights.forEach((position) => {
      const light = new THREE.PointLight(0xc6a56a, 55, 80, 1.8)
      light.position.copy(position)
      scene.add(light)
      const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: createGlowTexture('rgba(214, 189, 141, 0.9)', 'rgba(198, 165, 106, 0.35)'),
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      )
      glow.scale.setScalar(18)
      glow.position.copy(position)
      scene.add(glow)
    })

    // Moon over the far skyline.
    const moon = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: createGlowTexture('rgba(235, 244, 252, 1)', 'rgba(141, 178, 205, 0.5)'),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    )
    moon.scale.setScalar(90)
    moon.position.set(-120, 85, -260)
    scene.add(moon)

    /* ---------------------------------- geometry --------------------------------- */

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(700, 700),
      new THREE.MeshStandardMaterial({ color: 0x0a1a29, roughness: 0.85, metalness: 0.25 }),
    )
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    const grid = new THREE.GridHelper(700, 90, 0xc6a56a, 0x16324a)
    const gridMaterial = grid.material as THREE.Material
    gridMaterial.transparent = true
    gridMaterial.opacity = 0.14
    grid.position.y = 0.02
    scene.add(grid)

    // Mid-corridor towers with lit windows (the layers the camera passes).
    const windowTexture = createWindowTexture()
    const towerGeometry = new THREE.BoxGeometry(1, 1, 1)
    const towerMaterial = new THREE.MeshStandardMaterial({
      color: 0x0b1d2c,
      roughness: 0.72,
      metalness: 0.2,
      emissive: 0xffffff,
      emissiveMap: windowTexture,
      emissiveIntensity: 0.85,
    })
    const random = mulberry32(20261007)

    const NEAR_TOWERS = 150
    const nearTowers = new THREE.InstancedMesh(towerGeometry, towerMaterial, NEAR_TOWERS)
    nearTowers.castShadow = true
    nearTowers.receiveShadow = true
    const matrix = new THREE.Matrix4()
    const tint = new THREE.Color()
    for (let i = 0; i < NEAR_TOWERS; i++) {
      // Keep the central corridor (|x| < 8) clear for the camera flight.
      const side = random() > 0.5 ? 1 : -1
      const x = side * (8 + random() * 46)
      const z = 130 - random() * 270
      const width = 3 + random() * 5
      const depth = 3 + random() * 5
      const height = 5 + random() * 34
      matrix.makeScale(width, height, depth)
      matrix.setPosition(x, height / 2, z)
      nearTowers.setMatrixAt(i, matrix)
      nearTowers.setColorAt(i, tint.setHSL(0.58, 0.25, 0.16 + random() * 0.1))
    }
    nearTowers.instanceMatrix.needsUpdate = true
    scene.add(nearTowers)

    // Distant skyline silhouettes dissolving into the fog.
    const FAR_TOWERS = 60
    const farTowers = new THREE.InstancedMesh(
      towerGeometry,
      new THREE.MeshStandardMaterial({ color: 0x0d2436, roughness: 0.9, metalness: 0.1 }),
      FAR_TOWERS,
    )
    for (let i = 0; i < FAR_TOWERS; i++) {
      const x = (random() - 0.5) * 380
      const z = -210 - random() * 130
      const width = 8 + random() * 14
      const depth = 8 + random() * 14
      const height = 24 + random() * 60
      matrix.makeScale(width, height, depth)
      matrix.setPosition(x, height / 2, z)
      farTowers.setMatrixAt(i, matrix)
    }
    farTowers.instanceMatrix.needsUpdate = true
    scene.add(farTowers)

    // A Burj-like spire anchoring the end of the flight path.
    const spire = new THREE.Group()
    const spireBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 4.5, 62, 8),
      new THREE.MeshStandardMaterial({ color: 0x123049, roughness: 0.6, metalness: 0.35 }),
    )
    spireBody.position.y = 31
    spireBody.castShadow = true
    const spireTip = new THREE.Mesh(
      new THREE.ConeGeometry(0.8, 16, 8),
      new THREE.MeshStandardMaterial({
        color: 0x1a3c58,
        emissive: 0xc6a56a,
        emissiveIntensity: 0.9,
        roughness: 0.5,
      }),
    )
    spireTip.position.y = 70
    spire.add(spireBody, spireTip)
    spire.position.set(9, 0, -95)
    scene.add(spire)

    // Floating gold dust — the foreground parallax layer.
    const DUST_COUNT = 520
    const dustBase = new Float32Array(DUST_COUNT)
    const dustPhase = new Float32Array(DUST_COUNT)
    const dustPositions = new Float32Array(DUST_COUNT * 3)
    for (let i = 0; i < DUST_COUNT; i++) {
      const x = (random() - 0.5) * 120
      const y = 1 + random() * 42
      const z = 140 - random() * 380
      dustPositions[i * 3] = x
      dustPositions[i * 3 + 1] = y
      dustPositions[i * 3 + 2] = z
      dustBase[i] = y
      dustPhase[i] = random() * Math.PI * 2
    }
    const dustGeometry = new THREE.BufferGeometry()
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
    const dust = new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({
        color: 0xd6bd8d,
        size: 0.28,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    )
    scene.add(dust)

    /* --------------------------------- camera path ------------------------------- */

    // Position A (high above the corridor) → position B (inside the skyline,
    // beside the spire). A gentle S-curve keeps the flight cinematic.
    const flight = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 27, 96),
      new THREE.Vector3(-1.5, 17, 38),
      new THREE.Vector3(2.5, 11, -12),
      new THREE.Vector3(3, 8.5, -58),
      new THREE.Vector3(6, 10, -88),
    ])
    const gaze = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 22, 30),
      new THREE.Vector3(0, 15, -20),
      new THREE.Vector3(2, 12, -70),
      new THREE.Vector3(6, 14, -110),
      new THREE.Vector3(8, 16, -150),
    ])

    /* ------------------------------ interaction state ---------------------------- */

    const state = {
      progress: 0, // raw scroll progress 0..1
      eased: 0, // cinematically eased progress driving the camera
      pointerX: 0,
      pointerY: 0,
      pointerEasedX: 0,
      pointerEasedY: 0,
    }

    const scrollable = () => Math.max(section.getBoundingClientRect().height - window.innerHeight, 1)

    const readScroll = () => {
      const rect = section.getBoundingClientRect()
      state.progress = clamp(-rect.top / scrollable(), 0, 1)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      state.pointerX = (event.clientX / window.innerWidth) * 2 - 1
      state.pointerY = (event.clientY / window.innerHeight) * 2 - 1
    }

    const COPY_FADE_END = 0.3
    const fadeCopy = (progress: number) => {
      if (!content) return
      const fade = clamp(progress / COPY_FADE_END, 0, 1)
      content.style.opacity = String(1 - fade)
      content.style.transform = `translate3d(0, ${-42 * fade}px, 0)`
      content.style.pointerEvents = fade > 0.92 ? 'none' : ''
    }

    const updateDust = (elapsed: number) => {
      const positions = dustGeometry.getAttribute('position') as THREE.BufferAttribute
      for (let i = 0; i < DUST_COUNT; i++) {
        positions.setY(i, dustBase[i] + Math.sin(elapsed * 0.5 + dustPhase[i]) * 1.6)
      }
      positions.needsUpdate = true
    }

    const renderFrame = (progress: number, elapsed: number) => {
      state.eased += (progress - state.eased) * 0.12
      const t = state.eased

      state.pointerEasedX += (state.pointerX - state.pointerEasedX) * 0.05
      state.pointerEasedY += (state.pointerY - state.pointerEasedY) * 0.05

      const point = flight.getPoint(t)
      camera.position.set(
        point.x + state.pointerEasedX * 2.4,
        point.y - state.pointerEasedY * 1.4,
        point.z,
      )
      // Subtle cinematic roll while flying.
      camera.up.set(Math.sin(t * Math.PI * 1.5) * 0.04, 1, 0)
      camera.lookAt(gaze.getPoint(t))

      updateDust(elapsed)
      renderer.render(scene, camera)
    }

    let raf = 0
    let running = false
    const clock = new THREE.Clock()
    const cleanupFns: Array<() => void> = []

    const tick = () => {
      const elapsed = clock.getElapsedTime()
      if (staticFrame) {
        renderFrame(0, elapsed)
        renderer.domElement.style.opacity = '1'
        return
      }
      readScroll()
      renderFrame(state.progress, elapsed)
      fadeCopy(state.progress)
      renderer.domElement.style.opacity = '1'
      raf = window.requestAnimationFrame(tick)
    }

    const start = () => {
      if (running || staticFrame) return
      running = true
      clock.start()
      raf = window.requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      if (raf) window.cancelAnimationFrame(raf)
      raf = 0
    }

    const onResize = () => {
      camera.aspect = container.clientWidth / Math.max(container.clientHeight, 1)
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
      if (staticFrame) tick()
    }

    if (staticFrame) {
      // Reduced motion: one hand-authored frame, no listeners, no loop.
      readScroll()
      renderFrame(0, 0)
      renderer.domElement.style.opacity = '1'
    } else {
      const observer = new IntersectionObserver(
        (entries) => (entries.some((entry) => entry.isIntersecting) ? start() : stop()),
        { rootMargin: '10% 0px 10% 0px' },
      )
      observer.observe(section)
      window.addEventListener('scroll', readScroll, { passive: true })
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      cleanupFns.push(() => observer.disconnect())
      cleanupFns.push(() => window.removeEventListener('scroll', readScroll))
      cleanupFns.push(() => window.removeEventListener('pointermove', onPointerMove))
      start()
    }
    window.addEventListener('resize', onResize)
    cleanupFns.push(() => window.removeEventListener('resize', onResize))

    return () => {
      stop()
      cleanupFns.forEach((fn) => fn())
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const material = (mesh as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(material)) material.forEach((entry) => entry.dispose())
        else if (material) material.dispose()
      })
      windowTexture.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [sectionRef, contentRef, staticFrame, onFailed])

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />
}
