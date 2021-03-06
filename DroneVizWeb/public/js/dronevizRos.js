/*
 * DroneViewer's Constructor.
 * Params:
*     - config (contents client's Config)={serv,camid,fpsid,modelid}:
 *       + cam1serv (server's direction and port)={dir:direction,port: port}
 *       + cam1epname (name of camera left endpoint, default cam_sensor_left)
 *       + cam1id (canvas' id to show cam right)
 *       + cmdvelserv (server's direction and port)={dir:direction,port: port}
 *       + cmdvelepname (name of Motors endpoint, default Motors)
 *       + control1id (canvas' id to show controls)
 *       + control2id (canvas' id to show controls)
 *       + modelid (canvas' id to show model of robot)
 *       + pose3dserv (server's direction and port)={dir:direction,port: port}
 *       + pose3depname (name of Motors endpoint, default Pose3DEncoders1)
 *       + takeoffbtnid (button to takeoff drone)
 *       + landbtnid (button to land drone)
 *       + togcambtnid (button to switch drone camera)
 *       + attitudeid, headingid, altimeterid, turn_coordinatorid (ids to show flying indicators)
 *       + extraserv (server's direction and port)={dir:direction,port: port}
 *       + extraepname (name of Motors endpoint, default Pose3D)
 */
function DroneVizRos(config) {
   //console.log(config);
   /*************************
    **** Public objects  ****
    *************************/
   this.cam1serv=config.cam1serv;
   this.pose3dserv=config.pose3dserv;
   this.cmdvelserv=config.cmdvelserv;
   this.extraserv=config.extraserv;

   this.cam1id=config.cam1id;
   this.control1id=config.control1id;
   this.control2id=config.control2id;
   this.takeoffbtnid=config.takeoffbtnid;
   this.resetbtnid=config.resetbtnid;
   this.landbtnid=config.landbtnid;
   this.togcambtnid=config.togcambtnid;
   this.stopbtnid=config.stopbtnid;
   this.modelid=config.modelid;
   this.attitudeid = config.attitudeid;
   this.headingid = config.headingid;
   this.altimeterid = config.altimeterid;
   this.turn_coordinatorid = config.turn_coordinatorid;

   this.cmdvelepname=config.cmdvelepname || "CMDVel";
   this.cam1epname=config.cam1epname || "Camera";
   this.extraepname = config.extraepname || "Extra";
   this.pose3depname = config.pose3depname || "Pose3D";
   var extra;
   var camera1;
   var prueba;
   var pose3d;
   var cmdvel;
   var timeout = 10000;
   var control1;
   var control2;
   var cmdvelInterval1;
   var cmdvelInterval2;
   var cam_active = true;
   var prez= 0;
   var self=this;

   var cmdSend = {
     linearX:0,
		 linearY:0,
		 linearZ:2,
		 angularX:0,
		 angularY:0,
		 angularZ:0
   };

   var toDegrees = 180/Math.PI;

   var attitude;
   var heading;
   var altimeter;
   var turn_coordinator;

   var model = {id: this.modelid,
                container: $('#'+this.modelid),
                WIDTH: 320,
                HEIGHT: 320,
                VIEW_ANGLE: 50,
                NEAR: 0.1,
                FAR: 5000,
                ASPECT: undefined,
                robot: undefined,
                scene: undefined,
                renderer: undefined,
                camera: undefined,
                controls: undefined,
                animation: undefined,
                active: false,
   };

   model.ASPECT=model.WIDTH / model.HEIGHT;


   /*************************
    **** Private methods ****
    *************************/
    var calcDist= function (num1, num2){
         var max = Math.max(num1,num2);
         var min = Math.min(num1,num2);

         return max-min;
      };

   var initControls = function (){
      var v = 1,
          w = 1;
      var distSend = v/90;

      function sendlxly (x,y) {
         var lx = v*y;
         var ly = v*x;
         var send = false;

         if (calcDist(ly,cmdSend.linearY)>=distSend){
            cmdSend.linearY = ly;
            send = true;
         }
         if (calcDist(lx,cmdSend.linearX)>=distSend){
            cmdSend.linearX = lx;
            send = true;
         }
      }

      function sendlzaz (x,y) {
         var lz = v*y;
         var az = w*x*(-1);

         var send = false;

         if (calcDist(az,cmdSend.angularZ)>=distSend){
            //cmdSend.angularZ = az;
            send = true;
         }

         if (calcDist(lz,cmdSend.linearZ)>=distSend){
            prez = cmdSend.linearZ;
            cmdSend.linearZ = prez + lz/100;
            //console.log(cmdSend.linearZ);
            send = true;
         }
      }

      control1 = new GUI.Joystick({id:self.control1id, onMove: sendlxly, onUp: sendlxly});
      control2 = new GUI.Joystick({id:self.control2id, onMove: sendlzaz, onUp: sendlzaz});

   };


    var initModel = function (){
      //model.container = $('#'+this.modelid);
      var canv = document.getElementById(model.id);
      model.ASPECT=canv.width/canv.height;
      model.camera = new THREE.PerspectiveCamera(model.VIEW_ANGLE, model.ASPECT, model.NEAR, model.FAR);
      model.camera.position.set( -5, 5, 2 );

      model.camera.lookAt(new THREE.Vector3( 0,0,0 ));

      //model.renderer = new THREE.WebGLRenderer({canvas:canv});
      model.renderer = new THREE.WebGLRenderer({canvas:canv, antialias: true});
      model.renderer.setPixelRatio( window.devicePixelRatio );
      model.renderer.setClearColor( 0xffffff);

      model.scene=new THREE.Scene();

      //controls
      model.controls = new THREE.TrackballControls( model.camera );

      model.controls.rotateSpeed = 2.0;
      model.controls.zoomSpeed = 2.2;
      model.controls.panSpeed = 1.8;

      model.controls.noZoom = false;
      model.controls.noPan = false;

      model.controls.staticMoving = true;
      model.controls.dynamicDampingFactor = 0.3;
      model.controls.enabled=false;

      model.controls.keys = [ 65, 83, 68 ];

      canv.addEventListener("mouseover", function(){
            model.controls.enabled=true;
      });

      canv.addEventListener("mouseout", function(){
            model.controls.enabled=false;
      });

      //lights
      var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
      light.position.set( 0, 500, 0 );
      model.scene.add(light);


      // Grid
      var size = 25;
      var step = 1;

      var gridHelper = new THREE.GridHelper( size, step );
      model.scene.add( gridHelper );

      var axisHelper = new THREE.AxisHelper( 2 );
      model.scene.add( axisHelper );

      //ground
      var groundMat = new THREE.MeshBasicMaterial({color:0xd8d8d8});
      var groundGeo = new THREE.PlaneGeometry(50,50);
      var ground = new THREE.Mesh(groundGeo,groundMat);
      ground.position.y = -0.05; //lower it
      ground.rotation.x = -Math.PI/2; //-90 degrees around the xaxis

      model.scene.add(ground);

      var modelAnimation = function(){
         model.animation = requestAnimationFrame(modelAnimation);
         model.controls.update();
         model.renderer.render(model.scene,model.camera);

      };



      if (model.robot==undefined) {
         var loader = new GUI.RobotLoader();
         loader.loadQuadrotor(0.05,function() {
            model.robot=loader.robot;
            model.scene.add( model.robot );
            modelAnimation();
	     });
      } else {
         model.scene.add( model.robot );
         modelAnimation();
      }
   };

   /*
    * initGL
    * Prepare reconstruction with webgl
    */
   var initGL = function(){
      initControls();
      if (self.modelid && model.active){
         initModel();
      }
   }

   /*************************
    ** Privileged methods ***
    *************************/

   this.setConfig = function(conf){
      this.cam1serv=conf.cam1serv || this.cam1serv;

      this.cam1id=conf.cam1id || this.cam1id;
      this.controlid=conf.controlid || this.controlid;

      this.cam1epname=conf.cam1epname || this.cam1epname;

   };

   /*
    * start
    * run client
    */

  /* var media1 = 0;
      var media2 = 0;
      var medias = 0;*/
   this.start= function(){
      //worker, serv, camid checks
      if (!this.cam1serv||!this.cam1serv.dir||!this.cam1serv.port) {
         alert("The cam1serv's data are not well defined");
         return;
      }
      if (!this.pose3dserv||!this.pose3dserv.dir||!this.pose3dserv.port) {
         alert("The pose3dserv's data are not well defined");
         return;
      }
      if (!this.cam1id) {
         alert("Not defined cam1id");
         return;
      }
      if (!this.control1id) {
         alert("Not defined controlid");
         return;
      }
      if (!this.control2id) {
         alert("Not defined controlid");
         return;
      }
      if (!this.modelid) {
         alert("Not defined modelid");
         return;
      }
      var sizeInd = $("#camView").height()/5;
      attitude = $.flightIndicator('#'+this.attitudeid, 'attitude', {showBox : false, size: sizeInd}); // Horizon
      heading = $.flightIndicator('#'+this.headingid, 'heading', {showBox:false, size: sizeInd}); // Compass
      altimeter = $.flightIndicator('#'+this.altimeterid, 'altimeter', {showBox : false, size: sizeInd}); // drone altitude
      turn_coordinator = $.flightIndicator('#'+this.turn_coordinatorid, 'turn_coordinator', {showBox : false, size: sizeInd});
      camera1 = new API.CameraRos(self.cam1serv);
      camera1.connect(self.cam1epname);
      camera1.startStreaming();
      //prueba = new API.PruebaRos(self.cmdvelserv);
      //prueba.connect(self.cmdvelepname);
      //prueba.startStreaming();
      extra = new API.ExtraRos(self.extraserv);
      extra.connect("mavros/set_mode","mavros/cmd/arming","mavros/cmd/takeoff","mavros/cmd/land");
      cmdvel = new API.MotorsRos(self.cmdvelserv);
      cmdvel.connect(self.cmdvelepname);
      cmdvelInterval1 = setInterval(function(){cmdvel.setMotors(cmdSend);},1);
      pose3d = new API.Pose3DRos(self.pose3dserv);
      pose3d.connect(self.pose3depname);
      initGL();
   };



   /*
    * isrunning
    * Returns a boolean indicating if the client is running
    */
   this.isRunning= function () {
      return camera1.isRunning || pose3d.isRunning || cmdvel.isRunning || extra.isRunning;
   };


   this.resizeCameraModel= function(){
      if (model.active) {
         model.camera.aspect = model.renderer.domElement.width / model.renderer.domElement.height;
         model.camera.updateProjectionMatrix();
         model.renderer.render(model.scene,model.camera);
      }
   };

   this.modelON = function() {
      model.active = true;
      if (self.modelid && !model.renderer){
         //console.log("ON");
         //document.getElementById("debug").value += "--------Model ON -----------\n";
         //var text = "FPS:"+camera1.data.fps+" net:"+media1/medias+" worker:"+media2/medias+"\n";
         //document.getElementById("debug").value += text;
         //media1 = media2 = medias =0;
         initModel();
         pose3d.startStreaming(model);
      }
   };

   this.modelOFF = function() {

      model.active = false;
      if (self.modelid && model.renderer){

         //document.getElementById("debug").value += "--------Model OFF -----------\n";
         //$("#media1").html(media1/medias);
         //$("#media2").html(media2/medias);
          //var text = "FPS:"+camera1.data.fps+" net:"+media1/medias+" worker:"+media2/medias+"\n";
         //document.getElementById("debug").value += text;
         //media1 = media2 = medias =0;
         cancelAnimationFrame(model.animation);// Stop the animation
         //model.renderer.domElement.addEventListener('dblclick', null, false); //remove listener to render
         model.scene = null;
         model.renderer = undefined;
         model.camera = undefined;
         model.controls = undefined;
         var m = model.container.clone();
         var parent = model.container.parent();
         model.container.remove();
         parent.append(m);
         model.container = m;

      }
   };

   $("#takeoff").on("click",function(){
     extra.arming(true);
});

$("#land").on("click",function(){
 extra.land();
 cmdSend.linearZ = 2;
});

  $("#toggle").on("click",function(){
    camera1.stop();
    camera1.disconnect();
    var topic;
    if (cam_active) {
      cam_active = false;
      topic = "/iris_fpv_cam/cam_ventral/image_raw/compressed"
    } else {
      cam_active = true;
      topic = "/iris_fpv_cam/cam_frontal/image_raw/compressed";
    }
    camera1.connect(topic);
    camera1.startStreaming();
  })
}
