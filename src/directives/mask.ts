// import _ from 'lodash'

import { DirectiveBinding, Directive, ObjectDirective } from 'vue'

export const maskColor = {
    'loading': 'bg-gray-500',
    'disabled': "bg-white"
}

export interface MaskDirectiveInstance {
    control: (arg0: HTMLElement, arg1: MaskDirectiveBinding) => any;
    setMask: (arg0: HTMLElement, arg1: MaskDirectiveBinding) => any;
    unsetMask: (arg0: HTMLElement, arg1: DirectiveBinding) => any;
    loading: () => [HTMLElement, string];
    createMask: (baClass: string) => HTMLElement;
    disabled: () => [HTMLElement, string];
}

export interface MaskDirectiveBinding extends DirectiveBinding {
    dir: ObjectDirective<any, any> & MaskDirectiveInstance;
    arg: "loading" | "disabled";
}

const MaskDirective: Directive<HTMLElement, MaskDirectiveInstance> & MaskDirectiveInstance = {
    mounted(el, binding) {
        (binding.dir as MaskDirectiveInstance).control(el, binding as MaskDirectiveBinding)
    },
    updated(el, binding) {
        (binding.dir as MaskDirectiveInstance).control(el, binding as MaskDirectiveBinding)
    },
    control(el: HTMLElement, binding: MaskDirectiveBinding) {
        if (Boolean(binding.oldValue) === Boolean(binding.value)) return

        if (binding.value) {
            (binding.dir as MaskDirectiveInstance).setMask(el, binding)
        } else {
            (binding.dir as MaskDirectiveInstance).unsetMask(el, binding)
        }
    },
    setMask(el: HTMLElement, binding: MaskDirectiveBinding) {
        if (!['loading', 'disabled'].includes(binding.arg)) {
            return
        }

        const maskEle = (binding.dir as MaskDirectiveInstance).createMask(maskColor[binding.arg] || 'bg-gray-500')
        maskEle.classList.add('mask')

        if (binding.dir[binding.arg]) {
            const [ele, cursor] = binding.dir[binding.arg]()
            maskEle.appendChild(ele)
            maskEle.classList.add(cursor)
        }

        if (!el.style.position) {
            el.classList.add('relative')
        }

        el.appendChild(maskEle)

    },
    unsetMask(el: HTMLElement) {
        const classList = document.getElementsByClassName('mask')
        for (const i of Array.from(classList)) {
            i?.remove?.()
        }
    },
    createMask(bg: string) {
        const ele = document.createElement('div')
        ele.classList.add('absolute', 'spinner',
            'h-full', 'w-full', bg, 'bg-opacity-40',
            'z-10', 'top-0', 'left-0')

        ele.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
        }, true)


        return ele
    },
    /**
     * 等待覆盖
     */
    loading() {
        // loading element
        const ele = document.createElement('div')
        ele.classList.add('relative', 'flex', 'justify-center', 'w-full', 'h-full', 'p-1', 'items-center')
        ele.setAttribute('role', "Loading")

        ele.innerHTML = `
        <svg style='max-height: 40px; max-width: 40px' class="animate-spin h-full w-full text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-50" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        `

        return [ele, 'cursor-wait']
    },
    /**
     * 禁用覆盖
     */
    disabled() {
        const ele = document.createElement('div')
        ele.classList.add('relative', 'flex', 'justify-center', 'w-full', 'h-full', 'p-1', 'bg-white', 'bg-opacity-50')

        return [ele, 'cursor-not-allowed']
    },
}


export default MaskDirective;