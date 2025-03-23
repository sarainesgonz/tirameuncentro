// specify routes to protect in routes.ts

import { NextRequest, NextResponse } from "next/server";
// import { auth } from "./auth";
import { authRoutes, publicRoutes } from "./routes";


export default function middleware(request : NextRequest) {
    // intercepta user requests and check if they are allowed to access the route

    const { pathname } = new URL(request.url);
    const token = request.cookies.get("authjs.session-token");     // check if user is logged in or not
    const isLoggedIn = !!token; // !! converts to boolean

    const isPublic = publicRoutes.includes(pathname); //check si la ruta solicitada esta entre las publicas
    const isAuthRoute = authRoutes.includes(pathname);

    // if route is public, no need to check anything else
    if (isPublic) {
        return NextResponse.next();
    }

    // if user is logged in and tries to access login or register routes, redirect to users
    if (isAuthRoute ) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/users", request.url));
        }
        return NextResponse.next();
    }

    // if user is not logged in and tries to access a private route, redirect to login
    if (!isPublic && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    
    return NextResponse.next();
}


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}