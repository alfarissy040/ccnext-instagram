import Header from "@/components/Header";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

const signin = ({ providers }: any) => {
    return (
        <div className="h-screen overflow-hidden">
            <Header />
            <div className="grid h-full -mt-48 place-items-center place-content-center">
                <Image src={"https://links.papareact.com/ocw"} alt="Instagram icon" width="0" height="0" className="object-contain w-80" sizes="320px" />
                <p className="font-xs italic">This is not a REAL app, it is built for educational purposes only</p>
                <div className="mt-10">
                    {Object.values(providers).map((provider: any) => (
                        <div key={provider.name}>
                            <button className="py-3 px-5 rounded shadow-sm border border-zinc-900" onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}

export default signin;
