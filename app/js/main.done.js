var camera, scene, renderer, geometry, earthMaterial, moonMaterial, earth, moon, light, controls;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 2000;

    controls = new THREE.OrbitControls(camera, document.body);

    scene = new THREE.Scene();

    light = new THREE.DirectionalLight({color: 0xffb504});
    light.position.z = 1000;
    scene.add(light);

    geometry = new THREE.SphereGeometry(400, 30, 30);
    earthMaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/earthmap1k.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('images/earthbump1k.jpg'),
        specularMap: THREE.ImageUtils.loadTexture('images/earthspec1k.jpg')
    });

    moonMaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/moonmap4k.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('images/moonbump4k.jpg')
    });

    earth = new THREE.Mesh(geometry, earthMaterial);
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
        hubble.scale.set(0.1,0.1,0.1)
        earth.add(hubble);
    });

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setClearColor(0xffffff);

    document.body.appendChild(renderer.domElement);

    effect = new THREE.OculusRiftEffect( renderer, { worldScale: 1 } );
    effect.setSize( window.innerWidth, window.innerHeight );

    // document.body.addEventListener('dblclick', function(){
    //     document.body.webkitRequestFullscreen();
    // });
}

function animate() {
    requestAnimationFrame(animate);

    //mesh.rotation.x += 0.01;
    earth.rotation.y += 0.005;
    //moon.rotation.y += 0.001;


    //renderer.render(scene, camera);
    effect.render(scene, camera);
}
