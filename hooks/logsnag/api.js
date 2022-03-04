module.exports = {
	log: ({ project, channel, event, notify=true }) => {
		return fetch('https://api.logsnag.com/v1/log', {
			method: 'POST',
			body: {
				project,
				channel,
				event,
				...log
			},
			headers: {
				Authorization: `Bearer ${LOGSNAG_TOKEN}`
			}
		});
	}
};
