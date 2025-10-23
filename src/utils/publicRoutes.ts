export const publicRoutes = [
  /^\/eligibility-check$/,
  /^\/auth\/login$/,
  /^\/auth\/register$/,
  /^\/privacy$/,
  /^\/terms$/,
  /^\/api\/auth\/.*/, // add /eligibility-check if needed
];

export const isPublicRoute = (path: string) => {
  return publicRoutes.some((pattern) => pattern.test(path));
};
