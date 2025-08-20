import { cn } from "@/lib/utils";

const Logo = ({ className, ...props }: React.HTMLAttributes<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 100"
      className={cn("text-primary", className)}
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
          <stop offset="100%" stopColor="hsl(262, 82%, 56%)" />
        </linearGradient>
      </defs>
      <g fill="url(#logoGradient)">
        {/* D2 Shape */}
        <path d="M68.4,0H20.2C9.1,0,0,9.1,0,20.2v28.2L14.2,62.6V20.2C14.2,16.2,16.9,14,20.2,14H68.4c3.3,0,6,2.2,6,6v10.1l14.2-14.2V20.2C88.6,9.1,79.5,0,68.4,0z" />
        <path d="M102.8,14.1l-14.2,14.2h31.7c3.3,0,6,2.2,6,6v33.9c0,11.1-9.1,20.2-20.2,20.2H20.2C9.1,88.4,0,79.3,0,68.2V52.5l14.2-14.2v30c0,4,2.7,6.2,6,6.2h79.5c3.3,0,6-2.2,6-6.2V20.1c0-3.3-2.7-6-6-6H88.6" />
        {/* D2ools Text */}
        <text
          x="50%"
          y="85"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="24"
          fontWeight="bold"
          textAnchor="middle"
          fill="url(#logoGradient)"
        >
          D2ools
        </text>
      </g>
    </svg>
  );
};

export default Logo;
