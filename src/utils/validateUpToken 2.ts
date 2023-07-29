export const validateUpToken = (upToken: string) => {
    const parts = upToken.split(":");
    if (parts[0] !== "up" || parts[1] !== "yeah" || parts[2].length !== 128) {
        return false
    }
    return true
}