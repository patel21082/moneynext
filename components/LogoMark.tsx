export default function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" fill="#0B1220" />
      <rect x="15" y="36" width="9" height="15" rx="3" fill="#7C8CE8" />
      <rect x="28" y="28" width="9" height="23" rx="3" fill="#7C8CE8" />
      <rect x="41" y="20" width="9" height="31" rx="3" fill="#FBFBF9" />
    </svg>
  );
}
