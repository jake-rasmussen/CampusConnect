import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { UserType } from "@prisma/client";

export default authMiddleware({
  afterAuth(auth, req) {
    const url = new URL(req.url);

    // Allow public routes
    if (url.pathname === "/" || url.pathname.startsWith("/api/")) return;

    // Redirect unauthenticated users to sign-in
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Extract user metadata
    const metadata = auth.sessionClaims?.publicMetadata as {
      adminProjectIds?: string;
      evaluatorProjectIds?: string;
      userType: UserType;
    };

    if (metadata) {
      if (
        url.pathname === "/get-started" &&
        metadata.userType &&
        metadata.userType !== UserType.INCOMPLETE
      ) {
        if (metadata.userType === UserType.EMPLOYEE) {
          return Response.redirect(new URL("/startups", req.url));
        } else {
          return Response.redirect(new URL("/my-startups", req.url));
        }
      }

      // Redirect users with INCOMPLETE user type to /get-started
      if (
        metadata.userType === UserType.INCOMPLETE &&
        url.pathname !== "/get-started"
      ) {
        return Response.redirect(new URL("/get-started", req.url));
      }

      // Parse project IDs from metadata
      const evaluatorProjectIds: string[] = metadata?.evaluatorProjectIds
        ? JSON.parse(metadata.evaluatorProjectIds)
        : [];
      const adminProjectIds: string[] = metadata?.adminProjectIds
        ? JSON.parse(metadata.adminProjectIds)
        : [];

      // Admin routes validation
      if (url.pathname.startsWith("/admin/")) {
        const projectId = extractProjectId(url.pathname, "admin");
        if (projectId && !adminProjectIds.includes(projectId)) {
          if (!auth.userId) {
            return redirectToSignIn({ returnBackUrl: req.url });
          } else {
            return Response.redirect(new URL("/", req.url));
          }
        }
      }

      // Evaluator routes validation
      if (url.pathname.startsWith("/evaluator/")) {
        const projectId = extractProjectId(url.pathname, "evaluator");
        if (
          projectId &&
          !evaluatorProjectIds.includes(projectId) &&
          !adminProjectIds.includes(projectId)
        ) {
          if (!auth.userId) {
            return redirectToSignIn({ returnBackUrl: req.url });
          } else {
            return Response.redirect(new URL("/", req.url));
          }
        }
      }

      if (url.pathname.startsWith("/school-admin/")) {
        if (metadata.userType !== "SCHOOL_ADMIN") {
          if (!auth.userId) {
            return redirectToSignIn({ returnBackUrl: req.url });
          } else {
            return Response.redirect(new URL("/", req.url));
          }
        }
      }
    }
  },
  publicRoutes: ["/", "/api/webhook(.*)"],
});

// Utility function to extract project ID
function extractProjectId(
  pathname: string,
  keyword: string,
): string | undefined {
  const parts = pathname.split("/");
  const index = parts.indexOf(keyword);
  if (index !== -1 && index < parts.length - 1) {
    return parts[index + 1];
  }
}

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Matches all routes except static files and _next
    "/", // Matches the root route
    "/api/trpc(.*)", // Matches all tRPC API routes
  ],
};