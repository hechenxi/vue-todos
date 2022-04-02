let activeEffect = undefined;
let bucket = new WeakMap();

export function effect(fn) {
    activeEffect = fn;
    fn();
}

export function reactive(data) {
    const obj = new Proxy(data, {
        get(target: any, key: string | symbol, receiver: any): any {
            track(target, key)
            return target[key]
        },
        set(target: any, key: string | symbol, value: any, receiver: any): boolean {
            target[key] = value;
            trigger(target, key)
            return true;
        }
    })
    return obj
}

function track(target, key) {
    if (!activeEffect) return;
    let depsMap = bucket.get(target);
    if (!depsMap) {
        bucket.set(target, (depsMap = new Map()))
    }
    let deps = depsMap.get(key);
    if (!deps) {
        depsMap.set(key, (deps = new Set()))
    }
    deps.add(activeEffect)
}

function trigger(target, key) {
    const depsMap = bucket.get(target);
    if (!depsMap) return;
    const effects = depsMap.get(key);
    effects?.forEach(fn => fn())
}