// "use client";

// import { motion, AnimatePresence } from "framer-motion";

// type Props = {
//   open: boolean;
//   onClose: () => void;
// };

// export default function ReviewModal({ open, onClose }: Props) {
//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             className="fixed inset-0 bg-black/40 z-40"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           />

//           {/* Modal */}
//           <motion.div
//             className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md
//               -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900
//               rounded-xl p-6 shadow-xl"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//           >
//             <h2 className="text-xl font-semibold mb-4">
//               Write a Review
//             </h2>

//             <textarea
//               className="w-full border rounded-lg p-2 mb-4 dark:bg-gray-800"
//               placeholder="Your thoughts..."
//             />

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={onClose}
//                 className="px-4 py-2 rounded-lg border"
//               >
//                 Cancel
//               </button>

//               <button
//                 className="px-4 py-2 rounded-lg bg-blue-600 text-white"
//               >
//                 Submit
//               </button>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }