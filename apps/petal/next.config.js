// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const basePath =
  process.NODE_ENV === 'production' ? '' : process.env.NX_NEXT_PUBLIC_BASE_PATH;
/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  reactStrictMode: true,
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    path: `${basePath}/_next/image`,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  publicRuntimeConfig: {
    degaAPIKey: process.env.NX_NEXT_PUBLIC_DEGA_API_KEY,
    spaceId: process.env.NX_NEXT_PUBLIC_SPACE_ID,
    apiUrl: process.env.NX_NEXT_PUBLIC_API_URL,
    kratosURL: process.env.NX_NEXT_PUBLIC_KRATOS_URL,
    kavachProfileURL: process.env.NX_NEXT_PUBLIC_KAVACH_PROFILE_URL,
    siteURL: process.env.NX_NEXT_PUBLIC_SITE_URL,
    basePath: process.env.NX_NEXT_PUBLIC_BASE_PATH,
  },
  serverRuntimeConfig: {},
};

module.exports = withNx(nextConfig);
