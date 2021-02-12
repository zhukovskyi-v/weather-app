const api = {
    key: "584240c13750020846aa03f80b37c8f3",
    base: "https://api.openweathermap.org/data/2.5/"
};
export const service = async (query) => {
    const res = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    return res.json();
}


