import { NextRequest } from "next/server";

export default function handler(req, res) {
  // const { user } = req.headers.cookies
  // if (user) return;
  // res
  //   .status(200)
  //   .json({ name: "John Doe", message: "Already logged In!!", user });

  // if (!user)
  // res.cookies.set("user", "643d9048adff9ee815ca93db");

  // res.cookies.set({
  //   name: 'user',
  //   value: '643d9048adff9ee815ca93db',
  //   path: '/login',
  // });
  // console.log(res.cookies.get("user"));
  const cookie = req.headers.cookie;
  console.log("We received this cookie", cookie);
  // console.log(res.headers);
  // const test = res;
  res.status(200).json({
    name: "John Doe",
    message: "Logged In!!",
  });
}
