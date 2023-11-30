import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req, evt) {
    const url = new URL(req.url);

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    } else if (url.pathname.includes("/admin/")) {
      const { pathname } = url;

      const publicMetadata = auth.sessionClaims?.publicMetadata as {
        adminProjectIds: string;
        evaluatorProjectIds: string;
      };

      const evaluatorProjectIds: string[] = JSON.parse(
        publicMetadata.evaluatorProjectIds,
      );
      const adminProjectIds: string[] = JSON.parse(
        publicMetadata.adminProjectIds,
      );

      const parts = pathname.split("/");

      const adminIndex = parts.indexOf("admin");
      if (adminIndex !== -1 && adminIndex < parts.length - 1) {
        const projectId = parts[adminIndex + 1];
        if (projectId && !adminProjectIds.includes(projectId)) {
          return redirectToSignIn({ returnBackUrl: req.url });
        }
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
