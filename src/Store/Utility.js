export const UpdatedObject = (oldObject, updatedObject) => {
    return {
        ...oldObject,
        ...updatedObject
    }
}