import { useSession } from "next-auth/react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Sugestion from "./Sugestion";

declare module "next-auth" {
    interface Session {
        user: {
            uid: string;
            username: string;
            name: string;
            email: string;
            image: string;
        };
    }
}

const Feed = () => {
    const { data: session } = useSession();
    return (
        <main className={`grid justify-center mx-auto ${session ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:max-w-3xl xl:max-w-6xl" : "grid-cols-2 max-w-3xl"}`}>
            <section className="col-span-2">
                {/* stories */}
                <Stories />
                {/* posts */}
                <Posts />
            </section>
            {session && (
                <section className="hidden xl:inline-grid md:col-span-1">
                    <div className="fixed top-20 max-w-sm">
                        <MiniProfile session={session} username={session?.user?.username} image={`${session?.user?.image}`} />
                        <Sugestion />
                    </div>
                </section>
            )}
        </main>
    );
};

export default Feed;
