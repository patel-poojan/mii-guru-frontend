import React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

type ErrorMessageProps = {
    error?: string;
    className?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, className }) => {
    if (!error) return null;

    return (
        <p className={cn("text-red-500 text-sm mt-1", className)}>
            <div className="flex items-center gap-1">
                <Icon icon="material-symbols:info" />
                <span className="block">{error}</span>
            </div>
        </p>
    );
};

export default ErrorMessage;
