var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // Camera
    var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // Dimmer ambient light
    var hemiLight = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    hemiLight.intensity = 0.5;

    // Add a directional light for better definition
    var dirLight = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(-1, -2, -1), scene);
    dirLight.intensity = 0.5;

    // Load the OBJ file
    BABYLON.SceneLoader.ImportMesh("", "models/", "mesh2-low-poly.obj", scene, function (meshes) {
        console.log("OBJ file has been loaded");
        meshes[0].position = new BABYLON.Vector3(0, 0, 0);
        meshes[0].rotation = new BABYLON.Vector3(45 * (Math.PI / 180), 0, 180  * (Math.PI / 180));
        meshes.forEach(mesh => {
            if (mesh.material) {
                adjustMaterial(mesh.material);
            }
        });
    }, function (progress) {
        console.log(progress.loaded / progress.total);
    }, function (scene, message, exception) {
        console.error(message, exception);
    });

    var envTexture = new BABYLON.CubeTexture("models/environment.dds", scene);
    scene.environmentTexture = envTexture;
    scene.createDefaultSkybox(envTexture, true, 1000);

    // Create XR experience helper
    const xrHelper = scene.createDefaultXRExperienceAsync({
        floorMeshes: [scene.getMeshByName("ground")]
    });

    scene.debugLayer.show(); 
    return scene;
};

function adjustMaterial(material) {
    if (material instanceof BABYLON.StandardMaterial) {
        // Reduce ambient color
        material.ambientColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        
        // Reduce specular color and power
        material.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        material.specularPower = 32; // Increase for less glossy look
        
        // Ensure diffuse texture is being used
        if (material.diffuseTexture) {
            material.diffuseTexture.hasAlpha = false;
            material.useAlphaFromDiffuseTexture = false;
        }

        // Optional: add some emissive color to simulate ambient occlusion
        material.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);

        // Adjust material to react more realistically to light
        material.usePhysicalLightFalloff = true;
    }
}

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});


// Add VR button
var vrButton = document.createElement("button");
vrButton.textContent = "Enter VR";
vrButton.style.position = "absolute";
vrButton.style.bottom = "20px";
vrButton.style.left = "20px";
document.body.appendChild(vrButton);

vrButton.addEventListener("click", function() {
    scene.createDefaultXRExperienceAsync({
        floorMeshes: [scene.getMeshByName("ground")]
    }).then((xrExperience) => {
        xrExperience.enterXRAsync("immersive-vr", "local-floor");
    });
});