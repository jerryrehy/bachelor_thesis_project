// Funkce pro vytváøení primitiv
function vytvorHranol(x,y,z){

  hranol = new model();
  
  hranol.model.push(new Geometry());
  hranol.model[0].Verticles = [x, 0, -z, x, 0,  0, 0, 0, 0,
                               x, 0, -z, 0, 0,  0, 0, 0, -z,
                               x, y, -z, 0, y, -z, 0, y, 0,
                               x, y, -z, 0, y,  0, x, y, 0,
                               x, 0, -z, x, y, -z, x, y, 0,
                               x, 0, -z, x, y,  0, x, 0, 0,
                               x, 0,  0, x, y,  0, 0, y, 0,
                               x, 0,  0, 0, y,  0, 0, 0, 0,
                               0, 0,  0, 0, y,  0, 0, y, -z,
                               0, 0,  0, 0, y, -z, 0, 0, -z,
                               x, y, -z, x, 0, -z, 0, 0, -z,
                               x, y, -z, 0, 0, -z, 0, y, -z];
  hranol.model[0].Normals = [];                              
  hranol.Color[0]= new color(1,1,1);
  modely.push(hranol);
  
}

function vytvorObdelnik(x,y){
  obdelnik = new model();
  
  obdelnik.model.push(new Geometry());
  obdelnik.model[0].Verticles = [0, 0, 0, x, 0, 0, x, y, 0,
                                 0, 0, 0, x, y, 0, 0, y, 0];
  obdelnik.model[0].Normals = [];
  obdelnik.Color[0]= new color(1,1,1);                              
  modely.push(obdelnik);
}

function vytvorCaru(x1,y1,x2,y2,t){
  obdelnik = new model();
  alfa = Math.atan((y2-y1)/(x2-x1));

  
  obdelnik.model.push(new Geometry());
  if(x1 <= x2){
  obdelnik.model[0].Verticles = [x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 x2+Math.cos(alfa-Math.PI/2)*t/2, y2+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0, 
                                 x1+Math.cos(alfa+Math.PI/2)*t/2, y1+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 
                                 x2, y2, 0,
                                 x2+Math.cos(alfa-Math.PI/2)*t/2, y2+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 x2+Math.cos(alfa-Math.PI/4)*t/2, y2+Math.sin(alfa-Math.PI/4)*t/2, 0,
                                 x2, y2, 0,
                                 x2+Math.cos(alfa-Math.PI/4)*t/2, y2+Math.sin(alfa-Math.PI/4)*t/2, 0,
                                 x2+Math.cos(alfa)*t/2, y2+Math.sin(alfa)*t/2, 0,
                                 x2, y2, 0,
                                 x2+Math.cos(alfa+Math.PI/4)*t/2, y2+Math.sin(alfa+Math.PI/4)*t/2, 0,                                 
                                 x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 x2, y2, 0,
                                 x2+Math.cos(alfa)*t/2, y2+Math.sin(alfa)*t/2, 0,
                                 x2+Math.cos(alfa+Math.PI/4)*t/2, y2+Math.sin(alfa+Math.PI/4)*t/2, 0,
                                 
                                 x1, y1, 0,                                 
                                 x1-Math.cos(alfa-Math.PI/2)*t/2, y1-Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 x1-Math.cos(alfa-Math.PI/4)*t/2, y1-Math.sin(alfa-Math.PI/4)*t/2, 0,
                                 x1, y1, 0,
                                 x1-Math.cos(alfa-Math.PI/4)*t/2, y1-Math.sin(alfa-Math.PI/4)*t/2, 0,
                                 x1-Math.cos(alfa)*t/2, y1-Math.sin(alfa)*t/2, 0,
                                 x1, y1, 0,
                                 x1-Math.cos(alfa+Math.PI/4)*t/2, y1-Math.sin(alfa+Math.PI/4)*t/2, 0,                                 
                                 x1-Math.cos(alfa+Math.PI/2)*t/2, y1-Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 x1, y1, 0,
                                 x1-Math.cos(alfa)*t/2, y1-Math.sin(alfa)*t/2, 0,
                                 x1-Math.cos(alfa+Math.PI/4)*t/2, y1-Math.sin(alfa+Math.PI/4)*t/2, 0];
  } else {
  obdelnik.model[0].Verticles = [x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,                                 
                                 x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 x2+Math.cos(alfa-Math.PI/2)*t/2, y2+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 
                                 x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,                                  
                                 x1+Math.cos(alfa+Math.PI/2)*t/2, y1+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 
                                 x2, y2, 0,
                                 x2-Math.cos(alfa-Math.PI/2)*t/2, y2-Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 x2-Math.cos(alfa-Math.PI/4)*t/2, y2-Math.sin(alfa-Math.PI/4)*t/2, 0,
                                 x2, y2, 0,
                                 x2-Math.cos(alfa-Math.PI/4)*t/2, y2-Math.sin(alfa-Math.PI/4)*t/2, 0,
                                 x2-Math.cos(alfa)*t/2, y2-Math.sin(alfa)*t/2, 0,
                                 x2, y2, 0,
                                 x2-Math.cos(alfa+Math.PI/4)*t/2, y2-Math.sin(alfa+Math.PI/4)*t/2, 0,                                 
                                 x2-Math.cos(alfa+Math.PI/2)*t/2, y2-Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 x2, y2, 0,
                                 x2-Math.cos(alfa)*t/2, y2-Math.sin(alfa)*t/2, 0,
                                 x2-Math.cos(alfa+Math.PI/4)*t/2, y2-Math.sin(alfa+Math.PI/4)*t/2, 0,
                                 
                                 x1, y1, 0,                                 
                                 x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 x1+Math.cos(alfa-Math.PI/4)*t/2, y1+Math.sin(alfa-Math.PI/4)*t/2, 0,
                                 x1, y1, 0,
                                 x1+Math.cos(alfa-Math.PI/4)*t/2, y1+Math.sin(alfa-Math.PI/4)*t/2, 0,
                                 x1+Math.cos(alfa)*t/2, y1+Math.sin(alfa)*t/2, 0,
                                 x1, y1, 0,
                                 x1+Math.cos(alfa+Math.PI/4)*t/2, y1+Math.sin(alfa+Math.PI/4)*t/2, 0,                                 
                                 x1+Math.cos(alfa+Math.PI/2)*t/2, y1+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 x1, y1, 0,
                                 x1+Math.cos(alfa)*t/2, y1+Math.sin(alfa)*t/2, 0,
                                 x1+Math.cos(alfa+Math.PI/4)*t/2, y1+Math.sin(alfa+Math.PI/4)*t/2, 0];
  
  
  }
  
  obdelnik.model[0].Normals = [];
  obdelnik.Color[0]= new color(1,1,1);                              
  modely.push(obdelnik);
}

function vytvorCaruB(x1,y1,x2,y2,t){
  obdelnik = new model();
  alfa = Math.atan((y2-y1)/(x2-x1));

  
  obdelnik.model.push(new Geometry());
  if(x1 > x2){
  obdelnik.model[0].Verticles = [x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 x2+Math.cos(alfa-Math.PI/2)*t/2, y2+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0, 
                                 x1+Math.cos(alfa+Math.PI/2)*t/2, y1+Math.sin(alfa+Math.PI/2)*t/2, 0,                                 
                                 
                                 x2, y2, 0,
                                 x2-Math.cos(alfa-Math.PI/4)*t/2, y2-Math.sin(alfa-Math.PI/4)*t/2, 0,
                                 x2-Math.cos(alfa-Math.PI/2)*t/2, y2-Math.sin(alfa-Math.PI/2)*t/2, 0,                                 
                                 x2, y2, 0,
                                 x2-Math.cos(alfa)*t/2, y2-Math.sin(alfa)*t/2, 0,
                                 x2-Math.cos(alfa-Math.PI/4)*t/2, y2-Math.sin(alfa-Math.PI/4)*t/2, 0,                                                                  
                                 x2-Math.cos(alfa+Math.PI/4)*t/2, y2-Math.sin(alfa+Math.PI/4)*t/2, 0,                                 
                                 x2, y2, 0,                                 
                                 x2-Math.cos(alfa+Math.PI/2)*t/2, y2-Math.sin(alfa+Math.PI/2)*t/2, 0,                            
                                 x2-Math.cos(alfa)*t/2, y2-Math.sin(alfa)*t/2, 0,
                                 x2, y2, 0,
                                 x2-Math.cos(alfa+Math.PI/4)*t/2, y2-Math.sin(alfa+Math.PI/4)*t/2, 0,
                                 
                                                                  
                                 x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 x1, y1, 0,
                                 x1+Math.cos(alfa-Math.PI/4)*t/2, y1+Math.sin(alfa-Math.PI/4)*t/2, 0,                                                                  
                                 x1+Math.cos(alfa-Math.PI/4)*t/2, y1+Math.sin(alfa-Math.PI/4)*t/2, 0,
                                 x1, y1, 0,
                                 x1+Math.cos(alfa)*t/2, y1+Math.sin(alfa)*t/2, 0,                                                                  
                                 x1+Math.cos(alfa+Math.PI/4)*t/2, y1+Math.sin(alfa+Math.PI/4)*t/2, 0,                                 
                                 x1, y1, 0,
                                 x1+Math.cos(alfa+Math.PI/2)*t/2, y1+Math.sin(alfa+Math.PI/2)*t/2, 0,                                                                  
                                 x1+Math.cos(alfa)*t/2, y1+Math.sin(alfa)*t/2, 0,
                                 x1, y1, 0,
                                 x1+Math.cos(alfa+Math.PI/4)*t/2, y1+Math.sin(alfa+Math.PI/4)*t/2, 0];
  } else {
  obdelnik.model[0].Verticles = [x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,                                 
                                 x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 x2+Math.cos(alfa-Math.PI/2)*t/2, y2+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 
                                 x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,                                  
                                 x1+Math.cos(alfa+Math.PI/2)*t/2, y1+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 
                                 x2, y2, 0,
                                 x2+Math.cos(alfa-Math.PI/4)*t/2, y2+Math.sin(alfa-Math.PI/4)*t/2, 0,
                                 x2+Math.cos(alfa-Math.PI/2)*t/2, y2+Math.sin(alfa-Math.PI/2)*t/2, 0,                                 
                                 x2, y2, 0,
                                 x2+Math.cos(alfa)*t/2, y2+Math.sin(alfa)*t/2, 0,
                                 x2+Math.cos(alfa-Math.PI/4)*t/2, y2+Math.sin(alfa-Math.PI/4)*t/2, 0,                                                                  
                                 x2+Math.cos(alfa+Math.PI/4)*t/2, y2+Math.sin(alfa+Math.PI/4)*t/2, 0,                                 
                                 x2, y2, 0,                                 
                                 x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0,                            
                                 x2+Math.cos(alfa)*t/2, y2+Math.sin(alfa)*t/2, 0,
                                 x2, y2, 0,
                                 x2+Math.cos(alfa+Math.PI/4)*t/2, y2+Math.sin(alfa+Math.PI/4)*t/2, 0,
                                 
                                                                  
                                 x1-Math.cos(alfa-Math.PI/2)*t/2, y1-Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 x1, y1, 0,
                                 x1-Math.cos(alfa-Math.PI/4)*t/2, y1-Math.sin(alfa-Math.PI/4)*t/2, 0,                                                                  
                                 x1-Math.cos(alfa-Math.PI/4)*t/2, y1-Math.sin(alfa-Math.PI/4)*t/2, 0,
                                 x1, y1, 0,
                                 x1-Math.cos(alfa)*t/2, y1-Math.sin(alfa)*t/2, 0,                                                                  
                                 x1-Math.cos(alfa+Math.PI/4)*t/2, y1-Math.sin(alfa+Math.PI/4)*t/2, 0,                                 
                                 x1, y1, 0,
                                 x1-Math.cos(alfa+Math.PI/2)*t/2, y1-Math.sin(alfa+Math.PI/2)*t/2, 0,                                                                  
                                 x1-Math.cos(alfa)*t/2, y1-Math.sin(alfa)*t/2, 0,
                                 x1, y1, 0,
                                 x1-Math.cos(alfa+Math.PI/4)*t/2, y1-Math.sin(alfa+Math.PI/4)*t/2, 0];    
  }
  
  obdelnik.model[0].Normals = [];
  obdelnik.Color[0]= new color(1,1,1);                              
  modely.push(obdelnik);
}

function vytvorKruh(r,s){
 kruh = new model();
 
 alfa = 2*Math.PI/s;
 
 kruh.model.push(new Geometry());
 kruh.model[0].Verticles = [];
 var i;
 for(i = 0; i < s; i++){
 
 kruh.model[0].Verticles.push(0);
 kruh.model[0].Verticles.push(0);
 kruh.model[0].Verticles.push(0);
 kruh.model[0].Verticles.push(Math.cos(i*alfa)*r);
 kruh.model[0].Verticles.push(Math.sin(i*alfa)*r);
 kruh.model[0].Verticles.push(0);
 kruh.model[0].Verticles.push(Math.cos((i+1)*alfa)*r);
 kruh.model[0].Verticles.push(Math.sin((i+1)*alfa)*r);
 kruh.model[0].Verticles.push(0); 
 }
 kruh.model[0].Normals =  [];
 kruh.Color[0]= new color(1,1,1);
 modely.push(kruh);

}

function vytvorValec(r,v,s){
 valec = new model();
 
 alfa = 2*Math.PI/s;
 
 valec.model.push(new Geometry());
 valec.model[0].Verticles = [];
 var i;
 for(i = 0; i < s; i++){
 
 valec.model[0].Verticles.push(0);
 valec.model[0].Verticles.push(0);
 valec.model[0].Verticles.push(0);
 valec.model[0].Verticles.push(Math.cos(i*alfa)*r);
 valec.model[0].Verticles.push(Math.sin(i*alfa)*r);
 valec.model[0].Verticles.push(0);
 valec.model[0].Verticles.push(Math.cos((i+1)*alfa)*r);
 valec.model[0].Verticles.push(Math.sin((i+1)*alfa)*r);
 valec.model[0].Verticles.push(0);
 
 valec.model[0].Verticles.push(Math.cos((i+1)*alfa)*r);
 valec.model[0].Verticles.push(Math.sin((i+1)*alfa)*r);
 valec.model[0].Verticles.push(-v);
 valec.model[0].Verticles.push(Math.cos((i+1)*alfa)*r);
 valec.model[0].Verticles.push(Math.sin((i+1)*alfa)*r);
 valec.model[0].Verticles.push(0);
 valec.model[0].Verticles.push(Math.cos(i*alfa)*r);
 valec.model[0].Verticles.push(Math.sin(i*alfa)*r);
 valec.model[0].Verticles.push(0);

 valec.model[0].Verticles.push(Math.cos(i*alfa)*r);
 valec.model[0].Verticles.push(Math.sin(i*alfa)*r);
 valec.model[0].Verticles.push(-v);
 valec.model[0].Verticles.push(Math.cos((i+1)*alfa)*r);
 valec.model[0].Verticles.push(Math.sin((i+1)*alfa)*r);
 valec.model[0].Verticles.push(-v);
 valec.model[0].Verticles.push(Math.cos(i*alfa)*r);
 valec.model[0].Verticles.push(Math.sin(i*alfa)*r);
 valec.model[0].Verticles.push(0);
  
 valec.model[0].Verticles.push(Math.cos((i+1)*alfa)*r);
 valec.model[0].Verticles.push(Math.sin((i+1)*alfa)*r);
 valec.model[0].Verticles.push(-v);
 valec.model[0].Verticles.push(Math.cos(i*alfa)*r);
 valec.model[0].Verticles.push(Math.sin(i*alfa)*r);
 valec.model[0].Verticles.push(-v);
 valec.model[0].Verticles.push(0);
 valec.model[0].Verticles.push(0);
 valec.model[0].Verticles.push(-v);
  
 }
 valec.model[0].Normals =  [];
 valec.Color[0]= new color(1,1,1);
 modely.push(valec);
}

function vytvorKouli(r,s){
 koule = new model();
 
 alfa = 2*Math.PI/s;
 
 
 
 koule.model.push(new Geometry());
 koule.model[0].Verticles = [];
 var i;
 var j;
 for(j = 0; j < s*2; j++){   
  if(j<(s/2)||j>=s+s/2){ 
   for(i = 0; i < s; i++){
    koule.model[0].Verticles.push(Math.cos((i+1)*alfa)*Math.cos((j+1)*alfa/2)*r);
    koule.model[0].Verticles.push(Math.sin((i+1)*alfa)*Math.cos((j+1)*alfa/2)*r);
    koule.model[0].Verticles.push(-Math.sin((j+1)*alfa/2)*r);
    koule.model[0].Verticles.push(Math.cos((i+1)*alfa)*Math.cos((j)*alfa/2)*r);
    koule.model[0].Verticles.push(Math.sin((i+1)*alfa)*Math.cos((j)*alfa/2)*r);
    koule.model[0].Verticles.push(-Math.sin((j)*alfa/2)*r);
    koule.model[0].Verticles.push(Math.cos(i*alfa)*Math.cos((j)*alfa/2)*r);
    koule.model[0].Verticles.push(Math.sin(i*alfa)*Math.cos((j)*alfa/2)*r);
    koule.model[0].Verticles.push(-Math.sin((j)*alfa/2)*r);

    koule.model[0].Verticles.push(Math.cos(i*alfa)*Math.cos((j+1)*alfa/2)*r);
    koule.model[0].Verticles.push(Math.sin(i*alfa)*Math.cos((j+1)*alfa/2)*r);
    koule.model[0].Verticles.push(-Math.sin((j+1)*alfa/2)*r);
    koule.model[0].Verticles.push(Math.cos((i+1)*alfa)*Math.cos((j+1)*alfa/2)*r);
    koule.model[0].Verticles.push(Math.sin((i+1)*alfa)*Math.cos((j+1)*alfa/2)*r);
    koule.model[0].Verticles.push(-Math.sin((j+1)*alfa/2)*r);
    koule.model[0].Verticles.push(Math.cos(i*alfa)*Math.cos((j)*alfa/2)*r);
    koule.model[0].Verticles.push(Math.sin(i*alfa)*Math.cos((j)*alfa/2)*r);
    koule.model[0].Verticles.push(-Math.sin((j)*alfa/2)*r);
  
   }
  }
 }
 koule.model[0].Normals =  [];
 koule.Color[0]= new color(1,1,1);
 modely.push(koule);
}

function MultiCara(){
  multicara = new model();
  n = 0;
  multicara.model.push(new Geometry());
  multicara.model[0].Verticles = [];
  this.pridejCaru = function(x1,y1,x2,y2,t){
    if(multicara.model[n].Verticles.length + 90 > 196608){
    n++;
    multicara.model.push(new Geometry());
    multicara.model[n].Verticles = [];
    }
  
    alfa = Math.atan((y2-y1)/(x2-x1));
    if(x1 <= x2){
      multicara.model[n].Verticles.push(x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                        x2+Math.cos(alfa-Math.PI/2)*t/2, y2+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                        x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                        x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                        x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0, 
                                        x1+Math.cos(alfa+Math.PI/2)*t/2, y1+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 
                                        x2, y2, 0,
                                        x2+Math.cos(alfa-Math.PI/2)*t/2, y2+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                        x2+Math.cos(alfa-Math.PI/4)*t/2, y2+Math.sin(alfa-Math.PI/4)*t/2, 0,
                                        x2, y2, 0,
                                        x2+Math.cos(alfa-Math.PI/4)*t/2, y2+Math.sin(alfa-Math.PI/4)*t/2, 0,
                                        x2+Math.cos(alfa)*t/2, y2+Math.sin(alfa)*t/2, 0,
                                        x2, y2, 0,
                                        x2+Math.cos(alfa+Math.PI/4)*t/2, y2+Math.sin(alfa+Math.PI/4)*t/2, 0,                                 
                                        x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                        x2, y2, 0,
                                        x2+Math.cos(alfa)*t/2, y2+Math.sin(alfa)*t/2, 0,
                                        x2+Math.cos(alfa+Math.PI/4)*t/2, y2+Math.sin(alfa+Math.PI/4)*t/2, 0,
                                 
                                        x1, y1, 0,                                 
                                        x1-Math.cos(alfa-Math.PI/2)*t/2, y1-Math.sin(alfa-Math.PI/2)*t/2, 0,
                                        x1-Math.cos(alfa-Math.PI/4)*t/2, y1-Math.sin(alfa-Math.PI/4)*t/2, 0,
                                        x1, y1, 0,
                                        x1-Math.cos(alfa-Math.PI/4)*t/2, y1-Math.sin(alfa-Math.PI/4)*t/2, 0,
                                        x1-Math.cos(alfa)*t/2, y1-Math.sin(alfa)*t/2, 0,
                                        x1, y1, 0,
                                        x1-Math.cos(alfa+Math.PI/4)*t/2, y1-Math.sin(alfa+Math.PI/4)*t/2, 0,                                 
                                        x1-Math.cos(alfa+Math.PI/2)*t/2, y1-Math.sin(alfa+Math.PI/2)*t/2, 0,
                                        x1, y1, 0,
                                        x1-Math.cos(alfa)*t/2, y1-Math.sin(alfa)*t/2, 0,
                                        x1-Math.cos(alfa+Math.PI/4)*t/2, y1-Math.sin(alfa+Math.PI/4)*t/2, 0);
    } else {
      multicara.model[n].Verticles.push(x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,                                 
                                       x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                       x2+Math.cos(alfa-Math.PI/2)*t/2, y2+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 
                                      x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                      x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,                                  
                                      x1+Math.cos(alfa+Math.PI/2)*t/2, y1+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 
                                      x2, y2, 0,
                                      x2-Math.cos(alfa-Math.PI/2)*t/2, y2-Math.sin(alfa-Math.PI/2)*t/2, 0,
                                      x2-Math.cos(alfa-Math.PI/4)*t/2, y2-Math.sin(alfa-Math.PI/4)*t/2, 0,
                                      x2, y2, 0,
                                      x2-Math.cos(alfa-Math.PI/4)*t/2, y2-Math.sin(alfa-Math.PI/4)*t/2, 0,
                                      x2-Math.cos(alfa)*t/2, y2-Math.sin(alfa)*t/2, 0,
                                      x2, y2, 0,
                                      x2-Math.cos(alfa+Math.PI/4)*t/2, y2-Math.sin(alfa+Math.PI/4)*t/2, 0,                                 
                                      x2-Math.cos(alfa+Math.PI/2)*t/2, y2-Math.sin(alfa+Math.PI/2)*t/2, 0,
                                      x2, y2, 0,
                                      x2-Math.cos(alfa)*t/2, y2-Math.sin(alfa)*t/2, 0,
                                      x2-Math.cos(alfa+Math.PI/4)*t/2, y2-Math.sin(alfa+Math.PI/4)*t/2, 0,
                                 
                                      x1, y1, 0,                                 
                                      x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                      x1+Math.cos(alfa-Math.PI/4)*t/2, y1+Math.sin(alfa-Math.PI/4)*t/2, 0,
                                      x1, y1, 0,
                                      x1+Math.cos(alfa-Math.PI/4)*t/2, y1+Math.sin(alfa-Math.PI/4)*t/2, 0,
                                      x1+Math.cos(alfa)*t/2, y1+Math.sin(alfa)*t/2, 0,
                                      x1, y1, 0,
                                      x1+Math.cos(alfa+Math.PI/4)*t/2, y1+Math.sin(alfa+Math.PI/4)*t/2, 0,                                 
                                      x1+Math.cos(alfa+Math.PI/2)*t/2, y1+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                      x1, y1, 0,
                                      x1+Math.cos(alfa)*t/2, y1+Math.sin(alfa)*t/2, 0,
                                      x1+Math.cos(alfa+Math.PI/4)*t/2, y1+Math.sin(alfa+Math.PI/4)*t/2, 0);    
      }
  }
  
  this.pridejCaruB = function(x1,y1,x2,y2,t){
    if(multicara.model[n].Verticles.length + 90 > 196608){
    n++;
    multicara.model.push(new Geometry());
    multicara.model[n].Verticles = [];
    }
  
    alfa = Math.atan((y2-y1)/(x2-x1));
    if(x1 > x2){
      multicara.model[n].Verticles.push(x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 x2+Math.cos(alfa-Math.PI/2)*t/2, y2+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0, 
                                 x1+Math.cos(alfa+Math.PI/2)*t/2, y1+Math.sin(alfa+Math.PI/2)*t/2, 0,                                 
                                 
                                 x2, y2, 0,
                                 x2-Math.cos(alfa-Math.PI/4)*t/2, y2-Math.sin(alfa-Math.PI/4)*t/2, 0,
                                 x2-Math.cos(alfa-Math.PI/2)*t/2, y2-Math.sin(alfa-Math.PI/2)*t/2, 0,                                 
                                 x2, y2, 0,
                                 x2-Math.cos(alfa)*t/2, y2-Math.sin(alfa)*t/2, 0,
                                 x2-Math.cos(alfa-Math.PI/4)*t/2, y2-Math.sin(alfa-Math.PI/4)*t/2, 0,                                                                  
                                 x2-Math.cos(alfa+Math.PI/4)*t/2, y2-Math.sin(alfa+Math.PI/4)*t/2, 0,                                 
                                 x2, y2, 0,                                 
                                 x2-Math.cos(alfa+Math.PI/2)*t/2, y2-Math.sin(alfa+Math.PI/2)*t/2, 0,                            
                                 x2-Math.cos(alfa)*t/2, y2-Math.sin(alfa)*t/2, 0,
                                 x2, y2, 0,
                                 x2-Math.cos(alfa+Math.PI/4)*t/2, y2-Math.sin(alfa+Math.PI/4)*t/2, 0,
                                 
                                                                  
                                 x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 x1, y1, 0,
                                 x1+Math.cos(alfa-Math.PI/4)*t/2, y1+Math.sin(alfa-Math.PI/4)*t/2, 0,                                                                  
                                 x1+Math.cos(alfa-Math.PI/4)*t/2, y1+Math.sin(alfa-Math.PI/4)*t/2, 0,
                                 x1, y1, 0,
                                 x1+Math.cos(alfa)*t/2, y1+Math.sin(alfa)*t/2, 0,                                                                  
                                 x1+Math.cos(alfa+Math.PI/4)*t/2, y1+Math.sin(alfa+Math.PI/4)*t/2, 0,                                 
                                 x1, y1, 0,
                                 x1+Math.cos(alfa+Math.PI/2)*t/2, y1+Math.sin(alfa+Math.PI/2)*t/2, 0,                                                                  
                                 x1+Math.cos(alfa)*t/2, y1+Math.sin(alfa)*t/2, 0,
                                 x1, y1, 0,
                                 x1+Math.cos(alfa+Math.PI/4)*t/2, y1+Math.sin(alfa+Math.PI/4)*t/2, 0);
    } else {
      multicara.model[n].Verticles.push(x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,                                 
                                 x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 x2+Math.cos(alfa-Math.PI/2)*t/2, y2+Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 
                                 x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 x1+Math.cos(alfa-Math.PI/2)*t/2, y1+Math.sin(alfa-Math.PI/2)*t/2, 0,                                  
                                 x1+Math.cos(alfa+Math.PI/2)*t/2, y1+Math.sin(alfa+Math.PI/2)*t/2, 0,
                                 
                                 x2, y2, 0,
                                 x2+Math.cos(alfa-Math.PI/4)*t/2, y2+Math.sin(alfa-Math.PI/4)*t/2, 0,
                                 x2+Math.cos(alfa-Math.PI/2)*t/2, y2+Math.sin(alfa-Math.PI/2)*t/2, 0,                                 
                                 x2, y2, 0,
                                 x2+Math.cos(alfa)*t/2, y2+Math.sin(alfa)*t/2, 0,
                                 x2+Math.cos(alfa-Math.PI/4)*t/2, y2+Math.sin(alfa-Math.PI/4)*t/2, 0,                                                                  
                                 x2+Math.cos(alfa+Math.PI/4)*t/2, y2+Math.sin(alfa+Math.PI/4)*t/2, 0,                                 
                                 x2, y2, 0,                                 
                                 x2+Math.cos(alfa+Math.PI/2)*t/2, y2+Math.sin(alfa+Math.PI/2)*t/2, 0,                            
                                 x2+Math.cos(alfa)*t/2, y2+Math.sin(alfa)*t/2, 0,
                                 x2, y2, 0,
                                 x2+Math.cos(alfa+Math.PI/4)*t/2, y2+Math.sin(alfa+Math.PI/4)*t/2, 0,
                                 
                                                                  
                                 x1-Math.cos(alfa-Math.PI/2)*t/2, y1-Math.sin(alfa-Math.PI/2)*t/2, 0,
                                 x1, y1, 0,
                                 x1-Math.cos(alfa-Math.PI/4)*t/2, y1-Math.sin(alfa-Math.PI/4)*t/2, 0,                                                                  
                                 x1-Math.cos(alfa-Math.PI/4)*t/2, y1-Math.sin(alfa-Math.PI/4)*t/2, 0,
                                 x1, y1, 0,
                                 x1-Math.cos(alfa)*t/2, y1-Math.sin(alfa)*t/2, 0,                                                                  
                                 x1-Math.cos(alfa+Math.PI/4)*t/2, y1-Math.sin(alfa+Math.PI/4)*t/2, 0,                                 
                                 x1, y1, 0,
                                 x1-Math.cos(alfa+Math.PI/2)*t/2, y1-Math.sin(alfa+Math.PI/2)*t/2, 0,                                                                  
                                 x1-Math.cos(alfa)*t/2, y1-Math.sin(alfa)*t/2, 0,
                                 x1, y1, 0,
                                 x1-Math.cos(alfa+Math.PI/4)*t/2, y1-Math.sin(alfa+Math.PI/4)*t/2, 0);    
    }
  }    
  
  this.vytvor = function(){
    multicara.model[0].Normals = [];
    multicara.Color[0]= new color(1,1,1);                              
    modely.push(multicara);
  }
}