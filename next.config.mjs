/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers applied to all routes
  async headers() {
    const securityHeaders = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          // unsafe-eval is only needed by Next.js dev tooling; omit in production
          process.env.NODE_ENV !== "production"
            ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
            : "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob:",
          "font-src 'self'",
          "connect-src 'self'",
          "object-src 'none'",
          "base-uri 'self'",
          "frame-ancestors 'none'",
        ].join("; "),
      },
    ];

    // HSTS must only be sent over HTTPS; omit in dev/preview to avoid caching an
    // HTTPS-only policy that would break non-TLS access.
    if (process.env.NODE_ENV === "production") {
      securityHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      });
    }

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },

  // Compress output
  compress: true,

  // PoweredByHeader: false to avoid revealing Next.js version
  poweredByHeader: false,
}

export default nextConfig;
