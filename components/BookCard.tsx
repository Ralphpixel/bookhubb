// import Image from "next/image";
// import StarRating from "./StarRating";

// export default function BookCard({ book }: any) {
//   return (
//     <div className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition">
//       {/* IMAGE WRAPPER */}
//       <div className="relative w-full h-[260px] mb-3">
//         <Image
//           src={book.image}
//           alt={book.title}
//           fill
//           className="object-cover rounded-lg"
//         />
//       </div>

//       <h3 className="font-semibold leading-tight">{book.title}</h3>
//       <p className="text-sm text-gray-600 mb-1">{book.author}</p>

//       <StarRating rating={book.rating} />

//       <button className="mt-3 w-full rounded-md border py-1.5 text-sm hover:bg-gray-50">
//         ❤️ Save
//       </button>
//     </div>
//   );
// }