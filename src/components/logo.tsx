import { cn } from "@/lib/utils";

const Logo = ({ className, ...props }: React.HTMLAttributes<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-primary", className)}
      {...props}
    >
      <path d="M12.22 2h-4.22a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.38" />
      <path d="M16 2l4 4-10 10H6v-4l10-10z" />
    </svg>
  );
};

export default Logo;
