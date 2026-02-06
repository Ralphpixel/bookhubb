"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { createNotification } from "../lib/notifications";


export default function Comments({
  reviewId,
  reviewOwnerId,
}: {
  reviewId: string;
  reviewOwnerId: string;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "reviews", reviewId, "comments"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, snap => {
      setComments(
        snap.docs.map(d => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });

    return () => unsub();
  }, [reviewId]);

  const submit = async () => {
    if (!userId || !text) return;

    await addDoc(collection(db, "reviews", reviewId, "comments"), {
      userId,
      username: session?.user?.name || "Anonymous",
      photoURL: session?.user?.image || null,
      content: text,
      createdAt: serverTimestamp(),
    });

    await createNotification({
      userId: reviewOwnerId,
      fromUserId: userId,
      fromUsername: session?.user?.name || "Someone",
      type: "comment",
      reviewId,
    });

    setText("");
  };

  const saveEdit = async (commentId: string) => {
    await updateDoc(
      doc(db, "reviews", reviewId, "comments", commentId),
      { content: editingText }
    );
    setEditingId(null);
  };

  const remove = async (commentId: string) => {
    await deleteDoc(
      doc(db, "reviews", reviewId, "comments", commentId)
    );
  };

  return (
    <div className="mt-4 space-y-2">
      {comments.map(c => (
        <div key={c.id} className="text-sm bg-gray-100 p-2 rounded">
          <strong>{c.username}</strong>

          {editingId === c.id ? (
            <>
              <input
                value={editingText}
                onChange={e => setEditingText(e.target.value)}
                className="w-full border rounded px-2 mt-1"
              />
              <button
                onClick={() => saveEdit(c.id)}
                className="text-xs text-blue-600 mt-1"
              >
                Save
              </button>
            </>
          ) : (
            <p>{c.content}</p>
          )}

          {userId === c.userId && (
            <div className="flex gap-2 mt-1 text-xs">
              <button
                onClick={() => {
                  setEditingId(c.id);
                  setEditingText(c.content);
                }}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => remove(c.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      {session && (
        <div className="flex gap-2 mt-3">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            className="flex-1 border rounded px-2"
            placeholder="Write a comment..."
          />
          <button
            onClick={submit}
            className="bg-indigo-600 text-white px-3 rounded"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}