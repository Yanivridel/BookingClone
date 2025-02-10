
export const getCookie = (name: string) => {
    // const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    // return match ? match[2] : null;
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token"));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
};

export const removeCookie = (name: string) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};