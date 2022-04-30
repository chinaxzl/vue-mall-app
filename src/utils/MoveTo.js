export default function MoveTo(start, end, dom, slet) {
    let speed = 5; //速度
    let dist = 0; //移动距离
    if (end < 0) { //当元素在容器一半的左边时，方向变为负
        speed *= -1;
    }
    const t = setInterval(() => { //开启一个定时器
        dist += speed; //移动距离增加
        dom[slet] = start + dist; //修改容器滚动条距离
        if (Math.abs(dist) > Math.abs(end)) { //移动距离绝对值比目标距离绝对值大时，就证明移动超出范围
            dom[slet] = start + end; //直接把滚动条移动距离赋值为起始值+终点值
            clearInterval(t); //避免重复点击按钮，开启多个定时器
        }
    }, 2);
};