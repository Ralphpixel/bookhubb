// export async function fetchGoogleBooks(query: string) {
//   const res = await fetch(
//     `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`
//   );

//   const data = await res.json();

//   if (!data.items) return [];

//   return data.items.map((item: any) => {
//     const info = item.volumeInfo;

//     return {
//       title: info.title ?? "Untitled",
//       authors: info.auth
