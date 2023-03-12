import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface props {
    session: Session | null;
    username: string;
    image: string;
}

const MiniProfile = ({ session, username, image }: props) => {
    return (
        <div
            className="flex items-center justify-between
        mt-14 ml-10 "
        >
            <Image className="rounded-full border object-cover p-[2px] w-14 h-14" src={image} alt="Profile Picture" width={40} height={40} placeholder="blur" blurDataURL={`${image}`} />
            <div className="flex-1 mx-4">
                <h2 className="font-bold">{username}</h2>
                <h3 className="text-sm text-zinc-400">Welcome to Instagram</h3>
            </div>
            <button onClick={() => signOut()} className="text-blue-400 text-sm font-semibold">
                Sign out
            </button>
        </div>
    );
};

export default MiniProfile;
