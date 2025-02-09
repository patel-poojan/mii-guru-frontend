import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChangeEvent, FocusEvent } from "react";
import ErrorMessage from "./ErrorMessage";

interface DynamicInputProps {
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (name: string, value: string) => void;
    className?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    label?: string;
    labelClassName?: string;
    autoFocus?: boolean;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    mainClass?: string;
    errorClassName?: string;
    error?: string;
    disabled?: boolean;
    name: string;
    formatAsPhone?: boolean;
}

const DynamicInput: React.FC<DynamicInputProps> = ({
    type = "text",
    placeholder = "",
    value,
    onChange,
    className = "",
    inputProps = {},
    label,
    labelClassName,
    autoFocus,
    onFocus,
    mainClass,
    errorClassName,
    error,
    disabled,
    name,
    formatAsPhone = false
}) => {

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let updatedValue = e.target.value;

        if (formatAsPhone) {
            updatedValue = updatedValue.replace(/\D/g, "").slice(0, 10);
        }

        onChange(name, updatedValue);
    };
    
    return (
        <div className={`${mainClass} flex flex-col dynamic_input_div relative`}>
            {label && (
                <label className={cn("mb-1 md:mb-[6px] text-lg md:text-xl", labelClassName)}>
                    {label}
                </label>
            )}
            <Input
                type={type}
                value={value}
                onChange={handleInputChange}
                autoFocus={autoFocus}
                placeholder={placeholder}
                name={name}
                onFocus={onFocus}
                disabled={disabled}
                className={`${className} ${error ? "custom_error_message" : ""} dynamic_input placeholder:font-[300]`}
                {...inputProps}
            />
            {/* Error Message */}
            <ErrorMessage error={error} className={`${errorClassName} absolute bottom-[-20px]`} />
        </div>
    );
};

export default DynamicInput;
