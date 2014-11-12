var scene, camera, renderer, geometry, earth, material, control, light, moon;

init();
animate();

function init(){
    // Create world
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z  = 2000;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);

    control = new THREE.OrbitControls(camera, document.body);

    light = new THREE.DirectionalLight({color: 0xffb504});
    light.position.z = 10000;
    scene.add(light);

    document.body.appendChild(renderer.domElement);

    geometry = new THREE.SphereGeometry(400, 30, 30);
    material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/earthmap1k.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('images/earthbump1k.jpg'),
        specularMap: THREE.ImageUtils.loadTexture('images/earthspec1k.jpg'),
    });
    earth = new THREE.Mesh(geometry, material);


    var moonMaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/moonmap4k.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('images/moonbump4k.jpg')
    });
    moon = new THREE.Mesh(geometry, moonMaterial);
    moon.scale.set(0.27, 0.27, 0.27);
    moon.position.x = 1000;

    earth.add(moon);

    scene.add(earth);

    var loader = new THREE.AssimpJSONLoader();
    loader.load('models/hst.json', function(hubble){
        hubble.position.z = 800;
        hubble.rotation.z = Math.PI / 2;
        hubble.rotation.y = Math.PI / 2;
        hubble.updateMatrix();
        hubble.scale.set(0.1,0.1,0.1);
        earth.add(hubble);
    });
}

function animate(){
    requestAnimationFrame(animate);

    earth.rotation.y += 0.01;

    renderer.render(scene, camera);
}
