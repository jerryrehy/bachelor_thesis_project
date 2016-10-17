function addJavascript(jsname,pos,type) {
var th = document.getElementsByTagName(pos)[0];
var s = document.createElement('script');
s.setAttribute('type',type);
s.setAttribute('src',jsname);
th.appendChild(s);
}

var scripts = document.getElementsByTagName("script");
var path = scripts[scripts.length -1].src.substring(0, scripts[scripts.length -1].src.lastIndexOf("/")+1);

addJavascript(path + 'glMatrix-0.9.5.min.js','head','text/javascript');
                    
addJavascript(path + 'FileLoader.js','head','text/javascript');
addJavascript(path + 'parsers/ObjParser.js','head','text/javascript');
addJavascript(path + 'parsers/MtlParser.js','head','text/javascript');
addJavascript(path + 'Primitives.js','head','text/javascript');
addJavascript(path + 'filler.js','head','text/javascript');

addJavascript(path + 'webgl-utils.js','head','text/javascript');

