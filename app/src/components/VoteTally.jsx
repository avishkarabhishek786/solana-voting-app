import {
  Avatar,
  Box,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { formatWithCommas, percentize } from "../utils";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 48,
    width: 48,
    borderRadius: "initial",
    "&.left": {
      marginRight: theme.spacing(0.5),
    },
    "&.right": {
      marginLeft: theme.spacing(0.5),
    },
  },
  progress: {
    backgroundColor: theme.palette.primary.main,
    height: 25,
  },
}));

// Show vote counts for each side
export default function VoteTally({ votes }) {
  const classes = useStyles();

  function getProgress() {
    if (
      typeof votes.johnny !== "number" ||
      typeof votes.amber !== "number" ||
      votes.johnny + votes.amber === 0
    ) {
      return 50;
    }
    return (votes.johnny / (votes.amber + votes.johnny)) * 100;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" marginBottom="5px">
        <Box display="flex" alignItems="flex-end">
          {/* <Avatar
            alt=""
            src="/images/crunchy-icon.svg"
            className={[classes.avatar, "left"].join(" ")}
          /> */}
          <Typography variant="h6">Team Johnny</Typography>
        </Box>
        <Box display="flex" alignItems="flex-end" textAlign="right">
          <Typography variant="h6">Team Amber</Typography>
          {/* <Avatar
            alt=""
            src="/images/smooth-icon.svg"
            className={[classes.avatar, "right"].join(" ")}
          /> */}
        </Box>
      </Box>
      <LinearProgress
        variant="determinate"
        value={getProgress()}
        color="secondary"
        className={classes.progress}
      />
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h3">
            {formatWithCommas(votes.johnny)}
          </Typography>
          <Typography variant="h6">
            {percentize(votes.johnny / (votes.johnny + votes.amber))}
          </Typography>
        </Box>
        <Box textAlign="right">
          <Typography variant="h3">{formatWithCommas(votes.amber)}</Typography>
          <Typography variant="h6">
            {percentize(votes.amber / (votes.johnny + votes.amber))}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
