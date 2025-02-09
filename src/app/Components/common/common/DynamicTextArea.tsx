import { cn } from "@/lib/utils";
import ErrorMessage from "./ErrorMessage";
import { ChangeEvent, FocusEvent, CSSProperties } from "react";

type DynamicTextAreaProps = {
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
    inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    label?: string;
    labelClassName?: string;
    autoFocus?: boolean;
    onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;
    mainClass?: string;
    style?: CSSProperties;
    rows?: number;
    errorClassName?: string;
    error?: string;
};

const DynamicTextArea: React.FC<DynamicTextAreaProps> = ({
    // type = "text",
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
    style,
    rows,
    errorClassName,
    error,
}) => {
    console.log("error", error);
    return (
        <div className={`${mainClass} flex flex-col relative dynamic_textarea_div`}>
            {label && <label className={cn("mb-2 ", labelClassName)}>{label}</label>}
            <textarea
                value={value}
                onChange={onChange}
                autoFocus={autoFocus}
                placeholder={placeholder}
                onFocus={onFocus}
                rows={rows || 10}
                className={`${className} ${error ? "custom_error_message" : ""} border px-3 md:px-4 py-1 md:py-2 text-lg border-input focus:outline focus:outline-[1.5px] focus:outline-[var(--MainLight-color)] rounded-lg`}
                style={style}
                {...inputProps}
            />
            {/* Error Message */}
            <ErrorMessage error={error} className={`${errorClassName} absolute bottom-[-20px]`} />
        </div>
    );
};

export default DynamicTextArea;
