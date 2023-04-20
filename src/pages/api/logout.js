export default function handler(req, res) {
  const cookie = req.headers.cookie;
  console.log("We received this cookie", cookie);
  res.status(200).json({ name: "John Doe", message: "Logged Out!!" });
}
