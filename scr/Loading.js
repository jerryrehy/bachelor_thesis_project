function zacni(cesta){

  setCanvas("canvas");
  setBgColor(0.1,0.1,0.1);
  webGLInit();
        
  setAmbientLight(0.5,0.5,0.5);
  setDirectionalLightColor(0.5,0.5,0.5);
  setDirectionalLightPosition(-0.25, -0.25, -1);
  setLighting(true);                 
  AbsPosun(0,0,-8);
  AbsOtoc(0,180,0);
  RelZvetseni(0.2);                        
      
  LoadModels(cesta);
}

function LoadModels(cesta){
  
  inicializace();
  var poc=0;
  try{
  nahraj3deSoubor(cesta+ "\/soucastkytop.3de");
  }catch(e){}
  for(poc = 0; poc < packName.length - 1; poc++){  
    try{
      var text = "obj\/" + packName[poc].trim() + "\.obj";
      nahrajModel(text);
      modely[modely.length-1].bodVlozeni(-soucX[poc],soucY[poc]-2,0);
      modely[modely.length-1].otoceni(0,0,soucAngle[poc]);
    }
    catch(c){
    }   
  }
  try{
  nahraj3deSoubor(cesta+ "\/soucastkybott.3de");
  }catch(e){}
  for(poc = 0; poc < packName.length - 1; poc++){  
    try{
      var text = "obj\/" + packName[poc].trim() + "\.obj";
      nahrajModel(text);
      modely[modely.length-1].bodVlozeni(-soucX[poc],soucY[poc]-2,0);
      modely[modely.length-1].otoceni(0,0,soucAngle[poc]);
    }
    catch(c){
    }   
  }
  cnt1 = modely.length;
  
  try{
  nahraj3deSoubor(cesta+ "\/vodicetop.3de");
  }catch(e){}
  vodiceTop = new MultiCara();
  for(poc = 0; poc < vodX1.length - 1; poc++){  
    try{
      vodiceTop.pridejCaruB(-vodX1[poc], vodY1[poc], -vodX2[poc], vodY2[poc], vodWidth[poc]);   
    }
    catch(c){
    }
  }
  vodiceTop.vytvor();
  setColor(0.98,0.82,0.17);
  modely[modely.length - 1].bodVlozeni(0,-2,-0.55);

  try{
  nahraj3deSoubor(cesta+ "\/vodicebot.3de");
  }catch(e){}
  vodiceBot = new MultiCara();
  for(poc = 0; poc < vodX1.length - 1; poc++){  
      vodiceBot.pridejCaru(-vodX1[poc], vodY1[poc], -vodX2[poc], vodY2[poc], vodWidth[poc]);       
  }
  vodiceBot.vytvor();
  setColor(0.98,0.82,0.17);
  modely[modely.length - 1].bodVlozeni(0,-2,0.55);  
  cnt2 = modely.length;
 
  try{
  nahraj3deSoubor(cesta+ "\/text.3de");
  }catch(e){}
  text = new MultiCara();
  for(poc = 0; poc < textX1.length - 1; poc++){  
      text.pridejCaruB(-textX1[poc], textY1[poc], -textX2[poc], textY2[poc], textWidth[poc]);   
  }
  text.vytvor();
  setColor(1,1,1);
  modely[modely.length - 1].bodVlozeni(0,-2,-0.55);  
  cnt3 = modely.length;
 
  try{
  nahraj3deSoubor(cesta+ "\/via.3de");
  }catch(e){}
  for(poc = 0; poc < via_shape.length - 1; poc++){
    vytvorValec(viaD[poc],1.2,8);
    modely[modely.length - 1].bodVlozeni(-viaX[poc],viaY[poc]-2,0.6);
    vytvorValec(viaDh[poc],1.3,8);
    setColor(0,0,0);
    modely[modely.length - 1].bodVlozeni(-viaXh[poc],viaYh[poc]-2,0.65);
  } 
  cnt4 = modely.length;
  
  try{
  nahraj3deSoubor(cesta+ "\/pad.3de");
  }catch(e){}
  for(poc = 0; poc < pad_shape.length - 1; poc++){
    vytvorValec(pad_radius[poc],1.2,8);
    modely[modely.length - 1].bodVlozeni(-padX[poc],padY[poc]-2,0.6);
    vytvorValec(pad_radiush[poc],1.3,8);
    setColor(0,0,0);
    modely[modely.length - 1].bodVlozeni(-padXh[poc],padYh[poc]-2,0.65);
  } 
  cnt5 = modely.length;

  try{
  nahraj3deSoubor(cesta+ "\/package.3de");
  }catch(e){}
  pack = new MultiCara();
  for(poc = 0; poc < pack_type.length - 1; poc++){  
      pack.pridejCaruB(-packX1[poc], packY1[poc], -packX2[poc], packY2[poc], packWidth[poc]);    
  }
  pack.vytvor();  
  setColor(1,1,1);
  modely[modely.length - 1].bodVlozeni(0,-2,-0.55);   
  cnt6 = modely.length;
 
  try{
  nahraj3deSoubor(cesta+"\/polygons.3de");
  }catch(e){}
  poly = new MultiCara();
  for(poc = 0; poc < poly_type.length - 1; poc++){
    poly.pridejCaruB(-polyX1[poc], polyY1[poc], -polyX2[poc], polyY2[poc], polyWidth[poc]);
  }
  poly.vytvor();
  setColor(1,1,1);
  modely[modely.length - 1].bodVlozeni(0,-2,-0.55);
  
  try{
  nahraj3deSoubor(cesta+"\/deska.3de");
  }catch(e){}
  vytvorHranol((deskaX1-deskaX3), (deskaY3-deskaY1), 1);
  setColor(0.19,0.22,0.31);
  modely[modely.length - 1].bodVlozeni(0,-2,0.5);
  cnt7 = modely.length;
  
  SetPivot((deskaX1-deskaX3)/2,(deskaY3-deskaY1)/2,0);
  AbsZvetseni(0.07);
  AbsOtoc(-40,172,0);
  AbsPosun(-0.3,0.3,-8);
       
  webGLStart();
}

function inicializace(){
  modely = [];
  soucastkyText = [];
  vodiceText = [];
  viaText = [];
  padText = [];
  textText = [];
  packageText = [];
  polygonsText = [];
  deskaText = [];
  packName = [];
  hodnota = [];
  soucAngle = [];
  soucX = [];
  soucY = [];
  vodX1 = [];
  vodY1 = [];
  vodX2 = [];
  vodY2 = [];
  vodWidth = [];
  via_shape = [];
  viaX = [];
  viaY = [];
  viaD = [];
  viaXh = [];
  viaYh = [];
  viaDh = [];
  pad_shape = [];
  pad_radius = [];
  padX = [];
  padY = [];
  pad_radiush = [];
  padXh = [];
  padYh = [];
  text_position = [];
  textWidth = [];
  textX1 = [];
  textY1 = [];
  textX2 = [];
  textY2 = [];
  pack_type = [];
  packWidth = [];
  packX1 = [];
  packX2 = [];
  packY1 = [];
  packY2 = [];
  poly_type = [];
  polyWidth = [];
  polyX1 = [];
  polyX2 = [];
  polyY1 = [];
  polyY2 = [];
  deskaX1 = 0;
  deskaX2 = 0;
  deskaX3 = 0;
  deskaX4 = 0;
  deskaY1 = 0;
  deskaY2 = 0;
  deskaY3 = 0;
  deskaY4 = 0;
  cnt1 = 0;
  cnt2 = 0; 
  cnt3 = 0; 
  cnt4 = 0; 
  cnt5 = 0; 
  cnt6 = 0; 
  cnt7 = 0;
}