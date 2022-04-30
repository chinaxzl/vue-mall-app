import Home from "@/views/Home";
import Classify from "@/views/Home/components/Classify";
import ShopPing from "@/views/Home/components/ShopPing";
import Search from "@/views/Search";



export default [

    {
        path: '*',
        redirect: '/home/classify',
    },


    {
        name: "Home",
        path: "/home",
        component: Home,
        children: [{
                name: "Classify",
                path: "classify",
                component: Classify,
            },
            {
                name: "ShopPing",
                path: "shopping",
                component: ShopPing
            }
        ]
    },

    {
        name: "Search",
        path: "/search",
        component: Search
    }
]