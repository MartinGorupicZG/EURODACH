import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import testVertexShader from '../shaders/vertex.glsl';
import testFragmentShader from '../shaders/fragment.glsl';
import Img from '../img/hzz.jpg';
const flag = document.querySelector('.flag');
const canvas = document.querySelector('canvas');
/**
 * Base
 */
// Debug

// Canvas
export default function initFlag() {
	// Scene
	const scene = new THREE.Scene();

	/**
	 * Textures
	 */
	const textureLoader = new THREE.TextureLoader();
	const flagTexture = textureLoader.load(Img);

	/**
	 * Test mesh
	 */
	// Geometry
	const geometry = new THREE.PlaneBufferGeometry(1.5, 1.5, 32, 32);

	const count = geometry.attributes.position.count;
	const randoms = new Float32Array(count);

	for (let i = 0; i < count; i++) {
		randoms[i] = Math.random();
	}

	geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

	// Material
	const material = new THREE.ShaderMaterial({
		vertexShader: testVertexShader,
		fragmentShader: testFragmentShader,
		uniforms: {
			uFrequency: { value: new THREE.Vector2(10, 5) },
			uTime: { value: 0 },
			uColor: { value: new THREE.Color('orange') },
			uTexture: { value: flagTexture },
		},
	});

	// Mesh
	const mesh = new THREE.Mesh(geometry, material);
	mesh.geometry.center();

	mesh.scale.y = 2 / 3;
	scene.add(mesh);

	/**
	 * Sizes
	 */
	const sizes = {
		width: flag.clientWidth,
		height: flag.clientHeight,
	};

	window.addEventListener('resize', () => {
		// Update sizes
		sizes.width = flag.clientWidth;
		sizes.height = flag.clientHeight;

		// Update camera
		camera.aspect = sizes.width / sizes.height;
		camera.updateProjectionMatrix();

		// Update renderer
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	});

	/**
	 * Camera
	 */
	// Base camera
	const camera = new THREE.PerspectiveCamera(
		75,
		sizes.width / sizes.height,
		0.1,
		200
	);
	camera.position.set(0.25, -0.25, 1);
	scene.add(camera);

	// Controls
	const controls = new OrbitControls(camera, canvas);
	controls.enableDamping = true;

	/**
	 * Renderer
	 */
	const renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		alpha: true,
	});
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	/**
	 * Animate
	 */
	const clock = new THREE.Clock();

	const tick = () => {
		const elapsedTime = clock.getElapsedTime();

		// Update material
		material.uniforms.uTime.value = elapsedTime;

		// Update controls
		controls.update();

		// Render
		renderer.render(scene, camera);

		// Call tick again on the next frame
		window.requestAnimationFrame(tick);
	};

	tick();
}
