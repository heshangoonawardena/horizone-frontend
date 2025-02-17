export const getHotels = async () => {
  const res = await fetch("http://localhost:3000/api/hotels", {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  return data;
}