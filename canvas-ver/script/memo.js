/*
方針(予定)
Colliderにそれぞれ頂点、直線・曲線の式を取得する関数を用意する
どのように当たり判定を計算するか(別に、どのグループ同士の当たり判定を計算するかを管理する変数を作るか、グループ毎に、別のグループのIDを入力したら計算してくれるようにするかなど)
現在は前者が有力

次

楕円や矩形に関する当たり判定

それぞれの考え肩

線と線:Fortis.util.getLinesIntersection ✓
線と矩形:線と線に分解して求める 線が矩形の中にあるかはできない=△
線と円(楕円):式と曲線のやつ ✓
線とその他:線と線に分解して求める ✓

矩形と矩形:ともに角度kπ/2(kは整数)の時は幅から求める。そうでない時は線と線に分解して求める✓
矩形と円(楕円):線に分解して線と円 ✓
矩形とその他:その他を線分に分解して、線と線に分解して求める ✓

円と円(楕円):図形と方程式と式と曲線でいけるはず　楕円が絡むとできない
https://qiita.com/NaokiHori/items/daf3fd191d51a7e682f8
これでやる

ひとまず、楕円が絡む円同士はなしにする

次(2025/05/07/02:06)
それぞれのgetVerticesが正しく動いているか確認する
*/

let c1cVertices = c1c.getVertices(c1.pos, c1.angle, c1.scale);
let c1cLines = [];
if (c1cVertices.length == 2) {
    c1cLines.push(Fortis.util.getLineSegment(c1cVertices[0], c1cVertices[1]));
} else {
    let length = c1cVertices.length;
    for (let i = 1; i <= length; i++) {
        if (i == length) {
            c1cLines.push(Fortis.util.getLineSegment(c1cVertices[0], c1cVertices[i]));
        } else {
            c1cLines.push(Fortis.util.getLineSegment(c1cVertices[i - 1], c1cVertices[i]));
        }
    }
}

let cFDomain = [-c["radius"].x, c["radius"].x];//楕円の定義域
    let cVDomain = [-c["radius"].y, c["radius"].y];//楕円の値域
    let xJudge = ((cVDomain[0] <= rotatedL["vDomain"][0] && rotatedL["vDomain"][0] <= cVDomain[1]) || (cVDomain[0] <= rotatedL["vDomain"][1] && rotatedL["vDomain"][1] <= cVDomain[1]));
    let yJudge = ((cFDomain[0] <= rotatedL["fDomain"][0] && rotatedL["fDomain"][0] <= cFDomain[1]) || (cFDomain[0] <= rotatedL["fDomain"][1] && rotatedL["fDomain"][1] <= cFDomain[1]));
    if (rotatedL["special"]["x"] != null) {//線分がx=aの形
        if (cFDomain[0] <= rotatedL["special"]["x"] && rotatedL["special"]["x"] <= cFDomain[1] && xJudge) return true;
    } else if (rotatedL["special"]["y"] != null) {//線分がy=aの形
        if (cVDomain[0] <= rotatedL["special"]["y"] && rotatedL["special"]["y"] <= cVDomain[1] && yJudge) return true;
    } else {
        if (xJudge && yJudge) {
            /*
            let bd2 = Math.pow(c["radius"].x,4)*Math.pow(rotatedL["slope"]*rotatedL["intercept"],2);
            let ac = Math.pow(c["radius"].x,2)*(Math.pow(c["radius"].y,2)+Math.pow(c["radius"]*rotatedL["slope"],2))*(Math.pow(rotatedL["intercept"],2)-Math.pow(rotatedL["slope"],2));
            */
            let qe = Fortis.util.cleanFloat(Math.pow(c["radius"].x,4)*Math.pow(rotatedL["slope"]*rotatedL["intercept"],2)-Math.pow(c["radius"].x,2)*(Math.pow(c["radius"].y,2)+Math.pow(c["radius"]*rotatedL["slope"],2))*(Math.pow(rotatedL["intercept"],2)-Math.pow(rotatedL["slope"],2)),7);
            return qe >= 0;
        }
    }