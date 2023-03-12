import Feed from "@/components/Feed";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import Head from "next/head";

export default function Home() {
    return (
        <div
            className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide
        "
        >
            <Head>
                <title>Instagram</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header />
            <Feed />

            {/* modal */}
            <Modal />
        </div>
    );
}
