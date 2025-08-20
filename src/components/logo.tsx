import { cn } from "@/lib/utils";

const Logo = ({ className, ...props }: React.HTMLAttributes<SVGElement>) => {
  return (
    <svg
      width="200"
      height="80"
      viewBox="0 0 200 80"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#00C6FF', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0072FF', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="38" fill="url(#grad1)" />
      <text
        x="25"
        y="55"
        fontSize="38"
        fontWeight="bold"
        fontFamily="Poppins, sans-serif"
        fill="white"
      >
        D
      </text>
      <text
        x="65"
        y="55"
        fontSize="38"
        fontWeight="bold"
        fontFamily="Poppins, sans-serif"
        fill="white"
      >
        2
      </text>
    </svg>
  );
};

export default Logo;
