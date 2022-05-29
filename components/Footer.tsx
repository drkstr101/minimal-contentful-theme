import * as React from 'react';
import { toFieldPath } from '@stackbit/annotations';
import Markdown from 'markdown-to-jsx';
import { IFooterConfig } from '../types/sourcebit';

export const Footer = ({ body }: IFooterConfig) => {
    return (
        <footer className="footer outer" {...toFieldPath('content/data/config.json:footer')}>
            <div className="footer-container inner">
                <Markdown className="footer-content" {...toFieldPath('.body')}>
                    {body}
                </Markdown>
            </div>
        </footer>
    );
};
