export const sizeSelectorPresets = {
    min: -6,
    max: 6,
    step: 1,
    defaultValue: 0,
}

export function sizeToUtility(size: number) {
    if (size) {
        return `c4-size-${size.toString().replace("-", "n")}`
    }
}
