interface LogoProps {
  className?: string;
  altLogo?: boolean;
}

export function Logo({ className, altLogo = false }: LogoProps) {
  return (
    <img
      src={altLogo ? "/logo-alt.svg" : "/logo.svg"}
      alt={altLogo ? "Hawkins Insurance Group Alt Logo" : "Hawkins Insurance Group Logo"}
      className={`h-14 w-auto ${className || ''}`}
    />
  );
}