export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const getAssetPath = (path: string) => {
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${BASE_PATH}/${cleanPath}`;
};
