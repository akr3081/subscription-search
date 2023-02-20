const baseUrl = 'https://youtube.googleapis.com/youtube/v3';

/**
 * Gets subscriptions based on the current pageToken
 * @param {string} channelId - The channel for which subscriptions are fetched
 * @param {string} apiKey - The api key used to fetch data
 * @param {string} pageToken - Token for paginated results
 * @returns {object} Subscription payload
 */
const fetchSubscriptionData = async ({channelId, apiKey, pageToken}) => {
    const res = await fetch(`${baseUrl}/subscriptions?key=${apiKey}&part=snippet&channelId=${channelId}&order=alphabetical&maxResults=50&pageToken=${pageToken}`);
    return await res.json();
}

/**
 * Gets a list of subscriptions for a given channel
 * @param {string} channelId - The channel for which subscriptions are fetched
 * @param {string} apiKey - The api key used to fetch data
 * @returns {array} List of subscriptions
 */
const getSubscriptions = async ({channelId, apiKey}) => {
    const subscriptionsList = [];
    let pageToken = '';

    do {
        const res = await fetchSubscriptionData({channelId, apiKey, pageToken});
        pageToken = res.nextPageToken;
        subscriptionsList.push(...res.items);
    } while (pageToken);

    return subscriptionsList;
}


/**
 * Gets a list of channel videos based on search term
 * @param {string} channelId - The channel for which videos are searched
 * @param {string} apiKey - The api key used to fetch data
 * @param {string} searchTerm - Input for search results
 * @param {number} maxResultsPerChannel - The max number of results to return for each channel
 * @returns {object} List of videos
 */
const fetchChannelResults = async ({channelId, apiKey, searchTerm, maxResultsPerChannel}) => {
    const res = await fetch(`${baseUrl}/search?key=${apiKey}&channelId=${channelId}&maxResults=${maxResultsPerChannel}&q=${searchTerm}&part=snippet&safeSearch=none&type=video`);
    const resJson = await res.json();
    return resJson.items;
}

/**
 * Gets a list of videos based on all subscriptions
 * @param {string} subscriptionIds - List of channel ids from your subscriptions
 * @param {string} apiKey - The api key used to fetch data
 * @param {string} searchTerm - Input for search results
 * @param {number} maxResultsPerChannel - The max number of results to return for each channel
 * @returns {object} List of videos from all channels
 */
const getAllVideos = async ({subscriptionIds, apiKey, searchTerm, maxResultsPerChannel}) => {
    let videoList = [];

    // TODO can we make this simpler???
    const promiseList = subscriptionIds.map(subId => fetchChannelResults({channelId: subId, apiKey, searchTerm, maxResultsPerChannel}));
    await Promise.all(promiseList).then(subscriptionData => {
        subscriptionData.forEach(subVideos => {
            console.log(1111, subVideos);
            videoList.push(...subVideos);
        })
    })

    return videoList;
}

const execute = async () => {
    const apiKey = '';
    const channelId = '';

    const subscriptions = await getSubscriptions({channelId, apiKey});

    // TODO add toggle to only search certain channels
    // TOOD make this static to limit api calls
    const subscriptionIds = subscriptions.map(sub => sub.snippet.resourceId.channelId);

    const searchTerm = document.getElementById('search_input').value;
    const maxResultsPerChannel = document.getElementById('search_max_results').value;

    const videos = await getAllVideos({subscriptionIds, apiKey, searchTerm, maxResultsPerChannel});

    const videoTitles = videos.map(video => video.snippet.title);
    console.log(1111, videoTitles);
}
