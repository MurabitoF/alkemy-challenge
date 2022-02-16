import React from "react";

const Notification = ({ notification }) => {
	if (notification.message === null || notification.type === null) {
		return null;
	}

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
