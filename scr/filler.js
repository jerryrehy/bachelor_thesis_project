/*
===============================================
    Uložení modelù
===============================================
*/

// pole obashující modely
var modely = [];

// nahrání modelu ze souboru
function nahrajModel(soubor){
  objParser = new ObjParser(FileLoader(soubor));
  model2 = new model();
  model2.path = soubor;
  model2.FromParser(objParser);
  
  modely.push(model2);
}

//struktura úložištì modelu
function model(){
     
      this.model = [];
      this.Color = [];
      this.Textures = [];
      this.UseTexture = [];
      this.Mtllib;
       
      this.path;
      
      this.FromParser = function(objParser){
        this.model = objParser.Geometries;
        this.Mtllib = objParser.Mtllib;
        
        mtlParser = new MtlParser(FileLoader(this.path.substring(0, this.path.lastIndexOf("/")+1)+this.Mtllib));
        materials = mtlParser.Materials;
        var i; var j;
        for(i = 0; i < this.model.length; i++)
          for(j = 0; j < materials.length; j++){
            if( this.model[i].Material == materials[j].Name){              
                this.Color[i] = materials[j].DiffusionColor;
            }            
          }        
      }
      
      this.visible = true;          
            
      this.textureFilter = 3;
      
      this.x = 0;
      this.y = 0;
      this.z = 0;
      
      this.OtocX = 0;
      this.OtocY = 0;
      this.OtocZ = 0;     
      
      this.bodVlozeni = function(x,y,z){
      this.x = x;
      this.y = y;
      this.z = z;      
      }
      
      this.otoceni = function(x,y,z){
      this.OtocX = x;
      this.OtocY = y;
      this.OtocZ = z;      
      } 
}

/*
===============================================
    Manipulace s posledním vloženým modelem
===============================================
*/

// bod vložení modelu
function bodVlozeni(x,y,z){
  modely[modely.length-1].x = x;
  modely[modely.length-1].y = y;
  modely[modely.length-1].z = z;
}

// natoèení modelu
function otoceni(x,y,z){
  modely[modely.length-1].OtocX = x;
  modely[modely.length-1].OtocY = y;
  modely[modely.length-1].OtocZ = z;
}

// zmìna barvy objektu v modelu
function setColorI(r,g,b,i){
    modely[modely.length-1].Color[i]=new color(r,g,b);
}

// zmìna barvy celého modelu
function setColor(r,g,b){
    var i;
    for(i=0;i<modely[modely.length-1].model.length;i++){
     modely[modely.length-1].Color[i]=new color(r,g,b);
    }
}

function setTextureI(texture,i){
    modely[modely.length-1].Textures[i] = texture;
    modely[modely.length-1].UseTexture[i] = true;
}

/*
===============================================
    Funkce na práci s nahravaci zpravou
===============================================
*/

//vytvoøení obrázku se zprávou
function loadStart(){
        var nahravam = document.createElement('img');
        nahravam.src = path + "nahravam.png";
        nahravam.style.position = 'absolute';
        currentElement = canvas;
        levyOffset = 0;
        while(currentElement != null){
        levyOffset += currentElement.offsetLeft;
        currentElement = currentElement.offsetParent;
        }
        
        currentElement = canvas;
        topOffset = 0;
        while(currentElement != null){
        topOffset += currentElement.offsetTop;
        currentElement = currentElement.offsetParent;
        }
        nahravam.style.left = "" + canvas.width/2-71 + levyOffset + "px";
        nahravam.style.top = "" + canvas.height/2-71 + topOffset +"px";        
        nahravam.style.zIndex = 100;
        nahravam.id = 'loading bar';
        document.body.appendChild(nahravam);
}

//znièení obrázku se zprávou
function loadEnd(){
        var nahravam = document.getElementById('loading bar');
        document.body.removeChild(nahravam);
}

/*
===============================================
    Pøíprava vykreslovacích prvkù
===============================================
*/

var canvas;

var gl;
 
    function initGL() {
        try {        
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
            loadStart();
        } catch (e) {
        }
        if (!gl) {
            alert("Nemohu inicializovat WebGL");
        }
    }
 
 
    function getShader(gl, id) {        
        
        var str = FileLoader(path + "/shaders/"+id+".txt");
 
        var shader;
        if (id == "shader-fs") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (id == "shader-vs") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }
 
        gl.shaderSource(shader, str);
        gl.compileShader(shader);
 
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }
 
        return shader;
    }
 
 
    var shaderProgram;
 
    function initShaders() {
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");
        
        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

        shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
        shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
        shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
        shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
        shaderProgram.useTexturesUniform = gl.getUniformLocation(shaderProgram, "uUseTextures");
        shaderProgram.ColorUniform = gl.getUniformLocation(shaderProgram, "uColor");
        shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
        shaderProgram.lightingDirectionUniform = gl.getUniformLocation(shaderProgram, "uLightingDirection");
        shaderProgram.directionalColorUniform = gl.getUniformLocation(shaderProgram, "uDirectionalColor");
    }
 
 
    var mvMatrix = mat4.create();
    var pMatrix = mat4.create(); 
 
    function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

        var normalMatrix = mat3.create();
        mat4.toInverseMat3(mvMatrix, normalMatrix);
        mat3.transpose(normalMatrix);
        gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
    } 
 
    function degToRad(degrees) {
        return degrees * Math.PI / 180;
    } 
 
 function BufferObject(){
    this.objectVertexPositionBuffer = [];
    this.objectVertexNormalBuffer = [];
    this.objectVertexTextureCoordBuffer = [];
    this.objectVertexIndexBuffer = [];
 }
 
var modelBuffers = [];
 
    function BufferModel(cislo) {
    
        modelBuffers[cislo]=(new BufferObject());                    
    
        for(geometryCount = 0; geometryCount < modely[cislo].model.length; geometryCount++){                       
          modelBuffers[cislo].objectVertexPositionBuffer[geometryCount] = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, modelBuffers[cislo].objectVertexPositionBuffer[geometryCount]);

          var vertices = modely[cislo].model[geometryCount].Verticles;  
          
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
          modelBuffers[cislo].objectVertexPositionBuffer[geometryCount].itemSize = 3;
          modelBuffers[cislo].objectVertexPositionBuffer[geometryCount].numItems = vertices.length/3;        
             
          modelBuffers[cislo].objectVertexNormalBuffer[geometryCount] = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, modelBuffers[cislo].objectVertexNormalBuffer[geometryCount]);
        
          var vertexNormals = modely[cislo].model[geometryCount].Normals;
                   
       
          if(vertexNormals.length == 0){
        
            var vertexNormals = [];
        
            for(i = 0; i < vertices.length; i+=9){
             u1 = vertices[i+3]-vertices[i];
             u2 = vertices[i+4]-vertices[i+1];
             u3 = vertices[i+5]-vertices[i+2];
  
             v1 = vertices[i+6]-vertices[i];
             v2 = vertices[i+7]-vertices[i+1];
             v3 = vertices[i+8]-vertices[i+2];

             n1 = u2*v3 - u3*v2;
             n2 = u3*v1 - u1*v3;
             n3 = u1*v2 - u2*v1;
             length = Math.sqrt(Math.pow(n1, 2)+Math.pow(n2, 2)+Math.pow(n3, 2));
             vertexNormals.push(n1/length);
             vertexNormals.push(n2/length);
             vertexNormals.push(n3/length);
             vertexNormals.push(n1/length);
             vertexNormals.push(n2/length);
             vertexNormals.push(n3/length);
             vertexNormals.push(n1/length);
             vertexNormals.push(n2/length);
             vertexNormals.push(n3/length);
            }
          }
       
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
          modelBuffers[cislo].objectVertexNormalBuffer[geometryCount].itemSize = 3;
          modelBuffers[cislo].objectVertexNormalBuffer[geometryCount].numItems = vertexNormals.length/3;
               
          modelBuffers[cislo].objectVertexTextureCoordBuffer[geometryCount] = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, modelBuffers[cislo].objectVertexTextureCoordBuffer[geometryCount]);
        
          var textureCoords =[];
          if (modely[cislo].model[geometryCount].TextureCoords.length != 0){
          textureCoords = modely[cislo].model[geometryCount].TextureCoords;
          } else { 
            for(i = 0; i < modely[cislo].model[geometryCount].Verticles.length/3*2; i+=6){
              textureCoords[i] = 0;
              textureCoords[i+1] = 0;
              textureCoords[i+2] = 1;
              textureCoords[i+3] = 0;
              textureCoords[i+4] = 0;
              textureCoords[i+5] = 1;
            }       
          } 
          
        
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
          modelBuffers[cislo].objectVertexTextureCoordBuffer[geometryCount].itemSize = 2;
          modelBuffers[cislo].objectVertexTextureCoordBuffer[geometryCount].numItems = textureCoords.length/2;
        
          modelBuffers[cislo].objectVertexIndexBuffer[geometryCount] = gl.createBuffer();
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, modelBuffers[cislo].objectVertexIndexBuffer[geometryCount]);
          var objectVertexIndices = [];
          for(i = 0; i < modely[cislo].model[geometryCount].Verticles.length/3; i++){
            objectVertexIndices[i] = i;
          }
        
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objectVertexIndices), gl.STATIC_DRAW);
          modelBuffers[cislo].objectVertexIndexBuffer[geometryCount].itemSize = 1;
          modelBuffers[cislo].objectVertexIndexBuffer[geometryCount].numItems = objectVertexIndices.length;

        }
            
    } 
 
    var PosunX = 0;
    var PosunY = 0;
    var PosunZ = 0;
    
    var PivotX = 0;
    var PivotY = 0;
    var PivotZ = 0;
    
    var VelX = 1;
    var VelY = 1;
    var VelZ = 1;
 
    function drawScene() {
        
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
 
        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
        
 
        mat4.identity(mvMatrix);
        
        mat4.translate(mvMatrix, [PosunX, PosunY, PosunZ]);         
        
        mat4.multiply(mvMatrix, objectRotationMatrix);
                                 
        mat4.scale(mvMatrix, [VelX,VelY,VelZ]);
        
        mat4.translate(mvMatrix, [-PivotX, -PivotY, -PivotZ])

        var modelNumber;
        for(modelNumber = 0; modelNumber < modely.length; modelNumber++){
        if(modely[modelNumber].visible){
        mat4.translate(mvMatrix, [modely[modelNumber].x,modely[modelNumber].y,modely[modelNumber].z]);
        mat4.rotate(mvMatrix, degToRad(modely[modelNumber].OtocX), [1,0,0]);
        mat4.rotate(mvMatrix, degToRad(modely[modelNumber].OtocY), [0,1,0]);
        mat4.rotate(mvMatrix, degToRad(modely[modelNumber].OtocZ), [0,0,1]);
        
        for(geometryCount = 0; geometryCount < modely[modelNumber].model.length; geometryCount++){      
          
          gl.bindBuffer(gl.ARRAY_BUFFER, modelBuffers[modelNumber].objectVertexPositionBuffer[geometryCount]);
          gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, modelBuffers[modelNumber].objectVertexPositionBuffer[geometryCount].itemSize, gl.FLOAT, false, 0, 0);
       
          gl.bindBuffer(gl.ARRAY_BUFFER, modelBuffers[modelNumber].objectVertexNormalBuffer[geometryCount]);
          gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, modelBuffers[modelNumber].objectVertexNormalBuffer[geometryCount].itemSize, gl.FLOAT, false, 0, 0);
          
          gl.bindBuffer(gl.ARRAY_BUFFER, modelBuffers[modelNumber].objectVertexTextureCoordBuffer[geometryCount]);
          gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, modelBuffers[modelNumber].objectVertexTextureCoordBuffer[geometryCount].itemSize, gl.FLOAT, false, 0, 0);
          
          if (modely[modelNumber].UseTexture[geometryCount] == true){
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, modely[modelNumber].model[geometryCount].Texture);
          }
          gl.uniform1i(shaderProgram.samplerUniform, 0);
        
          gl.uniform1i(shaderProgram.useLightingUniform, lighting);
          gl.uniform1i(shaderProgram.useTexturesUniform, modely[modelNumber].UseTexture[geometryCount]);
          
          if (!modely[modelNumber].UseTexture[geometryCount]){
           gl.uniform3f(shaderProgram.ColorUniform, 
           modely[modelNumber].Color[geometryCount].r,
           modely[modelNumber].Color[geometryCount].g,
           modely[modelNumber].Color[geometryCount].b);
          }
          
          if (lighting) {
            gl.uniform3f(
                shaderProgram.ambientColorUniform,
                parseFloat(lightAmbR),
                parseFloat(lightAmbG),
                parseFloat(lightAmbB)
            );

            var lightingDirection = [
                parseFloat(lightDirectX),
                parseFloat(lightDirectY),
                parseFloat(lightDirectZ)
            ];
            var adjustedLD = vec3.create();
            vec3.normalize(lightingDirection, adjustedLD);
            vec3.scale(adjustedLD, -1);
            gl.uniform3fv(shaderProgram.lightingDirectionUniform, adjustedLD);

            gl.uniform3f(
                shaderProgram.directionalColorUniform,
                parseFloat(lightDirectR),
                parseFloat(lightDirectG),
                parseFloat(lightDirectB)
            );
          }               
        
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, modelBuffers[modelNumber].objectVertexIndexBuffer[geometryCount]);
          setMatrixUniforms();
          gl.drawElements(gl.TRIANGLES, modelBuffers[modelNumber].objectVertexIndexBuffer[geometryCount].numItems, gl.UNSIGNED_SHORT, 0); 
          }
                
        mat4.rotate(mvMatrix, degToRad(modely[modelNumber].OtocZ), [0,0,-1]);
        mat4.rotate(mvMatrix, degToRad(modely[modelNumber].OtocY), [0,-1,0]);
        mat4.rotate(mvMatrix, degToRad(modely[modelNumber].OtocX), [-1,0,0]);
        mat4.translate(mvMatrix, [-modely[modelNumber].x,-modely[modelNumber].y,-modely[modelNumber].z]);        
        }
               
    }     
    }      
    
    
    function RelPosun(x,y,z){
      PosunX += x;
      PosunY += y;
      PosunZ += z;        
    }
    
    function AbsPosun(x,y,z){
      PosunX = x;
      PosunY = y;
      PosunZ = z;        
    }
    
    function RelZvetseni(x,y,z){
      if(y!=null&z!=null){
      VelX *= x;
      VelY *= y;
      VelZ *= z;
      }
      if(y==null&z==null){
      VelX *= x;
      VelY *= x;
      VelZ *= x;
      }       
    }
    
    function AbsZvetseni(x,y,z){
      if(y!=null&z!=null){
      VelX = x;
      VelY = y;
      VelZ = z;
      }
      if(y==null&z==null){
      VelX = x;
      VelY = x;
      VelZ = x;
      }        
    }
    
    function SetPivot(x,y,z){
    PivotX = x;
    PivotY = y;
    PivotZ = z;
    
    }
    
  var mouseDown = false;
  var mousebutton;
  var lastMouseX = null;
  var lastMouseY = null;

  var objectRotationMatrix = mat4.create();
  mat4.identity(objectRotationMatrix);

  function handleMouseDown(event) {
    mouseDown = true;
    mousebutton = event.button;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
  }

  function handleMouseUp(event) {
    mouseDown = false;
  }

  function handleMouseMove(event) {
    if (!mouseDown) {
      return;
    }
    var newX = event.clientX;
    var newY = event.clientY;

    if(mousebutton == 0){
      var deltaX = newX - lastMouseX;
      var newRotationMatrix = mat4.create();
      mat4.identity(newRotationMatrix);
      mat4.rotate(newRotationMatrix, degToRad(deltaX / 10), [0, 1, 0]);

      var deltaY = newY - lastMouseY;
      mat4.rotate(newRotationMatrix, degToRad(deltaY / 10), [1, 0, 0]);

      mat4.multiply(newRotationMatrix, objectRotationMatrix, objectRotationMatrix);

      lastMouseX = newX
      lastMouseY = newY;
    } else if(mousebutton == 2){
      var deltaX = newX - lastMouseX;
      var deltaY = newY - lastMouseY;
      RelPosun(deltaX/50,-deltaY/50,0);

      lastMouseX = newX
      lastMouseY = newY;
    }
  }
  
      function RelOtoc(x,y,z){
      var newRotationMatrix = mat4.create();      
      mat4.identity(newRotationMatrix);
      mat4.rotate(newRotationMatrix, degToRad(x), [1, 0, 0]);
      mat4.rotate(newRotationMatrix, degToRad(y), [0, 1, 0]);      
      mat4.rotate(newRotationMatrix, degToRad(z), [0, 0, 1]);
      mat4.multiply(newRotationMatrix, objectRotationMatrix, objectRotationMatrix);
      }        
    
    function AbsOtoc(x,y,z){
      mat4.identity(objectRotationMatrix);
      mat4.rotate(objectRotationMatrix, degToRad(x), [1, 0, 0]);
      mat4.rotate(objectRotationMatrix, degToRad(y), [0, 1, 0]);      
      mat4.rotate(objectRotationMatrix, degToRad(z), [0, 0, 1]);        
    }                
    
    function setCanvas(idCanvas){
    canvas = document.getElementById(idCanvas);
    }
  var bgR = 0;
  var bgG = 0;
  var bgB = 0;
  var bgA = 1;  
    
    
    function setBgColor(r,g,b,a){
        bgR = r;
        bgG = g;
        bgB = b;
        if (a !=null){
        bgA = a;
        }
    }
 
    var lighting = false;
        
    function setLighting(ligt){
        lighting = ligt;
    }
        
    var lightAmbR = 1;
    var lightAmbG = 1;
    var lightAmbB = 1;
    
    function setAmbientLight(r,g,b){
     lightAmbR = r;
     lightAmbG = g;
     lightAmbB = b;    
    }
    
    var lightDirectR = 0;
    var lightDirectG = 0;
    var lightDirectB = 0;
    
    function setDirectionalLightColor(r,g,b){
     lightDirectR = r;
     lightDirectG = g;
     lightDirectB = b;    
    }
    
    var lightDirectX = 0;
    var lightDirectY = 0;
    var lightDirectZ = -1;
    
    function setDirectionalLightPosition(x,y,z){
     lightDirectX = x;
     lightDirectY = y;
     lightDirectZ = z;    
    }
 
    function webGLInit(){
      initGL();
      initShaders();
      
      gl.clearColor(bgR, bgG, bgB, bgA);
      gl.enable(gl.DEPTH_TEST);
      
      if (canvas.addEventListener)
	       canvas.addEventListener('DOMMouseScroll', handleMouseWheel, false);
      
      canvas.oncontextmenu = function(){return false};
      canvas.onmousedown = handleMouseDown;
      canvas.onmousewheel = handleMouseWheel;
      document.onmouseup = handleMouseUp;
      document.onmousemove = handleMouseMove;
      
       
    }
      
    function handleMouseWheel(event){
    	var delta = 0;
	    if (!event) event = window.event;
	    if (event.wheelDelta) {
		     delta = event.wheelDelta/120; 
	    } else if (event.detail) {delta = -event.detail/3;
	    }
      
      RelZvetseni(1+delta/10);
      		      
      if (event.preventDefault) event.preventDefault();
      event.returnValue = false;
    }
 
    function webGLStart() {                        

        var i; var j;
        for(i = 0;i<modely.length;i++) {
        BufferModel(i); 
        }
       
       
        for(i = 0;i<modely.length;i++) {
          for(j = 0; j < modely[i].model.length; j++){
            if(modely[i].UseTexture[j]) initTexture(i,j);
           }
        }
        loadEnd();
        tick();                                                    
    }
    
    function tick() {
    requestAnimFrame(tick);
    drawScene();
    
    }
    
    /*
    =============================================
         Inicializace a zpracování textur
    =============================================
    */
    
    function initTexture(i, j) {    
        modely[i].model[j].Texture = gl.createTexture();
        modely[i].model[j].Texture.image = new Image();
        modely[i].model[j].Texture.image.onload = function() {
        handleLoadedTexture(modely[i].model[j].Texture, modely[i].textureFilter);
       }
       modely[i].model[j].Texture.image.src = modely[i].Textures[j];
    }
  
    function handleLoadedTexture(texture, param) {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
      if(param==1){
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      }
      if(param==2){
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);    
      }
      if(param==3){
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);    
      }
      gl.bindTexture(gl.TEXTURE_2D, null);
      }