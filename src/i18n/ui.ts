/**
 * UI chrome strings — navigation, buttons, section headings.
 *
 * Content strings live in the Markdown files as `_en` / `_ta` frontmatter
 * pairs; this file covers only the furniture around them. Both languages are
 * rendered into the page and the language toggle shows one of them, so every
 * key needs both halves filled in.
 */
export const ui = {
  'nav.home': { en: 'Home', ta: 'முகப்பு' },

  'banner.construction': {
    en: 'This site has not officially launched yet and is still being built — some pages are placeholders for now.',
    ta: 'இந்த இணையதளம் இன்னும் அதிகாரப்பூர்வமாகத் தொடங்கப்படவில்லை, தொடர்ந்து உருவாக்கப்பட்டு வருகிறது — சில பக்கங்கள் தற்காலிகமானவை.',
  },
  'banner.dismiss': { en: 'Dismiss this notice', ta: 'இந்த அறிவிப்பை மூடு' },
  'nav.discussions': { en: 'Weekly Discussions', ta: 'வாராந்திர வாசிப்பு' },
  'nav.events': { en: 'Events', ta: 'நிகழ்வுகள்' },
  'nav.reviews': { en: 'Book Reviews', ta: 'நூல் மதிப்புரைகள்' },
  'nav.blog': { en: 'Articles', ta: 'கட்டுரைகள்' },
  'nav.videos': { en: 'Videos', ta: 'காணொளிகள்' },
  'nav.contact': { en: 'Contact', ta: 'தொடர்பு' },
  'nav.menu': { en: 'Menu', ta: 'பட்டி' },
  'nav.primary': { en: 'Primary', ta: 'முதன்மை' },

  'search.open': { en: 'Search', ta: 'தேடல்' },
  'search.close': { en: 'Close search', ta: 'தேடலை மூடு' },
  'search.placeholder': { en: 'Search the site…', ta: 'தளத்தில் தேடுக…' },
  'search.noResults': { en: 'No results found.', ta: 'முடிவுகள் இல்லை.' },
  'search.searching': { en: 'Searching…', ta: 'தேடுகிறது…' },

  'lang.label': { en: 'Language', ta: 'மொழி' },
  'lang.english': { en: 'English', ta: 'English' },
  'lang.tamil': { en: 'தமிழ்', ta: 'தமிழ்' },

  'home.about': { en: 'About Vishnupuram UK', ta: 'விஷ்ணுபுரம் UK பற்றி' },
  'home.latestDiscussions': { en: 'From the Weekly Circle', ta: 'வாராந்திர வட்டத்திலிருந்து' },
  'home.featuredReview': { en: 'From the Bookshelf', ta: 'நூல் அலமாரியிலிருந்து' },
  'home.upcomingEvents': { en: 'Upcoming Events', ta: 'வரவிருக்கும் நிகழ்வுகள்' },
  'home.conversations': { en: 'Articles', ta: 'கட்டுரைகள்' },
  'home.videos': { en: 'Videos', ta: 'காணொளிகள்' },

  'videos.empty': {
    en: 'Videos from our events and conversations will appear here soon.',
    ta: 'எங்கள் நிகழ்வுகள், உரையாடல்களின் காணொளிகள் விரைவில் இங்கே இடம்பெறும்.',
  },
  'videos.watch': { en: 'Watch', ta: 'காண்க' },
  'videos.comingSoon': { en: 'Video coming soon', ta: 'காணொளி விரைவில்' },

  'events.upcoming': { en: 'Upcoming', ta: 'வரவிருக்கும்' },
  'events.past': { en: 'Past Events', ta: 'கடந்த நிகழ்வுகள்' },
  'events.featured': { en: 'Featured', ta: 'சிறப்பு நிகழ்வு' },
  'events.venue': { en: 'Venue', ta: 'இடம்' },
  'events.date': { en: 'Date', ta: 'நாள்' },
  'events.none': { en: 'No events to show yet.', ta: 'இதுவரை நிகழ்வுகள் எதுவும் இல்லை.' },

  'review.author': { en: 'Author', ta: 'ஆசிரியர்' },
  'review.translator': { en: 'Translator', ta: 'மொழிபெயர்ப்பாளர்' },
  'review.reviewer': { en: 'Reviewed by', ta: 'மதிப்புரை' },
  'review.book': { en: 'Book', ta: 'நூல்' },
  'review.originallyPublished': { en: 'Originally published on', ta: 'முதலில் வெளியிடப்பட்டது' },
  'review.readFull': { en: 'Read the full piece', ta: 'முழுக் கட்டுரையையும் வாசிக்க' },

  'blog.author': { en: 'By', ta: 'எழுதியவர்' },
  'blog.responses': { en: 'Reader Responses', ta: 'வாசகர் பதில்கள்' },
  'blog.responsesNote': {
    en: 'Responses to this piece will appear here. To add yours, write to Vishnupuramlitcircle@gmail.com.',
    ta: 'இப்பதிவுக்கான பதில்கள் இங்கே இடம்பெறும். உங்கள் பதிலைச் சேர்க்க Vishnupuramlitcircle@gmail.com முகவரிக்கு எழுதுங்கள்.',
  },

  'common.readMore': { en: 'Read more', ta: 'மேலும் வாசிக்க' },
  'common.readAll': { en: 'Read all', ta: 'அனைத்தையும் வாசிக்க' },
  'common.back': { en: 'Back', ta: 'திரும்பிச் செல்ல' },
  'common.published': { en: 'Published', ta: 'வெளியிடப்பட்டது' },
  'common.empty': { en: 'Nothing here yet.', ta: 'இதுவரை எதுவும் இல்லை.' },
  'common.skipToContent': { en: 'Skip to content', ta: 'உள்ளடக்கத்திற்குச் செல்ல' },

  'donate.title': { en: 'Support Vishnupuram', ta: 'விஷ்ணுபுரத்தை ஆதரியுங்கள்' },
  'donate.paypal': { en: 'Donate via PayPal', ta: 'PayPal வழியாக நன்கொடை' },
  'donate.stripe': { en: 'Donate via Card (Stripe)', ta: 'அட்டை வழியாக நன்கொடை (Stripe)' },
  'donate.bank': { en: 'Bank transfer', ta: 'வங்கிப் பரிமாற்றம்' },
  'donate.bankAccountName': { en: 'Account name', ta: 'கணக்குப் பெயர்' },
  'donate.bankSortCode': { en: 'Sort code', ta: 'சார்ட் குறியீடு' },
  'donate.bankAccountNumber': { en: 'Account number', ta: 'கணக்கு எண்' },
  'donate.bankReference': { en: 'Reference', ta: 'குறிப்பு' },

  'contact.title': { en: 'Contact', ta: 'தொடர்பு' },
  'contact.name': { en: 'Your name', ta: 'உங்கள் பெயர்' },
  'contact.email': { en: 'Your email', ta: 'உங்கள் மின்னஞ்சல்' },
  'contact.subject': { en: 'Subject', ta: 'தலைப்பு' },
  'contact.message': { en: 'Message', ta: 'செய்தி' },
  'contact.send': { en: 'Send message', ta: 'செய்தி அனுப்ப' },
  'contact.emailUs': { en: 'Or email us directly', ta: 'அல்லது நேரடியாக மின்னஞ்சல் அனுப்பவும்' },

  'footer.follow': { en: 'Follow', ta: 'பின்தொடர' },
  'footer.explore': { en: 'Explore', ta: 'பக்கங்கள்' },
  'footer.rights': { en: 'Vishnupuram UK', ta: 'விஷ்ணுபுரம் UK' },

  '404.title': { en: 'Page not found', ta: 'பக்கம் கிடைக்கவில்லை' },
  '404.body': {
    en: 'The page you were looking for is not here. It may have moved, or the link may be out of date.',
    ta: 'நீங்கள் தேடிய பக்கம் இங்கு இல்லை. அது இடம் மாறியிருக்கலாம், அல்லது இணைப்பு பழையதாக இருக்கலாம்.',
  },
  '404.home': { en: 'Return home', ta: 'முகப்புக்குத் திரும்ப' },
} as const satisfies Record<string, { en: string; ta: string }>;

export type UIKey = keyof typeof ui;

/** Look up a UI string pair by key. */
export function t(key: UIKey): { en: string; ta: string } {
  return ui[key];
}
