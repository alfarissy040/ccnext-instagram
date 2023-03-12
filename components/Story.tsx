import Image from "next/image";

interface post {
    username: string;
    image: string;
}

const Story = ({ username, image }: post) => {
    return (
        <div>
            <Image
                className="h-14 w-14 object-cover rounded-full
             p-[1.5px] border-2 border-red-500 cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
                src={image}
                alt="profile image"
                width={40}
                height={40}
            />
            <p
                className="text-xs w-14 truncate text-center
            "
            >
                {username}
            </p>
        </div>
    );
};

export default Story;
