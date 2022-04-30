import Vue from "vue";
import com from "./index.vue";

const Anima = Vue.extend(com);

export default function Animation({
    imgTop,
    imgLeft,
    imgWidth,
    imgHeight,
    imgSrc,
    shopMidL,
    shopMidT
}) {
    const app = new Anima({
        el:document.createElement("div"),
        data(){
            return {
                width: imgWidth,
                height: imgHeight,
                src: imgSrc,
                sx:imgLeft,
                sy:imgTop,
                x:1,
                y:1,
                opacity:1,
                show:true,
            }
        }
    })
    document.body.appendChild(app.$el);
    setTimeout(()=>{
        app.sx = shopMidL,
        app.sy = shopMidT,
        app.x = 0.1,
        app.y = 0.1,
        app.opacity = 0;
    },0)
    setTimeout(()=>{
        app.show = false;
    },1100)
}