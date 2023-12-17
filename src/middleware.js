import { NextResponse } from "next/server";
import Cookies from "cookies";

export function middleware(req, ev) {
  // const cookies = new Cookies(req, NextResponse);
  // console.log(cookies.get("userToken"));
  // if (req.url == "/login/") {
  //   if (req.cookies.userToken && req.cookies.userToken !== "undefined") {
  //     return NextResponse.redirect("/dashboard/analytic");
  //   }
  // } else if (req.url !== "/favicon.ico") {
  //   if (!req.cookies.userToken || req.cookies.userToken == "undefined") {
  //     return NextResponse.redirect("/login");
  //   }
  // }
}
