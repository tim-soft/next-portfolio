import * as React from 'react';
import appPackage from 'next/package.json';

const useDevConsoleBanner = () => {
    React.useEffect(() => {
        const APP_URL = process.env.APP_BASE_URL;

        // eslint-disable-next-line no-console
        console.log(
            '%c ',
            `background: url('${APP_URL}/static/avatar.png') 0 0 no-repeat; padding: 66px; border-radius: 50%;`
        );

        // eslint-disable-next-line no-console
        console.log('%cGreetings!', 'font-size: 20px;');

        // eslint-disable-next-line no-console
        console.log(
            `%cThis web app was built with React@${React.version} and Next.js@${appPackage.version}`,
            'font-size: 17px;'
        );
    }, []);
};

export default useDevConsoleBanner;
