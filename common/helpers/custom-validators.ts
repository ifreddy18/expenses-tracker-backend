
export const isEmptyObject = (obj: any): boolean => {
    return JSON.stringify(obj) === '{}';
}
