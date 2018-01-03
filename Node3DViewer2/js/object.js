const electron = require("electron");
const {ipcRenderer} = electron
var camera, scene, renderer, controls;
var  axes, grid, particles;
var obj_active, obj;
var rotationx = 0.0;
var rotationy = 0.0;

			function init() {
				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 300;
        camera.position.y = 50;
        camera.position.x = 100;
				scene = new THREE.Scene();
				renderer = new THREE.WebGLRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000);
				document.getElementById("canvas").appendChild( renderer.domElement );
				controls = new THREE.OrbitControls(camera, renderer.domElement);
				window.addEventListener( 'resize', onWindowResize, false );
			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
			function animate() {
				requestAnimationFrame( animate );
				renderer.render( scene, camera );
			}

      function addAxes (){
        axes = new THREE.Object3D();
        axes.add(buildAxis(new THREE.Vector3(0,0,0),new THREE.Vector3(1000,0,0), 0xFF0000, false)); //x
        axes.add(buildAxis(new THREE.Vector3(0,0,0),new THREE.Vector3(0,1000,0), 0x00FF00, false)); //Y
        axes.add(buildAxis(new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,1000), 0x0000FF, false)); //Z
        scene.add(axes);
      }

      function buildAxis (src,dst, colorHex, dashed){
        var geom = new THREE.Geometry();
        var mat;
        if (dashed){
          mat = new THREE.LineDashedMaterial({linewidth: 3, color: colorHex, dashSize: 3, gapSize:3});
        } else {
          mat = new THREE.LineBasicMaterial({linewidth:3, color: colorHex});
        }
        geom.vertices.push(src.clone());
        geom.vertices.push(dst.clone());
        geom.computeLineDistances();

        var axis = new THREE.Line (geom, mat, THREE.LineSegments);
        return axis;
      }
			function addGrid(){
				grid = new THREE.GridHelper( 1000, 100, 0x888888, 0x888888);
				grid.position.set(0,-0.1,0);
				scene.add(grid);
			}

			function addPoint (verx,very,verz,sizep){

				var geometry = new THREE.Geometry();
				geometry.vertices.push( new THREE.Vector3(verx,very,verz));
				var sprite = new THREE.TextureLoader().load( "img/disc.png" );
				var material = new THREE.PointsMaterial( { size: sizep, sizeAttenuation: false, map: sprite, alphaTest: 0.5, transparent: true } );
				material.color.setHSL( 1.0, 0.3, 0.7 );
				var particles = new THREE.Points( geometry, material );
				obj = "Sphere";
				obj_active = particles;
				scene.add( particles );
      }

			function createPoint(){
				  ipcRenderer.send("async",2);
				}

			}

      function webGLStart (){
        init();
				addGrid();
				addAxes();
  			animate();
				ipcRenderer.send("async", 1);
      }