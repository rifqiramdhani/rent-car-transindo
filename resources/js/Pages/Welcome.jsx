import { Link, Head } from "@inertiajs/react";
import { Avatar, Carousel, Image, Layout } from "antd";

const contentStyle = {
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
};

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Layout className="max-h-9">
                <Head title="Welcome" />
                <div className="relative z-10">
                    <div class="sm:px-12 mx-auto flex items-center justify-between p-4 shadow-2xl bg-rose-100 bg-opacity-10">
                        <div class="flex items-center space-x-2">
                            <button>
                                <Avatar
                                    src={
                                        <img
                                            src={"/images/rent-car.jpg"}
                                            alt="Logo"
                                        />
                                    }
                                    size={47}
                                />
                            </button>
                        </div>
                        <div class="flex items-center space-x-2 flex-col">
                            <h2 className="text-3xl font-bold text-dark outline-header ">
                                Welcome in Automotive{" "}
                            </h2>
                            <h3 className="text-xl font-bold outline-title">
                                Exclusive premium rental car{" "}
                            </h3>
                        </div>
                        <nav class="flex items-center space-x-1 text-sm font-medium text-gray-800">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="font-semibold hover:text-gray-900 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 rounded bg-red-600 px-3 py-2 text-white transition hover:bg-red-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="font-semibold hover:text-gray-900 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 rounded bg-red-600 px-3 py-2 text-white transition hover:bg-red-700"
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        href={route("register")}
                                        className="ml-4 font-semibold hover:text-gray-900 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 rounded bg-red-600 px-3 py-2 text-white transition hover:bg-red-700"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </div>

                <Carousel
                    autoplay
                    className="absolute -mt-[97px] top-0 z-0 !h-[100vh]"
                    effect="fade"
                    dotPosition="right"
                >
                    <div>
                        <img
                            src="/images/car-1.jpeg"
                            width={"100%"}
                            className="bg-cover !h-[100vh]"
                            height={"100%"}
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <img
                            src="/images/car-2.jpeg"
                            width={"100%"}
                            className="bg-cover !h-[100vh]"
                            height={"100%"}
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <img
                            src="/images/car-3.png"
                            width={"100%"}
                            className="bg-cover !h-[100vh]"
                            height={"100%"}
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <img
                            src="/images/car-4.jpeg"
                            width={"100%"}
                            className="bg-cover !h-[100vh]"
                            height={"100%"}
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <img
                            src="/images/car-5.png"
                            width={"100%"}
                            className="bg-cover !h-[100vh]"
                            height={"100%"}
                            loading="lazy"
                        />
                    </div>
                </Carousel>
            </Layout>
        </>
    );
}
