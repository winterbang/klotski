
/**该方法用来绘制一个有填充色的圆角矩形
*@param cxt:canvas的上下文环境
*@param x:左上角x轴坐标
*@param y:左上角y轴坐标
*@param width:矩形的宽度
*@param height:矩形的高度
*@param radius:圆的半径
*@param fillColor:填充颜色
**/
export function fillRoundRect(cxt,x,y,width,height,radius,/*optional*/fillColor){
    //圆的直径必然要小于矩形的宽高
    if(2*radius>width || 2*radius>height){return false;}

    cxt.save();
    cxt.translate(x,y);
    //绘制圆角矩形的各个边
    drawRoundRectPath(cxt,width,height,radius);
    cxt.fillStyle=fillColor||"#000";//若是给定了值就用给定的值否则给予默认值
    cxt.fill();
    cxt.restore();
}

/**该方法用来绘制圆角矩形
*@param cxt:canvas的上下文环境
*@param x:左上角x轴坐标
*@param y:左上角y轴坐标
*@param width:矩形的宽度
*@param height:矩形的高度
*@param radius:圆的半径
*@param lineWidth:线条粗细
*@param strokeColor:线条颜色
**/
export function strokeRoundRect(cxt,x,y,width,height,radius,/*optional*/lineWidth,/*optional*/strokeColor){
    //圆的直径必然要小于矩形的宽高
    if(2*radius>width || 2*radius>height){return false;}

    cxt.save();
    cxt.translate(x,y);
    //绘制圆角矩形的各个边
    drawRoundRectPath(cxt,width,height,radius);
    cxt.lineWidth = lineWidth||2;//若是给定了值就用给定的值否则给予默认值2
    cxt.strokeStyle=strokeColor||"#000";
    cxt.stroke();
    cxt.restore();
}

export function drawRoundRectPath(cxt,width,height,radius){
    cxt.beginPath(0);
    //从右下角顺时针绘制，弧度从0到1/2PI
    cxt.arc(width-radius,height-radius,radius,0,Math.PI/2);

    //矩形下边线
    cxt.lineTo(radius,height);

    //左下角圆弧，弧度从1/2PI到PI
    cxt.arc(radius,height-radius,radius,Math.PI/2,Math.PI);

    //矩形左边线
    cxt.lineTo(0,radius);

    //左上角圆弧，弧度从PI到3/2PI
    cxt.arc(radius,radius,radius,Math.PI,Math.PI*3/2);

    //上边线
    cxt.lineTo(width-radius,0);

    //右上角圆弧
    cxt.arc(width-radius,radius,radius,Math.PI*3/2,Math.PI*2);

    //右边线
    cxt.lineTo(width,height-radius);
    cxt.closePath();
}

// r1为外面大圆的半径，r2为内部小圆的半径，x为五角星中心的横坐标，y为五角星中心的纵坐标。a为旋转的角度
export function star5(cxt,x, y, r1, r2, a=0) {
  cxt.beginPath();
  //设置是个顶点的坐标，根据顶点制定路径
  for (var i = 0; i < 5; i++) {
      cxt.lineTo(Math.cos((18+i*72-a)/180*Math.PI)*r1+x,
                      -Math.sin((18+i*72-a)/180*Math.PI)*r1+y);
      cxt.lineTo(Math.cos((54+i*72-a)/180*Math.PI)*r2+x,
                      -Math.sin((54+i*72-a)/180*Math.PI)*r2+y);
  }
  cxt.closePath();
  //设置边框样式以及填充颜色
  cxt.lineWidth="3";
  cxt.fillStyle = "#F6F152";
  cxt.strokeStyle = "#F5270B";
  cxt.fill();
  // cxt.stroke();
}
