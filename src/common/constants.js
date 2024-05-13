export const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';
export const CLEAR_DATA_CTA = 'Clear Local Data';
export const CLOSE_CTA = 'Close';
export const FALLBACK_CHANNEL_TITLE = '[TITLE NOT FOUND]';
export const LOAD_MORE_CTA = 'Load More';
export const SAVE_CTA = 'Save';
export const SEARCH_VALIDATION_ERROR = 'Please select subscriptions to search';
export const SUBS_HEADER = 'Subscriptions to Search';
export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light'
};
export const USAGE_STEPS = [
  {
    text: 'Generate a <a target="_blank" href="https://support.google.com/googleapi/answer/6158862">Google Cloud API key</a>',
    image: { url: `${process.env.PUBLIC_URL}/usage_image_01.png`, altText: 'Generate API Key' }
  },
  {
    text: 'Enable <a target="_blank" href="https://console.cloud.google.com/marketplace/product/google/youtube.googleapis.com">YouTube Data API v3</a>',
    image: { url: `${process.env.PUBLIC_URL}/usage_image_02.png`, altText: 'Enable YouTube Data API v3' }
  },
  {
    text: 'Ensure your subscriptions are not <a target="_blank" href="https://www.youtube.com/account_privacy">set to private</a>',
    image: { url: `${process.env.PUBLIC_URL}/usage_image_03.png`, altText: 'Set your subscriptions to public' }
  },
  {
    text: 'Copy your YouTube Channel ID',
    image: { url: `${process.env.PUBLIC_URL}/usage_image_04.png`, altText: 'Copy channel ID' }
  },
  {
    text: `Select the <svg height="24" viewBox="0 -960 960 960" width="24"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" /></svg> settings icon and enter your API Key and Channel ID`
  }
];
export const YOUTUBE_BASE_URL = 'https://youtube.com/watch?v=';
