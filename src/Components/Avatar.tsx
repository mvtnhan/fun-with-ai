import { FunctionComponent } from 'react';

import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps, Badge } from '@mui/material';

export enum Status {
  ONLINE = "online",
  OFFLINE = "offline",
  BUSY = "busy",
  AWAY = "away",
}
export type AvatarProps = MuiAvatarProps & {
  status?: Status;
};

const colorStatusMap = {
  online: "#44b700",
  offline: "gray",
  busy: "red",
  away: "yellow",
};

const Avatar: FunctionComponent<AvatarProps> = (props: AvatarProps) => {
  if (!props.status) return <MuiAvatar {...props} />;

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
      sx={{
        "& .MuiBadge-badge": {
          boxShadow: `0 0 0 2px #fff`,
          backgroundColor: colorStatusMap[props.status],
          "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
          },
        },
      }}
    >
      <MuiAvatar {...props} />
    </Badge>
  );
};

export default Avatar;
