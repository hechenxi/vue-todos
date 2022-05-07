let activeEffect = undefined;
const effectStack = [];
let bucket = new WeakMap();

const jobQueue = new Set<Function>();
const p = Promise.resolve();

let isFlushing: boolean = false;

function flushJob() {
    if (isFlushing) return;
    isFlushing = true;
    p.then(() => {
        jobQueue.forEach(job => job())
    }).finally(() => {
        isFlushing = false;
    })
}

export function effect(fn, options: any = {}) {
    function effectFn() {
        debugger
        cleanup(effectFn);
        activeEffect = effectFn;
        effectStack.push(effectFn)
        const res = fn();
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1]
        return res;
    }

    effectFn.options = options
    effectFn.deps = [];
    if (!options.lazy) {
        effectFn()
    }
    return effectFn;

    function cleanup(effectFn) {
        for (let i = 0; i < effectFn.deps.length; i++) {
            const deps = effectFn.deps[i];
            deps.delete(effectFn)
        }
        effectFn.deps.length = 0;
    }
}

export function reactive(data) {
    const obj = new Proxy(data, {
        get(target: any, key: string | symbol, receiver: any): any {
            track(target, key)
            // return target[key]
            return Reflect.get(target,key,receiver)
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
    debugger
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
    activeEffect.deps.push(deps)
}

function trigger(target, key) {
    debugger
    const depsMap = bucket.get(target);
    if (!depsMap) return;
    const effects = depsMap.get(key);
    const effectsToRun = new Set<any>()
    effects?.forEach(effectFn => {
        if (effectFn !== activeEffect) {
            effectsToRun.add(effectFn)
        }
    })
    effectsToRun?.forEach(effectFn => {
        if (effectFn.options.scheduler) {
            effectFn.options.scheduler(effectFn)
        } else {
            effectFn();
        }
    })
}

export function computed(getter) {
    let value;
    let dirty = true;
    const effectFn = effect(getter, {
        lazy: true,
        scheduler() {
            dirty = true;
            trigger(obj, "value")
        }
    })
    const obj = {
        get value() {
            if (dirty) {
                value = effectFn()
                dirty = false;
            }
            track(obj, "value")
            return value;
        }
    }
    return obj;
}

export function watch(source: Object | Function, cb) {
    //手动实现函数重载
    let getter;
    if (typeof source === "function") {
        getter = source;
    } else {
        getter = traverse(source)
    }
    _watch(getter, cb)

    function traverse(value, seen = new Set()) {
        if (typeof value !== "object" || value === null || seen.has(value)) return;
        seen.add(value)
        for (const valueKey in value) {
            traverse(value[valueKey], seen)
        }
        return value;
    }

    //真正的watch函数
    function _watch(getter: Function, cb: Function, options: {
        immediate?: boolean,                //回调函数cb是否立即执行
        flush?: "pre" | "post" | "sync"     //当监听到改变时，回调函数cb的执行时机
    } = {}) {
        let oldValue, newValue;
        const job = () => {
            newValue = effectFn()
            cb(oldValue, newValue);
            oldValue = newValue
        }
        const effectFn = effect(getter, {
            lazy: true,
            scheduler: () => {
                if (options.flush === "post") {
                    Promise.resolve().then(job)
                } else {
                    job()
                }
            }
        })
        if (options.immediate) {
            job()
        } else {
            oldValue = effectFn()
        }
    }
}
