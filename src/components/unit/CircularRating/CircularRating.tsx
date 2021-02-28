import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/styles/makeStyles";
import style from "./CircularRatingStyle";
import React from "react";
import { Variant } from "@material-ui/core/styles/createTypography";
import ThumbUpIcon from "@material-ui/icons/ThumbUpSharp";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDownSharp";
import ThumbDownIcon from "@material-ui/icons/ThumbDownSharp";

type CircularRatingProps = React.ComponentProps<typeof Box> & {
  /** Size of rating, the outer circle
   *
   * default is 50
   */
  size?: number;

  /** Size of circular progress, the inner circle
   *
   * The size included circular mask and circular
   * progress
   *
   * default is 44
   */
  progressSize?: number;

  /** Value of rating,
   * base on 0 ~ maxValue
   *
   *  default is 50
   */
  value?: number;

  /** Max value of rating, this maxValue is
   * used to clamp value
   *
   * default 100
   */
  maxValue?: number;

  /** background color of rating, the outer circle
   *
   * default  '#2d2d2d'
   */
  bgcolor?: any;

  /** Criteria for postive rating
   *
   * If value is above and equal to this is counted
   * as postive
   *
   * default 70
   */
  postiveCriteria?: number;

  /** Criteria for average rating
   *
   * If value is above and equal to this is counted
   * as average
   *
   * default 50
   */
  averageCriteria?: number;

  /** Criteria for negative rating
   *
   * If value is above and equal to this is counted
   * as negative
   *
   * default 0
   */
  negativeCriteria?: number;

  /** Color of rating when rating is postive
   *
   * default '#4dd827'
   */
  postiveColor?: string;

  /** Color of rating when rating is average
   *
   * default '#f2d50d'
   */
  averageColor?: string;

  /** Color of rating when rating is negative
   *
   * default '#fa050f
   */
  negativeColor?: string;

  /** The opacity for circular mask
   * 0~1
   *
   * default 0.5
   */
  maskOpacity?: number;

  /** Should value to be displayed
   *
   * default false
   */
  hideValue?: boolean;

  /** Variant of value text
   *
   * default 'caption'
   */
  valueVariant?: Variant;

  /** FontWeight of value text
   *
   * default 400
   */
  valueFontWeight?: number;

  /** FontSize of value text
   *
   * default '1em'
   */
  valueFontSize?: any;

  /** EndAdornment for value
   *
   * default null
   */
  valueEndAdornment?: React.ReactNode;

  /**
   * flexbox direction for value and EndAdornment
   *
   * default is 'column'
   */
  valueFlexDirection?: "column" | "row";
};

/**
 * Component CircularRating
 *
 * Component display a circular shape with rating in it with
 * Material-UI Box.
 *
 * Customizable different color for different level of rating
 *  and circular progress bar.
 *
 * Customizable endAdornment with icon
 *
 * Return null if value is other type than number
 *
 * Use `getCircularRating` function to get a quick pre-made CircularRating component
 *
 * @param {CircularRatingProps} props
 */
const CircularRating: React.FC<CircularRatingProps> = (
  props: CircularRatingProps
) => {
  const {
    size = 50,
    progressSize = 44,
    value = 50,
    maxValue = 100,
    bgcolor = "#2d2d2d",
    postiveCriteria = 70,
    averageCriteria = 50,
    negativeCriteria = 0,
    postiveColor = "#4dd827",
    averageColor = "#f2d50d",
    negativeColor = "#fa050f",
    maskOpacity = 0.5,
    hideValue = false,
    valueVariant = "caption",
    valueFontWeight = 400,
    valueFontSize = "1em",
    valueEndAdornment = null,
    valueFlexDirection = "column",
    ...rest
  } = props;

  if (typeof value !== "number") return null;

  const sizeDiff = Math.floor(Math.abs(size - progressSize) / 2);

  //clamp value
  const finalValue = Math.round(Math.min(Math.max(value, 0), maxValue));

  //progress value base on 0 ~ 100
  const progressValue = (value / maxValue) * 100;

  //color adjustment
  let finalColor = postiveColor;
  if (finalValue >= postiveCriteria) {
    finalColor = postiveColor;
  } else if (finalValue >= averageCriteria) {
    finalColor = averageColor;
  } else if (finalValue >= negativeCriteria) {
    finalColor = negativeColor;
  } else {
    finalColor = "primary";
  }

  const classes = makeStyles(style)({
    finalColor,
    maskOpacity,
  });

  return (
    <Box {...rest} position="relative" width={size} height={size}>
      {/* circular progress of bottom mask */}
      <Box
        position="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        borderRadius="50px"
        bgcolor={bgcolor}
        px={`${sizeDiff}px`}
        py={`${sizeDiff}px`}
      >
        <CircularProgress
          className={classes.circleMask}
          size={progressSize}
          value={100}
          variant="determinate"
        />
      </Box>

      {/* circular progress */}
      <Box
        position="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        borderRadius="50px"
        bgcolor="transparent"
        px={`${sizeDiff}px`}
        py={`${sizeDiff}px`}
      >
        <CircularProgress
          className={classes.circleCap}
          size={progressSize}
          value={progressValue}
          variant="determinate"
        />
      </Box>

      {/* value and endAdornment */}
      <Box
        position="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          className={classes.text}
          component="div"
          variant={valueVariant}
        >
          <Box
            display="flex"
            flexDirection={valueFlexDirection}
            justifyContent="center"
            alignItems="center"
          >
            {hideValue ? null : (
              <Box fontSize={valueFontSize} fontWeight={valueFontWeight}>
                {finalValue}
              </Box>
            )}
            {valueEndAdornment}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default React.memo(
  CircularRating,
  (preProps, nextProps) => preProps.value === nextProps.value
);

/**
 * helper function to create a CircularRating by given rating number
 *
 * The CircularRating with Thumb Up/Down or UpDown icon which is from
 * Material-UI
 *
 * @param rating 0~100
 *
 * @return null if rating is 0 otherwise CircularRating component with rating
 */
export function getCircularRating(rating: number) {
  if (!rating) return null;

  const iconSize = { width: "15px", height: "15px" };
  let icon = <ThumbDownIcon style={iconSize} />;
  if (rating >= 70) {
    icon = <ThumbUpIcon style={iconSize} />;
  } else if (rating >= 50) {
    icon = <ThumbsUpDownIcon style={iconSize} />;
  } else if (rating >= 0) {
    icon = <ThumbDownIcon style={iconSize} />;
  }

  return (
    <CircularRating
      value={rating}
      valueFlexDirection="column"
      valueEndAdornment={icon}
    />
  );
}
