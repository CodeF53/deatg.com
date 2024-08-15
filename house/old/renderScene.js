const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    // Camera
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // Light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 20, height: 20}, scene);

    // Simple box to represent a spawnable object
    const box = BABYLON.MeshBuilder.CreateBox("box", {size: 1}, scene);
    box.position.y = 0.5;

    var glassMaterial = new BABYLON.PBRMaterial("glassMaterial", scene);
    glassMaterial.linkRefractionWithTransparency = true;
    glassMaterial.indexOfRefraction = 0.52;
    glassMaterial.alpha = 0;
    glassMaterial.cameraContrast = 1.6;
    glassMaterial.microSurface = 1.0;
    glassMaterial.reflectivityColor = new BABYLON.Color3(0.25, 0.25, 0.25);
    glassMaterial.albedoColor = new BABYLON.Color3(0.95, 0.95, 0.95);

    BABYLON.SceneLoader.ImportMesh("", "./", "untitled.obj", scene, function (meshes) {
        var bunny = meshes[0];
        bunny.material = glassMaterial;

        // Rotate the model and repair its normals.
        bunny.rotation.y = Math.PI;
        var positions = bunny.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        var indices = bunny.getIndices();
        var normals = bunny.getVerticesData(BABYLON.VertexBuffer.NormalKind);
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        bunny.updateVerticesData(BABYLON.VertexBuffer.NormalKind, normals, true, true);

        // Recreate a default camera as the scene bounding boxes have changed.
        scene.createDefaultCameraOrLight(true, true, true);
        scene.activeCamera.lowerRadiusLimit = 0.22;
        scene.activeCamera.upperRadiusLimit = 2;

        // Create a skybox to display the environment.
        // scene.createDefaultSkybox(scene.environmentTexture, true, 10, 0.3);
    });
    scene.debugLayer.show(); 
    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});