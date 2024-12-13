   var count=0;
   function pass()
   {
    count++;
   // left 1 right 1
        if(count==1){
            for(var i=1;i<=5;i++)
            {
                for(var j=1;j<=i;j++)
                {
                    document.write("*");
                }
                document.write("<br>")
            }
        }
        // console.log(count)
        document.write("<button onclick>left</button>").onclick;
        if(count==2)
        {
        for(var i=1;i<=5;i++)
        {
        for(var j=1;j<=5-i+1;j++)
        {
            document.write("(");
        }
        document.write("<br>")
        }
    }



























}