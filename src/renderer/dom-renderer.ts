import {createRenderer} from "./core";

export const domRenderer = createRenderer({
    createElement(tag) {
        return document.createElement(tag)
    },
    insert(el, parent, anchor = null) {
        parent.insertBefore(el, anchor)
    },
    setElementText(el, text) {
        el.textContent = text
    }
});