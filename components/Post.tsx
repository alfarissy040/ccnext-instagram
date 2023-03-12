import { db } from "@/firebase";
import { PaperAirplaneIcon, ChatBubbleLeftEllipsisIcon, HeartIcon, BookmarkIcon, FaceSmileIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, deleteDoc, doc, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import Moment from "react-moment";

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

interface props {
    id: string;
    username: string;
    userImg: string | StaticImageData;
    img: string | StaticImageData;
    caption: string;
}

const Post = ({ id, username, userImg, img, caption }: props) => {
    const { data: session } = useSession();
    const [commentValue, setCommentValue] = useState("");
    const [dataComments, setDataComments] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const [dataLike, setDataLike] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(
        () =>
            onSnapshot(query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")), (snapshot) => {
                setDataComments(snapshot.docs);
            }),
        [db, id]
    );
    useEffect(
        () =>
            onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
                setDataLike(snapshot.docs);
            }),
        [db, id]
    );
    useEffect(() => {
        setHasLiked(dataLike.findIndex((like) => like.id === session?.user?.uid) !== -1);
    }, [dataLike]);

    const handleLikePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, `posts/${id}/likes/${session?.user?.uid}`));
        } else {
            await setDoc(doc(db, `posts/${id}/likes/${session?.user?.uid}`), {
                username: session!.user?.username,
            });
        }
    };

    const handleSendComment = async (e: any) => {
        e.preventDefault();

        const commentToSend = commentValue;
        setCommentValue("");

        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: session?.user?.username,
            userImage: session?.user?.image,
            timestamp: serverTimestamp(),
        });
    };

    return (
        <div className="bg-white my-7 border rounded-sm shadow-sm">
            {/* header */}
            <div className="flex items-center space-x-3 p-5">
                <Image src={userImg} className="w-12 h-12 rounded-full object-contain" alt={`${username}'s profile picture`} width={40} height={40} placeholder="blur" blurDataURL={`${userImg}`} />
                <p className="font-bold flex-1">{username}</p>
                <EllipsisHorizontalIcon className="h-5" />
            </div>

            {/* img */}
            <Image className="w-full h-auto object-contain" src={img} alt={""} width="0" height="0" sizes="100vw" placeholder="blur" blurDataURL={`${img}`} />

            {/* button */}
            {session && (
                <div className="flex items-center space-x-4 justify-between p-4">
                    <div className="flex items-center space-x-4">
                        <HeartIcon onClick={handleLikePost} className={`postBtn transition-colors ${hasLiked ? "fill-red-500 text-red-500" : "fill-transparent"}`} />
                        <ChatBubbleLeftEllipsisIcon className="postBtn" />
                        <PaperAirplaneIcon className="postBtn" />
                    </div>
                    <BookmarkIcon className="postBtn" />
                </div>
            )}

            {/* caption */}
            <div className="p-5 ">
                {dataLike.length > 0 && <p className="font-bold mb-1">{dataLike.length} Likes</p>}
                {caption && (
                    <p className="truncate">
                        <span className="font-bold mr-1">{username}</span> {caption}
                    </p>
                )}
            </div>

            {/* comments */}
            {dataComments.length > 0 && (
                <div className="ml-10 min-h-fit max-h-20 overflow-y-auto scrollbar-thumb-black scrollbar-thin">
                    {dataComments.map((comment) => (
                        <div key={comment.id} className="flex items-center gap-x-2 mb-3">
                            <Image className="w-7 h-7 rounded-full object-cover" src={comment.data().userImage} alt={`${comment.data().username}'s profile picture`} width={28} height={28} />
                            <p className="flex items-center gap-x-2 flex-1 text-sm">
                                <span className="font-bold">{comment.data().username}</span>
                                {comment.data().comment}
                            </p>
                            <Moment fromNow className="pr-5 text-xs">
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}

            {/* input box */}
            {session && (
                <form action="" className="flex items-center p-4">
                    <FaceSmileIcon className="h-7" />
                    <input type="text" className="border-none flex-1 focus:ring-0 outline-none" placeholder="Add a comment..." value={commentValue} onChange={(e) => setCommentValue(e.target.value)} />
                    <button className="font-semibold text-blue-400" onClick={handleSendComment}>
                        Post
                    </button>
                </form>
            )}
        </div>
    );
};

export default Post;
