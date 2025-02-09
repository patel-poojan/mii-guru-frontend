import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface DynamicButtonProps {
  icon?: React.ComponentType<{ className?: string }>;
  label?: string;
  isWhiteButton?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  tooltip?: string;
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  // icon: IconComponent,
  // label,
  isWhiteButton = false,
  className = "",
  onClick,
  disabled = false,
  children,
  buttonProps = {},
  // tooltip,
}) => {
  return (
    <Button
      className={`${isWhiteButton ? "common_white_button" : ""} ${className} dynamic_button_class`}
      onClick={onClick}
      disabled={disabled}
      {...buttonProps}
    >
      {children && <>{children}</>}
    </Button>
  );
};

export default DynamicButton;
