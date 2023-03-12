import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { StaticImageData } from "next/image";
import Story from "./Story";
import { useSession } from "next-auth/react";

interface post {
    id: number;
    username: string;
    image: string;
}

const Stories = () => {
    const [dumyData, setDumyData] = useState<post[]>([]);
    const { data: session } = useSession();

    useEffect(() => {
        const sugestion = [...Array(20)].map((_, index) => ({
            id: index,
            username: faker.internet.userName(),
            image: faker.image.avatar(),
        }));
        setDumyData(sugestion);
    }, []);
    return (
        <div className="flex items-center gap-x-2 p-6 bg-white mt-8 border-zinc-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent">
            {session && <Story username={session?.user?.username} image={session?.user?.image} />}

            {dumyData.map((profile) => (
                <Story key={profile.id} username={profile.username} image={profile.image} />
            ))}
        </div>
    );
};

export default Stories;
