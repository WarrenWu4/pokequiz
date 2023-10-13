/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "about-image":
                    "url('https://www.desktopbackground.org/download/1920x1080/2011/12/04/307118_all-pokemon-wallpapers-hd_3888x2459_h.jpg')",
            },
        },
    },
    plugins: [],
};
