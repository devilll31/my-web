import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
    isFooter?: boolean;
}

const Logo = ({ className, isFooter = false, ...props }: LogoProps) => {
  return (
    <div className={cn("relative flex items-center h-12", className)} {...props}>
      <svg 
        viewBox="0 0 500 350" 
        className={cn(
            "h-full w-auto",
            isFooter && "brightness-0 invert"
        )}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00c6ff"/>
            <stop offset="100%" stopColor="#8e2de2"/>
          </linearGradient>

          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00c6ff"/>
            <stop offset="100%" stopColor="#8e2de2"/>
          </linearGradient>
        </defs>

        {/* D2 Symbol */}
        <path 
            d="M50 50 L180 50 Q230 50 230 120 L230 180 Q230 250 180 250 L50 250 Z"
            fill="url(#mainGradient)"
        />

        <path 
            d="M270 50 L420 50 Q460 50 460 100 Q460 150 420 150 Q460 150 460 200 Q460 250 420 250 L270 250 L320 200 L400 200 Q420 200 420 175 Q420 150 400 150 L320 150 L400 150 Q420 150 420 125 Q420 100 400 100 L270 100 Z"
            fill="url(#mainGradient)"
        />

        {/* Text */}
        <text 
            x="50" 
            y="320" 
            className="font-sans font-bold" 
            style={{ fontSize: '60px', fill: 'url(#textGradient)' }}
        >
            D2ools
        </text>
      </svg>
    </div>
  );
};

export default Logo;
