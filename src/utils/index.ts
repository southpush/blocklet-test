import copyToCalipboard from 'copy-to-clipboard'


/**
 * 复制内容
 */
export const copy = async (text: string) => {
    if (!navigator.clipboard || !navigator.permissions) {
        // throw new Error('当前浏览器不支持自动复制')
        if (copyToCalipboard(text)) {
            return Promise.resolve()
        } else {
            throw new Error("Current browsers do not support auto-copy");
        }
    } else {
        const permission = await navigator.permissions.query({
            // 部分浏览器不支持，这个权限还是实验性的
            name: "clipboard-write" as any,
        });

        if (!["granted", "prompt"].includes(permission.state)) {
            throw new Error("Lack of access to the clipboard");
        }

        return navigator.clipboard.writeText(text);
    }
}