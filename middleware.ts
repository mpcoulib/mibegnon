import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - ... files in the `public` folder
    // - ... internal Next.js paths (_next/static, _next/image, favicon.ico)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
