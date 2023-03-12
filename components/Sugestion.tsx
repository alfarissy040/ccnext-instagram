import { faker } from "@faker-js/faker";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface data {
    id: number;
    name: string;
    username: string;
    status: string;
    profileImg: string;
    caption: string;
}

const Sugestion = () => {
    const [dumyData, setDumyData] = useState<Array<data>>([]);
    useEffect(() => {
        const sugestion = [...Array(5)].map((_, index) => ({
            id: index,
            name: faker.name.fullName(),
            username: faker.internet.userName(),
            status: faker.lorem.sentence(),
            profileImg: faker.image.avatar(),
            caption: faker.lorem.paragraph(),
        }));
        setDumyData(sugestion);
    }, []);
    return (
        <div className="mt-4 ml-10">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-zinc-400 text-sm font-bold">Sugesstion for you</h3>
                <button className="font-semibold text-sm">See all</button>
            </div>
            {dumyData.map((data, index) => (
                <div key={index + data.username} className="flex items-center justify-between gap-x-3 mt-3">
                    <Image className="w-10 h-10 rounded-full object-cover border p-[2px]" src={data.profileImg} alt={`${data.name}'s profile picture`} width="40" height="40" />
                    <div className="flex-auto truncate">
                        <h2 className="text-sm font-semibold">{data.username}</h2>
                        <h3 className="text-sm-text-zinc-400 truncate">{data.status}</h3>
                    </div>
                    <button className="text-sm text-zinc-400">Follow</button>
                </div>
            ))}
        </div>
    );
};

export default Sugestion;
