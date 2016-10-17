var soucastkyText = [];
var vodiceText = [];
var viaText = [];
var padText = [];
var textText = [];
var packageText = [];
var polygonsText = [];
var deskaText = [];
var packName = [];
var hodnota = [];
var soucAngle = [];
var soucX = [];
var soucY = [];
var vodX1 = [];
var vodY1 = [];
var vodX2 = [];
var vodY2 = [];
var vodWidth = [];
var via_shape = [];
var viaX = [];
var viaY = [];
var viaD = [];
var viaXh = [];
var viaYh = [];
var viaDh = [];
var pad_shape = [];
var pad_radius = [];
var padX = [];
var padY = [];
var pad_radiush = [];
var padXh = [];
var padYh = [];
var text_position = [];
var textWidth = [];
var textX1 = [];
var textY1 = [];
var textX2 = [];
var textY2 = [];
var pack_type = [];
var packWidth = [];
var packX1 = [];
var packX2 = [];
var packY1 = [];
var packY2 = [];
var poly_type = [];
var polyWidth = [];
var polyX1 = [];
var polyX2 = [];
var polyY1 = [];
var polyY2 = [];
var deskaX1 = 0;
var deskaX2 = 0;
var deskaX3 = 0;
var deskaX4 = 0;
var deskaY1 = 0;
var deskaY2 = 0;
var deskaY3 = 0;
var deskaY4 = 0;

var cnt1 = 0, cnt2 = 0, cnt3 = 0, cnt4 = 0, cnt5 = 0, cnt6 = 0, cnt7 = 0;

/*------------------------Naèítání rùzných druhù dat v souborech------------------*/
function nahraj3deSoubor(soubor){
  soubor1 = soubor.split("/");
  soubor2 = soubor1[1];
  if(soubor2 == 'soucastkytop.3de' || soubor2 == 'soucastkybott.3de'){
    soucastkyText.push(new Soucastky(FileLoader(soubor)));
  }
  if(soubor2 == 'vodicetop.3de' || soubor2 == 'vodicebot.3de'){
    vodiceText.push(new Vodice(FileLoader(soubor)));
  }
  if(soubor2 == 'via.3de'){
    viaText.push(new Via(FileLoader(soubor)));
  }
  if(soubor2 == 'pad.3de'){
    padText.push(new Pad(FileLoader(soubor)));
  }
  if(soubor2 == 'text.3de'){
    textText.push(new parseText(FileLoader(soubor)));
  }
   if(soubor2 == 'package.3de'){
    packageText.push(new parsePackage(FileLoader(soubor)));
  }
  if(soubor2 == 'polygons.3de'){
    polygonsText.push(new parsePolygons(FileLoader(soubor)));
  }
  if(soubor2 == 'deska.3de'){
    deskaText.push(new parseDeska(FileLoader(soubor)));
  }
}
/*------------------------Funkce parsování souøadnic souèástek------------------*/
function Soucastky(soubor){	
  var souc_obsah = soubor.split("\n");
  var poc = 0;
  var pom = 1;
  var a = 0;
  var b = 0;
  var c = 0;
  
  for(poc = 0; poc < souc_obsah.length - 1; pom++, poc++){
    if(pom == 1){
      var radek = souc_obsah[poc].split(":");
      packName[a] = radek[1];
      a++;
    }
    if(pom == 2){
      var radek1 = souc_obsah[poc].split(":");
      hodnota[b] =  radek1[1];
      b++;
    }
    if(pom == 3){
      var radek2 = souc_obsah[poc].split(" ");
      soucAngle[c] = radek2[0];
      soucX[c] = radek2[1];
      soucY[c] = radek2[2];
      
      pom = 0;
      c++;
    }  
  }
}
/*------------------------Funkce parsování umístìní a rozmìry vodièù------------------*/
function Vodice(soubor){
  var vodice_obsah = soubor.split("\n");
  var poc = 0;
  
  for(poc = 0; poc < vodice_obsah.length - 1; poc++){
    var vodic_zaznam = vodice_obsah[poc].split(" ");
    
    vodWidth[poc] = parseFloat(vodic_zaznam[0]);
    vodX1[poc] = parseFloat(vodic_zaznam[1]);
    vodY1[poc] = parseFloat(vodic_zaznam[2]);
    vodX2[poc] = parseFloat(vodic_zaznam[4]);
    vodY2[poc] = parseFloat(vodic_zaznam[5]);   
  }
}
/*------------------------Funkce parsování souøadnic pájecích plošek via------------------*/
function Via(soubor){
  var via_obsah = soubor.split("\n");
  var poc = 0;
  var pom = 1;
  var a = 0;
  var b = 0;
  var c = 0;

  for(poc = 0; poc < via_obsah.length - 1; poc++, pom++){
    if(pom == 1){
      via_shape[a]= via_obsah[poc];
      a++;
    }
    if(pom == 2){
      var radka1 = via_obsah[poc].split(" ");
      viaX[b] = parseFloat(radka1[0]);
      viaY[b] = parseFloat(radka1[1]);
      viaD[b] = parseFloat(radka1[2]);
      b++;
    }
    if(pom == 3){
      var radka2 = via_obsah[poc].split(" ");
      viaXh[c] = parseFloat(radka2[0]);
      viaYh[c] = parseFloat(radka2[1]);
      viaDh[c] = parseFloat(radka2[2]); 
      pom = 0;
      c++;
    }   
  }
}
/*------------------------Funkce parsování souøadnic pájecích plošek padù------------------*/
function Pad(soubor){
  var pad_obsah = soubor.split("\n");
  var poc = 0;
  var pom = 1;
  var a = 0;
  var b = 0;
  var c = 0;

  for(poc = 0; poc < pad_obsah.length - 1; poc++, pom++){
    if(pom == 1){
      pad_shape[a]= pad_obsah[poc];
      a++;
    }
    if(pom == 2){
      var rad1 = pad_obsah[poc].split(" ");
      padX[b] = parseFloat(rad1[0]);
      padY[b] = parseFloat(rad1[1]);
      pad_radius[b] = parseFloat(rad1[2]);
      b++;
    }
    if(pom == 3){
      var rad2 = pad_obsah[poc].split(" ");
      padXh[c] = parseFloat(rad2[0]);
      padYh[c] = parseFloat(rad2[1]);
      pad_radiush[c] = parseFloat(rad2[2]); 
      pom = 0;
      c++;
    }   
  }
}
/*------------------------Funkce parsování souøadnic textù na desce plošných spojù------------------*/
function parseText(soubor){
  var text_obsah = soubor.split("\n");
  var poc = 0;
  var pom = 1;
  var a = 0;
  var b = 0;
  
  
  for(poc = 0; poc < text_obsah.length - 1; poc++, pom++){
    if(pom == 1){
      text_position[a]= text_obsah[poc];
      a++;
    }
    if(pom == 2){
      var rad3 = text_obsah[poc].split(" ");
      textWidth[b] = parseFloat(rad3[1]);
      textX1[b] = parseFloat(rad3[2]); 
      textY1[b] = parseFloat(rad3[3]); 
      textX2[b] = parseFloat(rad3[5]); 
      textY2[b] = parseFloat(rad3[6]);     
      pom = 0;
      b++;
    }
  }
}
/*------------------------Funkce parsování souøadnic package na desce plošných spojù------------------*/
function parsePackage(soubor){
  var package_obsah = soubor.split("\n");
  var poc = 0;
  var pom = 1;
  var a = 0;
  var b = 0;
  
  
  for(poc = 0; poc < package_obsah.length - 1; poc++, pom++){
    if(pom == 1){
      pack_type[a]= package_obsah[poc];
      a++;
    }
    if(pom == 2){
      var rad3 = package_obsah[poc].split(" ");
      packWidth[b] = parseFloat(rad3[1]);
      packX1[b] = parseFloat(rad3[2]); 
      packY1[b] = parseFloat(rad3[3]); 
      packX2[b] = parseFloat(rad3[5]); 
      packY2[b] = parseFloat(rad3[6]);     
      pom = 0;
      b++;
    }
  }
}

/*------------------------Funkce parsování souøadnic polygons na desce plošných spojù------------------*/
function parsePolygons(soubor){
  var polygons_obsah = soubor.split("\n");
  var poc = 0;            
  var pom = 1;
  var a = 0;
  var b = 0;
  
  
  for(poc = 0; poc < polygons_obsah.length - 1; poc++, pom++){
    if(pom == 1){
      poly_type[a]= polygons_obsah[poc];
      a++;
    }
    if(pom == 2){
      var rad3 = polygons_obsah[poc].split(" ");
      polyWidth[b] = parseFloat(rad3[0]);
      polyX1[b] = parseFloat(rad3[1]); 
      polyY1[b] = parseFloat(rad3[2]); 
      polyX2[b] = parseFloat(rad3[4]); 
      polyY2[b] = parseFloat(rad3[5]);     
      pom = 0;
      b++;
    }
  }
}

/*------------------------Funkce parsování souøadnic desky plošných spojù------------------*/
function parseDeska(soubor){
  var deska_obsah = soubor.split("\n");
  
  var radek0 = deska_obsah[0].split(" ");
  deskaX1 = parseFloat(radek0[0]);
  deskaY1 = parseFloat(radek0[1]);
  
  var radek1 = deska_obsah[1].split(" ");
  deskaX2 = parseFloat(radek1[0]);
  deskaY2 = parseFloat(radek1[1]); 
  
  var radek2 = deska_obsah[2].split(" ");
  deskaX3 = parseFloat(radek2[0]);
  deskaY3 = parseFloat(radek2[1]); 
  
  var radek3 = deska_obsah[3].split(" ");
  deskaX4 = parseFloat(radek3[0]);
  deskaY4 = parseFloat(radek3[1]);  
}

/*------------------------Funkce na mizení objektù ve scénì------------------*/
function visibility(){
/*-------------------vrstva 1 soucastky------------------------*/
  var a = document.getElementsByName("check0")[0];
  if(a.checked == false){
    for(var i = 0; i < cnt1; i++){
      modely[i].visible = false;
    }
    a.checked = false;
  }
  else{
    for(i = 0; i < cnt1; i++){
      modely[i].visible = true;
    }
    a.checked = true;
    
  }
/*-------------------vrstva 2 vodice------------------------*/  
  var b = document.getElementsByName("check1")[0];
  if(b.checked == false){
    for(var i = cnt1; i < cnt2; i++){
      modely[i].visible = false;
    }
    b.checked = false;
  }
  else{
    for(i = cnt1; i < cnt2; i++){
      modely[i].visible = true;
    }
    b.checked = true;
    
  }
/*-------------------vrstva 3 text------------------------*/  
  var c = document.getElementsByName("check2")[0];
  if(c.checked == false){
    for(var i = cnt2; i < cnt3; i++){
      modely[i].visible = false;
    }
    c.checked = false;
  }
  else{
    for(i = cnt2; i < cnt3; i++){
      modely[i].visible = true;
    }
    c.checked = true;
    
  }
/*-------------------vrstva 4 via------------------------*/ 
  var d = document.getElementsByName("check3")[0];
  if(d.checked == false){
    for(var i = cnt3; i < cnt4; i++){
      modely[i].visible = false;
    }
    d.checked = false;
  }
  else{
    for(i = cnt3; i < cnt4; i++){
      modely[i].visible = true;
    }
    d.checked = true;
    
  }
/*-------------------vrstva 5 pady------------------------*/  
  var e = document.getElementsByName("check4")[0];
  if(e.checked == false){
    for(var i = cnt4; i < cnt5; i++){
      modely[i].visible = false;
    }
    e.checked = false;
  }
  else{
    for(i = cnt4; i < cnt5; i++){
      modely[i].visible = true;
    }
    e.checked = true;
    
  }
/*-------------------vrstva 6 pouzdra------------------------*/  
  var f = document.getElementsByName("check5")[0];
  if(f.checked == false){
    for(var i = cnt5; i < cnt6; i++){
      modely[i].visible = false;
    }
    f.checked = false;
  }
  else{
    for(i = cnt5; i < cnt6; i++){
      modely[i].visible = true;
    }
    f.checked = true;
    
  }
/*-------------------vrstva 7 deska------------------------*/  
  var g = document.getElementsByName("check6")[0];
  if(g.checked == false){
    for(var i = cnt6; i < cnt7; i++){
      modely[i].visible = false;
    }
    g.checked = false;
  }
  else{
    for(i = cnt6; i < cnt7; i++){
      modely[i].visible = true;
    }
    g.checked = true;
    
  }   
}
/*---------funkce native pro pùvodní polohu modelu---------*/
function Native(){
  AbsZvetseni(0.07);
  AbsOtoc(-40,172,0);
  AbsPosun(-0.3,0.3,-8);
}