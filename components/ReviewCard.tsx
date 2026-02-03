// "use client";

// import Image from "next/image";
// import { doc, deleteDoc, updateDoc, increment } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { FaTrash, FaThumbsUp } from "react-icons/fa";

// interface ReviewCardProps {
//   review: {
//     id: string;
//     bookTitle: string;
//     content?: string;
//     userId?: string;
//     username?: string;
//     userPhotoURL?: string;
//     likes?: number;
//   };
//   currentUser: any;
// }

// export default function ReviewCard({ review, currentUser }: ReviewCardProps) {
//   const isOwner = currentUser?.uid === review.userId;

//   const handleDelete = async () => {
//     await deleteDoc(doc(db, "reviews", review.id));
//   };

//   const handleLike = async () => {
//     await updateDoc(doc(db, "reviews", review.id), {
//       likes: increment(1),
//     });
//   };

//   return (
//     <div className="border rounded-xl p-5 shadow-sm bg-white">
//       <h3 className="text-xl font-semibold mb-3">{review.bookTitle}</h3>

//       <div className="flex items-center gap-3 mb-3">
//         <Image
//           src={review.userPhotoURL || "/avatar.png"}
//           alt="User"
//           width={40}
//           height={40}
//           className="rounded-full"
//         />
//         <div className="flex-1">
//           <p className="font-medium">
//             {review.username || "Anonymous"}
//           </p>
//           <p className="text-sm text-gray-500">Community member</p>
//         </div>

//         {isOwner && (
//           <button onClick={handleDelete} className="text-red-500">
//             <FaTrash />
//           </button>
//         )}
//       </div>

//       <p className="mb-4 text-gray-700">{review.content}</p>

//       <button
//         onClick={handleLike}
//         className="flex items-center gap-2 text-gray-600"
//       >
//         <FaThumbsUp />
//         {review.likes ?? 0}
//       </button>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import { BiTrashAlt } from "react-icons/bi";


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
      
<LikeButton
  reviewId={review.id}
  reviewOwnerId={review.userId}
/>

<Comments
  reviewId={review.id}
  reviewOwnerId={review.userId}
/>
    </div>
  );
}
