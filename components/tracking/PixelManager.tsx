"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { useTracking } from "./TrackingProvider";

interface PixelManagerProps {
  defaultMetaPixelId?: string;
  defaultGoogleAdsId?: string;
  gtmId?: string;
}

export function PixelManager({
  defaultMetaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID,
  defaultGoogleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
  gtmId = process.env.NEXT_PUBLIC_GTM_ID,
}: PixelManagerProps) {
  const { consent, activeProduct } = useTracking();
  const metaInitializedRef = useRef(false);
  const googleInitializedRef = useRef(false);

  // Active product pixel ID override or fallback to default
  const activeMetaPixelId = activeProduct?.trackingConfig?.metaPixelId || defaultMetaPixelId;
  const activeGoogleAdsId =
    activeProduct?.trackingConfig?.googleAdsConversionId || defaultGoogleAdsId;

  // Initialize Meta Pixel strictly upon marketing consent
  useEffect(() => {
    if (!consent?.marketing || !activeMetaPixelId || metaInitializedRef.current) {
      return;
    }

    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */

    if (window.fbq) {
      window.fbq("init", activeMetaPixelId);
      window.fbq("track", "PageView");
      metaInitializedRef.current = true;
    }
  }, [consent?.marketing, activeMetaPixelId]);

  // Initialize Google Analytics / Google Ads strictly upon analytics/marketing consent
  useEffect(() => {
    if (
      (!consent?.marketing && !consent?.analytics) ||
      !activeGoogleAdsId ||
      googleInitializedRef.current
    ) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    }
    (window as unknown as { gtag: typeof gtag }).gtag = gtag;
    gtag("js", new Date());
    gtag("config", activeGoogleAdsId, {
      anonymize_ip: true,
    });

    googleInitializedRef.current = true;
  }, [consent?.analytics, consent?.marketing, activeGoogleAdsId]);

  // If user has not consented to marketing, return null (scripts not injected)
  if (!consent?.marketing && !consent?.analytics) {
    return null;
  }

  return (
    <>
      {/* Optional Google Tag Manager (only loaded if consent given and GTM ID configured) */}
      {consent?.marketing && gtmId && (
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />
      )}

      {/* Google Ads / GA script loaded asynchronously */}
      {(consent?.marketing || consent?.analytics) && activeGoogleAdsId && (
        <Script
          id="google-gtag-src"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${activeGoogleAdsId}`}
        />
      )}
    </>
  );
}
