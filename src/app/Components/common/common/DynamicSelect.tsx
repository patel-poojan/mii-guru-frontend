import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import ErrorMessage from "./ErrorMessage";

interface Option {
  value: string;
  label: string;
}

interface DynamicSelectProps {
  options: Option[];
  onSelect?: (name: string, value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  labelClassName?: string;
  main_select_class?: string;
  calender_arrow_button?: string;
  errorClassName?: string;
  name: string;
  error?: string;
  defaultValue?: string;
  value?: string;
  icon?: string;
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({
  options,
  // onSelect,
  placeholder,
  className,
  label,
  labelClassName,
  main_select_class,
  calender_arrow_button,
  errorClassName = "",
  // name,
  error,
  defaultValue,
  value,
  icon,
}) => {
  const defaultIcon = "solar:alt-arrow-down-line-duotone";
  const resolvedIcon = icon || defaultIcon;

  return (
    <div
      className={`${main_select_class} flex flex-col dynamic_select_main_div relative`}
    >
      {label && (
        <label
          className={cn(
            "mb-2 text-[var(--Regular-fontSize)] md:text-[var(--Medium-fontSize)] font-medium",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={() => {
          // onSelect && onSelect(name, e);
        }}
      >
        <SelectTrigger
          className={`border-[1px] border-gray-400 ${className} ${error ? "custom_error_message" : ""} dynamic_select`}
        >
          <SelectValue placeholder={placeholder || "Select an option"} />
          <div className={`${calender_arrow_button} arrow_button`}>
            <Icon className="block" icon={resolvedIcon} />
          </div>
        </SelectTrigger>
        <SelectContent>
          {options?.map((option, index) => (
            <SelectItem key={index} value={option.value} className="h-9 md:h-10">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Error Message */}
      <ErrorMessage
        error={error}
        className={`${errorClassName} absolute bottom-[-20px]`}
      />
    </div>
  );
};

export default DynamicSelect;
