"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const urlPattern =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/;

export default function Home() {
    const [url, setUrl] = useState<string>("");
    const [sUrl, setSUrl] = useState<string | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handleForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (url.length === 0) {
            toast.error("URL is empty!");
            return;
        }

        if (url.length > 512) {
            toast.error("URL is too large!");
            return;
        }

        if (!urlPattern.test(url)) {
            toast.error("URL is not valid!");
            return;
        }

        setIsLoading(true);

        const postOptions = {
            method: "POST",
            body: JSON.stringify({ url }),
        };
        await fetch("/api/url", postOptions)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw Error(res.statusText);
            })
            .then((data) => {
                setSUrl(`${window.location.origin}/${data.shortUrl}`);
                setIsLoading(false);
                toast.success("Short URL generated!");
            })
            .catch((err) => {
                setIsLoading(false);
                toast.error(err.message);
            });
    }

    function handleCopy() {
        if (sUrl) {
            navigator.clipboard.writeText(sUrl)
            toast.success("Copied!");
        }
    }

    return (
        <main className="flex-row items-center justify-center w-fit lg:w-full min-h-screen relative">
            <div className="flex items-center justify-center w-full min-h-screen mx-auto">
                <video
                    autoPlay={true}
                    loop
                    muted={true}
                    playsInline={true}
                    className="aspect-auto"
                    src="https://cdn.pixabay.com/video/2016/08/24/4788-180289892_large.mp4"
                />
            </div>
            <div className="absolute inset-0 w-fit lg:w-full pt-16 top-1/4 mx-auto items-center justify-center">
                <div className="max-w-lg mx-auto w-fit lg:w-full items-center justify-center rounded-2xl p-6 bg-gray-800 bg-opacity-85">
                    <h1 className="mb-6 font-semibold cursor-default select-none text-transparent items-center justify-center text-center text-4xl sm:text-3xl lg:text-6xl bg-clip-text bg-gradient-to-l from-blue-600 to-green-600">
                        SHORT LINK
                    </h1>

                    <form
                        className="max-w-lg mx-auto w-fit lg:w-full flex items-center justify-center space-x-0 p-4"
                        onSubmit={handleForm}
                    >
                        <input
                            type="search"
                            id="search-dropdown"
                            className="p-2.5 w-full text-sm rounded-s-lg border-s-2 border focus:ring-blue-500 bg-gray-700 border-s-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-blue-500"
                            placeholder="Enter the URL here"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            minLength={1}
                            maxLength={512}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`p-2.5 w-fit text-nowrap text-sm font-medium h-full text-white cursor-pointer select-none rounded-e-lg border border-blue-700 ${
                                isLoading
                                    ? "bg-blue-300"
                                    : "focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                            }`}
                        >
                            <span>Shorten URL</span>
                        </button>
                    </form>

                    {sUrl && (
                        <div className="flex items-center justify-center w-fit lg:w-full mt-16 mx-auto relative p-4">
                            <textarea
                                placeholder="a"
                                className="col-span-6 pr-16 w-full resize-none border text-wrap text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-400"
                                value={sUrl}
                                disabled
                                readOnly
                            />
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="absolute end-2 top-1/2 mr-4 -translate-y-1/2 text-gray-400 hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
                            >
                                <span>
                                    <svg
                                        className="w-3.5 h-3.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 18 20"
                                    >
                                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
