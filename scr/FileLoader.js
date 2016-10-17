// Nahrává soubor a získá text souboru
function FileLoader(file){
    try{
      xmlhttp=new XMLHttpRequest();
      xmlhttp.open("GET",file,false);
      xmlhttp.send();
      return xmlhttp.responseText;
    }catch(e){
    alert("Nemohu nalézt soubor "+file);
    }
}
