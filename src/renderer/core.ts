import {effect, reactive} from "vue";

export function createRenderer(options) {
    const {
        createElement,
        insert,
        setElementText
    } = options

    function render(vnode, container) {
        console.log("11")
        if (vnode) {
            patch(container._vnode, vnode, container)
        } else {
            //unmount
            if (container._vnode) {
                unmount(container._vnode)
            }
        }
        container._vnode = vnode
    }

    function unmount(vnode) {
        const el = vnode.el;
        const parent = el.parentNode;
        parent?.removeChild(el)
    }

    function patch(n1, n2, container) {
        if (n1 && n1.type !== n2.type) {
            unmount(n1)
            n1 = null
        }
        const {type} = n2;
        if (typeof type === "string") {
            if (!n1) {
                mountElement(n2, container)
            } else {
                //更新
                patchElement(n1, n2)
            }
        } else if (typeof type === "object") {
            //type是object 说明描述得是组件
        } else if (type === "Fragment") {

        }

        function f(num) {
            const arr = (num + "").split("")
            const length = arr.length
            const index = arr.indexOf(".")
            let p1 = index===-1?length - 3:index - 3;
            let p2 = index===-1?length + 3:index + 3;
            while (isBetween(p1,0,arr.length)) {
                arr.splice(p1,0,",")
                p1 -= 2
            }
            while (isBetween(p2,0,arr.length)) {
                arr.splice(p2,0,",")
                p2 += 4
            }
            return arr.join("")

            function isBetween(num, i, j) {
                return (num > i && num < j)?true:false
            }
        }

        function mountElement(vnode, containner) {
            const el = vnode.el = createElement(vnode.type)

            if (vnode.props) {
                for (const propName in vnode.props) {
                    el.setAttribute(propName, vnode.props[propName])
                }
            }

            if (typeof vnode.children === "string") {
                setElementText(el, vnode.children)
            } else if (Array.isArray(vnode.children)) {
                vnode.children.forEach(child => patch(null, child, el))
            }
            insert(el, containner)
        }

        function patchElement(n1, n2) {

        }
    }

    function hydrate() {

    }

    function createApp() {

    }

    return {
        render,
        hydrate,
        createApp
    }
}

const obj = {
    name: "wne",
    get value() {
        return this.name
    }
}

console.log(obj.value)
console.log(Reflect.get(obj, "value", {name: "wne2222"}))
