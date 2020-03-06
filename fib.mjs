
function Fibonacci(){}

Fibonacci.of = function(n){
    var a = [0,1,1];
    // if(n < 0) throw new Error('输入的数字不能小于0');
    if(n >= 3){
        for(var i=3;i<=n;i++){
        a[i] = a[i-1]+a[i-2];
        }
    }
return a[n];
}

var instance = new Fibonacci(); //新建一个实例

for(var i=1;i<=200;i++){
    console.log("Fibonacci.of("+i+")="+Fibonacci.of(i));
}
