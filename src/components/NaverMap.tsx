"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

// NAVER Maps JavaScript API v3. It only renders with a NAVER Cloud Platform key whose
// "Web service URL" list includes this site's domain; the key is public by design.
// Until a key is configured the existing Google embed is shown so the page never shows an empty map.
const keyId = process.env.NEXT_PUBLIC_NAVER_MAP_KEY_ID;
// Optional verified "lat,lng" for the marker. Without it the road address is geocoded at runtime
// (the key needs the Geocoding option for that).
const fixedPosition = process.env.NEXT_PUBLIC_TH212_LATLNG;

const placeName = site.mapSearchKo;
const naverSearchUrl = `https://map.naver.com/p/search/${encodeURIComponent(placeName)}`;
const googleEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&z=16&output=embed`;

type LatLng = unknown;
type NaverMaps = {
  LatLng: new (lat: number, lng: number) => LatLng;
  Map: new (el: HTMLElement, options: { center: LatLng; zoom: number }) => unknown;
  Marker: new (options: { position: LatLng; map: unknown; title: string }) => unknown;
  InfoWindow: new (options: { content: string; borderWidth: number; disableAnchor?: boolean; pixelOffset?: unknown }) => {
    open: (map: unknown, anchor: unknown) => void;
  };
  Service?: {
    Status: { OK: string };
    geocode: (
      options: { query: string },
      callback: (status: string, response: { v2: { addresses: { x: string; y: string; roadAddress: string }[] } }) => void,
    ) => void;
  };
};
type NaverWindow = Window & { naver?: { maps: NaverMaps }; navermap_authFailure?: () => void };

let scriptPromise: Promise<NaverMaps> | null = null;

function loadNaverMaps(id: string) {
  scriptPromise ??= new Promise<NaverMaps>((resolve, reject) => {
    const w = window as NaverWindow;
    // Called by the API when the key or the registered domain is rejected.
    w.navermap_authFailure = () => reject(new Error("NAVER Maps authentication failed"));
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(id)}&submodules=geocoder`;
    script.async = true;
    script.onload = () => (w.naver?.maps ? resolve(w.naver.maps) : reject(new Error("NAVER Maps did not load")));
    script.onerror = () => reject(new Error("NAVER Maps script failed to load"));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

function parseLatLng(value: string | undefined) {
  const [lat, lng] = (value ?? "").split(",").map(Number);
  return Number.isFinite(lat) && Number.isFinite(lng) && value ? { lat, lng } : null;
}

// Only accept a geocoding result for the building's own road address.
function geocodeAddress(maps: NaverMaps) {
  return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
    if (!maps.Service) return reject(new Error("Geocoder submodule unavailable"));
    maps.Service.geocode({ query: site.mapAddressKo }, (status, response) => {
      const match = response?.v2?.addresses?.find((a) => a.roadAddress.replace(/\s+/g, "").includes("판교대장로2길25"));
      if (status !== maps.Service!.Status.OK || !match) return reject(new Error("Address not found"));
      resolve({ lat: Number(match.y), lng: Number(match.x) });
    });
  });
}

export default function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"naver" | "loading" | "fallback">(keyId ? "loading" : "fallback");

  useEffect(() => {
    if (!keyId || !mapRef.current) return;
    let cancelled = false;
    const el = mapRef.current;

    (async () => {
      try {
        const maps = await loadNaverMaps(keyId);
        const point = parseLatLng(fixedPosition) ?? (await geocodeAddress(maps));
        if (cancelled) return;
        const position = new maps.LatLng(point.lat, point.lng);
        const map = new maps.Map(el, { center: position, zoom: 17 });
        const marker = new maps.Marker({ position, map, title: placeName });
        new maps.InfoWindow({
          content: `<div style="padding:6px 10px;font:600 13px/1.3 sans-serif;color:#1f1e1c">${placeName}</div>`,
          borderWidth: 1,
        }).open(map, marker);
        setMode("naver");
      } catch (error) {
        console.error("Falling back to the Google map.", error);
        if (!cancelled) setMode("fallback");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (mode === "fallback") {
    return (
      <iframe
        title="Map of Pangyo Global Campus (TH212)"
        src={googleEmbedUrl}
        className="absolute inset-0 size-full grayscale-[35%]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <>
      <div ref={mapRef} className="absolute inset-0 size-full" role="region" aria-label="NAVER map of Pangyo Global Campus (TH212)" />
      {mode === "naver" && (
        <a
          href={naverSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-3 top-3 z-10 bg-white px-3 py-2 text-[13px] text-charcoal shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-ivory"
        >
          Naver Map에서 보기 ↗
        </a>
      )}
    </>
  );
}
