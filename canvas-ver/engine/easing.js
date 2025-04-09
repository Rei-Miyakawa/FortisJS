//Trigは三角関数
//powerは累乗(xのn乗)
//expoは指数(2のx乗)
//customは自由に作れる3次ベジェ曲線
//back y = ax**n - (a-1)x**m　a,n,mは1以上の数デフォルトでa=3,n=3,m=2
//circ y = 1- Math.sqrt(1-x**2)
//bounce

//三角関数系_確認済
{
Fortis.util.easing.inTrig = function(t){
    if(t==null)return Fortis.error.ArgNotExists();
    if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
    if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
    return 1 - Math.cos(t*Math.PI/2);
}
Fortis.util.easing.outTrig = function(t){
    if(t==null)return Fortis.error.ArgNotExists();
    if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
    if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
    return Math.sin(t*Math.PI/2);
}
Fortis.util.easing.inOutTrig = function(t){
    if(t==null)return Fortis.error.ArgNotExists();
    if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
    if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
    return (1-Math.cos(t*Math.PI))/2;
}
Fortis.util.easing.outInTrig = function(t){
    if(t==null)return Fortis.error.ArgNotExists();
    if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
    if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
    if(t<0.5){
        return Math.sin(t*Math.PI)/2;
    }else{
        return 1-(Math.sin(t*Math.PI))/2;
    }
}
}

//累乗系
{
Fortis.util.easing.inPower = function(t,n){
    let expo = 2;
    if(t==null)return Fortis.error.ArgNotExists();
    if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
    if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
    if(n != null){
        if(!Fortis.util.checkType(n,"number"))return Fortis.error.ArgTypeWrong();
        if(n<0)return Fortis.error.ArgIncorrectVarRange();
        expo = n;
    }
    return Math.pow(t,expo);
}
Fortis.util.easing.outPower = function(t,n){
    let expo = 2;
    if(t==null)return Fortis.error.ArgNotExists();
    if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
    if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
    if(n != null){
        if(!Fortis.util.checkType(n,"number"))return Fortis.error.ArgTypeWrong();
        if(n<0)return Fortis.error.ArgIncorrectVarRange();
        expo = n;
    }
    return 1-Math.pow(1-t,expo);
}
Fortis.util.easing.inOutPower = function(t,n){
    if(t==null)return Fortis.error.ArgNotExists();
    if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
    if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
    if(t<0.5){
        return Fortis.util.easing.inPower(t,n);
    }else{
        return Fortis.util.easing.outPower(t,n);
    }
}
Fortis.util.easing.outInPower = function(t,n){
    if(t==null)return Fortis.error.ArgNotExists();
    if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
    if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
    if(t<0.5){
        return Fortis.util.easing.outPower(t,n);
    }else{
        return Fortis.util.easing.inPower(t,n);
    }
}
}

//指数関数系
{
Fortis.util.easing.inExpo = function(t,n){
    let expo = 10;
    if(t==null)return Fortis.error.ArgNotExists();
    if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
    if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
    if(n != null){
        if(!Fortis.util.checkType(n,"number"))return Fortis.error.ArgTypeWrong();
        if(n<0)return Fortis.error.ArgIncorrectVarRange();
        expo = n;
    }
    if(t==0){
        return 0;
    }
    return Math.pow(2,expo*t-expo);
}
Fortis.util.easing.outExpo = function(t,n){
    let expo = 10;
    if(t==null)return Fortis.error.ArgNotExists();
    if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
    if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
    if(n != null){
        if(!Fortis.util.checkType(n,"number"))return Fortis.error.ArgTypeWrong();
        if(n<0)return Fortis.error.ArgIncorrectVarRange();
        expo = n;
    }
    if(t==1){
        return 1;
    }
    return 1-Math.pow(2,-expo*t);
}
Fortis.util.easing.inOutExpo = function(t,n){
    if(t==null)return Fortis.error.ArgNotExists();
    if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
    if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
    if(t<0.5){
        return Fortis.util.easing.inExpo(t,n);
    }else{
        return Fortis.util.easing.outExpo(t,n);
    }
}
Fortis.util.easing.outInExpo = function(t,n){
    if(t==null)return Fortis.error.ArgNotExists();
    if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
    if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
    if(t<0.5){
        return Fortis.util.easing.outExpo(t,n);
    }else{
        return Fortis.util.easing.inExpo(t,n);
    }
}
}

//バック系
{
Fortis.util.easing.inBack = function(t,n,m,a){
    let expo1 = 3;
    let expo2 = 2;
    let coe = 3;
    if(t==null)return Fortis.error.ArgNotExists();
    if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
    if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
    if(n != null){
        if(!Fortis.util.checkType(n,"number"))return Fortis.error.ArgTypeWrong();
        if(n<0)return Fortis.error.ArgIncorrectVarRange();
        expo1 = n;
    }
    if(m != null){
        if(!Fortis.util.checkType(m,"number"))return Fortis.error.ArgTypeWrong();
        if(m<0)return Fortis.error.ArgIncorrectVarRange();
        expo2 = m;
    }
    if(a != null){
        if(!Fortis.util.checkType(a,"number"))return Fortis.error.ArgTypeWrong();
        if(a<0)return Fortis.error.ArgIncorrectVarRange();
        coe = a;
    }
    return coe*Math.pow(t,expo1)-(coe-1)*Math.pow(t,expo2);
}
Fortis.util.easing.outBack = function(t,n,m,a){
    let expo1 = 3;
    let expo2 = 2;
    let coe = 3;
    if(t==null)return Fortis.error.ArgNotExists();
    if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
    if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
    if(n != null){
        if(!Fortis.util.checkType(n,"number"))return Fortis.error.ArgTypeWrong();
        if(n<0)return Fortis.error.ArgIncorrectVarRange();
        expo1 = n;
    }
    if(m != null){
        if(!Fortis.util.checkType(m,"number"))return Fortis.error.ArgTypeWrong();
        if(m<0)return Fortis.error.ArgIncorrectVarRange();
        expo2 = m;
    }
    if(a != null){
        if(!Fortis.util.checkType(a,"number"))return Fortis.error.ArgTypeWrong();
        if(a<0)return Fortis.error.ArgIncorrectVarRange();
        coe = a;
    }
    return 1+coe*Math.pow(t-1,expo1)+(coe-1)*Math.pow(t-1,expo2);
}
Fortis.util.easing.inOutBack = function(t,n,m,a){
    if(t==null)return Fortis.error.ArgNotExists();
    if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
    if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
    if(t<0.5){
        return Fortis.util.easing.inBack(t,n,m,a);
    }else{
        return Fortis.util.easing.outBack(t,n,m,a);
    }
}
Fortis.util.easing.outInBack = function(t,n,m,a){
    if(t==null)return Fortis.error.ArgNotExists();
    if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
    if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
    if(t<0.5){
        return Fortis.util.easing.outBack(t,n,m,a);
    }else{
        return Fortis.util.easing.inBack(t,n,m,a);
    }
}
}

//円系_確認済み
{
    Fortis.util.easing.inCirc = function(t){
        if(t==null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
        if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
        return 1- Math.sqrt(1-t**2);
    }
    Fortis.util.easing.outCirc = function(t){
        if(t==null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
        if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
        return Math.sqrt(-1*t**2+2*t);
    }
    Fortis.util.easing.inOutCirc = function(t){
        if(t==null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
        if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
        if(t<0.5){
            return 0.5-Math.sqrt(0.25-t**2);
        }else{
            return 0.5+Math.sqrt(0.25-(t-1)**2);
        }
    }
    Fortis.util.easing.outInCirc = function(t){
        if(t==null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(t,"number"))return Fortis.error.ArgTypeWrong();
        if(t<0 || t>1)return Fortis.error.ArgIncorrectVarRange();
        if(t<0.5){
            return Math.sqrt(-1*t**2+t);
        }else{
            return 1-Math.sqrt(-1*t**2+t);
        }
    }
}