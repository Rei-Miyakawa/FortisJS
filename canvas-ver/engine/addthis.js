let files = [
    "core",
    "fps",
    "vector",
    "scene",
    "color",
    "font",
    "image",
    "sound",
    "material",
    "shape",
    "entity",
    "draw",
    "timer",
    "motion",
    "util",
];

let nowLoadingText = document.createElement("h1");
nowLoadingText.textContent = "ロード中...";
onload = function () {
    document.body.appendChild(nowLoadingText);
    loadFiles(files);
}

let loadFiles = async function (paths) {
    for (let i = 0; i < paths.length; i++) {
        let loadFile = new Promise((resolve, reject) => {
            let script = document.createElement("script");
            script.src = "./engine/" + paths[i] + ".js";
            document.body.appendChild(script);
            script.onload = function () {
                resolve("[Info] [" + new Date().toUTCString() + "] - " + paths[i] + ".jsがロードされました。");
            }
            script.onerror = function () {
                reject("[Error] [" + new Date().toUTCString() + "] - " + paths[i] + ".jsはロードできませんでした。")
            }
        });
        let result = await loadFile;
        console.log("[Fortis] " + result);

    }
    Fortis.setup();
}