Material = function(){
    this.Name;
    this.AmbientColor;
    this.DiffusionColor;
    this.SpecularColor;
    this.Transparency;

}

function color(r,g,b){
     this.r = r;
     this.g = g;
     this.b = b;
}



// Parser dostávající data z textového formátu
function MtlParser(MtlText){

      this.Materials = [];

      var MtlTextSplit = MtlText.split("\n");
      
      materialsCount = 0;

      for(var lineCount = 0; lineCount < MtlTextSplit.length; lineCount++){
                     
            var lineSplit = MtlTextSplit[lineCount].split(" ");
            
            if(lineSplit[0] == "newmtl"){
              this.Materials.push(new Material());
              this.Materials[materialsCount].Name = lineSplit[1];
              materialsCount++;            
            }
            
            if(lineSplit[0] == "Ka"){
              this.Materials[materialsCount-1].AmbientColor = new color(parseFloat(lineSplit[1]),
                                                                        parseFloat(lineSplit[2]),
                                                                        parseFloat(lineSplit[3]));
            }
            
            if(lineSplit[0] == "Kd"){
              this.Materials[materialsCount-1].DiffusionColor = new color(parseFloat(lineSplit[1]),
                                                                          parseFloat(lineSplit[2]),
                                                                          parseFloat(lineSplit[3]));
            }
            
            if(lineSplit[0] == "Ks"){
              this.Materials[materialsCount-1].SpecularColor = new color(parseFloat(lineSplit[1]),
                                                                         parseFloat(lineSplit[2]),
                                                                         parseFloat(lineSplit[3]));
            }
            
            if(lineSplit[0] == "d" | lineSplit[0] == "Tr"){
              this.Materials[materialsCount-1].Transparency = parseFloat(lineSplit[1]);
            }
      
      
      }

}
