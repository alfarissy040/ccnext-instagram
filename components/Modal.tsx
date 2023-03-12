import { modalState } from "@/atoms/modalAtoms";
import { db, storage } from "@/firebase";
import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { SessionContextValue, useSession } from "next-auth/react";
import Image from "next/image";
import { FormEvent, Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";

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

const Modal = () => {
    const [open, setOpen] = useRecoilState(modalState);
    const { data: session } = useSession();

    const [selectedFile, setSelectedFile] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const filePickerRef = useRef<HTMLInputElement>(null);
    const captionRef = useRef<HTMLInputElement>(null);

    const addImageToPost = (e: FormEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (e.currentTarget.files) {
            reader.readAsDataURL(e.currentTarget.files[0]);
        }

        reader.onload = (readerEvent: any) => {
            setSelectedFile(readerEvent.target.result);
        };
    };
    const uploadPost = async () => {
        if (loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db, "posts"), {
            username: session?.user?.username,
            caption: captionRef.current?.value,
            profileImg: session?.user?.image,
            timestamp: serverTimestamp(),
        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        await uploadString(imageRef, selectedFile, "data_url").then(async (snapshot) => {
            const downloadUrl = await getDownloadURL(imageRef);
            await updateDoc(doc(db, "posts", docRef.id), {
                image: downloadUrl,
            });
        });

        setOpen(false);
        setLoading(false);
        setSelectedFile("");
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as={"div"} onClose={setOpen} className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-[800px] sm:min-h-screen px-4 pb-20 text-center sm:lock sm:p-0">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity"></Dialog.Overlay>
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden={true}>
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0sm:scale-100"
                        leave="ease-out duration-300"
                        leaveFrom="opacity-100 translate-y-0sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block alignbittim bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadwon-xl transform transition-all sm:my-0 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div>
                                {selectedFile ? (
                                    <Image src={selectedFile} alt="" onClick={() => setSelectedFile("")} className="w-full object-contain cursor-pointer" width="0" height="0" sizes="100vw" placeholder="blur" blurDataURL={selectedFile} />
                                ) : (
                                    <div className="flex items-center justify-center mx-auto w-12 h-12 rounded-full bg-red-100 cursor-pointer" onClick={() => filePickerRef.current?.click()}>
                                        <CameraIcon className="w-6 h-5 text-red-600" aria-hidden={true} />
                                    </div>
                                )}
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-zinc-900">
                                        Upload a photo
                                    </Dialog.Title>
                                </div>
                                <div>
                                    <input type="file" hidden ref={filePickerRef} onChange={addImageToPost} />
                                </div>
                                <div className="mt-2">
                                    <input type="text" ref={captionRef} className="border-none focus:ring-0 w-full text-center" placeholder="Please enter a caption..." />
                                </div>
                                <div className="mt-5 sm:mt-0">
                                    <button
                                        type="button"
                                        disabled={!selectedFile}
                                        onClick={uploadPost}
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadown-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-zinc-300 disabled:cursor-not-allowed hover:disabled:bg-zinc-300"
                                    >
                                        {loading ? "Uploading..." : "Upload Post"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Modal;
