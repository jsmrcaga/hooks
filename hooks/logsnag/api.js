module.exports = {
	log: ({ project, channel, event, notify=true, ...rest }) => {
		return fetch('https://api.logsnag.com/v1/log', {
			method: 'POST',
			body: {
				project,
				channel,
				event,
				notify
				...rest
			},
			headers: {
				Authorization: `Bearer ${LOGSNAG_TOKEN}`
			}
		});
	}
};
