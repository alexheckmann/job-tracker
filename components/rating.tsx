import React, {useState} from "react";
import {Star} from "lucide-react";
import {cn} from "@/lib/utils"

const ratingVariants = {
    default: {
        star: "text-foreground",
        emptyStar: "text-muted-foreground",
    },
    destructive: {
        star: "text-red-500",
        emptyStar: "text-red-200",
    },
    yellow: {
        star: "text-ternary",
        emptyStar: "text-ternary",
    },
};

/**
 * Props for a star rating component that allows users to rate content.
 * @param rating - The initial rating value.
 * @param totalStars - The total number of stars to display.
 * @param size - The size of the stars.
 * @param fill - Whether the stars should be filled or outlined.
 * @param Icon - The icon component to use for the stars.
 * @param variant - The color variant to use for the stars.
 * @param onRatingChange - A callback function that is called when the rating is changed.
 * @param disabled - Whether the rating is disabled.
 */
interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
    rating: number;
    totalStars?: number;
    size?: number;
    fill?: boolean;
    Icon?: React.ReactElement;
    variant?: keyof typeof ratingVariants;
    onRatingChange?: (rating: number) => void;
    disabled?: boolean; // Add disabled prop
}

/**
 * A star rating component that allows users to rate content.
 */
export const Ratings = ({
                            rating: initialRating,
                            totalStars = 5,
                            size = 20,
                            fill = true,
                            Icon = <Star/>,
                            variant = "default",
                            onRatingChange,
                            disabled = false, // Default to false if disabled prop is not provided
                            ...props
                        }: RatingsProps) => {
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [currentRating, setCurrentRating] = useState(initialRating);
    const [, setIsHovering] = useState(false);

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!disabled) {
            setIsHovering(true);
            const starIndex = parseInt(
                (event.currentTarget as HTMLDivElement).dataset.starIndex || "0"
            );
            setHoverRating(starIndex);
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setHoverRating(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!disabled) {
            const starIndex = parseInt(
                (event.currentTarget as HTMLDivElement).dataset.starIndex || "0"
            );
            setCurrentRating(starIndex);
            setHoverRating(null);
            if (onRatingChange) {
                onRatingChange(starIndex);
            }
        }
    };

    const displayRating = disabled ? initialRating : hoverRating ?? currentRating;
    const fullStars = Math.floor(displayRating);
    const partialStar =
        displayRating % 1 > 0 ? (
            <PartialStar
                fillPercentage={displayRating % 1}
                size={size}
                className={cn(ratingVariants[variant].star)}
                Icon={Icon}
            />
        ) : null;

    return (
        <div
            className={cn("flex w-fit flex-col gap-2", {'pointer-events-none': disabled})}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <div className="flex items-center" onMouseEnter={handleMouseEnter}>
                {[...Array(fullStars)].map((_, i) =>
                    React.cloneElement(Icon, {
                        key: i,
                        size,
                        className: cn(
                            fill ? "fill-current stroke-1" : "fill-transparent",
                            ratingVariants[variant].star
                        ),
                        onClick: handleClick,
                        onMouseEnter: handleMouseEnter,
                        "data-star-index": i + 1,
                    })
                )}
                {partialStar}
                {[
                    ...Array(Math.max(0, totalStars - fullStars - (partialStar ? 1 : 0))),
                ].map((_, i) =>
                    React.cloneElement(Icon, {
                        key: i + fullStars + 1,
                        size,
                        className: cn("stroke-1", ratingVariants[variant].emptyStar),
                        onClick: handleClick,
                        onMouseEnter: handleMouseEnter,
                        "data-star-index": i + fullStars + 1,
                    })
                )}
            </div>
        </div>
    );
};

/**
 * Props for a partial star component.
 * @param fillPercentage - The percentage of the star that should be filled.
 * @param size - The size of the star.
 * @param className - Additional classes to apply to the star.
 * @param Icon - The icon component to use for the star.
 */
interface PartialStarProps {
    fillPercentage: number;
    size: number;
    className?: string;
    Icon: React.ReactElement;
}

/**
 * A component that displays a partial star.
 * @param fillPercentage - The percentage of the star that should be filled.
 * @param size - The size of the star.
 * @param className - Additional classes to apply to the star.
 * @param Icon - The icon component to use for the star.
 */
const PartialStar = ({fillPercentage, size, className, Icon}: PartialStarProps) => {
    return (
        <div style={{position: "relative", display: "inline-block"}}>
            {React.cloneElement(Icon, {
                size,
                className: cn("fill-transparent", className),
            })}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    overflow: "hidden",
                    width: `${fillPercentage * 100}%`,
                }}
            >
                {React.cloneElement(Icon, {
                    size,
                    className: cn("fill-current", className),
                })}
            </div>
        </div>
    );
};
