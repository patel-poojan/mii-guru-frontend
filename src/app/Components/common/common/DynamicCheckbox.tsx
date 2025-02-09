import { Checkbox } from "@/components/ui/checkbox";

type DynamicCheckboxProps = {
    id: string;
    label?: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    className?: string;
    labelClassName?: string;
    disabled?: boolean;
    main_className?: string;
};

const DynamicCheckbox: React.FC<DynamicCheckboxProps> = ({
    id,
    label,
    checked,
    onCheckedChange,
    className = "",
    labelClassName = "",
    disabled = false,
    main_className = "",
    ...props
}) => {
    return (
        <div className={`${main_className} text-[var(--Small-fontSize)] md:text-[var(--Regular-fontSize)] flex items-center space-x-3`}>
            <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={onCheckedChange}
                className={`${className} border-[var(--MainLight-color)] dynamic_checkbox`}
                disabled={disabled}
                {...props}
            />
            {label && (
                <label
                    htmlFor={id}
                    className={`flex items-center text-base md:text-lg cursor-pointer font-normal opacity-70 leading-none ${disabled ? "cursor-not-allowed opacity-70" : ""} ${labelClassName}`}
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default DynamicCheckbox;
