import * as THREE from 'three'

let lastWidth;

let mouse = {
    x: undefined,
    y: undefined
}

const renderGlobe = () => {
    lastWidth = window.innerWidth;
    const scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0x000000 );
    const camera = new THREE.PerspectiveCamera(
        75, innerWidth / innerHeight, 
        0.1, 1000
    );

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: document.querySelector('canvas')
    });
    renderer.setClearColor( 0xffffff, 0);
    renderer.setSize(
        innerWidth, innerHeight
    );

    renderer.setPixelRatio(window.devicePixelRatio)

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(
        5, 50, 50
        ),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('./assets/img/globe-6.jpg')
        })
    )
    scene.add(sphere)

    const group = new THREE.Group();
    group.add(sphere);
    scene.add(group)
    camera.position.z = 12
    
    function animate(){
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        sphere.rotation.y += 0.002
        // group.rotation.y = mouse.x * 0.6
        gsap.to(group.rotation, {
            x: -mouse.y * 0.6,
            y: mouse.x * 0.6,
            duration: 2
        })
    }
    
    animate();
}

renderGlobe();

addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / innerWidth) * 2 -1
    mouse.y = -(e.clientY / innerHeight) * 2 + 1
})

window.addEventListener('resize', (e) => {
    if(window.innerWidth !== lastWidth){
        console.log('Render new globe');
        renderGlobe();
    }
}, true)