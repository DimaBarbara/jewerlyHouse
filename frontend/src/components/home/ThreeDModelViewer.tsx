import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface ThreeDModelViewerProps {
  modelPath?: string;
}

const ThreeDModelViewer: React.FC<ThreeDModelViewerProps> = ({
  modelPath = "/models/3DRing.glb",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 20, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 4);
    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(10, 10, 10);
    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(0, 5, 5);
    const backLight = new THREE.DirectionalLight(0xffffff, 2);
    backLight.position.set(-10, -10, -10);
    scene.add(ambientLight, hemiLight, dirLight, pointLight, backLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;

    let model: THREE.Object3D | null = null;
    let autoRotate = true;
    let rotateTimeout: NodeJS.Timeout | null = null;

    controls.addEventListener("start", () => {
      autoRotate = false;
      if (rotateTimeout) clearTimeout(rotateTimeout);
    });

    controls.addEventListener("end", () => {
      rotateTimeout = setTimeout(() => (autoRotate = true), 3000);
    });

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      modelPath,
      (gltf: GLTF) => {
        model = gltf.scene;
        scene.add(model);
      },
      undefined,
      (error: unknown) => console.error("Model loading ERROR:", error),
    );

    let animationFrameId: number;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      if (model && autoRotate) model.rotation.z += 0.005;
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
    };
  }, [modelPath]);

  return (
    <div
      ref={containerRef}
      className="three-containe w-[300px] h-[500px] lg:w-[600px] lg:h-[700px] xl:w-[900px] xl:min-h-[300px] bg-transparent"
    />
  );
};

export default ThreeDModelViewer;
