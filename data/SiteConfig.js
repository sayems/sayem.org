const config = {
    siteTitle: 'Syed Sayem',
    siteTitleShort: 'Syed Sayem',
    siteTitleAlt: 'Syed Sayem',
    siteLogo: '/logos/sayem.jpg',
    siteUrl: 'https://www.sayem.org',
    repo: 'https://github.com/sayems/sayem.org',
    pathPrefix: '',
    dateFromFormat: 'YYYY-MM-DD',
    dateFormat: 'MMMM Do, YYYY',
    siteDescription:
        'Blah blah',
    siteRss: '/rss.xml',
    googleAnalyticsID: '',
    disqusShortname: 'sayems',
    postDefaultCategoryID: 'Tech',
    userName: 'Syed',
    userEmail: 'syed@sayem.org',
    userTwitter: 'sayems',
    userLocation: 'New York, NY',
    userAvatar: 'https://api.adorable.io/avatars/150/test.png',
    userDescription:
        'I build open source projects and write the missing instruction manuals of the web.',
    menuLinks: [
        {
            name: 'Me',
            link: '/me/',
        },
        {
            name: 'Articles',
            link: '/blog/',
        },
        {
            name: 'Contact',
            link: '/contact/',
        },
    ],
    themeColor: '#3F80FF', // Used for setting manifest and progress theme colors.
    backgroundColor: '#ffffff',
};

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
    config.pathPrefix = ''
} else {
    // Make sure pathPrefix only contains the first forward slash
    config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/') config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/') config.siteRss = `/${config.siteRss}`;

module.exports = config;
