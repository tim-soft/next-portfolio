const APP_URL = process.env.APP_BASE_URL;

export default {
    title: 'Tim Ellenberger',
    description:
        'Tim Ellenberger | Javascript, React and GraphQL Consulting and Blog',
    openGraph: {
        title: 'Tim Ellenberger',
        description:
            'Tim Ellenberger | Javascript, React and GraphQL Consulting and Blog',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: `${APP_URL}/static/avatar.png`,
                width: 140,
                height: 140,
                alt: 'Tim Ellenberger (Avatar)',
            },
        ],
        profile: {
            firstName: 'Tim',
            lastName: 'Ellenberger',
            username: 'tim-soft',
            gender: 'male',
        },
    },
};
