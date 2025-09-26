
import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<SVGElement> {
    isFooter?: boolean;
}

const Logo = ({ className, isFooter = false, ...props }: LogoProps) => {
  return (
    <svg
      width="130"
      height="40"
      viewBox="0 0 130 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
      <g>
        <rect width="40" height="40" rx="12" fill="url(#grad1)"/>
        <text
          x="20"
          y="20"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="20"
          fontWeight="bold"
          fontFamily="Poppins, sans-serif"
          fill="white"
          dy=".05em"
        >
          D2
        </text>
      </g>
      <g transform="translate(45, 0)">
        <text
          x="42"
          y="20"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          fontFamily="Inter, sans-serif"
          className={cn("fill-foreground", { "dark:fill-slate-200": !isFooter, "fill-white": isFooter })}
        >
          D2ools
        </text>
      </g>
    </svg>
  );
};

export default Logo;
