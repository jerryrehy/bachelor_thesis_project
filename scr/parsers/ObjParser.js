//objekt uchov�vaj�c� data jedlotliv�ch objekt� modelu
Geometry = function(){         
            
         this.Verticles = [];
         this.Normals = [];
         this.TextureCoords = [];
         this.Material;
         this.Textures;                        
}

function Bod2(x,y){
    this.x = x;
    this.y = y;
}

function Bod3(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
}

// V�po�et norm�lov�ho vektoru
function getNormal(x1,y1,z1,x2,y2,z2,x3,y3,z3){
  u1 = x2-x1;
  u2 = y2-y1;
  u3 = z2-z1;
  
  v1 = x3-x1;
  v2 = y3-y1;
  v3 = z3-z1;

  n1 = u2*v3 - u3*v2;
  n2 = u3*v1 - u1*v3;
  n3 = u1*v2 - u2*v1;
  length = Math.sqrt(Math.pow(n1, 2)+Math.pow(n2, 2)+Math.pow(n3, 2));
  return Bod3(n1/length,n2/length,n3/length);
}

// Parser dost�vaj�c� data z textov�ho form�tu
function ObjParser(ObjText){
                           
         this.Geometries = [];
         this.Mtllib;                        
                          
         var ObjTextSplit = ObjText.split("\n");         
         GeometriesCount = 0;
         
         var verticles = [];
         var normals = [];
         var textureUV = [];
         
         for(var lineCount = 0; lineCount < ObjTextSplit.length; lineCount++){
                     
            var lineSplit = ObjTextSplit[lineCount].split(" ");
            
            //N�lez objektu 
            if(lineSplit[0] == "o"){
              this.Geometries.push(new Geometry());
              GeometriesCount++;
            }
            
            //N�lez vrcholu
            if(lineSplit[0] == "v"){
      	  	   verticles.push(new Bod3(parseFloat(lineSplit[1]),
          	  	   	                   parseFloat(lineSplit[2]),
          	  	   	                   parseFloat(lineSplit[3])));            
            }
            
            //N�lez norm�ly
            if(lineSplit[0] == "vn"){
      	  	   normals.push(new Bod3(parseFloat(lineSplit[1]),
          	  	   	                 parseFloat(lineSplit[2]),
          	  	   	                 parseFloat(lineSplit[3])));            
            }
            
            //N�lez UV sou�adnic textury
            if(lineSplit[0] == "vt"){
      	  	   textureUV.push(new Bod2(parseFloat(lineSplit[1]),
          	  	   	                   parseFloat(lineSplit[2])));            
            }
            
            //pou�it� materi�l
            if(lineSplit[0] == "usemtl"){
               this.Geometries[GeometriesCount-1].Material = lineSplit[1];            
            }
            
            //knihovna materi�l�
            if(lineSplit[0] == "mtllib"){
               this.Mtllib =  ObjTextSplit[lineCount].substring((ObjTextSplit[lineCount].indexOf(" ")+1), ObjTextSplit[lineCount].length);
            }
            
            //N�lez face
            if(lineSplit[0] == "f"){
         
              var faceVerticle = lineSplit[1].split("/");
              
              //face bez textur, a normal
              if(faceVerticle.length==1){ 
                
                  if(lineSplit.length == 4){
                     //troj�heln�k    
                     for(var verticleCount = 1; verticleCount < lineSplit.length; verticleCount++){
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(lineSplit[verticleCount])-1].x);
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(lineSplit[verticleCount])-1].y);
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(lineSplit[verticleCount])-1].z);
                     }
                  } else if(lineSplit.length == 5){
                     //�tverec
                     for(var verticleCount = 1; verticleCount < 4; verticleCount++){
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(lineSplit[verticleCount])-1].x);
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(lineSplit[verticleCount])-1].y);
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(lineSplit[verticleCount])-1].z);
                     }
                     for(var verticleCount = 1; verticleCount < 5; verticleCount++){
                        if(verticleCount !=2){
                          this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(lineSplit[verticleCount])-1].x);
                          this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(lineSplit[verticleCount])-1].y);
                          this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(lineSplit[verticleCount])-1].z);
                        }
                     }
                                    
                  }
              }
              
              //face s texturama bez normal
              if(faceVerticle.length==2){
              
                  //this.Geometries[GeometriesCount-1].Textures = true;
                
                  if(lineSplit.length == 4){
                     //troj�heln�k
                     for(var verticleCount = 1; verticleCount < lineSplit.length; verticleCount++){
                        
                        var faceVertInfo = lineSplit[verticleCount].split("/");
                        
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].x);
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].y);
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].z);
                        
                        this.Geometries[GeometriesCount-1].TextureCoords.push(textureUV[parseFloat(faceVertInfo[1])-1].x);
                        this.Geometries[GeometriesCount-1].TextureCoords.push(textureUV[parseFloat(faceVertInfo[1])-1].y);
                     }
                  } else if(lineSplit.length == 5){
                     //�tverec
                     for(var verticleCount = 1; verticleCount < 4; verticleCount++){
                        
                        var faceVertInfo = lineSplit[verticleCount].split("/");
                        
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].x);
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].y);
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].z);
                        
                        this.Geometries[GeometriesCount-1].TextureCoords.push(textureUV[parseFloat(faceVertInfo[1])-1].x);
                        this.Geometries[GeometriesCount-1].TextureCoords.push(textureUV[parseFloat(faceVertInfo[1])-1].y);
                     }
                     for(var verticleCount = 1; verticleCount < 5; verticleCount++){
                        
                        var faceVertInfo = lineSplit[verticleCount].split("/");
                        
                        if(verticleCount !=2){
                          this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].x);
                          this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].y);
                          this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].z);
                          
                          this.Geometries[GeometriesCount-1].TextureCoords.push(textureUV[parseFloat(faceVertInfo[1])-1].x);
                          this.Geometries[GeometriesCount-1].TextureCoords.push(textureUV[parseFloat(faceVertInfo[1])-1].y);
                        }
                     }
                                    
                  }
              }
                
              //face s normalami
              if(faceVerticle.length==3){
                
                  if(lineSplit.length == 4){
                     //troj�heln�k
                     for(var verticleCount = 1; verticleCount < lineSplit.length; verticleCount++){
                        
                        var faceVertInfo = lineSplit[verticleCount].split("/");
                        
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].x);
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].y);
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].z);
                        
                        if(faceVertInfo[1] != ""){
                        this.Geometries[GeometriesCount-1].TextureCoords.push(textureUV[parseFloat(faceVertInfo[1])-1].x);
                        this.Geometries[GeometriesCount-1].TextureCoords.push(textureUV[parseFloat(faceVertInfo[1])-1].y);
                        }
                        
                        this.Geometries[GeometriesCount-1].Normals.push(normals[parseFloat(faceVertInfo[2])-1].x);
                        this.Geometries[GeometriesCount-1].Normals.push(normals[parseFloat(faceVertInfo[2])-1].y);
                        this.Geometries[GeometriesCount-1].Normals.push(normals[parseFloat(faceVertInfo[2])-1].z);
                     }
                  } else if(lineSplit.length == 5){
                     //�tverec
                     for(var verticleCount = 1; verticleCount < 4; verticleCount++){
                        
                        var faceVertInfo = lineSplit[verticleCount].split("/");
                        
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].x);
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].y);
                        this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].z);
                        
                        if(faceVertInfo[1] != ""){
                        this.Geometries[GeometriesCount-1].TextureCoords.push(textureUV[parseFloat(faceVertInfo[1])-1].x);
                        this.Geometries[GeometriesCount-1].TextureCoords.push(textureUV[parseFloat(faceVertInfo[1])-1].y);
                        }
                        
                        this.Geometries[GeometriesCount-1].Normals.push(normals[parseFloat(faceVertInfo[2])-1].x);
                        this.Geometries[GeometriesCount-1].Normals.push(normals[parseFloat(faceVertInfo[2])-1].y);
                        this.Geometries[GeometriesCount-1].Normals.push(normals[parseFloat(faceVertInfo[2])-1].z);
                     }
                     for(var verticleCount = 1; verticleCount < 5; verticleCount++){
                        
                        var faceVertInfo = lineSplit[verticleCount].split("/");
                        
                        if(verticleCount !=2){
                          this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].x);
                          this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].y);
                          this.Geometries[GeometriesCount-1].Verticles.push(verticles[parseFloat(faceVertInfo[0])-1].z);
                          
                          if(faceVertInfo[1] != ""){
                          this.Geometries[GeometriesCount-1].TextureCoords.push(textureUV[parseFloat(faceVertInfo[1])-1].x);
                          this.Geometries[GeometriesCount-1].TextureCoords.push(textureUV[parseFloat(faceVertInfo[1])-1].y);
                          }
                          
                          this.Geometries[GeometriesCount-1].Normals.push(normals[parseFloat(faceVertInfo[2])-1].x);
                          this.Geometries[GeometriesCount-1].Normals.push(normals[parseFloat(faceVertInfo[2])-1].y);
                          this.Geometries[GeometriesCount-1].Normals.push(normals[parseFloat(faceVertInfo[2])-1].z);
                        }
                     }
                                    
                  }
              }
         
         
         
            }
         }
         
}