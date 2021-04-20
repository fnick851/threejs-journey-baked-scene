import { OrbitControls, useGLTF, useTexture } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import React, { Suspense, useEffect, useRef } from "react"
import "./Scene.css"
import firefliesVertexShader from "../shaders/fireflies/vertex.glsl"
import firefliesFragmentShader from "../shaders/fireflies/fragment.glsl"
import portalVertexShader from "../shaders/portal/vertex.glsl"
import portalFragmentShader from "../shaders/portal/fragment.glsl"
import { Leva, useControls } from "leva"
import {
  AdditiveBlending,
  BufferAttribute,
  Color,
  MeshBasicMaterial,
  ShaderMaterial,
  sRGBEncoding,
} from "three"

const PortalOnField = () => {
  // Leva controls
  const {
    portal_color_start,
    portal_color_end,
    clear_color,
    firefly_size,
  } = useControls({
    portal_color_start: "#1f74d1",
    portal_color_end: "#a75217",
    clear_color: "#272525",
    firefly_size: 150,
  })

  const bakedTexture = useTexture("baked.jpg")
  bakedTexture.flipY = false
  bakedTexture.encoding = sRGBEncoding

  // baked material
  const bakedMaterial = new MeshBasicMaterial({ map: bakedTexture })

  // emmission materials: poleLight, portalLight, fireflies
  const poleLightMaterial = new MeshBasicMaterial({ color: 0xffffe5 })

  const portalLightMaterial = new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColorStart: { value: new Color(portal_color_start) },
      uColorEnd: { value: new Color(portal_color_end) },
    },
    vertexShader: portalVertexShader,
    fragmentShader: portalFragmentShader,
  })

  const firefliesCount = 30
  const positionArray = new Float32Array(firefliesCount * 3)
  const scaleArray = new Float32Array(firefliesCount)
  for (let i = 0; i < firefliesCount; i++) {
    positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4
    positionArray[i * 3 + 1] = Math.random() * 1.5
    positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4

    scaleArray[i] = Math.random()
  }
  const firefliesMaterial = new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: firefly_size },
    },
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
  })

  // firefly geometry
  const bufferGeometryRef = useRef(null)
  useEffect(() => {
    const geometry = bufferGeometryRef.current
    if (geometry) {
      geometry.setAttribute("position", new BufferAttribute(positionArray, 3))
      geometry.setAttribute("aScale", new BufferAttribute(scaleArray, 1))
    }
  })

  const glb = useGLTF("portal.glb")
  const bakedMesh = glb.scene.children.find((child) => child.name === "baked")
  const portalLightMesh = glb.scene.children.find(
    (child) => child.name === "portalLight"
  )
  const poleLightAMesh = glb.scene.children.find(
    (child) => child.name === "poleLightA"
  )
  const poleLightBMesh = glb.scene.children.find(
    (child) => child.name === "poleLightB"
  )
  bakedMesh.material = bakedMaterial
  portalLightMesh.material = portalLightMaterial
  poleLightAMesh.material = poleLightMaterial
  poleLightBMesh.material = poleLightMaterial

  const { gl, scene } = useThree()
  gl.setClearColor(clear_color)
  gl.outputEncoding = sRGBEncoding
  gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  scene.add(glb.scene)

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    portalLightMaterial.uniforms.uTime.value = elapsedTime
    firefliesMaterial.uniforms.uTime.value = elapsedTime
  })

  return (
    <>
      <points material={firefliesMaterial}>
        <bufferGeometry ref={bufferGeometryRef} />
      </points>
    </>
  )
}

function Scene() {
  return (
    <div className="scene-root">
      <Canvas camera={{ position: [2, 2, 3] }}>
        <Suspense fallback={null}>
          <PortalOnField />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <Leva oneLineLabels={true} />
    </div>
  )
}

export default Scene
