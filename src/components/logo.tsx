
import { cn } from "@/lib/utils";

const Logo = ({ className, ...props }: React.HTMLAttributes<SVGElement>) => {
  return (
    <svg
      width="120"
      height="40"
      viewBox="0 0 120 40"
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
      <text 
        x="78" 
        y="20" 
        dominantBaseline="central" 
        textAnchor="middle" 
        fontSize="24" 
        fontWeight="bold" 
        fontFamily="Inter, sans-serif"
        className="fill-foreground"
      >
        D2ools
      </text>
    </svg>
  );
};

export default Logo;
