
let collada2gltf = require('collada2gltf');

collada2gltf('./collada2gltf/data/X_Bot.dae', (err:any) => {
    //Now you have a set of gltf files in your current directory;)
    //source.bin, source.json + shader files (source.0FS.glsl, source.0VS.glsl)
    console.log(err);
});

