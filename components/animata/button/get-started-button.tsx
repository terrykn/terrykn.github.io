import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface IGetStartedButtonProps {
    text: string;
    className?: string;
}

export default function GetStartedButton({
    text = "Get started",
    className,
}: IGetStartedButtonProps) {
    return (
        <div className="min-h-12 w-48">
            <button
                type="button"
                className={cn(
                    "group/start flex h-12 w-40 items-center justify-center gap-3 rounded-lg bg-foreground p-2 font-bold transition-colors duration-100 ease-in-out hover:bg-primary",
                    className,
                )}
            >
                <span
                    className={cn(
                        "text-primary transition-colors duration-100 ease-in-out group-hover/start:text-foreground",
                    )}
                >
                    {text}
                </span>
                <div
                    className={cn(
                        "relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full transition-transform duration-100",
                        "bg-primary group-hover/start:bg-foreground",
                    )}
                >
                    <div className="absolute left-0 flex h-7 w-14 -translate-x-1/2 items-center justify-center transition-transform duration-200 ease-in-out group-hover/start:translate-x-0">
                        <ArrowRight
                            size={16}
                            className={cn(
                                "size-7 transform p-1 text-primary opacity-0 group-hover/start:opacity-100",
                            )}
                        />
                        <ArrowRight
                            size={16}
                            className={cn(
                                "size-7 transform p-1 text-foreground opacity-100 transition-transform duration-300 ease-in-out group-hover/start:opacity-0",
                            )}
                        />
                    </div>
                </div>
            </button>
        </div>
    );
}
