// // ===== Enhanced 3D Space Background with Stars, Planets and Moving Lights =====
// let scene, camera, renderer;
// let stars = [];
// let planets = [];
// let lights = [];
// let comet;

// function initThreeJS() {
//     // Create scene
//     scene = new THREE.Scene();
//     scene.fog = new THREE.FogExp2(0x000000, 0.0005);
    
//     // Create camera
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
//     camera.position.z = 100;
//     camera.position.y = 30;
    
//     // Create renderer
//     renderer = new THREE.WebGLRenderer({ 
//         alpha: true, 
//         antialias: true,
//         powerPreference: "high-performance"
//     });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     document.getElementById('threejs-background').appendChild(renderer.domElement);
    
//     // Create star field
//     createStarField(5000);
    
//     // Create planets
//     createPlanets(12);
    
//     // Create moving lights/stars
//     createMovingStars(100);
    
//     // Create comet
//     createComet();
    
//     // Add ambient light
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
//     scene.add(ambientLight);
    
//     // Add directional light (sun)
//     const sunLight = new THREE.DirectionalLight(0xffffcc, 0.8);
//     sunLight.position.set(100, 50, 100);
//     scene.add(sunLight);
    
//     // Add sun
//     const sunGeometry = new THREE.SphereGeometry(20, 32, 32);
//     const sunMaterial = new THREE.MeshBasicMaterial({
//         color: 0xffdd00,
//         transparent: true,
//         opacity: 0.3
//     });
//     const sun = new THREE.Mesh(sunGeometry, sunMaterial);
//     sun.position.set(100, 50, 100);
//     scene.add(sun);
    
//     // Handle window resize
//     window.addEventListener('resize', onWindowResize);
    
//     // Start animation
//     animate();
// }

// function createStarField(count) {
//     const starGeometry = new THREE.BufferGeometry();
//     const starMaterial = new THREE.PointsMaterial({
//         color: 0xffffff,
//         size: 0.15,
//         transparent: true,
//         opacity: 0.8,
//         blending: THREE.AdditiveBlending
//     });
    
//     const positions = new Float32Array(count * 3);
//     const sizes = new Float32Array(count);
//     const colors = new Float32Array(count * 3);
    
//     for (let i = 0; i < count * 3; i += 3) {
//         // Random positions in a large sphere
//         const radius = 800 + Math.random() * 1200;
//         const theta = Math.random() * Math.PI * 2;
//         const phi = Math.acos(2 * Math.random() - 1);
        
//         positions[i] = radius * Math.sin(phi) * Math.cos(theta);
//         positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
//         positions[i + 2] = radius * Math.cos(phi);
        
//         // Random sizes
//         sizes[i/3] = Math.random() * 0.2 + 0.05;
        
//         // Random colors (mostly white with some blue/yellow)
//         const colorChoice = Math.random();
//         if (colorChoice < 0.7) {
//             colors[i] = 1;     // White
//             colors[i + 1] = 1;
//             colors[i + 2] = 1;
//         } else if (colorChoice < 0.85) {
//             colors[i] = 0.8;   // Blue
//             colors[i + 1] = 0.9;
//             colors[i + 2] = 1;
//         } else {
//             colors[i] = 1;     // Yellow
//             colors[i + 1] = 1;
//             colors[i + 2] = 0.8;
//         }
//     }
    
//     starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//     starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
//     starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
//     const starField = new THREE.Points(starGeometry, starMaterial);
//     scene.add(starField);
//     stars.push({
//         mesh: starField,
//         rotationSpeed: 0.0001 + Math.random() * 0.0001
//     });
// }

// function createPlanets(count) {
//     const planetData = [
//         { color: 0xff6b6b, size: 8, distance: 200 },    // Red planet
//         { color: 0x4ecdc4, size: 12, distance: 250 },   // Teal planet
//         { color: 0xffd166, size: 10, distance: 300 },   // Yellow planet
//         { color: 0x06d6a0, size: 15, distance: 350 },   // Green planet
//         { color: 0x118ab2, size: 20, distance: 400 },   // Blue planet
//         { color: 0xef476f, size: 9, distance: 450 },    // Pink planet
//         { color: 0xff9e6d, size: 11, distance: 500 },   // Orange planet
//         { color: 0x9d4edd, size: 14, distance: 550 },   // Purple planet
//         { color: 0x00fff0, size: 7, distance: 600 },    // Cyan planet
//         { color: 0xff00ff, size: 13, distance: 650 },   // Magenta planet
//         { color: 0xffff00, size: 16, distance: 700 },   // Yellow planet
//         { color: 0x00ff00, size: 18, distance: 750 }    // Green planet
//     ];
    
//     for (let i = 0; i < count; i++) {
//         const data = planetData[i % planetData.length];
        
//         // Create planet
//         const geometry = new THREE.SphereGeometry(data.size, 32, 32);
//         const material = new THREE.MeshPhongMaterial({
//             color: data.color,
//             shininess: 100,
//             specular: 0x222222
//         });
        
//         const planet = new THREE.Mesh(geometry, material);
        
//         // Position in circular orbit
//         const angle = (i / count) * Math.PI * 2;
//         const variation = (Math.random() - 0.5) * 100;
        
//         planet.position.x = Math.cos(angle) * (data.distance + variation);
//         planet.position.y = (Math.random() - 0.5) * 200;
//         planet.position.z = Math.sin(angle) * (data.distance + variation);
        
//         scene.add(planet);
        
//         // Add ring for some planets
//         if (Math.random() > 0.7) {
//             const ringGeometry = new THREE.RingGeometry(data.size * 1.5, data.size * 2, 32);
//             const ringMaterial = new THREE.MeshBasicMaterial({
//                 color: data.color,
//                 side: THREE.DoubleSide,
//                 transparent: true,
//                 opacity: 0.3
//             });
//             const ring = new THREE.Mesh(ringGeometry, ringMaterial);
//             ring.rotation.x = Math.PI / 2;
//             planet.add(ring);
//         }
        
//         // Add glow effect
//         const glowGeometry = new THREE.SphereGeometry(data.size * 1.3, 32, 32);
//         const glowMaterial = new THREE.MeshBasicMaterial({
//             color: data.color,
//             transparent: true,
//             opacity: 0.2,
//             side: THREE.BackSide
//         });
//         const glow = new THREE.Mesh(glowGeometry, glowMaterial);
//         planet.add(glow);
        
//         planets.push({
//             mesh: planet,
//             originalX: planet.position.x,
//             originalZ: planet.position.z,
//             speed: 0.0005 + Math.random() * 0.001,
//             rotationSpeed: 0.002 + Math.random() * 0.003,
//             orbitRadius: data.distance + variation,
//             orbitAngle: angle
//         });
//     }
// }

// function createMovingStars(count) {
//     for (let i = 0; i < count; i++) {
//         const geometry = new THREE.SphereGeometry(0.5, 8, 8);
//         const material = new THREE.MeshBasicMaterial({
//             color: Math.random() > 0.5 ? 0x00ffff : 0xff00ff,
//             transparent: true,
//             opacity: 0.7
//         });
        
//         const star = new THREE.Mesh(geometry, material);
        
//         // Random starting position
//         star.position.x = (Math.random() - 0.5) * 1000;
//         star.position.y = (Math.random() - 0.5) * 1000;
//         star.position.z = (Math.random() - 0.5) * 1000;
        
//         scene.add(star);
        
//         lights.push({
//             mesh: star,
//             speedX: (Math.random() - 0.5) * 0.05,
//             speedY: (Math.random() - 0.5) * 0.05,
//             speedZ: (Math.random() - 0.5) * 0.05,
//             phase: Math.random() * Math.PI * 2
//         });
//     }
// }

// function createComet() {
//     const cometGeometry = new THREE.SphereGeometry(3, 16, 16);
//     const cometMaterial = new THREE.MeshBasicMaterial({
//         color: 0x00ffff,
//         transparent: true,
//         opacity: 0.8
//     });
    
//     comet = new THREE.Mesh(cometGeometry, cometMaterial);
    
//     // Create comet tail
//     const tailGeometry = new THREE.ConeGeometry(8, 40, 8);
//     const tailMaterial = new THREE.MeshBasicMaterial({
//         color: 0x00ffff,
//         transparent: true,
//         opacity: 0.3,
//         side: THREE.BackSide
//     });
    
//     const tail = new THREE.Mesh(tailGeometry, tailMaterial);
//     tail.position.z = -20;
//     comet.add(tail);
    
//     scene.add(comet);
    
//     // Set comet path
//     comet.position.set(500, 200, 500);
// }

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

// function animate() {
//     requestAnimationFrame(animate);
    
//     const time = Date.now() * 0.001;
    
//     // Animate stars (slow rotation)
//     stars.forEach(star => {
//         star.mesh.rotation.y += star.rotationSpeed;
//     });
    
//     // Animate planets
//     planets.forEach((planet, index) => {
//         // Orbit around center
//         planet.orbitAngle += planet.speed;
//         planet.mesh.position.x = Math.cos(planet.orbitAngle) * planet.orbitRadius;
//         planet.mesh.position.z = Math.sin(planet.orbitAngle) * planet.orbitRadius;
        
//         // Rotate planet
//         planet.mesh.rotation.y += planet.rotationSpeed;
        
//         // Bob up and down
//         planet.mesh.position.y = (Math.sin(time * 2 + index) * 50) - 25;
//     });
    
//     // Animate moving stars/lights
//     lights.forEach((light, index) => {
//         // Move in random directions
//         light.mesh.position.x += light.speedX;
//         light.mesh.position.y += light.speedY;
//         light.mesh.position.z += light.speedZ;
        
//         // Wrap around if too far
//         if (Math.abs(light.mesh.position.x) > 500) light.speedX *= -1;
//         if (Math.abs(light.mesh.position.y) > 500) light.speedY *= -1;
//         if (Math.abs(light.mesh.position.z) > 500) light.speedZ *= -1;
        
//         // Pulsating opacity
//         light.mesh.material.opacity = 0.5 + Math.sin(time * 3 + index) * 0.3;
//     });
    
//     // Animate comet
//     if (comet) {
//         const cometSpeed = 0.5;
//         const cometRadius = 600;
        
//         comet.position.x = Math.cos(time * cometSpeed) * cometRadius;
//         comet.position.z = Math.sin(time * cometSpeed) * cometRadius;
//         comet.position.y = Math.sin(time * cometSpeed * 0.5) * 200;
        
//         // Make comet face direction of movement
//         const targetX = Math.cos(time * cometSpeed + 0.1) * cometRadius;
//         const targetZ = Math.sin(time * cometSpeed + 0.1) * cometRadius;
//         comet.lookAt(new THREE.Vector3(targetX, comet.position.y, targetZ));
        
//         // Pulsating comet
//         comet.scale.setScalar(1 + Math.sin(time * 5) * 0.2);
//     }
    
//     // Slowly move camera
//     camera.position.x = Math.sin(time * 0.05) * 30;
//     camera.lookAt(scene.position);
    
//     renderer.render(scene, camera);
// }

// // ===== DOM Loaded =====
// document.addEventListener("DOMContentLoaded", () => {
//     // Initialize enhanced 3D space background
//     initThreeJS();
// });

// // ===== Form Submission =====
// const contactForm = document.getElementById("contact-form");
// if (contactForm) {
//     contactForm.addEventListener("submit", function(e) {
//         e.preventDefault();
        
//         // Get form values
//         const name = this.querySelector('input[type="text"]').value;
//         const email = this.querySelector('input[type="email"]').value;
//         const subject = this.querySelector('input[placeholder="Subject"]').value;
//         const message = this.querySelector('textarea').value;
        
//         // Create success message
//         const submitBtn = this.querySelector('.submit-btn');
//         const originalBtnText = submitBtn.innerHTML;
        
//         submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
//         submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00cc66)';
        
//         // Reset form
//         this.reset();
        
//         // Return to original state after 3 seconds
//         setTimeout(() => {
//             submitBtn.innerHTML = originalBtnText;
//             submitBtn.style.background = 'linear-gradient(45deg, #ff00ff, #00fff0)';
//         }, 3000);
        
//         // Log the message
//         console.log('Message Details:', { name, email, subject, message });
//     });
// }

// // ===== Loader =====
// window.addEventListener("load", () => {
//     setTimeout(() => {
//         document.getElementById("loader").style.opacity = "0";
//         setTimeout(() => {
//             document.getElementById("loader").style.display = "none";
//         }, 500);
//     }, 1500);
// });

// // ===== Smooth Scrolling =====
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//         e.preventDefault();
        
//         const targetId = this.getAttribute('href');
//         if (targetId === '#') return;
        
//         const targetElement = document.querySelector(targetId);
//         if (targetElement) {
//             window.scrollTo({
//                 top: targetElement.offsetTop - 100,
//                 behavior: 'smooth'
//             });
//         }
//     });
// });

// // ===== Card Hover Effect =====
// document.querySelectorAll('.design-card, .website-card, .skill-btn').forEach(card => {
//     card.addEventListener('mouseenter', () => {
//         card.style.transform = 'translateY(-15px)';
//         card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.7)';
//     });
    
//     card.addEventListener('mouseleave', () => {
//         card.style.transform = 'translateY(0)';
//         card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
//     });
// });

// // ===== Skill Buttons Click Effect =====
// document.querySelectorAll('.skill-btn').forEach(btn => {
//     btn.addEventListener('click', function() {
//         const skill = this.querySelector('span').textContent;
//         alert(`You clicked on ${skill}!`);
//     });
// });