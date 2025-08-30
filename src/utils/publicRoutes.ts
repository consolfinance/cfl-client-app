export const publicRoutes = [
  /^\/auth\/login$/,
  /^\/auth\/register$/,
  /^\/privacy$/,
  /^\/terms$/,
  /^\/api\/auth\/.*/,
];

export const isPublicRoute = (path: string) => {
  return publicRoutes.some((pattern) => pattern.test(path));
};
