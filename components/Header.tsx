import Image from "next/image";
import { MagnifyingGlassIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Bars3Icon, HomeIcon } from "@heroicons/react/24/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { modalState } from "@/atoms/modalAtoms";

const Header = () => {
    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modalState);

    return (
        <header className="bg-white sticky top-0 shadow-sm border-b z-50">
            <div className=" flex items-center justify-between max-w-6xl lg:mx-auto mx-5">
                {/* left */}
                {/* large logo */}
                <Link href={"/"} className="relative hidden lg:inline-flex w-24 cursor-pointer">
                    <Image src={"https://links.papareact.com/ocw"} alt="Instagram icon" width={96} height={96} className="object-contain w-auto h-auto" />
                </Link>
                {/* small logo */}
                <Link href={"/"} className="relative lg:hidden inline-flex flex-shrink-0 w-10 cursor-pointer">
                    <Image src={"https://links.papareact.com/jjm"} alt="Instagram icon" width={40} height={40} className="object-contain w-auto h-auto" />
                </Link>

                {/* middle */}
                {/* search input */}
                <div className="flex items-center relative p-3 max-w-xs">
                    <span className="absolute pl-3 pointer-events-none">
                        <MagnifyingGlassIcon
                            className="w-5 h-5 text-gray-500
                    "
                        />
                    </span>
                    <input type="search" className="bg-zinc-50 pl-10 w-full block sm:text-sm border-zinc-300 rounded-md border focus:ring-black focus:border-black focus:outline-none" placeholder="search" />
                </div>

                {/* right */}
                <div className="flex items-center justify-end gap-x-3">
                    <Link href={"/"}>
                        <HomeIcon className="navBtn" />
                    </Link>
                    {session ? (
                        <div className="flex items-center gap-x-3">
                            <Bars3Icon className="h-6 md:hidden cursor-pointer" />
                            <div className="relative navBtn">
                                <span className="text-white bg-red-500 absolute text-xs w-5 h-5 rounded-full -inset-y-2 -right-2 flex items-center justify-center animate-pulse">3</span>
                                <PaperAirplaneIcon className="navBtn" />
                            </div>
                            <PlusCircleIcon onClick={() => setOpen(true)} className="navBtn" />
                            <UserGroupIcon className="navBtn" />
                            <HeartIcon className="navBtn" />
                            <Image
                                src={`${session?.user?.image}`}
                                alt="profile picture"
                                className="h-10 w-10 rounded-full
                            object-cover cursor-pointer"
                                width={40}
                                height={40}
                                onClick={() => signOut()}
                            />
                        </div>
                    ) : (
                        <button onClick={() => signIn()}>Sign in</button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
