import { db } from "@/firebase";
import { collection, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Post from "./Post";

const Posts = () => {
    const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), (snapshot) => {
            setPosts(snapshot.docs);
        });

        return unsubscribe;
    }, [db]);
    return (
        <div>
            {posts.map((post) => (
                <Post key={post.id} id={post.id} username={post.data().username} userImg={post.data().profileImg} img={post.data().image} caption={post.data().caption} />
            ))}
        </div>
    );
};

export default Posts;
