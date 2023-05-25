import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MessagesModal from "./messagesModal/messagesModal";
import Link from "../UI/Link/Link";
import Badge from "../UI/badge/badge";
import MessageIcon from "../UI/icons/message";
import MsgService from "../../services/msgService";
import useDevice from "../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  headerIcon: {
    padding: `0 ${theme.spacing(5)}px`,
    "&:hover $icon": {
      fill: theme.palette.primary.main,
    },
  },
  icon: {},
  badge: {
    color: "#fff",
  },
  badgeMobile: {
    color: "#fff",
    marginLeft: 15,
  },
}));

const Messages = (props) => {
  const classes = useStyles(props);
  const device = useDevice();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    MsgService.getUnreadMailMessageCount((status, data) => {
      setUnreadCount(data);
    });
  }, []);

  return (
    <>
      {device.isNotMobile ? (
        <>
          {modalIsOpen && (
            <MessagesModal
              open={true}
              onClose={() => setModalIsOpen(!modalIsOpen)}
            ></MessagesModal>
          )}
          <Link
            tooltipPlacement="bottom"
            title="پیام‌ها"
            onClick={() => setModalIsOpen(true)}
            className={classes.headerIcon}
          >
            <Badge badgeContent={unreadCount} className={classes.badge}>
              <MessageIcon className={classes.icon}></MessageIcon>
            </Badge>
          </Link>
        </>
      ) : (
        <Badge badgeContent={unreadCount} className={classes.badgeMobile} />
      )}
    </>
  );
};

export default React.memo(Messages);
