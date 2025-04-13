//Trigは三角関数
//powerは累乗(xのn乗)
//expoは指数(2のx乗)
//customは自由に作れる3次ベジェ曲線
//back y = ax**n - (a-1)x**m　a,n,mは1以上の数デフォルトでa=3,n=3,m=2
//circ y = 1- Math.sqrt(1-x**2)
//bounce

//三角関数系_確認済み
{
    Fortis.util.easing.inTrig = function (t) {
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        return 1 - Math.cos(t * Math.PI / 2);
    }
    Fortis.util.easing.outTrig = function (t) {
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        return Math.sin(t * Math.PI / 2);
    }
    Fortis.util.easing.inOutTrig = function (t) {
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        return (1 - Math.cos(t * Math.PI)) / 2;
    }
    Fortis.util.easing.outInTrig = function (t) {
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        if (t < 0.5) {
            return Fortis.util.easing.outTrig(t * 2) / 2;
        } else {
            return Fortis.util.easing.inTrig((t - 0.5) * 2) / 2 + 0.5;
        }
    }
}

//累乗系_確認済み
{
    Fortis.util.easing.inPower = function (t, n) {
        let expo = 2;
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        if (n != null) {
            if (typeof (n) == "number") {
                if (n < 0) return Fortis.error.ArgIncorrectVarRange();
                expo = n;
            } else if (typeof (n) == "object") {
                if (n.length != 1) return Fortis.error.ArgIncorrectVarRange();
                if (typeof (n[0]) == "number") {
                    if (n[0] < 0) return Fortis.error.ArgIncorrectVarRange();
                    expo = n[0];
                } else {
                    return Fortis.error.ArgTypeWrong();
                }
            }
        }
        return Math.pow(t, expo);
    }
    Fortis.util.easing.outPower = function (t, n) {
        let expo = 2;
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        if (n != null) {
            if (typeof (n) == "number") {
                if (n < 0) return Fortis.error.ArgIncorrectVarRange();
                expo = n;
            } else if (typeof (n) == "object") {
                if (n.length != 1) return Fortis.error.ArgIncorrectVarRange();
                if (typeof (n[0]) == "number") {
                    if (n[0] < 0) return Fortis.error.ArgIncorrectVarRange();
                    expo = n[0];
                } else {
                    return Fortis.error.ArgTypeWrong();
                }
            }
        }
        return 1 - Math.pow(1 - t, expo);
    }
    Fortis.util.easing.inOutPower = function (t, n) {
        let expo = 2;
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        if (n != null) {
            if (typeof (n) == "number") {
                if (n < 0) return Fortis.error.ArgIncorrectVarRange();
                expo = n;
            } else if (typeof (n) == "object") {
                if (n.length != 1) return Fortis.error.ArgIncorrectVarRange();
                if (typeof (n[0]) == "number") {
                    if (n[0] < 0) return Fortis.error.ArgIncorrectVarRange();
                    expo = n[0];
                } else {
                    return Fortis.error.ArgTypeWrong();
                }
            }
        }
        if (t < 0.5) {
            return Fortis.util.easing.inPower(t*2,expo)/2;
        } else {
            return Fortis.util.easing.outPower((t-0.5)*2,expo)/2+0.5;
        }
    }
    Fortis.util.easing.outInPower = function (t, n) {
        let expo = 2;
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        if (n != null) {
            if (typeof (n) == "number") {
                if (n < 0) return Fortis.error.ArgIncorrectVarRange();
                expo = n;
            } else if (typeof (n) == "object") {
                if (n.length != 1) return Fortis.error.ArgIncorrectVarRange();
                if (typeof (n[0]) == "number") {
                    if (n[0] < 0) return Fortis.error.ArgIncorrectVarRange();
                    expo = n[0];
                } else {
                    return Fortis.error.ArgTypeWrong();
                }
            }
        }
        return (1+Math.pow(2*t-1,expo))/2;
    }
}

//指数関数系_確認済み
{
    Fortis.util.easing.inExpo = function (t, n) {
        let expo = 10;
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        if (n != null) {
            if (typeof (n) == "number") {
                if (n < 0) return Fortis.error.ArgIncorrectVarRange();
                expo = n;
            } else if (typeof (n) == "object") {
                if (n.length != 1) return Fortis.error.ArgIncorrectVarRange();
                if (typeof (n[0]) == "number") {
                    if (n[0] < 0) return Fortis.error.ArgIncorrectVarRange();
                    expo = n[0];
                } else {
                    return Fortis.error.ArgTypeWrong();
                }
            }
        }
        if (t == 0) {
            return 0;
        }
        console.log(expo)
        return Math.pow(2, expo * t - expo);
    }
    Fortis.util.easing.outExpo = function (t, n) {
        let expo = 10;
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        if (n != null) {
            if (typeof (n) == "number") {
                if (n < 0) return Fortis.error.ArgIncorrectVarRange();
                expo = n;
            } else if (typeof (n) == "object") {
                if (n.length != 1) return Fortis.error.ArgIncorrectVarRange();
                if (typeof (n[0]) == "number") {
                    if (n[0] < 0) return Fortis.error.ArgIncorrectVarRange();
                    expo = n[0];
                } else {
                    return Fortis.error.ArgTypeWrong();
                }
            }
        }
        if (t == 1) {
            return 1;
        }
        return 1 - Math.pow(2, -expo * t);
    }
    Fortis.util.easing.inOutExpo = function (t, n) {
        let expo = 10;
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        if (n != null) {
            if (typeof (n) == "number") {
                if (n < 0) return Fortis.error.ArgIncorrectVarRange();
                expo = n;
            } else if (typeof (n) == "object") {
                if (n.length != 1) return Fortis.error.ArgIncorrectVarRange();
                if (typeof (n[0]) == "number") {
                    if (n[0] < 0) return Fortis.error.ArgIncorrectVarRange();
                    expo = n[0];
                } else {
                    return Fortis.error.ArgTypeWrong();
                }
            }
        }
        if (t < 0.5) {
            return Math.pow(2, expo * (2 * t - 1)) / 2;
        } else {
            return (2 - Math.pow(2, expo * (1 - 2 * t))) / 2;
        }
    }
    Fortis.util.easing.outInExpo = function (t, n) {
        let expo = 10;
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        if (n != null) {
            if (typeof (n) == "number") {
                if (n < 0) return Fortis.error.ArgIncorrectVarRange();
                expo = n;
            } else if (typeof (n) == "object") {
                if (n.length != 1) return Fortis.error.ArgIncorrectVarRange();
                if (typeof (n[0]) == "number") {
                    if (n[0] < 0) return Fortis.error.ArgIncorrectVarRange();
                    expo = n[0];
                } else {
                    return Fortis.error.ArgTypeWrong();
                }
            }
        }
        if (t < 0.5) {
            return (1 - Math.pow(2, -2 * expo * t)) / 2;
        } else {
            return (1 + Math.pow(2, 2 * expo * (t - 1))) / 2;
        }
    }
}

//バック系　ここからの配列対応から
{
    Fortis.util.easing.inBack = function (t, n, m, a) {
        let expo1 = 3;
        let expo2 = 2;
        let coe = 3;
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        if (n != null) {
            if (!Fortis.util.checkType(n, "number")) return Fortis.error.ArgTypeWrong();
            if (n < 0) return Fortis.error.ArgIncorrectVarRange();
            expo1 = n;
        }
        if (m != null) {
            if (!Fortis.util.checkType(m, "number")) return Fortis.error.ArgTypeWrong();
            if (m < 0) return Fortis.error.ArgIncorrectVarRange();
            expo2 = m;
        }
        if (a != null) {
            if (!Fortis.util.checkType(a, "number")) return Fortis.error.ArgTypeWrong();
            if (a < 0) return Fortis.error.ArgIncorrectVarRange();
            coe = a;
        }
        return coe * Math.pow(t, expo1) - (coe - 1) * Math.pow(t, expo2);
    }
    Fortis.util.easing.outBack = function (t, n, m, a) {
        let expo1 = 3;
        let expo2 = 2;
        let coe = 3;
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        if (n != null) {
            if (!Fortis.util.checkType(n, "number")) return Fortis.error.ArgTypeWrong();
            if (n < 0) return Fortis.error.ArgIncorrectVarRange();
            expo1 = n;
        }
        if (m != null) {
            if (!Fortis.util.checkType(m, "number")) return Fortis.error.ArgTypeWrong();
            if (m < 0) return Fortis.error.ArgIncorrectVarRange();
            expo2 = m;
        }
        if (a != null) {
            if (!Fortis.util.checkType(a, "number")) return Fortis.error.ArgTypeWrong();
            if (a < 0) return Fortis.error.ArgIncorrectVarRange();
            coe = a;
        }
        return 1 + coe * Math.pow(t - 1, expo1) + (coe - 1) * Math.pow(t - 1, expo2);
    }
    Fortis.util.easing.inOutBack = function (t, n, m, a) {
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        if (t < 0.5) {
            return Fortis.util.easing.inBack(t*2, n, m, a)/2;
        } else {
            return Fortis.util.easing.outBack((t-0.5)*2, n, m, a)/2+0.5;
        }
    }
    Fortis.util.easing.outInBack = function (t, n, m, a) {
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        if (t < 0.5) {
            return Fortis.util.easing.outBack(t*2, n, m, a)/2;
        } else {
            return Fortis.util.easing.inBack((t-0.5)*2, n, m, a)/2+0.5;
        }
    }
}

//円系_確認済み
{
    Fortis.util.easing.inCirc = function (t) {
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        return 1 - Math.sqrt(1 - t ** 2);
    }
    Fortis.util.easing.outCirc = function (t) {
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        return Math.sqrt(-1 * t ** 2 + 2 * t);
    }
    Fortis.util.easing.inOutCirc = function (t) {
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        if (t < 0.5) {
            return Fortis.util.easing.inCirc(t*2)/2;
        } else {
            return Fortis.util.easing.outCirc((t-0.5)*2)/2+0.5;
        }
    }
    Fortis.util.easing.outInCirc = function (t) {
        if (t == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(t, "number")) return Fortis.error.ArgTypeWrong();
        if (t < 0 || t > 1) return Fortis.error.ArgIncorrectVarRange();
        if (t < 0.5) {
            return Fortis.util.easing.outCirc(t*2)/2;
        } else {
            return Fortis.util.easing.inCirc((t-0.5)*2)/2+0.5;
        }
    }
}