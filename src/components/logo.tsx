import { cn } from "@/lib/utils";

const Logo = ({ className, ...props }: React.HTMLAttributes<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 250 100"
      className={cn("text-primary", className)}
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0" stopColor="hsl(217, 91%, 60%)" />
          <stop offset="1" stopColor="hsl(262, 82%, 56%)" />
        </linearGradient>
      </defs>
      <g fill="url(#logoGradient)">
        <path d="M63.63,0 L20.3,0 C12.2,0 8.13,4.07 8.13,12.16 L8.13,87.84 C8.13,95.93 12.2,100 20.3,100 L63.63,100 L63.63,87.67 L21.03,87.67 C18.57,87.67 17.2,86.3 17.2,83.84 L17.2,16.16 C17.2,13.7 18.57,12.33 21.03,12.33 L63.63,12.33 L63.63,0 Z" />
        <path d="M129.2,0 L129.2,12.33 L85,12.33 L85,38 L122.5,38 L122.5,50.33 L85,50.33 L85,87.67 L129.2,87.67 L129.2,100 L72.67,100 L72.67,0 L129.2,0 Z" />
        <path d="M192.5,0 L192.5,100 L139.3,100 L139.3,87.67 L180.17,87.67 L180.17,55.8 L146.5,12.33 L185.5,12.33 L192.5,20.5 L199.5,12.33 L238.5,12.33 L204.8,55.8 L204.8,87.67 L245.6,87.67 L245.6,100 L192.5,100 L192.5,0 Z" />
      </g>
    </svg>
  );
};

export default Logo;
