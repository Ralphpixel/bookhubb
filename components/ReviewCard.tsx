"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { deleteDoc, doc } from "firebase/firestore";
import Comments from "./Comments";
import { BiTrashAlt } from "react-icons/bi";
import { db } from "../lib/firebase";


type Review = {
  id: string;
  bookTitle: string;
  content: string;
  userId: string;
  username: string;
  userPhotoURL?: string | null;
};

export default function ReviewCard({ review }: { review: Review }) {
  const { data: session } = useSession();

  const isOwner = session?.user?.email === review.userId;

  const handleDelete = async () => {
    if (!confirm("Delete this review?")) return;
    await deleteDoc(doc(db, "reviews", review.id));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow relative">
      <div className="flex items-center gap-3 mb-2">
        <Image
          src={review.userPhotoURL || "/avatar.png"}
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="font-semibold">{review.username || "Anonymous"}</p>
          <p className="text-sm text-gray-500">{review.bookTitle}</p>
        </div>
      </div>

      <p className="mt-3">{review.content}</p>

      {isOwner && (
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 text-red-500"
        >
          <BiTrashAlt />

        </button>
      )}
      
<Comments
  reviewId={review.id}
  reviewOwnerId={review.userId}
/>
    </div>
  );
}
