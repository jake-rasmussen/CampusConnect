import { authMiddleware, clerkClient, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  afterAuth(auth, req) {
    const url = new URL(req.url);

    if (url.pathname === "/" || url.pathname === "/api/webhook") return;

    const metadata = auth.sessionClaims?.publicMetadata as {
      adminProjectIds: string;
      evaluatorProjectIds: string;
    };

    if (metadata) {
      const evaluatorProjectIds: string[] = JSON.parse(
        metadata.evaluatorProjectIds,
      );
      const adminProjectIds: string[] = JSON.parse(metadata.adminProjectIds);

      if (!auth.userId && !auth.isPublicRoute) {
        return redirectToSignIn({ returnBackUrl: req.url });
      } else if (url.pathname.includes("/admin/")) {
        const { pathname } = url;

        const parts = pathname.split("/");

        const adminIndex = parts.indexOf("admin");
        if (adminIndex !== -1 && adminIndex < parts.length - 1) {
          const projectId = parts[adminIndex + 1];
          if (projectId && !adminProjectIds.includes(projectId)) {
            return redirectToSignIn({ returnBackUrl: req.url });
          }
        }
      } else if (url.pathname.includes("evaluator/")) {
        const { pathname } = url;

        const parts = pathname.split("/");

        const evaluatorIndex = parts.indexOf("evaluator");
        if (evaluatorIndex !== -1 && evaluatorIndex < parts.length - 1) {
          const projectId = parts[evaluatorIndex + 1];
          if (
            projectId &&
            !evaluatorProjectIds.includes(projectId) &&
            !adminProjectIds.includes(projectId)
          ) {
            return redirectToSignIn({ returnBackUrl: req.url });
          }
        }
      }
    } else {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
  publicRoutes: ["/", "/api/webhook(.*)"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
