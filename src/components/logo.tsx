
import Image from 'next/image';
import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
    isFooter?: boolean;
}

const Logo = ({ className, isFooter = false, ...props }: LogoProps) => {
  return (
    <div className={cn("relative flex items-center h-10", className)} {...props}>
      <Image
        src="/logo.png"
        alt="D2ools Logo"
        width={150}
        height={150}
        className={cn(
          "h-full w-auto object-contain transition-all",
          isFooter && "brightness-0 invert"
        )}
        priority
      />
    </div>
  );
};

export default Logo;
