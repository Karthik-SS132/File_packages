var a=5;
var b=6;
var c=[a+b]
for(var i=0;i<=c.length-1;i++)
{
        var val=c[i];
        console.log(val);
        var fact=1;
        while(val>=1)
        {
                fact=face*val;
                val--;
        }
        console.log(fact);
}