import React from "react";

const Notification = ({ notification }) => {
	if (notification.message === null || notification.type === null) {
		return null;
	}

	// console.log(notification, notification.message);

	return (
		<div
			className={
				notification.type === "success"
					? "notification success"
					: "notification error"
			}
		>
			{notification.message}
		</div>
	);
};

export default Notification;
