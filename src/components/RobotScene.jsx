import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function FallbackRobot({ progress, mouse }) {
  const group = useRef()
  const head = useRef()
  const chestL = useRef()
  const chestR = useRef()
  const core = useRef()
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#6f8585', metalness: 0.82, roughness: 0.24, clearcoat: 0.4 }), [])
  const dark = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#0a1111', metalness: 0.92, roughness: 0.2 }), [])
  const glow = useMemo(() => new THREE.MeshBasicMaterial({ color: '#54e1bf' }), [])
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, mouse.x * 0.18, 4, 1 / 60)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -mouse.y * 0.08, 4, 1 / 60)
    const headMove = THREE.MathUtils.clamp(progress / 0.35, 0, 1)
    if (head.current) head.current.rotation.y = Math.sin(t * 0.8) * 0.05 + mouse.x * 0.08 * (1 - headMove) + mouse.x * 0.16 * headMove
    if (chestL.current && chestR.current) {
      const open = THREE.MathUtils.clamp((progress - 0.35) / 0.45, 0, 1)
      chestL.current.rotation.y = THREE.MathUtils.lerp(0, -0.65, open)
      chestR.current.rotation.y = THREE.MathUtils.lerp(0, 0.65, open)
    }
    if (core.current) core.current.scale.setScalar(0.9 + Math.max(0, progress - 0.55) * 0.5 + Math.sin(t * 3) * 0.03)
  })
  const joint = (position) => <mesh position={position} material={dark}><sphereGeometry args={[0.22, 24, 24]} /></mesh>
  const piece = (position, scale, mat = material, radius = 0.2) => <mesh position={position} scale={scale} material={mat} castShadow receiveShadow><roundedBoxGeometry args={[1, 1, 1, 8, radius]} /></mesh>
  return (
    <Float speed={0.8} rotationIntensity={0.04} floatIntensity={0.22}>
      <group ref={group} position={[0, -1.55, 0]} scale={1.12}>
        <group ref={head} position={[0, 2.95, 0]}>
          {piece([0, 0, 0], [0.94, 0.86, 0.84], material, 0.18)}
          {piece([0, 0.02, 0.44], [0.62, 0.18, 0.08], dark, 0.04)}
          {piece([-0.17, 0.04, 0.48], [0.12, 0.07, 0.04], glow, 0.02)}
          {piece([0.17, 0.04, 0.48], [0.12, 0.07, 0.04], glow, 0.02)}
        </group>
        <group position={[0, 2.05, 0]}>
          {piece([0, 0, 0], [1.55, 1.45, 0.8], material, 0.2)}
          <mesh ref={core} position={[0, 0.06, 0.44]} material={glow}><icosahedronGeometry args={[0.26, 2]} /></mesh>
          <mesh position={[0, 0.06, 0.38]} material={dark}><torusGeometry args={[0.35, 0.045, 16, 48]} /></mesh>
          <group ref={chestL} position={[-0.77, 0, 0.48]}>{piece([0.36, 0, 0], [0.76, 1.2, 0.16], dark, 0.06)}{piece([0.38, 0.2, 0.11], [0.3, 0.65, 0.05], glow, 0.04)}</group>
          <group ref={chestR} position={[0.77, 0, 0.48]}>{piece([-0.36, 0, 0], [0.76, 1.2, 0.16], dark, 0.06)}{piece([-0.38, 0.2, 0.11], [0.3, 0.65, 0.05], glow, 0.04)}</group>
        </group>
        <group position={[-1.12, 1.95, 0]}>{joint([0,0,0])}{piece([0,-0.55,0],[0.36,1,0.44],material,.12)}{joint([0,-1.12,0])}{piece([0,-1.66,0],[0.3,1,0.36],dark,.1)}{piece([0,-2.14,0.05],[0.5,.3,.54],material,.12)}</group>
        <group position={[1.12, 1.95, 0]}>{joint([0,0,0])}{piece([0,-0.55,0],[0.36,1,0.44],material,.12)}{joint([0,-1.12,0])}{piece([0,-1.66,0],[0.3,1,0.36],dark,.1)}{piece([0,-2.14,0.05],[0.5,.3,.54],material,.12)}</group>
        <group position={[-0.5, 0.65, 0]}>{piece([0,0,0],[0.62,1.55,.58],material,.18)}{joint([0,-.84,0])}{piece([0,-1.72,0],[.54,1.65,.5],dark,.16)}{piece([0,-2.55,.08],[.68,.32,.96],material,.12)}</group>
        <group position={[0.5, 0.65, 0]}>{piece([0,0,0],[0.62,1.55,.58],material,.18)}{joint([0,-.84,0])}{piece([0,-1.72,0],[.54,1.65,.5],dark,.16)}{piece([0,-2.55,.08],[.68,.32,.96],material,.12)}</group>
      </group>
    </Float>
  )
}

function GLBRobot({ progress, mouse }) {
  const { scene } = useGLTF('./models/robot.glb')
  const root = useRef()
  const head = scene.getObjectByName('Head')
  const chestL = scene.getObjectByName('ChestPanelL')
  const chestR = scene.getObjectByName('ChestPanelR')
  useEffect(() => scene.traverse((obj) => { if (obj.isMesh) { obj.castShadow = true; obj.receiveShadow = true } }), [scene])
  useFrame(() => {
    if (!root.current) return
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, mouse.x * 0.18, 4, 1 / 60)
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -mouse.y * 0.08, 4, 1 / 60)
    if (head) head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, mouse.x * 0.13, 0.08)
    const open = THREE.MathUtils.clamp((progress - 0.35) / 0.45, 0, 1)
    if (chestL) chestL.rotation.y = THREE.MathUtils.lerp(chestL.rotation.y, -open * 0.62, 0.08)
    if (chestR) chestR.rotation.y = THREE.MathUtils.lerp(chestR.rotation.y, open * 0.62, 0.08)
  })
  return <primitive ref={root} object={scene} position={[0, -1.72, 0]} scale={1.2} />
}

function Particles({ mouse, reducedMotion }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const out = new Float32Array(360 * 3)
    for (let i = 0; i < 360; i++) {
      const r = 3 + Math.random() * 6
      const a = Math.random() * Math.PI * 2
      out[i * 3] = Math.cos(a) * r
      out[i * 3 + 1] = (Math.random() - 0.5) * 8
      out[i * 3 + 2] = Math.sin(a) * r
    }
    return out
  }, [])
  useFrame((state) => {
    if (!ref.current || reducedMotion) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.015 + mouse.x * 0.04
    ref.current.rotation.x = mouse.y * 0.03
  })
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} /></bufferGeometry><pointsMaterial color="#6fbfa9" size={0.018} transparent opacity={0.42} sizeAttenuation /></points>
}

function SceneContent({ progress, mouse, reducedMotion, setRobotError }) {
  const [useFallback, setUseFallback] = useState(false)
  const { camera } = useThree()
  useFrame(() => {
    const p = THREE.MathUtils.clamp(progress, 0, 1)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.16, 0.06)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.25 + p * 0.35, 0.06)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8.4 - p * 1.35, 0.06)
    camera.lookAt(0, 0.6 + p * 0.25, 0)
  })
  return <>
    <ambientLight intensity={0.48} />
    <directionalLight position={[4, 7, 5]} intensity={2.3} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
    <pointLight position={[-3 + mouse.x * 1.5, 2 + mouse.y, 3]} color="#2fb992" intensity={5} distance={10} />
    <pointLight position={[3, 0 - mouse.y * 1.5, 1]} color="#477ea6" intensity={3} distance={8} />
    <Environment preset="city" />
    {!useFallback ? <Suspense fallback={<FallbackRobot progress={progress} mouse={mouse} />}><ErrorBoundary onError={() => { setUseFallback(true); setRobotError(true) }}><GLBRobot progress={progress} mouse={mouse} /></ErrorBoundary></Suspense> : <FallbackRobot progress={progress} mouse={mouse} />}
    <Particles mouse={mouse} reducedMotion={reducedMotion} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.18, 0]} receiveShadow><circleGeometry args={[7, 96]} /><meshStandardMaterial color="#020705" metalness={0.5} roughness={0.55} /></mesh>
    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
  </>
}

class ErrorBoundary extends React.Component {
  constructor(props) { super(); this.props = props; this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch() { this.props.onError?.() }
  render() { return this.state.hasError ? null : this.props.children }
}

export default function RobotScene({ progress, reducedMotion = false, onRobotError }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [robotError, setRobotError] = useState(false)
  useEffect(() => {
    const move = (e) => { if (!reducedMotion) setMouse({ x: (e.clientX / window.innerWidth - .5) * 2, y: (e.clientY / window.innerHeight - .5) * 2 }) }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [reducedMotion])
  useEffect(() => { if (robotError) onRobotError?.() }, [robotError, onRobotError])
  return <div className="robot-scene" aria-hidden="true"><Canvas camera={{ position: [0, .25, 8.4], fov: 34 }} dpr={[1, reducedMotion ? 1.2 : 1.7]} shadows={!reducedMotion} gl={{ antialias: true, alpha: true }}><SceneContent progress={progress} mouse={mouse} reducedMotion={reducedMotion} setRobotError={setRobotError} /></Canvas></div>
}
