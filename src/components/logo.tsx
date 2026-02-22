
import Image from 'next/image';
import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
    isFooter?: boolean;
}

const Logo = ({ className, isFooter = false, ...props }: LogoProps) => {
  return (
    <div className={cn("relative flex items-center h-12", className)} {...props}>
      <Image
        src="/logo.png"
        alt="D2ools Logo"
        width={200}
        height={60}
        className={cn(
          "h-full w-auto object-contain transition-all duration-300",
          isFooter && "brightness-0 invert"
        )}
        priority
      />
    </div>
  );
};

export default Logo;
